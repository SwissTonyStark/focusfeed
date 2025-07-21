import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FocusFeed - Tu fuente de contenido inteligente',
  description: 'Descubre contenido relevante y de alto valor con análisis de IA. Biblioteca de conocimiento personalizada con insights avanzados.',
  keywords: ['IA', 'Startups', 'Finanzas', 'Tecnología', 'Contenido', 'Análisis', 'Biblioteca de Conocimiento', 'Insights'],
  authors: [{ name: 'FocusFeed Team' }],
  metadataBase: new URL('http://192.168.1.163:3001'),
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'FocusFeed - Tu fuente de contenido inteligente',
    description: 'Descubre contenido relevante y de alto valor con análisis de IA',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FocusFeed - Tu fuente de contenido inteligente',
    description: 'Descubre contenido relevante y de alto valor con análisis de IA',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
} 