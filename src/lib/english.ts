import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'

export interface EnglishItem {
  id: string
  title: string
  fileName: string
  content: string
  html: string
  wordCount: number
}

// Keep lesson content next to the images it references in the public folder.
const root = path.join(process.cwd(), 'public', 'english')
const markdown = new MarkdownIt({ html: false, linkify: true, typographer: true })

function imagePath(src: string) {
  const name = path.basename(src.split(/[?#]/)[0])
  return `/english/${encodeURIComponent(name)}`
}

export function renderEnglishMarkdown(content: string) {
  const normalized = content.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) => {
    return `![${alt}](${imagePath(src.trim())})`
  })
  return markdown.render(normalized)
}

export function getEnglishItems(): EnglishItem[] {
  if (!fs.existsSync(root)) return []
  return fs.readdirSync(root)
    .filter((file) => /\.(md|markdown|txt)$/i.test(file) && !file.startsWith('.'))
    .map((fileName) => {
      const raw = fs.readFileSync(path.join(root, fileName), 'utf8')
      const parsed = matter(raw)
      const content = parsed.content.trim()
      return {
        id: `english-${fileName.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase()}`,
        title: String(parsed.data.title || fileName.replace(/\.[^.]+$/, '')),
        fileName,
        content,
        html: renderEnglishMarkdown(content),
        wordCount: content.split(/\s+/).filter(Boolean).length,
      }
    })
    .sort((a, b) => a.fileName.localeCompare(b.fileName, undefined, { numeric: true }))
}
