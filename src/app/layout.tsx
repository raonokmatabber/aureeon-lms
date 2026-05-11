import type { Metadata } from 'next'
import './globals.css'
import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'

export const metadata: Metadata = {
  title: 'Aureeon LMS',
  description: 'A better way to learn and teach.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
          <Sidebar />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--bg-base)' }}>
            <Topbar />
            <main style={{ flex: 1, overflowY: 'auto', padding: '28px 32px' }} className="page-enter">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}