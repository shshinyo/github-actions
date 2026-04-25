const pillars = [
  {
    icon:'🔄', title:'Automate Everything',
    points:['Zero manual steps in CI/CD', 'Auto-rollback on failure', 'Semantic versioning + changelogs', 'PR environment lifecycle'],
    color:'blue'
  },
  {
    icon:'🛡️', title:'Security First',
    points:['OIDC over long-lived secrets', 'SAST + dependency scanning every PR', 'Environment protection rules', 'Least-privilege IAM for runners'],
    color:'red'
  },
  {
    icon:'📊', title:'Observe Everything',
    points:['Annotate deploys in monitoring tools', 'SLO dashboards with error budgets', 'Structured JSON logging + correlation IDs', 'Alert with runbook links only'],
    color:'orange'
  },
  {
    icon:'🎯', title:'Release Safely',
    points:['Feature flags decouple deploy/release', 'Canary before full rollout', 'Smoke tests gate every deploy', 'Rollback strategy defined upfront'],
    color:'green'
  },
]

const colorMap = { blue:'var(--accent-blue)', red:'var(--accent-red)', orange:'var(--accent-orange)', green:'var(--accent-green)' }
const tagMap   = { blue:'tag-blue', red:'tag-red', orange:'tag-orange', green:'tag-green' }

export default function SlideSummary() {
  return (
    <div style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column', gap:16, position:'relative', overflow:'hidden' }}>
      <div className="title-bg"><div className="title-bg-grid" /><div className="title-bg-glow" /></div>

      <div style={{ position:'relative', zIndex:1, display:'flex', flexDirection:'column', gap:16, height:'100%' }}>
        <div>
          <div className="tag tag-green fade-up delay-1" style={{ marginBottom:8 }}>11 — Summary</div>
          <h2 className="section-title fade-up delay-2">The 4 Pillars of Deployment Excellence</h2>
          <p className="section-subtitle fade-up delay-3">What separates a good CI/CD pipeline from a great one</p>
        </div>

        <div className="grid-2 fade-up delay-2" style={{ gap:14, flex:1 }}>
          {pillars.map((p, i) => (
            <div key={i} className="card" style={{ borderTop:`3px solid ${colorMap[p.color]}`, animationDelay:`${i*0.05}s` }}>
              <div style={{ display:'flex', gap:12, alignItems:'center', marginBottom:16 }}>
                <span style={{ fontSize:32 }}>{p.icon}</span>
                <div>
                  <div style={{ fontSize:18, fontWeight:800 }}>{p.title}</div>
                  <span className={`tag ${tagMap[p.color]}`} style={{ fontSize:12 }}>{p.color}</span>
                </div>
              </div>
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:6 }}>
                {p.points.map((pt, j) => (
                  <li key={j} style={{ display:'flex', gap:10, alignItems:'flex-start', fontSize:15, color:'var(--text-secondary)', lineHeight:1.4 }}>
                    <span style={{ color: colorMap[p.color], fontSize:14, flexShrink:0, fontWeight:700 }}>✓</span>{pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="fade-up delay-4 card card-sm" style={{ background:'rgba(88,166,255,0.06)', border:'1px solid rgba(88,166,255,0.2)', textAlign:'center' }}>
          <div style={{ fontSize:24, fontWeight:900, marginBottom:8 }}>
            🚀 <span className="glow-blue">Start small, automate incrementally, measure everything.</span>
          </div>
          <p style={{ fontSize:16, color:'var(--text-secondary)', lineHeight:1.6, maxWidth:800, margin:'0 auto' }}>
            A mature deployment pipeline is not built overnight. Pick one pillar, implement it well, measure the impact, then move to the next. GitHub Actions gives you all the building blocks — how you compose them defines your reliability.
          </p>
          <div style={{ display:'flex', justifyContent:'center', gap:16, marginTop:14 }}>
            {['github.com/features/actions','docs.github.com/actions','semver.org'].map(link => (
              <a key={link} href={`https://${link}`} target="_blank" rel="noopener noreferrer"
                style={{ fontSize:11, color:'var(--accent-blue)', fontFamily:'var(--font-mono)', textDecoration:'none' }}>
                🔗 {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
