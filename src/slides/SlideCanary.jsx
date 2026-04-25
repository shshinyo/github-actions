import { useState } from 'react'

export default function SlideCanary() {
  const [trafficSplit, setTrafficSplit] = useState(10)
  const [phase, setPhase] = useState(0)

  const phases = [
    { label:'Deploy Canary (5%)', split:5 },
    { label:'Validate Metrics (25%)', split:25 },
    { label:'Expand to 50%', split:50 },
    { label:'Full Rollout (100%)', split:100 },
  ]

  const advancePhase = () => {
    if (phase < phases.length - 1) {
      const next = phase + 1
      setPhase(next)
      setTrafficSplit(phases[next].split)
    }
  }

  const reset = () => { setPhase(0); setTrafficSplit(10) }

  const errorRate    = trafficSplit < 50 ? (1.2 + trafficSplit * 0.02).toFixed(2) : (2.1).toFixed(2)
  const latencyP99   = trafficSplit < 50 ? Math.floor(120 + trafficSplit * 0.8) : 164
  const successRate  = (100 - errorRate).toFixed(1)

  const blueTraffic  = 100 - trafficSplit
  const greenTraffic = trafficSplit

  return (
    <div style={{ height:'100%', overflow:'auto', display:'flex', flexDirection:'column', gap:14 }}>
      <div>
        <div className="tag tag-green fade-up delay-1" style={{ marginBottom:8 }}>07 — Demo</div>
        <h2 className="section-title fade-up delay-2">Blue/Green & Canary Deployment</h2>
        <p className="section-subtitle fade-up delay-3">Gradually shift traffic to the new version — catch issues before full rollout</p>
      </div>

      <div className="grid-2 fade-up delay-2" style={{ gap:14 }}>
        {/* Traffic visualizer */}
        <div className="card" style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ fontWeight:700, fontSize:16 }}>🌊 Traffic Split (Load Balancer)</span>
            <div style={{ display:'flex', gap:6 }}>
              <button className="btn btn-outline" onClick={reset} style={{ fontSize:11, padding:'4px 10px' }}>Reset</button>
              <button className="btn btn-success" onClick={advancePhase} disabled={phase === phases.length-1} style={{ fontSize:11, padding:'4px 10px' }}>
                {phase < phases.length-1 ? `→ ${phases[phase+1].label}` : '✅ Full Rollout'}
              </button>
            </div>
          </div>

          {/* Phase indicator */}
          <div style={{ display:'flex', gap:4 }}>
            {phases.map((p, i) => (
              <div key={i} style={{ flex:1, height:4, borderRadius:2, background: i <= phase ? 'var(--accent-green)' : 'var(--border)', transition:'all 0.4s' }} title={p.label} />
            ))}
          </div>
          <div style={{ fontSize:15, color:'var(--accent-green)', fontWeight:700 }}>Phase {phase+1}/{phases.length}: {phases[phase].label}</div>

          {/* Visual traffic bars */}
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            <div>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:15, marginBottom:8 }}>
                <span style={{ color:'var(--accent-blue)', fontWeight:700 }}>🔵 Blue (v1.2 — Stable)</span>
                <span style={{ fontFamily:'var(--font-mono)', color:'var(--accent-blue)' }}>{blueTraffic}%</span>
              </div>
              <div className="meter" style={{ height:28, background:'rgba(88,166,255,0.1)', borderRadius:'var(--radius)' }}>
                <div className="meter-fill" style={{ width:`${blueTraffic}%`, background:'linear-gradient(90deg, #1f6feb, #58a6ff)', borderRadius:'var(--radius)' }} />
              </div>
            </div>
            <div>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:15, marginBottom:8 }}>
                <span style={{ color:'var(--accent-green)', fontWeight:700 }}>🟢 Green (v1.3 — Canary)</span>
                <span style={{ fontFamily:'var(--font-mono)', color:'var(--accent-green)' }}>{greenTraffic}%</span>
              </div>
              <div className="meter" style={{ height:28, background:'rgba(63,185,80,0.1)', borderRadius:'var(--radius)' }}>
                <div className="meter-fill" style={{ width:`${greenTraffic}%`, background:'linear-gradient(90deg, #238636, #3fb950)', borderRadius:'var(--radius)' }} />
              </div>
            </div>
          </div>

          {/* Manual slider */}
          <div style={{ display:'flex', gap:8, alignItems:'center', paddingTop:4 }}>
            <span style={{ fontSize:11, color:'var(--text-muted)', flexShrink:0 }}>Manual:</span>
            <input type="range" min={0} max={100} step={5} value={trafficSplit} onChange={e => setTrafficSplit(+e.target.value)} style={{ flex:1, accentColor:'var(--accent-green)' }} />
            <span style={{ fontFamily:'var(--font-mono)', fontSize:11, width:40 }}>{trafficSplit}%</span>
          </div>
        </div>

        {/* Live metrics */}
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          <div className="grid-2" style={{ gap:10 }}>
            {[
              { label:'Error Rate', val:`${errorRate}%`, color: +errorRate > 2 ? 'var(--accent-red)' : 'var(--accent-green)', delta: +errorRate > 2 ? '▲ Alert' : '▼ OK' },
              { label:'p99 Latency', val:`${latencyP99}ms`, color: latencyP99 > 150 ? 'var(--accent-orange)' : 'var(--accent-green)', delta: latencyP99 > 150 ? '▲ Elevated' : '▼ Normal' },
              { label:'Success Rate', val:`${successRate}%`, color:'var(--accent-green)', delta:'' },
              { label:'Canary Traffic', val:`${greenTraffic}%`, color:'var(--accent-blue)', delta:'' },
            ].map((m, i) => (
              <div key={i} className="stat-card">
                <div className="stat-label">{m.label}</div>
                <div className="stat-value" style={{ color: m.color, fontSize:22 }}>{m.val}</div>
                {m.delta && <div className="stat-delta" style={{ color: m.color, fontSize:11 }}>{m.delta}</div>}
              </div>
            ))}
          </div>

          <div className="card card-sm" style={{ borderLeft:'3px solid var(--accent-green)' }}>
            <div style={{ fontWeight:700, fontSize:15, marginBottom:8 }}>🎯 Canary Decision Criteria</div>
            {['Error rate < 1% for 10 min window','p99 latency ≤ baseline + 20ms','No crash-level exceptions in Sentry','CPU/memory within normal bounds','Manual QA sign-off (optional)'].map((c, i) => (
              <div key={i} style={{ display:'flex', gap:10, fontSize:15, color:'var(--text-secondary)', padding:'3px 0' }}>
                <span style={{ color:'var(--accent-green)' }}>✓</span>{c}
              </div>
            ))}
          </div>

          <div className="card card-sm" style={{ background:'rgba(63,185,80,0.06)', border:'1px solid rgba(63,185,80,0.15)', fontSize:15, color:'var(--text-secondary)', lineHeight:1.6 }}>
            💡 Use <strong style={{ color:'var(--accent-green)' }}>AWS CodeDeploy</strong>, <strong style={{ color:'var(--accent-green)' }}>Argo Rollouts</strong>, or <strong style={{ color:'var(--accent-green)' }}>Kubernetes Gateway API</strong> to automate the shift via GitHub Actions.
          </div>
        </div>
      </div>
    </div>
  )
}
