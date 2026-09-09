import '@/styles/globals.css'
import React from 'react'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'

export default function App({ Component, pageProps }: AppProps) {
  const Provider = ThemeProvider as React.ComponentType<React.PropsWithChildren<Record<string, unknown>>>
  return <Provider attribute="class" defaultTheme="light" enableSystem><Component {...pageProps} /></Provider>
}
