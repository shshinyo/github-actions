const useCases = [
  { icon:'🔄', label:'CI/CD', desc:'Test, build, deploy' },
  { icon:'🤖', label:'PR Automation', desc:'Labels, reviews, merge' },
  { icon:'📦', label:'Release Mgmt', desc:'Changelog, tags, npm publish' },
  { icon:'🛡️', label:'Security', desc:'SAST, DAST, secret scanning' },
  { icon:'⏰', label:'Scheduled Jobs', desc:'Cron, backups, reports' },
  { icon:'🐳', label:'Docker Ops', desc:'Build, scan, push' },
  { icon:'📊', label:'Reporting', desc:'Velocity, audits, metrics' },
  { icon:'🔔', label:'Notifications', desc:'Slack, Teams, email' },
]

const agendaItems = [
  { id: 1, title: 'Automation Platform', desc: 'CI/CD, Dynamic Matrix, OIDC', color: '--accent-blue' },
  { id: 2, title: 'Container Excellence', desc: 'Secure Docker Ops, Multi-arch', color: '--accent-purple' },
  { id: 3, title: 'The Workflow', desc: 'Health Checks, Rollbacks', color: '--accent-green' },
  { id: 4, title: 'Security First', desc: 'SAST, DAST, Secret Scanning', color: '--accent-red' },
  { id: 5, title: 'Insights & Feedback', desc: 'Observability & Analytics', color: '--accent-orange' },
]

export default function SlideTitle() {
  return (
    <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden' }}>
      <div className="title-bg">
        <div className="title-bg-grid" />
        <div className="title-bg-glow" />
        <div className="title-bg-glow2" />
      </div>

      <div style={{ position:'relative', zIndex:1, textAlign:'center', maxWidth:900 }}>
        <div className="fade-up delay-1" style={{ marginBottom:16 }}>
          <span className="tag tag-green" style={{ fontSize:12, padding:'4px 14px' }}>🤖 Developer Automation Platform</span>
        </div>

        <h1 className="fade-up delay-2" style={{ fontSize:64, fontWeight:900, letterSpacing:'-2px', lineHeight:1.0, marginBottom:16 }}>
          GitHub Actions
          <br />
          <span className="glow-blue">Beyond CI/CD</span>
        </h1>

        <div className="fade-up delay-3" style={{ marginBottom:32 }}>
          <p style={{ fontSize:18, color:'var(--text-secondary)', fontWeight:500, margin:0, maxWidth:600, marginInline:'auto' }}>
            Transforming GitHub from a code host into a 
            <span style={{ color:'var(--text-primary)', fontWeight:700 }}> full-stack automation engine</span> for your entire SDLC.
          </p>
        </div>

        {/* Agenda Section */}
        <div className="fade-up delay-4" style={{ textAlign:'left', background:'rgba(22,27,34,0.6)', border:'1px solid var(--border)', borderRadius:'var(--radius-xl)', padding:'24px 32px', backdropFilter:'blur(10px)', marginBottom:32 }}>
          <h3 style={{ fontSize:14, textTransform:'uppercase', letterSpacing:'1px', color:'var(--text-muted)', marginBottom:16, fontWeight:700 }}>Presentation Agenda</h3>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px 32px' }}>
            {agendaItems.map((item, i) => (
              <div key={item.id} style={{ display:'flex', alignItems:'center', gap:16, borderBottom:'1px solid rgba(255,255,255,0.03)', paddingBottom:8 }}>
                <div style={{ fontSize:20, fontWeight:900, color:`var(${item.color})`, opacity:0.8, width:24 }}>{item.id}</div>
                <div>
                  <div style={{ fontSize:16, fontWeight:700, color:'var(--text-primary)' }}>{item.title}</div>
                  <div style={{ fontSize:13, color:'var(--text-muted)' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Use case chips (compact) */}
        <div className="fade-up delay-5" style={{ display:'flex', justifyContent:'center', gap:8, flexWrap:'wrap', opacity:0.6 }}>
          {useCases.map(u => (
            <div key={u.label} style={{ display:'flex', alignItems:'center', gap:6, padding:'4px 10px', background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:'var(--radius)', fontSize:11 }}>
              <span>{u.icon}</span>
              <span style={{ fontWeight:600 }}>{u.label}</span>
            </div>
          ))}
        </div>

        <p className="fade-up delay-5" style={{ marginTop:20, fontSize:12, color:'var(--text-muted)' }}>Press → or arrow keys to navigate</p>
      </div>
    </div>
  )
}
