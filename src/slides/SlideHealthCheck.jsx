import { useState, useEffect, useRef } from 'react'

const endpoints = [
  { path:'/health',        method:'GET',  expected:200, latency:12,  critical:true },
  { path:'/api/users/me',  method:'GET',  expected:200, latency:45,  critical:true },
  { path:'/api/products',  method:'GET',  expected:200, latency:88,  critical:false },
  { path:'/api/checkout',  method:'POST', expected:200, latency:132, critical:true },
  { path:'/metrics',       method:'GET',  expected:200, latency:8,   critical:false },
]

function StatusDot({ ok }) {
  return <span style={{ width:8, height:8, borderRadius:'50%', background: ok ? 'var(--accent-green)' : 'var(--accent-red)', display:'inline-block', boxShadow:`0 0 5px ${ok ? 'var(--accent-green)' : 'var(--accent-red)'}`, flexShrink:0 }} />
}

export default function SlideHealthCheck() {
  const [results, setResults] = useState([])
  const [running, setRunning] = useState(false)
  const [log, setLog] = useState([])
  const logRef = useRef(null)

  const addLog = (msg, type='info') => setLog(l => [...l, { msg, type, ts: new Date().toLocaleTimeString() }])

  const runChecks = async () => {
    setResults([]); setLog([]); setRunning(true)
    addLog('🏁 Starting post-deploy smoke tests...', 'info')
    for (let i = 0; i < endpoints.length; i++) {
      const ep = endpoints[i]
      await new Promise(r => setTimeout(r, 400 + Math.random() * 300))
      const ok = Math.random() > 0.2
      const jitter = Math.floor(ep.latency * (0.8 + Math.random() * 0.5))
      setResults(r => [...r, { ...ep, ok, latency: jitter }])
      addLog(`${ok ? '✅' : '❌'} ${ep.method} ${ep.path} → ${ok ? ep.expected : 500} (${jitter}ms)`, ok ? 'ok' : 'err')
    }
    addLog('🏁 Health check complete.', 'info')
    setRunning(false)
  }

  useEffect(() => { if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight }, [log])

  const allOk = results.length === endpoints.length && results.every(r => r.ok)
  const criticalFailed = results.filter(r => !r.ok && r.critical)

  return (
    <div style={{ height:'100%', overflow:'auto', display:'flex', flexDirection:'column', gap:14 }}>
      <div>
        <div className="tag tag-green fade-up delay-1" style={{ marginBottom:8 }}>04 — Demo</div>
        <h2 className="section-title fade-up delay-2">Health Check & Smoke Test Demo</h2>
        <p className="section-subtitle fade-up delay-3">Simulate post-deploy endpoint verification — the first line of defence</p>
      </div>

      <div className="grid-2 fade-up delay-2" style={{ gap:14, flex:1 }}>
        {/* Endpoint table */}
        <div className="card" style={{ display:'flex', flexDirection:'column', gap:10 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4 }}>
            <span style={{ fontWeight:700, fontSize:13 }}>Endpoints</span>
            <button className="btn btn-primary" onClick={runChecks} disabled={running} style={{ padding:'6px 14px', fontSize:12 }}>
              {running ? '⏳ Running...' : '▶ Run Checks'}
            </button>
          </div>
          {endpoints.map((ep, i) => {
            const r = results[i]
            return (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 12px', background:'var(--bg-secondary)', borderRadius:'var(--radius)', border:'1px solid var(--border)' }}>
                {r ? <StatusDot ok={r.ok} /> : <span style={{ width:8, height:8, borderRadius:'50%', background:'var(--text-muted)', display:'inline-block' }} />}
                <span style={{ fontFamily:'var(--font-mono)', fontSize:11.5, color:'var(--accent-blue)', width:40, flexShrink:0 }}>{ep.method}</span>
                <span style={{ fontFamily:'var(--font-mono)', fontSize:11.5, flex:1, color:'var(--text-primary)' }}>{ep.path}</span>
                {ep.critical && <span className="tag tag-red" style={{ fontSize:9 }}>CRITICAL</span>}
                {r && <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color: r.latency > 100 ? 'var(--accent-orange)' : 'var(--text-muted)', width:50, textAlign:'right', flexShrink:0 }}>{r.latency}ms</span>}
              </div>
            )
          })}

          {results.length === endpoints.length && (
            <div style={{ padding:'10px 14px', background: allOk ? 'rgba(63,185,80,0.1)' : 'rgba(248,81,73,0.1)', border:`1px solid ${allOk ? 'rgba(63,185,80,0.3)' : 'rgba(248,81,73,0.3)'}`, borderRadius:'var(--radius)', fontSize:13, fontWeight:600, color: allOk ? 'var(--accent-green)' : 'var(--accent-red)' }}>
              {allOk ? '✅ All checks passed — deploy is healthy!' : `🚨 ${criticalFailed.length} critical check(s) failed → Auto-rollback triggered!`}
            </div>
          )}
        </div>

        {/* Log output */}
        <div className="card" style={{ display:'flex', flexDirection:'column', gap:10 }}>
          <span style={{ fontWeight:700, fontSize:13 }}>📋 Workflow Log</span>
          <div className="log-terminal" ref={logRef} style={{ flex:1, minHeight:200 }}>
            {log.length === 0 && <span style={{ color:'var(--text-muted)' }}>Click "Run Checks" to start...</span>}
            {log.map((l, i) => (
              <div key={i} className="log-line">
                <span className="log-time">{l.ts}</span>
                <span className={l.type === 'ok' ? 'log-ok' : l.type === 'err' ? 'log-err' : 'log-info'}>{l.msg}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize:11.5, color:'var(--text-secondary)', lineHeight:1.6, padding:'8px 12px', background:'rgba(88,166,255,0.06)', borderRadius:'var(--radius)', border:'1px solid rgba(88,166,255,0.15)' }}>
            💡 In a real workflow: <code style={{ fontFamily:'var(--font-mono)', color:'var(--accent-cyan)' }}>if: failure() → trigger rollback job</code>
          </div>
        </div>
      </div>
    </div>
  )
}
