'use client'
import Link from 'next/link'

const stats = [
  { label: 'Active Courses', value: '6', delta: '+1 this week', color: '#6C63FF', icon: '📚' },
  { label: 'Assignments Due', value: '3', delta: 'Next: Tomorrow', color: '#FF6584', icon: '📋' },
  { label: 'Avg. Grade', value: '87%', delta: '↑ 4% this month', color: '#43CFAA', icon: '📈' },
  { label: 'Study Streak', value: '12', delta: 'days in a row 🔥', color: '#FFB347', icon: '⚡' },
]

const courses = [
  { id: '1', title: 'Introduction to Computer Science', instructor: 'Dr. Hasan Al-Amin', progress: 72, color: '#6C63FF', deadline: 'Quiz due Nov 12', done: 10, total: 14 },
  { id: '2', title: 'Calculus II', instructor: 'Prof. Farzana Begum', progress: 45, color: '#43CFAA', deadline: 'HW due Nov 14', done: 8, total: 18 },
  { id: '3', title: 'English Composition', instructor: 'Ms. Sadia Rahman', progress: 90, color: '#FF6584', deadline: 'Essay due Nov 20', done: 9, total: 10 },
  { id: '4', title: 'Physics I — Mechanics', instructor: 'Dr. Karim Uddin', progress: 33, color: '#FFB347', deadline: 'Lab report Nov 15', done: 7, total: 20 },
]

const deadlines = [
  { course: 'CS101', task: 'Quiz #4', due: 'Nov 12', urgent: true },
  { course: 'Calculus', task: 'Homework Set 6', due: 'Nov 14', urgent: true },
  { course: 'Physics', task: 'Lab Report', due: 'Nov 15', urgent: false },
  { course: 'English', task: 'Final Essay', due: 'Nov 20', urgent: false },
]

const activity = [
  { text: 'Calculus II — Midterm graded', detail: 'Score: 91/100', time: '2h ago', dot: '#43CFAA' },
  { text: 'CS101 — New announcement', detail: 'Office hours moved to Friday', time: '5h ago', dot: '#6C63FF' },
  { text: 'Physics Lab Report submitted', detail: 'Awaiting grade', time: '1d ago', dot: '#FFB347' },
  { text: 'English Essay — Graded', detail: 'Score: 88/100', time: '2d ago', dot: '#FF6584' },
]

export default function DashboardPage() {
  const h = new Date().getHours()
  const greet = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div>
      {/* Welcome */}
      <div style={{ background: 'linear-gradient(135deg,rgba(108,99,255,0.15),rgba(67,207,170,0.08))', border: '1px solid var(--border-default)', borderRadius: 16, padding: '28px 32px', marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>{greet},</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>Rafiq Islam 👋</h2>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>You have 3 assignments due this week. Keep it up!</p>
        </div>
        <span className="float" style={{ fontSize: 52, marginRight: 16 }}>📖</span>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 28 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 14, padding: '18px 20px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>{s.icon}</span>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: s.color, lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500, marginBottom: 2 }}>{s.label}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.delta}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main 2-col */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'start' }}>

        {/* Courses */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700 }}>My Courses</span>
            <Link href="/courses" style={{ fontSize: 12, color: 'var(--brand-primary)', textDecoration: 'none' }}>See all →</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {courses.map(c => (
              <Link key={c.id} href={`/courses/${c.id}`} style={{ display: 'flex', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 12, overflow: 'hidden', textDecoration: 'none', transition: 'border-color 0.2s, transform 0.15s' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'translateX(3px)'; el.style.borderColor = 'var(--border-default)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = ''; el.style.borderColor = 'var(--border-subtle)' }}>
                <div style={{ width: 4, background: c.color, flexShrink: 0 }} />
                <div style={{ padding: '14px 16px', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{c.title}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: c.color, flexShrink: 0, marginLeft: 8 }}>{c.progress}%</span>
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10 }}>{c.instructor}</p>
                  <div style={{ height: 4, background: 'var(--bg-elevated)', borderRadius: 99, overflow: 'hidden', marginBottom: 10 }}>
                    <div style={{ height: '100%', width: `${c.progress}%`, background: c.color, borderRadius: 99 }} />
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>⏰ {c.deadline}</span>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>✅ {c.done}/{c.total} modules</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right col */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Deadlines */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700 }}>Deadlines</span>
              <Link href="/calendar" style={{ fontSize: 12, color: 'var(--brand-primary)', textDecoration: 'none' }}>Calendar →</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {deadlines.map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, background: 'var(--bg-surface)', border: `1px solid ${d.urgent ? 'rgba(255,101,132,0.2)' : 'var(--border-subtle)'}` }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: d.urgent ? '#FF6584' : '#43CFAA', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>{d.course}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-primary)' }}>{d.task}</div>
                  </div>
                  <span style={{ fontSize: 12, color: d.urgent ? '#FF6584' : 'var(--text-muted)', fontWeight: d.urgent ? 600 : 400, flexShrink: 0 }}>{d.due}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity */}
          <div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, display: 'block', marginBottom: 12 }}>Recent Activity</span>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {activity.map((a, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 0', borderBottom: i < activity.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: a.dot, flexShrink: 0, marginTop: 4 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: 'var(--text-primary)' }}>{a.text}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{a.detail}</div>
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', flexShrink: 0 }}>{a.time}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}