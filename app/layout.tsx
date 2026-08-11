import type { Metadata } from 'next'
import { Playfair_Display, Source_Serif_4 } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { RevealNoScriptFallback } from '@/components/ui/reveal-noscript-fallback'

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-serif',
})

export const metadata: Metadata = {
  title: 'Dr. Akinola E. Morakinyo',
  description:
    'Economist, researcher, and columnist at Kennesaw State University. Papers, essays, and interactive research tools.',
}

const themeInit = `(function(){try{var t=localStorage.getItem('theme');document.documentElement.dataset.theme=t==='light'?'light':'dark'}catch(e){document.documentElement.dataset.theme='dark'}})()`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${playfair.variable} ${sourceSerif.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <RevealNoScriptFallback />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
