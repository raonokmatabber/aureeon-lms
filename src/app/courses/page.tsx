'use client'
import Link from 'next/link'
import { useState } from 'react'

const courses = [
  { id: '1', title: 'Introduction to Computer Science', code: 'CS101', instructor: 'Dr. Hasan Al-Amin', progress: 72, color: '#6C63FF', students: 234, done: 10, total: 14, term: 'Fall 2024' },
  { id: '2', title: 'Calculus II', code: 'MATH202', instructor: 'Prof. Farzana Begum', progress: 45, color: '#43CFAA', students: 189, done: 8, total: 18, term: 'Fall 2024' },
  { id: '3', title: 'English Composition', code: 'ENG101', instructor: 'Ms. Sadia Rahman', progress: 90, color: '#FF6584', students: 145, done: 9, total: 10, term: 'Fall 2024' },
  { id: '4', title: 'Physics I — Mechanics', code: 'PHY201', instructor: 'Dr. Karim Uddin', progress: 33, color: '#FFB347', students: 212, done: 7, total: 20, term: 'Fall 2024' },
  { id: '5', title: 'History of Modern Art', code: 'ART301', instructor: 'Dr. Nadia Islam', progress: 0, color: '#a09df5', students: 88, done: 0, total: 12, term: 'Spring 2025' },
  { id: '6', title: 'Data Structures & Algorithms', code: 'CS301', instructor: 'Prof. Imran Hossain', progress: 18, color: '#4FC3F7', students: 176, done: 4, total: 22, term: 'Fall 2024' },
]

const filters = ['All', 'In Progress', 'Completed', 'Not Started']

export default function CoursesPage() {
  const [filter, setFilter] = useState('All')

  const shown = courses.filter(c => {
    if (filter === 'In Progress') return c.progress > 0 && c.progress < 100
    if (filter === 'Completed') return c.progress === 100
    if (filter === 'Not Started') return c.progress === 0
    return true
  })

  return (
    <div>
      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: '7px 16px', borderRadius: 99, border: `1px solid ${filter === f ? 'var(--border-strong)' : 'var(--border-subtle)'}`, background: filter === f ? 'rgba(108,99,255,0.12)' : 'transparent', color: filter === f ? '#a09df5' : 'var(--text-secondary)', fontSize: 13, fontFamily: 'var(--font-body)', fontWeight: filter === f ? 500 : 400, cursor: 'pointer', transition: 'all 0.15s' }}>
            {f}
          </button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-muted)' }}>{shown.length} courses</span>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
        {shown.map(c => (
          <Link key={c.id} href={`/courses/${c.id}`}
            style={{ display: 'flex', flexDirection: 'column', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 14, overflow: 'hidden', textDecoration: 'none', transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s' }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'translateY(-3px)'; el.style.borderColor = 'var(--border-default)'; el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = ''; el.style.borderColor = 'var(--border-subtle)'; el.style.boxShadow = '' }}>

            {/* Header */}
            <div style={{ padding: '14px 16px', background: c.color + '18', borderBottom: `1px solid ${c.color}30`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: c.color, letterSpacing: '0.05em' }}>{c.code}</span>
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.term}</span>
            </div>

            {/* Body */}
            <div style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 4, lineHeight: 1.4 }}>{c.title}</h3>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 14 }}>{c.instructor}</p>

              {/* Progress */}
              <div style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Progress</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: c.color }}>{c.progress}%</span>
                </div>
                <div style={{ height: 5, background: 'var(--bg-elevated)', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${c.progress}%`, background: c.color, borderRadius: 99 }} />
                </div>
              </div>

              {/* Footer */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 'auto' }}>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>👥 {c.students}</span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>✅ {c.done}/{c.total}</span>
                <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 600, color: c.color }}>Enter →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}