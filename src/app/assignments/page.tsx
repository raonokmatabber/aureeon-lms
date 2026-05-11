'use client'
import { useState } from 'react'

const data = [
  { id: '1', title: 'Programming Assignment #3 — Recursion', course: 'CS101', color: '#6C63FF', due: 'Nov 12, 2024', status: 'due', points: 100, score: null as number | null },
  { id: '2', title: 'Homework Set 6 — Integration by Parts', course: 'MATH202', color: '#43CFAA', due: 'Nov 14, 2024', status: 'due', points: 50, score: null as number | null },
  { id: '3', title: 'Lab Report — Pendulum Experiment', course: 'PHY201', color: '#FFB347', due: 'Nov 15, 2024', status: 'due', points: 75, score: null as number | null },
  { id: '4', title: 'Essay Draft — Modernism in Literature', course: 'ENG101', color: '#FF6584', due: 'Nov 20, 2024', status: 'upcoming', points: 120, score: null as number | null },
  { id: '5', title: 'Midterm Exam — Chapters 1-7', course: 'CS101', color: '#6C63FF', due: 'Oct 28, 2024', status: 'graded', points: 150, score: 138 },
  { id: '6', title: 'Problem Set 5', course: 'MATH202', color: '#43CFAA', due: 'Oct 25, 2024', status: 'graded', points: 50, score: 47 },
  { id: '7', title: 'Reading Response #2', course: 'ENG101', color: '#FF6584', due: 'Oct 20, 2024', status: 'graded', points: 30, score: 28 },
  { id: '8', title: 'Lab Report — Velocity & Acceleration', course: 'PHY201', color: '#FFB347', due: 'Oct 18, 2024', status: 'missing', points: 75, score: null as number | null },
]

const cfg: Record<string, { label: string; color: string; bg: string }> = {
  due:      { label: 'Due Soon', color: '#FF6584', bg: 'rgba(255,101,132,0.1)' },
  upcoming: { label: 'Upcoming', color: '#FFB347', bg: 'rgba(255,179,71,0.1)'  },
  graded:   { label: 'Graded',   color: '#43CFAA', bg: 'rgba(67,207,170,0.1)'  },
  missing:  { label: 'Missing',  color: '#FF4444', bg: 'rgba(255,68,68,0.1)'   },
}

export default function AssignmentsPage() {
  const [filter, setFilter] = useState('All')

  const shown = filter === 'All' ? data : data.filter(a => a.status === filter.toLowerCase())

  const grouped: Record<string, typeof data> = {}
  shown.forEach(a => {
    if (!grouped[a.status]) grouped[a.status] = []
    grouped[a.status].push(a)
  })

  return (
    <div>
      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 24 }}>
        {Object.entries(cfg).map(([s, c]) => (
          <div key={s} style={{ padding: '14px 16px', borderRadius: 12, background: c.bg, border: `1px solid ${c.color}33` }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: c.color, lineHeight: 1, marginBottom: 4 }}>
              {data.filter(a => a.status === s).length}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{c.label}</div>
          </div>
        ))}
      </div>

      {/* Filter pills */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {['All', 'Due', 'Upcoming', 'Graded', 'Missing'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ padding: '7px 14px', borderRadius: 99, border: `1px solid ${filter === f ? 'var(--border-strong)' : 'var(--border-subtle)'}`, background: filter === f ? 'rgba(108,99,255,0.12)' : 'transparent', color: filter === f ? '#a09df5' : 'var(--text-secondary)', fontSize: 13, fontFamily: 'var(--font-body)', cursor: 'pointer', transition: 'all 0.15s' }}>
            {f}
          </button>
        ))}
      </div>

      {/* Grouped list */}
      {Object.entries(grouped).map(([status, items]) => {
        const c = cfg[status]
        return (
          <div key={status} style={{ marginBottom: 28 }}>
            {/* Group header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: c.color }} />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600 }}>{c.label}</span>
              <span style={{ fontSize: 11, background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)', padding: '1px 7px', borderRadius: 99 }}>
                {items.length}
              </span>
            </div>

            {/* Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {items.map(a => (
                <div key={a.id}
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, transition: 'border-color 0.2s, transform 0.15s', cursor: 'default' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = 'var(--border-default)'; el.style.transform = 'translateX(2px)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = 'var(--border-subtle)'; el.style.transform = '' }}>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, flex: 1, minWidth: 0 }}>
                    {/* Checkbox */}
                    <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${a.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2, background: a.score !== null ? a.color + '22' : 'transparent' }}>
                      {a.score !== null && (
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={a.color} strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      )}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {a.title}
                      </div>
                      <div style={{ display: 'flex', gap: 8, marginTop: 3, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: a.color }}>{a.course}</span>
                        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>· Due {a.due}</span>
                        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>· {a.points} pts</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    {a.score !== null && (
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: a.score / a.points >= 0.9 ? '#43CFAA' : '#FFB347' }}>
                        {a.score}/{a.points}
                      </span>
                    )}
                    <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 99, color: c.color, background: c.bg }}>
                      {c.label}
                    </span>
                    {status === 'due' && (
                      <button style={{ padding: '7px 14px', border: 'none', borderRadius: 8, background: a.color, color: '#fff', fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-body)', cursor: 'pointer' }}>
                        Submit
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}