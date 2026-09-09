import { MagnifyingGlassIcon, ReaderIcon } from '@radix-ui/react-icons'
import { useMemo, useState } from 'react'
import { cn } from '@/lib/utils'
import type { EnglishItem } from '@/lib/english'

interface Props { items: EnglishItem[]; selectedId: string; onSelect: (item: EnglishItem) => void }

export function EnglishSidebar({ items, selectedId, onSelect }: Props) {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => items.filter((item) =>
    `${item.title} ${item.fileName}`.toLowerCase().includes(query.toLowerCase())
  ), [items, query])

  return (
    <aside className="flex h-full min-h-0 flex-col">
      <div className="border-b border-slate-100 p-4 dark:border-slate-800">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
          <ReaderIcon className="text-violet-600" /> Course library
          <span className="ml-auto rounded-full bg-violet-50 px-2 py-0.5 text-xs text-violet-600 dark:bg-violet-950">{items.length}</span>
        </div>
        <label className="relative block">
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 text-slate-400" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search lessons..." className="w-full rounded-xl border-0 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none ring-1 ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-violet-400 dark:bg-slate-800 dark:ring-slate-700" />
        </label>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="h-full w-full p-2">
          <div className="space-y-1">
            {filtered.map((item, index) => (
              <button key={item.id} onClick={() => onSelect(item)} className={cn('w-full rounded-xl px-3 py-3 text-left transition', selectedId === item.id ? 'bg-violet-600 text-white shadow-lg shadow-violet-200 dark:shadow-none' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800')}>
                <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wider opacity-60">Lesson {String(index + 1).padStart(2, '0')}</span>
                <span className="block truncate text-sm font-medium">{item.title}</span>
                <span className="mt-1 block truncate text-xs opacity-60">{item.wordCount} words</span>
              </button>
            ))}
            {!filtered.length && <p className="px-3 py-8 text-center text-sm text-slate-400">No lessons found.</p>}
          </div>
        </div>
      </div>
    </aside>
  )
}
