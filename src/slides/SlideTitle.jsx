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

export default function SlideTitle() {
  return (
    <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden' }}>
      <div className="title-bg">
        <div className="title-bg-grid" />
        <div className="title-bg-glow" />
        <div className="title-bg-glow2" />
      </div>

      <div style={{ position:'relative', zIndex:1, textAlign:'center', maxWidth:820 }}>
        <div className="fade-up delay-1" style={{ marginBottom:14 }}>
          <span className="tag tag-green" style={{ fontSize:11 }}>🤖 Developer Automation Platform</span>
        </div>

        <h1 className="fade-up delay-2" style={{ fontSize:50, fontWeight:900, letterSpacing:'-1.5px', lineHeight:1.05, marginBottom:14 }}>
          GitHub Actions
          <br />
          <span className="glow-blue">Beyond CI/CD</span>
        </h1>

        {/* Key message callout */}
        <div className="fade-up delay-3" style={{ display:'inline-block', marginBottom:18, padding:'10px 20px', background:'rgba(63,185,80,0.1)', border:'1px solid rgba(63,185,80,0.3)', borderRadius:'var(--radius-lg)' }}>
          <p style={{ fontSize:15, color:'var(--accent-green)', fontWeight:600, margin:0 }}>
            GitHub Actions is not just a CI/CD tool —<br />
            it's a <em>developer automation platform</em> for your entire workflow
          </p>
        </div>

        {/* Use case chips */}
        <div className="fade-up delay-3" style={{ display:'flex', justifyContent:'center', gap:8, flexWrap:'wrap', marginBottom:22 }}>
          {useCases.map(u => (
            <div key={u.label} style={{ display:'flex', alignItems:'center', gap:6, padding:'5px 12px', background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:'var(--radius)', fontSize:12 }}>
              <span>{u.icon}</span>
              <span style={{ fontWeight:600 }}>{u.label}</span>
              <span style={{ color:'var(--text-muted)', fontSize:11 }}>— {u.desc}</span>
            </div>
          ))}
        </div>

        <p className="fade-up delay-5" style={{ marginTop:20, fontSize:12, color:'var(--text-muted)' }}>Press → or arrow keys to navigate</p>
      </div>
    </div>
  )
}
