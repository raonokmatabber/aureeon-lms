'use client'
import { usePathname } from 'next/navigation'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

const noShellRoutes = ['/login', '/signup']

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const noShell = noShellRoutes.includes(pathname)

  if (noShell) {
    return <>{children}</>
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--bg-base)' }}>
        <Topbar />
        <main style={{ flex: 1, overflowY: 'auto', padding: '28px 32px' }} className="page-enter">
          {children}
        </main>
      </div>
    </div>
  )
}