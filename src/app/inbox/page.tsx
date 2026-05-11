export default function InboxPage() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', flexDirection: 'column', gap: 16 }}>
      <span style={{ fontSize: 52 }}>📬</span>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>Inbox</p>
      <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Coming soon in Phase 3!</p>
    </div>
  )
}