const practices = [
  {
    icon:'✅', color:'green', title:'Smoke Tests After Deploy',
    desc:'Run a lightweight test suite immediately post-deploy that hits real endpoints. If 3+ assertions fail within 90s → auto-rollback triggers. Never trust a "deploy succeeded" message alone.',
    items:['HTTP 200 on /health', 'Auth token round-trip', 'DB connectivity probe', 'Critical user flow (login → dashboard)']
  },
  {
    icon:'🔔', color:'blue', title:'Deployment Notifications',
    desc:'Post structured deploy payloads to Slack/Teams with commit author, sha, diff link, and environment. Tag on-call engineer. Gives instant human awareness.',
    items:['Who deployed what & when', 'Commit SHA with GitHub link', 'Environment + region', 'Rollback button shortcut']
  },
  {
    icon:'📊', color:'orange', title:'Baseline Metric Capture',
    desc:'Record p50/p95/p99 latency, error rate, and CPU/memory before and after every deploy. Alert if any metric degrades >10% in the first 5 minutes.',
    items:['Pre-deploy baseline snapshot', 'Post-deploy metric delta', 'Alert on regression threshold', 'Dashboard auto-annotation']
  },
  {
    icon:'🏷️', color:'purple', title:'Semantic Release Tagging',
    desc:'Automate git tags (v1.2.3), CHANGELOG generation, and GitHub Releases using semantic-release or release-please. Every deploy = traceable artifact.',
    items:['Auto-bump MAJOR/MINOR/PATCH', 'CHANGELOG from commit msgs', 'GitHub Release with assets', 'Docker image tagged with git sha']
  },
  {
    icon:'🔒', color:'red', title:'Environment Protection Rules',
    desc:'Gate production deploys behind required reviewers, wait timers, and branch policies. Prevent accidental pushes to production from feature branches.',
    items:['Required reviewer approval', 'Wait timer (e.g. 5 min)', 'Branch restriction to main', 'Deployment environment secrets']
  },
  {
    icon:'🧹', color:'green', title:'Post-Deploy Cleanup',
    desc:'Automatically clean up PR environments, old container images (ECR lifecycle), and stale cache entries after each deployment cycle.',
    items:['Delete ephemeral PR envs', 'ECR image lifecycle policy', 'Clear stale GitHub caches', 'Prune old workflow artifacts']
  },
]

const colorMap = { green:'var(--accent-green)', blue:'var(--accent-blue)', orange:'var(--accent-orange)', purple:'var(--accent-purple)', red:'var(--accent-red)' }
const tagMap = { green:'tag-green', blue:'tag-blue', orange:'tag-orange', purple:'tag-purple', red:'tag-red' }

export default function SlidePostDeploy() {
  return (
    <div style={{ height:'100%', overflow:'auto', display:'flex', flexDirection:'column', gap:14 }}>
      <div>
        <div className="tag tag-orange fade-up delay-1" style={{ marginBottom:8 }}>03 — Post-Deployment</div>
        <h2 className="section-title fade-up delay-2">Post-Deployment Best Practices</h2>
        <p className="section-subtitle fade-up delay-3">What happens <em>after</em> the deploy is where most teams cut corners — don't</p>
      </div>

      <div className="grid-3 fade-up delay-2" style={{ gap:10 }}>
        {practices.map((p, i) => (
          <div key={i} className="card card-sm" style={{ animationDelay:`${i*0.04}s`, borderLeft:`3px solid ${colorMap[p.color]}` }}>
            <div style={{ display:'flex', gap:8, alignItems:'flex-start', marginBottom:6 }}>
              <span style={{ fontSize:20 }}>{p.icon}</span>
              <div>
                <div style={{ fontSize:13, fontWeight:700, marginBottom:2 }}>{p.title}</div>
                <span className={`tag ${tagMap[p.color]}`} style={{ fontSize:10 }}>{p.color}</span>
              </div>
            </div>
            <p style={{ fontSize:11.5, color:'var(--text-secondary)', lineHeight:1.5, marginBottom:8 }}>{p.desc}</p>
            <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:3 }}>
              {p.items.map((it, j) => (
                <li key={j} style={{ display:'flex', gap:6, alignItems:'center', fontSize:11, color:'var(--text-secondary)' }}>
                  <span style={{ color: colorMap[p.color], fontSize:10 }}>▸</span>{it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
