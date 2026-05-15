'use client'
import Link from 'next/link'
import { useState } from 'react'

const courseData: Record<string, {
  id: string, title: string, code: string, instructor: string,
  color: string, progress: number, term: string, description: string,
  modules: { id: string, title: string, type: string, duration: string, completed: boolean, locked: boolean }[]
  announcements: { title: string, body: string, date: string }[]
}> = {
  '1': {
    id: '1', title: 'Introduction to Computer Science', code: 'CS101',
    instructor: 'Dr. Hasan Al-Amin', color: '#6C63FF', progress: 72, term: 'Fall 2024',
    description: 'An introduction to the intellectual enterprises of computer science and the art of programming.',
    modules: [
      { id: 'm1', title: 'Week 1 — What is Computer Science?', type: 'video', duration: '45 min', completed: true, locked: false },
      { id: 'm2', title: 'Week 2 — Scratch Programming', type: 'video', duration: '60 min', completed: true, locked: false },
      { id: 'm3', title: 'Week 3 — C Language Basics', type: 'video', duration: '75 min', completed: true, locked: false },
      { id: 'm4', title: 'Quiz #1 — Chapters 1-3', type: 'quiz', duration: '30 min', completed: true, locked: false },
      { id: 'm5', title: 'Week 4 — Arrays & Memory', type: 'video', duration: '60 min', completed: true, locked: false },
      { id: 'm6', title: 'Week 5 — Data Structures', type: 'video', duration: '90 min', completed: true, locked: false },
      { id: 'm7', title: 'Programming Assignment #1', type: 'assignment', duration: '—', completed: true, locked: false },
      { id: 'm8', title: 'Week 6 — Algorithms', type: 'video', duration: '75 min', completed: true, locked: false },
      { id: 'm9', title: 'Week 7 — Python Introduction', type: 'video', duration: '60 min', completed: true, locked: false },
      { id: 'm10', title: 'Midterm Exam', type: 'quiz', duration: '90 min', completed: true, locked: false },
      { id: 'm11', title: 'Week 8 — Web Development', type: 'video', duration: '75 min', completed: false, locked: false },
      { id: 'm12', title: 'Programming Assignment #2', type: 'assignment', duration: '—', completed: false, locked: false },
      { id: 'm13', title: 'Week 9 — SQL & Databases', type: 'video', duration: '60 min', completed: false, locked: true },
      { id: 'm14', title: 'Final Project', type: 'assignment', duration: '—', completed: false, locked: true },
    ],
    announcements: [
      { title: 'Office Hours Change', body: 'Office hours this week will be held on Friday 2-4pm instead of Thursday.', date: 'Nov 10' },
      { title: 'Midterm Grades Posted', body: 'Midterm exam grades have been posted. Please check your grades page.', date: 'Nov 5' },
    ]
  },
  '2': {
    id: '2', title: 'Calculus II', code: 'MATH202',
    instructor: 'Prof. Farzana Begum', color: '#43CFAA', progress: 45, term: 'Fall 2024',
    description: 'Continuation of Calculus I. Topics include integration techniques, sequences, series, and more.',
    modules: [
      { id: 'm1', title: 'Week 1 — Review of Integration', type: 'video', duration: '50 min', completed: true, locked: false },
      { id: 'm2', title: 'Homework Set 1', type: 'assignment', duration: '—', completed: true, locked: false },
      { id: 'm3', title: 'Week 2 — Integration by Parts', type: 'video', duration: '60 min', completed: true, locked: false },
      { id: 'm4', title: 'Week 3 — Trigonometric Integrals', type: 'video', duration: '55 min', completed: true, locked: false },
      { id: 'm5', title: 'Quiz #1', type: 'quiz', duration: '30 min', completed: false, locked: false },
      { id: 'm6', title: 'Week 4 — Sequences & Series', type: 'video', duration: '70 min', completed: false, locked: true },
    ],
    announcements: [
      { title: 'Homework Set 6 Due Soon', body: 'Reminder: Homework Set 6 is due November 14th at midnight.', date: 'Nov 11' },
    ]
  },
}

const typeIcon: Record<string, string> = {
  video: '🎬', quiz: '📝', assignment: '📋', reading: '📖'
}

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = courseData[params.id] ?? courseData['1']
  const [tab, setTab] = useState<'modules' | 'announcements' | 'grades'>('modules')
  const completed = course.modules.filter(m => m.completed).length

  return (
    <div>
      {/* Back */}
      <Link href="/courses" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none', marginBottom: 20, transition: 'color 0.15s' }}
        onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-primary)'}
        onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)'}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        Back to Courses
      </Link>

      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${course.color}22, ${course.color}08)`, border: `1px solid ${course.color}33`, borderRadius: 16, padding: '28px 32px', marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: course.color, background: course.color + '22', padding: '3px 10px', borderRadius: 99, letterSpacing: '0.05em' }}>{course.code}</span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{course.term}</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, lineHeight: 1.3 }}>{course.title}</h1>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>👨‍🏫 {course.instructor}</p>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 600 }}>{course.description}</p>
          </div>
          {/* Progress ring */}
          <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <svg width="100" height="100" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke={course.color + '22'} strokeWidth="8"/>
              <circle cx="50" cy="50" r="40" fill="none" stroke={course.color} strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(course.progress / 100) * 2 * Math.PI * 40} ${2 * Math.PI * 40}`}
                strokeDashoffset={2 * Math.PI * 40 * 0.25}/>
              <text x="50" y="45" textAnchor="middle" fill="#F0F0FF" fontSize="20" fontWeight="700" fontFamily="Syne,sans-serif">{course.progress}%</text>
              <text x="50" y="62" textAnchor="middle" fill="#9090B8" fontSize="10" fontFamily="DM Sans,sans-serif">complete</text>
            </svg>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{completed}/{course.modules.length} modules</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-subtle)', marginBottom: 20 }}>
        {(['modules', 'announcements', 'grades'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{ padding: '10px 20px', border: 'none', background: 'transparent', color: tab === t ? course.color : 'var(--text-muted)', fontSize: 14, fontFamily: 'var(--font-body)', fontWeight: tab === t ? 600 : 400, cursor: 'pointer', position: 'relative', textTransform: 'capitalize', transition: 'color 0.15s' }}>
            {t}
            {tab === t && <span style={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: 2, background: course.color, borderRadius: '2px 2px 0 0' }} />}
          </button>
        ))}
      </div>

      {/* Modules tab */}
      {tab === 'modules' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {course.modules.map((mod, i) => (
            <div key={mod.id}
              style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 12, background: 'var(--bg-surface)', border: `1px solid ${mod.completed ? course.color + '33' : 'var(--border-subtle)'}`, opacity: mod.locked ? 0.5 : 1, cursor: mod.locked ? 'not-allowed' : 'pointer', transition: 'border-color 0.2s, transform 0.15s' }}
              onMouseEnter={e => { if (!mod.locked) { (e.currentTarget as HTMLDivElement).style.transform = 'translateX(3px)'; (e.currentTarget as HTMLDivElement).style.borderColor = course.color + '55' }}}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ''; (e.currentTarget as HTMLDivElement).style.borderColor = mod.completed ? course.color + '33' : 'var(--border-subtle)' }}>
              {/* Number */}
              <span style={{ width: 28, height: 28, borderRadius: '50%', background: mod.completed ? course.color : 'var(--bg-elevated)', border: `2px solid ${mod.completed ? course.color : 'var(--border-default)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 11, fontWeight: 700, color: mod.completed ? '#fff' : 'var(--text-muted)' }}>
                {mod.completed ? '✓' : i + 1}
              </span>
              {/* Type icon */}
              <span style={{ fontSize: 18, flexShrink: 0 }}>{mod.locked ? '🔒' : typeIcon[mod.type]}</span>
              {/* Title */}
              <span style={{ flex: 1, fontSize: 14, color: mod.locked ? 'var(--text-muted)' : 'var(--text-primary)', fontWeight: 400 }}>{mod.title}</span>
              {/* Duration */}
              {mod.duration !== '—' && <span style={{ fontSize: 12, color: 'var(--text-muted)', flexShrink: 0 }}>{mod.duration}</span>}
              {/* Status */}
              {mod.completed && <span style={{ fontSize: 11, color: course.color, background: course.color + '15', padding: '2px 8px', borderRadius: 99, flexShrink: 0 }}>Done</span>}
              {!mod.completed && !mod.locked && <span style={{ fontSize: 11, color: '#FFB347', background: 'rgba(255,179,71,0.12)', padding: '2px 8px', borderRadius: 99, flexShrink: 0 }}>Start</span>}
            </div>
          ))}
        </div>
      )}

      {/* Announcements tab */}
      {tab === 'announcements' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {course.announcements.map((a, i) => (
            <div key={i} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: '18px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>{a.title}</span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{a.date}</span>
              </div>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{a.body}</p>
            </div>
          ))}
        </div>
      )}

      {/* Grades tab */}
      {tab === 'grades' && (
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: '20px' }}>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', textAlign: 'center', padding: '40px 0' }}>
            📊 Detailed grades available on the <Link href="/grades" style={{ color: course.color }}>Grades page</Link>
          </p>
        </div>
      )}
    </div>
  )
}