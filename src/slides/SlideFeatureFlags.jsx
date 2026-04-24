import { useState } from 'react'

const initialFlags = [
  { id:'new-checkout',    label:'New Checkout Flow',       enabled:false, rollout:0,   env:'production', risk:'high',   desc:'Completely redesigned checkout UX. Backed by A/B test data showing 12% higher conversion in staging.' },
  { id:'ai-search',       label:'AI-Powered Search',       enabled:true,  rollout:100, env:'production', risk:'medium', desc:'Semantic search using OpenAI embeddings. Currently serving 100% of users. Fallback to keyword search on error.' },
  { id:'dark-mode',       label:'Dark Mode (Beta)',         enabled:true,  rollout:25,  env:'production', risk:'low',    desc:'Opt-in dark mode toggle. Enabled for 25% of users as gradual rollout. No functional impact.' },
  { id:'loyalty-program', label:'Loyalty Points Program',  enabled:false, rollout:0,   env:'staging',    risk:'high',   desc:'Points-based loyalty system. DB schema changes required. Not yet deployed to production.' },
  { id:'new-api-v3',      label:'API v3 Endpoints',        enabled:true,  rollout:50,  env:'production', risk:'medium', desc:'New REST API with breaking changes hidden behind flag. 50% traffic routed to v3 with old v2 as fallback.' },
]

const riskColor = { high:'var(--accent-red)', medium:'var(--accent-orange)', low:'var(--accent-green)' }
const riskTag   = { high:'tag-red', medium:'tag-orange', low:'tag-green' }

export default function SlideFeatureFlags() {
  const [flags, setFlags] = useState(initialFlags)
  const [detail, setDetail] = useState(null)

  const toggle = (id) => setFlags(fs => fs.map(f => f.id === id ? { ...f, enabled: !f.enabled, rollout: !f.enabled ? 100 : 0 } : f))
  const setRollout = (id, val) => setFlags(fs => fs.map(f => f.id === id ? { ...f, rollout: Number(val), enabled: Number(val) > 0 } : f))

  return (
    <div style={{ height:'100%', overflow:'auto', display:'flex', flexDirection:'column', gap:14 }}>
      <div>
        <div className="tag tag-purple fade-up delay-1" style={{ marginBottom:8 }}>06 — Demo</div>
        <h2 className="section-title fade-up delay-2">Feature Flags & Gradual Rollout</h2>
        <p className="section-subtitle fade-up delay-3">Deploy code to production but control who sees it — decouple deploy from release</p>
      </div>

      <div className="grid-2 fade-up delay-2" style={{ gap:14 }}>
        {/* Flag control panel */}
        <div className="card" style={{ display:'flex', flexDirection:'column', gap:8 }}>
          <span style={{ fontWeight:700, fontSize:13, marginBottom:4 }}>🚩 Feature Flag Dashboard</span>
          {flags.map((f) => (
            <div key={f.id} style={{ padding:'10px 12px', background:'var(--bg-secondary)', borderRadius:'var(--radius)', border:`1px solid ${detail === f.id ? 'var(--accent-blue)' : 'var(--border)'}`, cursor:'pointer', transition:'all 0.2s' }}
              onClick={() => setDetail(detail === f.id ? null : f.id)}>
              <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                <label className="toggle-switch" onClick={e => e.stopPropagation()}>
                  <input type="checkbox" checked={f.enabled} onChange={() => toggle(f.id)} />
                  <div className="toggle-track" />
                  <div className="toggle-thumb" />
                </label>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:12.5, fontWeight:600, color: f.enabled ? 'var(--text-primary)' : 'var(--text-muted)' }}>{f.label}</div>
                  <div style={{ fontSize:10, color:'var(--text-muted)' }}>{f.env} · risk: <span style={{ color: riskColor[f.risk] }}>{f.risk}</span></div>
                </div>
                <span style={{ fontSize:12, fontFamily:'var(--font-mono)', color: f.enabled ? 'var(--accent-green)' : 'var(--text-muted)', width:42, textAlign:'right', flexShrink:0 }}>{f.rollout}%</span>
              </div>

              {detail === f.id && (
                <div style={{ marginTop:10, paddingTop:10, borderTop:'1px solid var(--border)' }}>
                  <p style={{ fontSize:11.5, color:'var(--text-secondary)', lineHeight:1.5, marginBottom:10 }}>{f.desc}</p>
                  <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                    <span style={{ fontSize:11, color:'var(--text-muted)', flexShrink:0 }}>Rollout:</span>
                    <input type="range" min={0} max={100} step={5} value={f.rollout} onClick={e => e.stopPropagation()}
                      onChange={e => setRollout(f.id, e.target.value)}
                      style={{ flex:1, accentColor:'var(--accent-blue)' }} />
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:11, width:36, textAlign:'right' }}>{f.rollout}%</span>
                  </div>
                  <div style={{ marginTop:8 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', fontSize:10, color:'var(--text-muted)', marginBottom:4 }}>
                      <span>Users receiving feature</span><span>{f.rollout}%</span>
                    </div>
                    <div className="meter">
                      <div className="meter-fill" style={{ width:`${f.rollout}%`, background: f.rollout > 50 ? 'var(--gradient-green)' : 'var(--gradient-blue)' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Explanation */}
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          <div className="card card-sm" style={{ borderLeft:'3px solid var(--accent-purple)' }}>
            <div style={{ fontWeight:700, fontSize:13, marginBottom:6 }}>🎯 Why Feature Flags?</div>
            {['Separate deploy from release — push code any time', 'Instant kill-switch without a hotfix deploy', 'A/B test with real users in production safely', 'Progressive rollout: 5% → 25% → 100%', 'Target specific users, regions, or segments'].map((t,i) => (
              <div key={i} style={{ display:'flex', gap:8, fontSize:12, color:'var(--text-secondary)', padding:'2px 0' }}>
                <span style={{ color:'var(--accent-purple)' }}>▸</span>{t}
              </div>
            ))}
          </div>
          <div className="card card-sm" style={{ borderLeft:'3px solid var(--accent-orange)' }}>
            <div style={{ fontWeight:700, fontSize:13, marginBottom:6 }}>⚙️ GitHub Actions Integration</div>
            <pre style={{ fontFamily:'var(--font-mono)', fontSize:10.5, color:'var(--text-secondary)', lineHeight:1.7, whiteSpace:'pre-wrap' }}>
{`- name: Set feature flag
  uses: launchdarkly/action@v1
  with:
    flag-key: new-checkout
    flag-value: 'true'
    rollout: '\${{ inputs.rollout }}'
    environment: production`}
            </pre>
          </div>
          <div className="card card-sm" style={{ background:'rgba(188,140,255,0.06)', border:'1px solid rgba(188,140,255,0.2)' }}>
            <div style={{ fontSize:12, color:'var(--text-secondary)', lineHeight:1.6 }}>
              💡 <strong style={{ color:'var(--accent-purple)' }}>Tools:</strong> LaunchDarkly, AWS AppConfig, Flagsmith, Unleash, or a simple DynamoDB/Redis-backed custom solution.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
