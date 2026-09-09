import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="rounded-xl border border-slate-200 bg-white p-2 text-slate-500 transition hover:border-violet-200 hover:text-violet-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
    >
      <span className="hidden dark:block"><SunIcon /></span>
      <span className="block dark:hidden"><MoonIcon /></span>
    </button>
  )
}
