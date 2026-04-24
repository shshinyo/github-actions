import { useState, useEffect, useCallback } from 'react'
import SlideTitle from './slides/SlideTitle'
import SlideAutomation from './slides/SlideAutomation'
import SlideDocker from './slides/SlideDocker'
import SlideYAMLGuide from './slides/SlideYAMLGuide'
import SlideOverview from './slides/SlideOverview'
import SlidePipeline from './slides/SlidePipeline'
import SlidePostDeploy from './slides/SlidePostDeploy'
import SlideHealthCheck from './slides/SlideHealthCheck'
import SlideRollback from './slides/SlideRollback'
import SlideFeatureFlags from './slides/SlideFeatureFlags'
import SlideCanary from './slides/SlideCanary'
import SlideSecurity from './slides/SlideSecurity'
import SlideObservability from './slides/SlideObservability'
import SlideEnhancements from './slides/SlideEnhancements'
import SlideSummary from './slides/SlideSummary'

const SLIDES = [
  { id: 'title',         component: SlideTitle,         label: 'Intro' },
  { id: 'automation',    component: SlideAutomation,    label: 'Automation' },
  { id: 'docker',        component: SlideDocker,        label: 'Docker' },
  { id: 'yaml-guide',    component: SlideYAMLGuide,     label: 'YAML Guide' },
  { id: 'overview',      component: SlideOverview,      label: 'Architecture' },
  { id: 'pipeline',      component: SlidePipeline,      label: 'Pipeline' },
  { id: 'postdeploy',    component: SlidePostDeploy,    label: 'Post-Deploy' },
  { id: 'health',        component: SlideHealthCheck,   label: 'Health Checks' },
  { id: 'rollback',      component: SlideRollback,      label: 'Rollback' },
  { id: 'flags',         component: SlideFeatureFlags,  label: 'Feature Flags' },
  { id: 'canary',        component: SlideCanary,        label: 'Canary' },
  { id: 'security',      component: SlideSecurity,      label: 'Security' },
  { id: 'observability', component: SlideObservability, label: 'Observability' },
  { id: 'enhancements',  component: SlideEnhancements,  label: 'Enhancements' },
  { id: 'summary',       component: SlideSummary,       label: 'Summary' },
]

export default function App() {
  const [cur, setCur] = useState(0)
  const [key, setKey] = useState(0)
  const total = SLIDES.length

  const go = useCallback((idx) => {
    if (idx < 0 || idx >= total) return
    setCur(idx)
    setKey(k => k + 1)
  }, [total])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') go(cur + 1)
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')  go(cur - 1)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [cur, go])

  const Slide = SLIDES[cur].component
  const pct = (cur / (total - 1)) * 100

  return (
    <div style={{ width:'100vw', height:'100vh', display:'flex', flexDirection:'column', background:'var(--bg-primary)', overflow:'hidden' }}>
      {/* Nav */}
      <div className="nav-bar" style={{ margin:'12px 24px 0', flexShrink:0 }}>
        <div className="nav-logo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          GitHub Actions — Developer Automation & Post-Deployment
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:14, flex:1, margin:'0 24px' }}>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width:`${pct}%` }} />
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <button className="nav-btn" onClick={() => go(cur - 1)} disabled={cur === 0}>← Prev</button>
          <span className="slide-counter">{cur + 1} / {total}</span>
          <button className="nav-btn" onClick={() => go(cur + 1)} disabled={cur === total - 1}>Next →</button>
        </div>
      </div>

      {/* Slide dots */}
      <div style={{ display:'flex', justifyContent:'center', gap:5, margin:'7px 0 0', flexShrink:0, flexWrap:'wrap', padding:'0 20px' }}>
        {SLIDES.map((s, i) => (
          <button key={s.id} onClick={() => go(i)} title={s.label}
            style={{ width: i === cur ? 22 : 8, height:8, borderRadius:4, border:'none', cursor:'pointer', background: i === cur ? 'var(--accent-blue)' : i < cur ? 'var(--accent-green)' : 'var(--border)', transition:'all 0.3s ease', padding:0 }}
          />
        ))}
      </div>

      {/* Slide label */}
      <div style={{ textAlign:'center', fontSize:11, color:'var(--text-muted)', marginTop:4, flexShrink:0 }}>
        {SLIDES[cur].label}
      </div>

      {/* Slide */}
      <div style={{ flex:1, overflow:'hidden', padding:'8px 24px 16px' }}>
        <Slide key={key} />
      </div>
    </div>
  )
}
