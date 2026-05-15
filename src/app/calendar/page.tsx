'use client'
import { useState } from 'react'

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

const events = [
  { date: '2024-11-12', title: 'CS101 Quiz #4', type: 'quiz', color: '#6C63FF' },
  { date: '2024-11-14', title: 'Calculus HW Set 6', type: 'assignment', color: '#43CFAA' },
  { date: '2024-11-15', title: 'Physics Lab Report', type: 'assignment', color: '#FFB347' },
  { date: '2024-11-18', title: 'CS101 Office Hours', type: 'event', color: '#6C63FF' },
  { date: '2024-11-20', title: 'English Final Essay', type: 'assignment', color: '#FF6584' },
  { date: '2024-11-22', title: 'Math Quiz #3', type: 'quiz', color: '#43CFAA' },
  { date: '2024-11-25', title: 'CS301 Project Due', type: 'assignment', color: '#4FC3F7' },
  { date: '2024-11-28', title: 'Thanksgiving Break', type: 'holiday', color: '#FFB347' },
  { date: '2024-12-05', title: 'CS101 Final Exam', type: 'exam', color: '#6C63FF' },
  { date: '2024-12-10', title: 'Calculus Final', type: 'exam', color: '#43CFAA' },
  { date: '2024-12-12', title: 'Physics Final', type: 'exam', color: '#FFB347' },
  { date: '2024-12-15', title: 'English Portfolio', type: 'assignment', color: '#FF6584' },
]

const typeConfig: Record<string, { label: string; icon: string }> = {
  quiz:       { label: 'Quiz',       icon: '📝' },
  assignment: { label: 'Assignment', icon: '📋' },
  exam:       { label: 'Exam',       icon: '📚' },
  event:      { label: 'Event',      icon: '📅' },
  holiday:    { label: 'Holiday',    icon: '🎉' },
}

export default function CalendarPage() {
  const today = new Date()
  const [year, setYear] = useState(2024)
  const [month, setMonth] = useState(10) // November = 10
  const [selected, setSelected] = useState<string | null>(null)

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrev = new Date(year, month, 0).getDate()

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1) } else setMonth(m => m - 1) }
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1) } else setMonth(m => m + 1) }

  const getEvents = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`
    return events.filter(e => e.date === dateStr)
  }

  const selectedEvents = selected ? events.filter(e => e.date === selected) : []

  const upcomingEvents = events
    .filter(e => new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 6)

  // Build calendar grid
  const cells: { day: number; currentMonth: boolean }[] = []
  for (let i = firstDay - 1; i >= 0; i--) cells.push({ day: daysInPrev - i, currentMonth: false })
  for (let i = 1; i <= daysInMonth; i++) cells.push({ day: i, currentMonth: true })
  while (cells.length % 7 !== 0) cells.push({ day: cells.length - daysInMonth - firstDay + 1, currentMonth: false })

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24, alignItems: 'start' }}>

      {/* Calendar */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 16, overflow: 'hidden' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)' }}>
          <button onClick={prevMonth} style={{ width: 32, height: 32, border: '1px solid var(--border-subtle)', borderRadius: 8, background: 'var(--bg-elevated)', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
            {MONTHS[month]} {year}
          </h2>
          <button onClick={nextMonth} style={{ width: 32, height: 32, border: '1px solid var(--border-subtle)', borderRadius: 8, background: 'var(--bg-elevated)', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>

        {/* Day headers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', borderBottom: '1px solid var(--border-subtle)' }}>
          {DAYS.map(d => (
            <div key={d} style={{ padding: '10px 0', textAlign: 'center', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>{d}</div>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)' }}>
          {cells.map((cell, i) => {
            const dateStr = cell.currentMonth ? `${year}-${String(month+1).padStart(2,'0')}-${String(cell.day).padStart(2,'0')}` : ''
            const dayEvents = cell.currentMonth ? getEvents(cell.day) : []
            const isToday = cell.currentMonth && cell.day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
            const isSelected = dateStr === selected

            return (
              <div key={i}
                onClick={() => cell.currentMonth && setSelected(isSelected ? null : dateStr)}
                style={{ minHeight: 80, padding: '8px 6px', borderRight: (i + 1) % 7 !== 0 ? '1px solid var(--border-subtle)' : 'none', borderBottom: i < cells.length - 7 ? '1px solid var(--border-subtle)' : 'none', cursor: cell.currentMonth ? 'pointer' : 'default', background: isSelected ? 'rgba(108,99,255,0.08)' : 'transparent', transition: 'background 0.15s' }}
                onMouseEnter={e => { if (cell.currentMonth && !isSelected) (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-elevated)' }}
                onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = 'transparent' }}>

                {/* Day number */}
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: isToday ? 'var(--brand-primary)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: isToday ? 700 : 400, color: isToday ? '#fff' : cell.currentMonth ? 'var(--text-primary)' : 'var(--text-muted)', marginBottom: 4 }}>
                  {cell.day}
                </div>

                {/* Events */}
                {dayEvents.slice(0, 2).map((ev, ei) => (
                  <div key={ei} style={{ fontSize: 10, padding: '2px 5px', borderRadius: 4, background: ev.color + '22', color: ev.color, marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 500 }}>
                    {ev.title}
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', paddingLeft: 5 }}>+{dayEvents.length - 2} more</div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Right panel */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Selected day events */}
        {selected && (
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: 14, padding: '16px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>
              {new Date(selected + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h3>
            {selectedEvents.length === 0 ? (
              <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>No events this day</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {selectedEvents.map((ev, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, background: ev.color + '12', border: `1px solid ${ev.color}33` }}>
                    <span style={{ fontSize: 16 }}>{typeConfig[ev.type]?.icon}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{ev.title}</div>
                      <div style={{ fontSize: 11, color: ev.color, fontWeight: 500 }}>{typeConfig[ev.type]?.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Upcoming events */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 14, padding: '16px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>Upcoming</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {upcomingEvents.map((ev, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: ev.color, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ev.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{new Date(ev.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                </div>
                <span style={{ fontSize: 10, color: ev.color, background: ev.color + '18', padding: '2px 6px', borderRadius: 99, flexShrink: 0 }}>{typeConfig[ev.type]?.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 14, padding: '16px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>Legend</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {Object.entries(typeConfig).map(([type, cfg]) => (
              <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 14 }}>{cfg.icon}</span>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{cfg.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}