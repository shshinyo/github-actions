import { useState } from 'react'

const history = [
  { sha:'a3f8c21', msg:'feat: add checkout flow', env:'production', who:'@sarah', time:'14:32', status:'current' },
  { sha:'9b12e40', msg:'fix: cart total rounding', env:'production', who:'@mike', time:'11:15', status:'previous' },
  { sha:'4d7a1bc', msg:'chore: bump deps', env:'production', who:'@bot', time:'09:01', status:'old' },
  { sha:'e22f903', msg:'feat: add product search', env:'production', who:'@sarah', time:'Yesterday', status:'old' },
]

const strategies = [
  { title:'Immediate Rollback', icon:'⏮', desc:'Re-run the previous successful deployment workflow with the last good artifact. Zero code changes needed.', time:'~2 min', risk:'Low', best:'Any critical bug' },
  { title:'Git Revert PR', icon:'↩️', desc:'Create an automatic revert PR, merge with bypass rules. Gives a clear audit trail in git history.', time:'~5 min', risk:'Low', best:'Code-level bugs' },
  { title:'Database Migration Undo', icon:'🗃️', desc:'Run down() migrations if the deploy included schema changes. Must be tested in staging first.', time:'~10 min', risk:'High', best:'Schema rollback' },
  { title:'Traffic Shift (LB)', icon:'🔀', desc:'Shift load balancer traffic back to previous blue environment instantly. Works with blue/green deploy.', time:'< 30s', risk:'None', best:'Blue/Green deploy' },
]

export default function SlideRollback() {
  const [rollbackStep, setRollbackStep] = useState(null)
  const [done, setDone] = useState(false)
  const [selected, setSelected] = useState(null)

  const startRollback = async () => {
    setDone(false)
    for (let i = 0; i <= 4; i++) {
      await new Promise(r => setTimeout(r, 600))
      setRollbackStep(i)
    }
    setDone(true)
    setRollbackStep(null)
  }

  const steps = ['🔍 Detecting last good sha...', '📦 Fetching artifact #1841...', '🚀 Re-deploying v9b12e40...', '💨 Running smoke tests...', '✅ Rollback complete!']

  return (
    <div style={{ height:'100%', overflow:'auto', display:'flex', flexDirection:'column', gap:14 }}>
      <div>
        <div className="tag tag-red fade-up delay-1" style={{ marginBottom:8 }}>05 — Demo</div>
        <h2 className="section-title fade-up delay-2">Rollback Strategies</h2>
        <p className="section-subtitle fade-up delay-3">Know your rollback options before you need them — speed matters in incidents</p>
      </div>

      <div className="grid-2 fade-up delay-2" style={{ gap:14 }}>
        {/* Deploy history + rollback demo */}
        <div className="card" style={{ display:'flex', flexDirection:'column', gap:10 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4 }}>
            <span style={{ fontWeight:700, fontSize:13 }}>🕐 Deploy History</span>
            <button className="btn btn-danger" onClick={startRollback} disabled={rollbackStep !== null} style={{ fontSize:12, padding:'6px 12px' }}>
              {rollbackStep !== null ? '⏳ Rolling back...' : '🔄 Simulate Rollback'}
            </button>
          </div>

          {history.map((h, i) => (
            <div key={i} style={{ display:'flex', gap:10, alignItems:'center', padding:'8px 12px', background: h.status === 'current' ? 'rgba(248,81,73,0.08)' : h.status === 'previous' ? 'rgba(63,185,80,0.08)' : 'var(--bg-secondary)', borderRadius:'var(--radius)', border:`1px solid ${h.status === 'current' ? 'rgba(248,81,73,0.3)' : h.status === 'previous' ? 'rgba(63,185,80,0.3)' : 'var(--border)'}` }}>
              <code style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--accent-blue)', flexShrink:0 }}>{h.sha}</code>
              <span style={{ flex:1, fontSize:12, color:'var(--text-primary)' }}>{h.msg}</span>
              <span style={{ fontSize:11, color:'var(--text-muted)' }}>{h.who}</span>
              <span style={{ fontSize:11, color:'var(--text-muted)', flexShrink:0 }}>{h.time}</span>
              {h.status === 'current' && <span className="badge badge-danger">CURRENT 🔥</span>}
              {h.status === 'previous' && <span className="badge badge-success">TARGET ✓</span>}
            </div>
          ))}

          {/* Rollback progress */}
          {(rollbackStep !== null || done) && (
            <div style={{ marginTop:4 }}>
              {steps.slice(0, rollbackStep !== null ? rollbackStep + 1 : steps.length).map((s, i) => (
                <div key={i} style={{ display:'flex', gap:8, alignItems:'center', fontSize:12, padding:'3px 0', color: i === rollbackStep ? 'var(--accent-blue)' : 'var(--accent-green)' }}>
                  <span>{i === rollbackStep ? '⏳' : '✅'}</span> {s}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Strategy cards */}
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {strategies.map((s, i) => (
            <div key={i} className="card card-sm" onClick={() => setSelected(selected === i ? null : i)} style={{ cursor:'pointer', border:`1px solid ${selected === i ? 'var(--accent-blue)' : 'var(--border)'}`, transition:'all 0.2s' }}>
              <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                <span style={{ fontSize:20 }}>{s.icon}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:700 }}>{s.title}</div>
                  <div style={{ fontSize:11, color:'var(--text-muted)' }}>⏱ {s.time} · Risk: {s.risk}</div>
                </div>
                <span className="tag tag-blue" style={{ fontSize:10 }}>Best for: {s.best}</span>
              </div>
              {selected === i && <p style={{ fontSize:12, color:'var(--text-secondary)', marginTop:8, lineHeight:1.5, paddingTop:8, borderTop:'1px solid var(--border)' }}>{s.desc}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
