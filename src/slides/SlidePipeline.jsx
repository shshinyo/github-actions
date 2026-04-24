import { useState, useEffect } from 'react'

const stages = [
  { label:'Checkout', icon:'📥', status:'success', time:'2s' },
  { label:'Install',  icon:'📦', status:'success', time:'18s' },
  { label:'Lint',     icon:'🔍', status:'success', time:'8s' },
  { label:'Test',     icon:'🧪', status:'success', time:'34s' },
  { label:'Build',    icon:'🏗️',  status:'success', time:'21s' },
  { label:'SAST',     icon:'🛡️',  status:'running', time:'...' },
  { label:'Deploy',   icon:'🚀', status:'waiting', time:'-' },
  { label:'Smoke',    icon:'💨', status:'waiting', time:'-' },
]

const tips = [
  { title:'Cache dependencies aggressively', desc:'Use actions/cache with a composite key (OS + lockfile hash). Saves 60-80% install time on warm runs.', tag:'Performance' },
  { title:'Job matrix for parallel builds', desc:'Use strategy.matrix to test across Node 18/20/22 and ubuntu/windows simultaneously — no sequential waiting.', tag:'Speed' },
  { title:'Reusable workflows (.github/workflows)', desc:'Extract shared steps into reusable workflow files called with workflow_call. DRY principle for CI.', tag:'DRY' },
  { title:'Fail-fast & timeout guards', desc:'Set timeout-minutes on every job. Use fail-fast: false in matrix to collect all failures at once.', tag:'Reliability' },
]

export default function SlidePipeline() {
  const [activeStage, setActiveStage] = useState(null)
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setElapsed(e => e + 1), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{ height:'100%', overflow:'auto', display:'flex', flexDirection:'column', gap:14 }}>
      <div>
        <div className="tag tag-purple fade-up delay-1" style={{ marginBottom:8 }}>02 — Pipeline Architecture</div>
        <h2 className="section-title fade-up delay-2">CI/CD Pipeline — Deep Dive</h2>
        <p className="section-subtitle fade-up delay-3">Live simulation of a production pipeline with best practices</p>
      </div>

      {/* Pipeline visual */}
      <div className="card fade-up delay-2">
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
          <span style={{ fontSize:13, fontWeight:600 }}>🔄 Workflow Run #1842</span>
          <div style={{ display:'flex', gap:8, alignItems:'center' }}>
            <span className="badge badge-warning">⏱ {elapsed}s</span>
            <span className="badge badge-info">ubuntu-latest</span>
          </div>
        </div>
        <div className="pipeline">
          {stages.map((s, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center' }}>
              <div
                className="pipeline-stage"
                onClick={() => setActiveStage(activeStage === i ? null : i)}
                style={{ cursor:'pointer' }}
              >
                <div className={`pipeline-icon ${s.status}`} title={s.label}>
                  <span style={{ fontSize:18 }}>{s.icon}</span>
                </div>
                <span className="pipeline-label">{s.label}</span>
                <span style={{ fontSize:10, color: s.status === 'success' ? 'var(--accent-green)' : s.status === 'running' ? 'var(--accent-blue)' : 'var(--text-muted)', fontFamily:'var(--font-mono)' }}>{s.time}</span>
              </div>
              {i < stages.length - 1 && <span className="pipeline-arrow" style={{ color: s.status === 'success' ? 'var(--accent-green)' : 'var(--border)' }}>→</span>}
            </div>
          ))}
        </div>
        {activeStage !== null && (
          <div style={{ marginTop:12, padding:'10px 14px', background:'rgba(88,166,255,0.08)', borderRadius:'var(--radius)', border:'1px solid rgba(88,166,255,0.2)', fontSize:12, color:'var(--text-secondary)' }}>
            <strong style={{ color:'var(--accent-blue)' }}>{stages[activeStage].label}</strong> — Status: <span style={{ color: stages[activeStage].status === 'success' ? 'var(--accent-green)' : stages[activeStage].status === 'running' ? 'var(--accent-blue)' : 'var(--text-muted)' }}>{stages[activeStage].status}</span> | Time: {stages[activeStage].time}
          </div>
        )}
      </div>

      {/* Tips grid */}
      <div className="grid-2 fade-up delay-3" style={{ gap:10 }}>
        {tips.map((t, i) => (
          <div key={i} className="card card-sm" style={{ animationDelay:`${i*0.05}s` }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:4 }}>
              <div style={{ fontSize:13, fontWeight:700 }}>{t.title}</div>
              <span className="tag tag-blue" style={{ fontSize:10, flexShrink:0, marginLeft:8 }}>{t.tag}</span>
            </div>
            <div style={{ fontSize:11.5, color:'var(--text-secondary)', lineHeight:1.5 }}>{t.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
