'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

const titles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/courses': 'My Courses',
  '/assignments': 'Assignments',
  '/grades': 'Grades',
  '/calendar': 'Calendar',
  '/inbox': 'Inbox',
}

export default function Topbar() {
  const pathname = usePathname()
  const [q, setQ] = useState('')
  const [focused, setFocused] = useState(false)
  const title = titles[pathname] ?? 'Aureeon LMS'

  return (
    <header style={{ height: 64, borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', padding: '0 28px', gap: 20, background: 'var(--bg-surface)', flexShrink: 0 }}>

      {/* Title */}
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 120 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
          {title}
        </span>
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
          Home {pathname !== '/dashboard' && `/ ${title}`}
        </span>
      </div>

      {/* Search */}
      <div style={{ flex: 1, maxWidth: 380, display: 'flex', alignItems: 'center', background: 'var(--bg-elevated)', border: `1px solid ${focused ? 'var(--brand-primary)' : 'var(--border-subtle)'}`, borderRadius: 10, padding: '0 12px', boxShadow: focused ? '0 0 0 3px rgba(108,99,255,0.1)' : 'none', transition: 'border-color 0.2s, box-shadow 0.2s' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search courses, assignments..."
          style={{ flex: 1, border: 'none', background: 'transparent', color: 'var(--text-primary)', fontFamily: 'var(--font-body)', fontSize: 13, padding: '9px 10px', outline: 'none' }}
        />
      </div>

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto' }}>
        {/* Bell */}
        <button style={{ width: 36, height: 36, borderRadius: 10, border: 'none', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 01-3.46 0"/>
          </svg>
          <span className="pulse-dot" style={{ position: 'absolute', top: 7, right: 7, width: 7, height: 7, borderRadius: '50%', background: 'var(--brand-secondary)', border: '2px solid var(--bg-surface)' }} />
        </button>

        {/* Divider */}
        <div style={{ width: 1, height: 24, background: 'var(--border-subtle)', margin: '0 4px' }} />

        {/* Avatar */}
        <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,#6C63FF,#43CFAA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', cursor: 'pointer' }}>
          R
        </div>
      </div>
    </header>
  )
}