'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', badge: 0, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> },
  { label: 'My Courses', href: '/courses', badge: 0, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg> },
  { label: 'Assignments', href: '/assignments', badge: 3, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> },
  { label: 'Grades', href: '/grades', badge: 0, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
  { label: 'Calendar', href: '/calendar', badge: 0, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  { label: 'Inbox', href: '/inbox', badge: 5, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [pathname])

  const w = isMobile ? 240 : collapsed ? 64 : 240
  const show = isMobile ? mobileOpen : true

  const SidebarContent = () => (
    <aside style={{ width: 240, height: '100vh', background: 'var(--bg-surface)', borderRight: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', overflow: 'hidden', flexShrink: 0 }}>

      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '20px 14px 16px', borderBottom: '1px solid var(--border-subtle)', minHeight: 64 }}>
        <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,rgba(108,99,255,0.2),rgba(67,207,170,0.2))', border: '1px solid var(--border-default)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#6C63FF"/>
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#43CFAA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        {(!collapsed || isMobile) && (
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, background: 'linear-gradient(135deg,#6C63FF,#43CFAA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', whiteSpace: 'nowrap' }}>
            Aureeon
          </span>
        )}
        {!isMobile && (
          <button onClick={() => setCollapsed(!collapsed)} style={{ marginLeft: 'auto', width: 24, height: 24, border: 'none', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {collapsed ? <polyline points="9 18 15 12 9 6"/> : <polyline points="15 18 9 12 15 6"/>}
            </svg>
          </button>
        )}
        {isMobile && (
          <button onClick={() => setMobileOpen(false)} style={{ marginLeft: 'auto', width: 24, height: 24, border: 'none', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}>
        {(!collapsed || isMobile) && (
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--text-muted)', padding: '4px 10px 8px', display: 'block' }}>MAIN MENU</span>
        )}
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link key={item.href} href={item.href} title={collapsed && !isMobile ? item.label : undefined}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 10px', borderRadius: 10, color: active ? '#a09df5' : 'var(--text-secondary)', textDecoration: 'none', fontSize: 14, fontWeight: active ? 500 : 400, background: active ? 'rgba(108,99,255,0.12)' : 'transparent', position: 'relative', whiteSpace: 'nowrap', overflow: 'hidden', transition: 'background 0.15s, color 0.15s' }}>
              <span style={{ flexShrink: 0, display: 'flex', width: 20, height: 20, alignItems: 'center', justifyContent: 'center' }}>{item.icon}</span>
              {(!collapsed || isMobile) && <span style={{ flex: 1 }}>{item.label}</span>}
              {(!collapsed || isMobile) && item.badge > 0 && (
                <span style={{ background: 'var(--brand-primary)', color: '#fff', fontSize: 10, fontWeight: 600, padding: '1px 6px', borderRadius: 99, minWidth: 18, textAlign: 'center' }}>{item.badge}</span>
              )}
              {collapsed && !isMobile && item.badge > 0 && (
                <span className="pulse-dot" style={{ position: 'absolute', top: 8, right: 8, width: 7, height: 7, borderRadius: '50%', background: 'var(--brand-primary)' }} />
              )}
              {active && <span style={{ position: 'absolute', left: -8, top: '50%', transform: 'translateY(-50%)', width: 3, height: 20, borderRadius: '0 3px 3px 0', background: 'var(--brand-primary)' }} />}
            </Link>
          )
        })}
      </nav>

      {/* User card */}
      <div style={{ padding: '8px 8px 16px', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 10, borderRadius: 10, background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', cursor: 'pointer', justifyContent: collapsed && !isMobile ? 'center' : 'flex-start' }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#6C63FF,#43CFAA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>R</div>
          {(!collapsed || isMobile) && (
            <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Rafiq Islam</span>
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Student</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  )

  if (isMobile) {
    return (
      <>
        {/* Hamburger button */}
        <button
          onClick={() => setMobileOpen(true)}
          style={{ position: 'fixed', top: 14, left: 14, zIndex: 200, width: 36, height: 36, border: '1px solid var(--border-subtle)', borderRadius: 10, background: 'var(--bg-surface)', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>

        {/* Overlay */}
        {mobileOpen && (
          <div onClick={() => setMobileOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, backdropFilter: 'blur(2px)' }} />
        )}

        {/* Drawer */}
        <div style={{ position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 150, transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)', transition: 'transform 0.3s ease' }}>
          <SidebarContent />
        </div>
      </>
    )
  }

  return (
    <aside style={{ width: w, minWidth: w, height: '100vh', background: 'var(--bg-surface)', borderRight: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', transition: 'width 0.3s ease, min-width 0.3s ease', overflow: 'hidden', position: 'relative', zIndex: 50, flexShrink: 0 }}>
      <SidebarContent />
    </aside>
  )
}