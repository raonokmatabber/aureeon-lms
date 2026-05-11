'use client'

const courses = [
  { name: 'Intro to Computer Science', code: 'CS101', color: '#6C63FF', grade: 'A-', pct: 92, items: [{ n: 'PA#1', s: 95, m: 100 }, { n: 'PA#2', s: 88, m: 100 }, { n: 'Midterm', s: 138, m: 150 }, { n: 'PA#3', s: null, m: 100 }] },
  { name: 'Calculus II', code: 'MATH202', color: '#43CFAA', grade: 'B+', pct: 87, items: [{ n: 'HW#1', s: 48, m: 50 }, { n: 'HW#2', s: 44, m: 50 }, { n: 'Midterm', s: 82, m: 100 }, { n: 'HW#3', s: null, m: 50 }] },
  { name: 'English Composition', code: 'ENG101', color: '#FF6584', grade: 'A', pct: 95, items: [{ n: 'Essay 1', s: 88, m: 100 }, { n: 'Response 1', s: 28, m: 30 }, { n: 'Response 2', s: 29, m: 30 }, { n: 'Final Essay', s: null, m: 120 }] },
  { name: 'Physics I', code: 'PHY201', color: '#FFB347', grade: 'C+', pct: 76, items: [{ n: 'Lab 1', s: 70, m: 75 }, { n: 'Lab 2', s: null, m: 75 }, { n: 'Quiz 1', s: 22, m: 30 }, { n: 'Midterm', s: 68, m: 100 }] },
]

const gradeColor: Record<string, string> = {
  'A': '#43CFAA', 'A-': '#43CFAA',
  'B+': '#6C63FF', 'B': '#6C63FF',
  'C+': '#FFB347', 'C': '#FFB347',
}

export default function GradesPage() {
  const gpa = 3.42
  const r = 54, stroke = 8
  const circ = 2 * Math.PI * r
  const dash = (gpa / 4.0) * circ

  return (
    <div>
      {/* GPA Card */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 16, padding: '28px 32px', display: 'flex', alignItems: 'center', gap: 32, marginBottom: 28 }}>
        <svg width="140" height="140" viewBox="0 0 140 140" style={{ flexShrink: 0 }}>
          <defs>
            <linearGradient id="gpaGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6C63FF"/>
              <stop offset="100%" stopColor="#43CFAA"/>
            </linearGradient>
          </defs>
          <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(108,99,255,0.1)" strokeWidth={stroke}/>
          <circle cx="70" cy="70" r={r} fill="none" stroke="url(#gpaGrad)" strokeWidth={stroke} strokeLinecap="round"
            strokeDasharray={`${dash} ${circ}`} strokeDashoffset={circ * 0.25}/>
          <text x="70" y="63" textAnchor="middle" fill="#F0F0FF" fontSize="28" fontWeight="700" fontFamily="Syne,sans-serif">
            {gpa.toFixed(2)}
          </text>
          <text x="70" y="82" textAnchor="middle" fill="#9090B8" fontSize="12" fontFamily="DM Sans,sans-serif">
            GPA
          </text>
        </svg>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
            Cumulative GPA
          </h2>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
            Fall 2024 — 4 courses enrolled
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#43CFAA', background: 'rgba(67,207,170,0.1)', border: '1px solid rgba(67,207,170,0.2)', padding: '6px 12px', borderRadius: 8 }}>
            ✅ Good Academic Standing
          </div>
        </div>
      </div>

      {/* Course breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {courses.map(c => (
          <div key={c.code}
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 14, overflow: 'hidden', transition: 'border-color 0.2s' }}
            onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-default)'}
            onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-subtle)'}>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: c.color, flexShrink: 0 }} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 180 }}>
                    {c.name}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.code}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: c.color }}>
                  {c.pct}%
                </span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, padding: '4px 10px', borderRadius: 8, color: gradeColor[c.grade] ?? '#FFB347', background: (gradeColor[c.grade] ?? '#FFB347') + '22' }}>
                  {c.grade}
                </span>
              </div>
            </div>

            {/* Assignment rows */}
            <div style={{ padding: '14px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {c.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)', minWidth: 80, flexShrink: 0 }}>
                    {item.n}
                  </span>
                  {item.s !== null ? (
                    <>
                      <div style={{ flex: 1, height: 4, background: 'var(--bg-elevated)', borderRadius: 99, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${(item.s / item.m) * 100}%`, background: c.color, borderRadius: 99 }} />
                      </div>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)', minWidth: 50, textAlign: 'right', flexShrink: 0 }}>
                        {item.s}/{item.m}
                      </span>
                    </>
                  ) : (
                    <span style={{ fontSize: 11, color: 'var(--text-muted)', fontStyle: 'italic' }}>Pending</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}