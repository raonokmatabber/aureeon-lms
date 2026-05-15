'use client'
import { useState } from 'react'

const messages = [
  { id: '1', from: 'Dr. Hasan Al-Amin', course: 'CS101', subject: 'Office Hours Change This Week', body: 'Dear students, I wanted to let you know that office hours this week will be moved to Friday 2-4pm instead of the usual Thursday slot. Please plan accordingly. If you have any urgent questions, feel free to email me.', time: '2h ago', read: false, avatar: 'H', color: '#6C63FF' },
  { id: '2', from: 'Prof. Farzana Begum', course: 'MATH202', subject: 'Homework Set 6 — Due Reminder', body: 'This is a reminder that Homework Set 6 is due this Thursday at midnight. Please make sure to submit via the assignments portal. Late submissions will not be accepted without prior approval.', time: '5h ago', read: false, avatar: 'F', color: '#43CFAA' },
  { id: '3', from: 'Aureeon System', course: 'System', subject: 'Your Midterm Grade is Available', body: 'Your midterm exam for CS101 has been graded. You scored 138/150. Please visit the Grades section to view detailed feedback from your instructor.', time: '1d ago', read: true, avatar: 'A', color: '#a09df5' },
  { id: '4', from: 'Ms. Sadia Rahman', course: 'ENG101', subject: 'Final Essay Guidelines Posted', body: 'The guidelines for the final essay have been posted in the course modules. Please review them carefully before starting your draft. The essay should be 1500-2000 words on a topic of your choice from the approved list.', time: '2d ago', read: true, avatar: 'S', color: '#FF6584' },
  { id: '5', from: 'Dr. Karim Uddin', course: 'PHY201', subject: 'Lab Report Feedback', body: 'I have reviewed your lab report submission. Overall good work, but please pay more attention to the error analysis section. I have left detailed comments in the document. Please revise and resubmit by next Monday.', time: '3d ago', read: true, avatar: 'K', color: '#FFB347' },
  { id: '6', from: 'Aureeon System', course: 'System', subject: 'New Course Material Available', body: 'New course materials have been uploaded for CS301 — Data Structures & Algorithms. Please check the modules section for Week 4 content including lecture slides and practice problems.', time: '4d ago', read: true, avatar: 'A', color: '#a09df5' },
]

export default function InboxPage() {
  const [selected, setSelected] = useState<typeof messages[0] | null>(null)
  const [readIds, setReadIds] = useState<Set<string>>(new Set(messages.filter(m => m.read).map(m => m.id)))
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const shown = filter === 'unread' ? messages.filter(m => !readIds.has(m.id)) : messages
  const unreadCount = messages.filter(m => !readIds.has(m.id)).length

  const openMessage = (msg: typeof messages[0]) => {
    setSelected(msg)
    setReadIds(prev => new Set([...prev, msg.id]))
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 16, height: 'calc(100vh - 140px)' }}>

      {/* Message list */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 14, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

        {/* Header */}
        <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>Inbox</span>
            {unreadCount > 0 && <span style={{ background: 'var(--brand-primary)', color: '#fff', fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 99 }}>{unreadCount} new</span>}
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {(['all', 'unread'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                style={{ padding: '5px 12px', borderRadius: 99, border: `1px solid ${filter === f ? 'var(--border-strong)' : 'var(--border-subtle)'}`, background: filter === f ? 'rgba(108,99,255,0.12)' : 'transparent', color: filter === f ? '#a09df5' : 'var(--text-muted)', fontSize: 12, fontFamily: 'var(--font-body)', cursor: 'pointer', textTransform: 'capitalize' }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {shown.map(msg => {
            const isRead = readIds.has(msg.id)
            const isSelected = selected?.id === msg.id
            return (
              <div key={msg.id} onClick={() => openMessage(msg)}
                style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-subtle)', cursor: 'pointer', background: isSelected ? 'rgba(108,99,255,0.08)' : isRead ? 'transparent' : 'rgba(108,99,255,0.04)', transition: 'background 0.15s' }}
                onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-elevated)' }}
                onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = isRead ? 'transparent' : 'rgba(108,99,255,0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  {/* Avatar */}
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: msg.color + '22', border: `1px solid ${msg.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: msg.color, flexShrink: 0 }}>
                    {msg.avatar}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                      <span style={{ fontSize: 13, fontWeight: isRead ? 400 : 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 160 }}>{msg.from}</span>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)', flexShrink: 0, marginLeft: 8 }}>{msg.time}</span>
                    </div>
                    <div style={{ fontSize: 12, color: isRead ? 'var(--text-muted)' : 'var(--text-primary)', fontWeight: isRead ? 400 : 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: 2 }}>{msg.subject}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 10, color: msg.color, background: msg.color + '18', padding: '1px 6px', borderRadius: 99 }}>{msg.course}</span>
                      {!isRead && <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--brand-primary)' }} />}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Message detail */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 14, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {selected ? (
          <>
            {/* Detail header */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>{selected.subject}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: selected.color + '22', border: `1px solid ${selected.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: selected.color }}>
                  {selected.avatar}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{selected.from}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 11, color: selected.color, background: selected.color + '18', padding: '1px 6px', borderRadius: 99 }}>{selected.course}</span>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{selected.time}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
              <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.8 }}>{selected.body}</p>
            </div>

            {/* Reply box */}
            <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', gap: 10 }}>
                <input placeholder="Write a reply..." style={{ flex: 1, padding: '10px 14px', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 10, color: 'var(--text-primary)', fontFamily: 'var(--font-body)', fontSize: 13, outline: 'none' }}
                  onFocus={e => e.target.style.borderColor = 'var(--brand-primary)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border-subtle)'} />
                <button style={{ padding: '10px 18px', background: 'var(--brand-primary)', border: 'none', borderRadius: 10, color: '#fff', fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-body)', cursor: 'pointer' }}>
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <span style={{ fontSize: 48 }}>📬</span>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>Select a message</p>
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Choose a conversation from the left</p>
          </div>
        )}
      </div>
    </div>
  )
}