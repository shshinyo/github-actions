const enhancements = [
  {
    category:'🚀 Deploy Speed',
    color:'blue',
    items:[
      { title:'Turborepo / Nx Remote Cache', desc:'Cache build outputs across CI runs. Monorepos go from 12min → 90s on cache hit. Free with Nx Cloud or self-hosted.' },
      { title:'Docker Layer Caching', desc:'Use --cache-from with ECR or GitHub Container Registry. Cuts image build time by 70%+ on incremental changes.' },
      { title:'Parallel Job Splitting', desc:'Split test suites across 4+ parallel runners using job matrices. Divide-and-conquer your test suite.' },
    ]
  },
  {
    category:'🧪 Test Quality',
    color:'green',
    items:[
      { title:'Test Flakiness Detection', desc:'Track flaky tests over time. Use retry logic (jest --testRetryCount=2) and quarantine chronic failures to unblock CI.' },
      { title:'Coverage Gating', desc:'Fail PRs that drop coverage below 80% using lcov + codecov. Block merge, not just report.' },
      { title:'Contract Testing (Pact)', desc:'Verify API consumer/provider contracts automatically without needing a running integration environment.' },
    ]
  },
  {
    category:'🏗️ Infrastructure',
    color:'orange',
    items:[
      { title:'Ephemeral PR Environments', desc:'Spin up a full-stack environment per PR using Terraform + Route53 wildcard DNS. Auto-destroy on PR close via workflow.' },
      { title:'Infrastructure Drift Detection', desc:'Schedule daily terraform plan to detect manual changes in AWS console. Alert on drift before it causes incidents.' },
      { title:'Multi-Region Deploy Orchestration', desc:'Deploy to us-east-1, then eu-west-1, then ap-southeast-1 sequentially with health checks between each region.' },
    ]
  },
  {
    category:'🔄 Workflow DX',
    color:'purple',
    items:[
      { title:'Self-Hosted Runners (ARM64)', desc:'Graviton3 self-hosted runners cost 60% less than GitHub-hosted. Pool them with GitHub ARC (Actions Runner Controller).' },
      { title:'Composite Actions as SDK', desc:'Package reusable steps (setup-node, assume-role, docker-build) as composite actions in a shared internal repo.' },
      { title:'Workflow Dispatch + Inputs', desc:'Build manual deployment triggers with typed inputs (environment, version, region) for on-demand or hotfix deploys.' },
    ]
  },
]

const colorMap = { blue:'var(--accent-blue)', green:'var(--accent-green)', orange:'var(--accent-orange)', purple:'var(--accent-purple)' }
const tagMap   = { blue:'tag-blue', green:'tag-green', orange:'tag-orange', purple:'tag-purple' }

export default function SlideEnhancements() {
  return (
    <div style={{ height:'100%', overflow:'auto', display:'flex', flexDirection:'column', gap:14 }}>
      <div>
        <div className="tag tag-purple fade-up delay-1" style={{ marginBottom:8 }}>10 — Enhancements</div>
        <h2 className="section-title fade-up delay-2">Advanced System Enhancements</h2>
        <p className="section-subtitle fade-up delay-3">Level up your deployment pipeline — from fast to elite</p>
      </div>

      <div className="grid-2 fade-up delay-2" style={{ gap:12, flex:1 }}>
        {enhancements.map((cat, i) => (
          <div key={i} className="card" style={{ borderLeft:`3px solid ${colorMap[cat.color]}` }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
              <span style={{ fontSize:20, fontWeight:800 }}>{cat.category}</span>
              <span className={`tag ${tagMap[cat.color]}`} style={{ fontSize:12 }}>{cat.color}</span>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {cat.items.map((item, j) => (
                <div key={j} style={{ padding:'12px 16px', background:'var(--bg-secondary)', borderRadius:'var(--radius)', border:'1px solid var(--border)' }}>
                  <div style={{ fontSize:16, fontWeight:800, marginBottom:4, color:'var(--text-primary)' }}>{item.title}</div>
                  <div style={{ fontSize:14.5, color:'var(--text-secondary)', lineHeight:1.5 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
