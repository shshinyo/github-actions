import { useState, useEffect } from 'react'

const genMetric = (base, variance) => +(base + (Math.random() - 0.5) * variance).toFixed(2)

export default function SlideObservability() {
  const [metrics, setMetrics] = useState({ rps: 842, p99: 143, errRate: 0.82, cpu: 38, mem: 61, deploys: 7 })
  const [history, setHistory] = useState(Array.from({ length: 20 }, (_, i) => ({ t: i, val: 100 + Math.sin(i * 0.5) * 20 + Math.random() * 15 })))
  const [alerts, setAlerts] = useState([
    { id:1, sev:'warn',  msg:'p99 latency spiked to 210ms at 14:32 during deploy #1841', ts:'14:32' },
    { id:2, sev:'info',  msg:'Deploy #1842 started by @sarah — production environment', ts:'14:45' },
    { id:3, sev:'ok',    msg:'Smoke tests passed — all 5 endpoints healthy (p50: 42ms)', ts:'14:47' },
  ])

  useEffect(() => {
    const t = setInterval(() => {
      setMetrics({
        rps: Math.floor(genMetric(842, 80)),
        p99: Math.floor(genMetric(143, 30)),
        errRate: genMetric(0.82, 0.3),
        cpu: Math.floor(genMetric(38, 10)),
        mem: Math.floor(genMetric(61, 6)),
        deploys: 7,
      })
      setHistory(h => [...h.slice(1), { t: h[h.length-1].t + 1, val: 100 + Math.sin(Date.now() / 1000) * 20 + Math.random() * 15 }])
    }, 1500)
    return () => clearInterval(t)
  }, [])

  const sparkMax = Math.max(...history.map(h => h.val))
  const sparkMin = Math.min(...history.map(h => h.val))
  const toY = (v) => 44 - ((v - sparkMin) / (sparkMax - sparkMin || 1)) * 40

  const practices = [
    { icon:'📌', title:'Annotate Deploys', desc:'Send deploy events to Datadog/Grafana so you can correlate metric changes with releases instantly.', color:'blue' },
    { icon:'🔔', title:'Runbook Alerts', desc:'Every alert should link to a runbook. On-call engineers need context, not just "p99 > 200ms".', color:'orange' },
    { icon:'📊', title:'SLO Dashboards', desc:'Define SLO: 99.9% success rate, p99 < 200ms. Track error budget burn rate weekly.', color:'purple' },
    { icon:'🗂️', title:'Structured Logs', desc:'Use JSON logging with correlationId, userId, requestId. Makes Log Insights queries fast.', color:'green' },
  ]

  return (
    <div style={{ height:'100%', overflow:'auto', display:'flex', flexDirection:'column', gap:14 }}>
      <div>
        <div className="tag tag-blue fade-up delay-1" style={{ marginBottom:8 }}>09 — Observability</div>
        <h2 className="section-title fade-up delay-2">Observability & Notifications</h2>
        <p className="section-subtitle fade-up delay-3">Real-time metrics, alerts, and deploy annotations — live simulation</p>
      </div>

      {/* Metric cards */}
      <div className="grid-4 fade-up delay-2" style={{ gap:10 }}>
        {[
          { label:'Requests/sec', val: metrics.rps, color:'var(--accent-blue)', unit:'' },
          { label:'p99 Latency', val: metrics.p99, color: metrics.p99 > 180 ? 'var(--accent-orange)' : 'var(--accent-green)', unit:'ms' },
          { label:'Error Rate', val: metrics.errRate, color: metrics.errRate > 1 ? 'var(--accent-red)' : 'var(--accent-green)', unit:'%' },
          { label:'CPU Usage', val: metrics.cpu, color: metrics.cpu > 60 ? 'var(--accent-orange)' : 'var(--accent-green)', unit:'%' },
        ].map((m, i) => (
          <div key={i} className="stat-card">
            <div className="stat-label">{m.label}</div>
            <div className="stat-value" style={{ color: m.color, fontSize:24, fontFamily:'var(--font-mono)' }}>{m.val}{m.unit}</div>
            <div style={{ marginTop:6 }}>
              <div className="meter"><div className="meter-fill" style={{ width:`${Math.min(+m.val, 100)}%`, background: m.color }} /></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid-2 fade-up delay-3" style={{ gap:14 }}>
        {/* Sparkline */}
        <div className="card" style={{ display:'flex', flexDirection:'column', gap:8 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ fontWeight:700, fontSize:16 }}>📈 Request Rate (live)</span>
            <span className="badge badge-success"><span className="dot dot-green" style={{ marginRight:4 }} />Live</span>
          </div>
          <svg width="100%" height="50" viewBox={`0 0 ${history.length * 6} 50`} preserveAspectRatio="none">
            <defs>
              <linearGradient id="sg" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="var(--accent-blue)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={`M ${history.map((h, i) => `${i*6},${toY(h.val)}`).join(' L ')} L ${(history.length-1)*6},50 L 0,50 Z`} fill="url(#sg)" />
            <polyline points={history.map((h, i) => `${i*6},${toY(h.val)}`).join(' ')} fill="none" stroke="var(--accent-blue)" strokeWidth="1.5" />
          </svg>
          {/* Alerts */}
          <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
            {alerts.map(a => (
              <div key={a.id} style={{ display:'flex', gap:10, alignItems:'flex-start', fontSize:14.5, padding:'6px 10px', background:'var(--bg-secondary)', borderRadius:'var(--radius)', border:`1px solid ${a.sev === 'warn' ? 'rgba(210,153,34,0.3)' : a.sev === 'ok' ? 'rgba(63,185,80,0.2)' : 'var(--border)'}` }}>
                <span>{a.sev === 'warn' ? '⚠️' : a.sev === 'ok' ? '✅' : 'ℹ️'}</span>
                <span style={{ flex:1, color:'var(--text-secondary)', lineHeight:1.4 }}>{a.msg}</span>
                <span style={{ color:'var(--text-muted)', flexShrink:0, fontFamily:'var(--font-mono)', fontSize:12 }}>{a.ts}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Practices */}
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {practices.map((p, i) => (
            <div key={i} className="card card-sm" style={{ borderLeft:`3px solid var(--accent-${p.color})`, animationDelay:`${i*0.05}s` }}>
              <div style={{ display:'flex', gap:8, alignItems:'flex-start' }}>
                <span style={{ fontSize:28 }}>{p.icon}</span>
                <div>
                  <div style={{ fontSize:16, fontWeight:700, marginBottom:4 }}>{p.title}</div>
                  <div style={{ fontSize:14.5, color:'var(--text-secondary)', lineHeight:1.4 }}>{p.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
