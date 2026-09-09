import { ArrowLeftIcon, ArrowRightIcon, Cross2Icon, ListBulletIcon } from '@radix-ui/react-icons'
import { useMemo, useState } from 'react'
import type { EnglishItem } from '@/lib/english'
import { EnglishSidebar } from './EnglishSidebar'
import { cn } from '@/lib/utils'

export function EnglishReader({ items }: { items: EnglishItem[] }) {
  const [selectedId, setSelectedId] = useState(items[0]?.id || '')
  const [mobileOpen, setMobileOpen] = useState(false)
  const selected = items.find((item) => item.id === selectedId) || items[0]
  const selectedIndex = Math.max(0, items.findIndex((item) => item.id === selected?.id))
  const previous = items[selectedIndex - 1]
  const next = items[selectedIndex + 1]
  const select = (item: EnglishItem) => { setSelectedId(item.id); setMobileOpen(false) }
  const progress = useMemo(() => items.length ? ((selectedIndex + 1) / items.length) * 100 : 0, [items.length, selectedIndex])

  if (!selected) return <div className="rounded-3xl bg-white p-12 text-center shadow-soft dark:bg-slate-900">No English lessons yet.</div>

  return (
    <div className="grid min-h-[calc(100vh-8rem)] gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900 lg:block"><EnglishSidebar items={items} selectedId={selected.id} onSelect={select} /></div>
      {mobileOpen && <div className="fixed inset-0 z-50 bg-slate-950/30 lg:hidden" onClick={() => setMobileOpen(false)}><div className="absolute inset-y-0 left-0 w-[min(84vw,320px)] bg-white shadow-2xl dark:bg-slate-900" onClick={(event) => event.stopPropagation()}><EnglishSidebar items={items} selectedId={selected.id} onSelect={select} /><button aria-label="Close course library" onClick={() => setMobileOpen(false)} className="absolute right-3 top-3 rounded-lg p-1 text-slate-400"><Cross2Icon /></button></div></div>}
      <main className="min-w-0 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-100 px-5 py-4 dark:border-slate-800 sm:px-8 sm:py-5">
          <div className="mb-4 flex items-center justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[.2em] text-violet-600">English practice</p><h1 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-2xl">{selected.title}</h1></div><button onClick={() => setMobileOpen(true)} className="rounded-xl border border-slate-200 p-2 text-slate-500 lg:hidden"><ListBulletIcon /></button></div>
          <div className="flex items-center gap-3 text-xs text-slate-400"><span>{selectedIndex + 1} / {items.length}</span><div className="h-1.5 flex-1 rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-full rounded-full bg-violet-500 transition-all" style={{ width: `${progress}%` }} /></div><span>{selected.wordCount} words</span></div>
        </div>
        <article className="markdown-content mx-auto max-w-5xl px-5 py-6 sm:px-8 sm:py-8" dangerouslySetInnerHTML={{ __html: selected.html }} />
        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-4 dark:border-slate-800 sm:px-7"><button disabled={!previous} onClick={() => previous && select(previous)} className={cn('flex items-center gap-2 text-sm font-medium', previous ? 'text-slate-600 hover:text-violet-600 dark:text-slate-300' : 'cursor-not-allowed text-slate-300')}><ArrowLeftIcon /> Previous</button><button disabled={!next} onClick={() => next && select(next)} className={cn('flex items-center gap-2 text-sm font-medium', next ? 'text-slate-600 hover:text-violet-600 dark:text-slate-300' : 'cursor-not-allowed text-slate-300')}>Next <ArrowRightIcon /></button></div>
      </main>
    </div>
  )
}
