import Head from 'next/head'
import type { GetStaticProps } from 'next'
import { LightningBoltIcon, ReaderIcon } from '@radix-ui/react-icons'
import { ThemeToggle } from '@/components/ThemeToggle'
import { EnglishReader } from '@/components/EnglishReader'
import { getEnglishItems, type EnglishItem } from '@/lib/english'

export default function Home({ items }: { items: EnglishItem[] }) {
  return <><Head><title>English Lab · Practical English for developers</title><meta name="description" content="A focused English learning library for developers and technical interviews." /></Head><div className="min-h-screen bg-mist text-ink dark:bg-[#0d1220] dark:text-slate-100"><header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-200 dark:shadow-none"><ReaderIcon width={20} height={20} /></div><div><p className="font-semibold tracking-tight">English Lab</p><p className="text-xs text-slate-500 dark:text-slate-400">Speak clearly. Work globally.</p></div></div><ThemeToggle /></header><section className="mx-auto max-w-7xl px-4 pb-6 pt-4 sm:px-6 sm:pb-8 sm:pt-8"><div className="max-w-2xl"><div className="mb-3 inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700 dark:bg-violet-950 dark:text-violet-300"><LightningBoltIcon /> Developer English</div><h2 className="text-3xl font-semibold leading-tight tracking-[-.04em] text-slate-900 dark:text-white sm:text-5xl">Build confidence for your next conversation.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400 sm:mt-4 sm:text-base sm:leading-7">Practical phrases, vocabulary, and dialogues for interviews, meetings, and everyday work.</p></div><div className="mt-6 sm:mt-8"><EnglishReader items={items} /></div></section></div></>
}

export const getStaticProps: GetStaticProps = async () => ({ props: { items: getEnglishItems() } })
