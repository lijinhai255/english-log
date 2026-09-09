import Head from 'next/head'
import type { GetStaticProps } from 'next'
import { ThemeToggle } from '@/components/ThemeToggle'
import { EnglishReader } from '@/components/EnglishReader'
import { getEnglishItems, type EnglishItem } from '@/lib/english'

export default function Home({ items }: { items: EnglishItem[] }) {
  return <><Head><title>English Lab</title><meta name="description" content="English learning materials for developers." /></Head><div className="min-h-screen bg-mist text-ink dark:bg-[#0d1220] dark:text-slate-100"><header className="mx-auto flex max-w-7xl justify-end px-4 py-3 sm:px-6"><ThemeToggle /></header><main className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 sm:pb-8"><EnglishReader items={items} /></main></div></>
}

export const getStaticProps: GetStaticProps = async () => ({ props: { items: getEnglishItems() } })
