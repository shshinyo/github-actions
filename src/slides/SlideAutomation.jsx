import { useState } from 'react'

const useCases = [
  {
    id:'cicd', icon:'🔄', title:'CI/CD Pipelines',
    trigger:'push / pull_request', color:'blue',
    desc:'The classic use case. Test → build → deploy on every push. But this is just the beginning.',
    examples:['npm test && npm run build','Deploy to AWS / GCP / Azure','Multi-environment promotion (dev → staging → prod)'],
    workflow:'ci-advanced.yml'
  },
  {
    id:'pr', icon:'🤖', title:'PR Automation',
    trigger:'pull_request / pull_request_review', color:'purple',
    desc:'Let robots handle the boring parts of code review.',
    examples:['Auto-label by file path or size','Conventional commit title enforcement','Dependabot auto-merge for patch updates','PR checklist comment on open'],
    workflow:'pr-automation.yml'
  },
  {
    id:'release', icon:'📦', title:'Release Management',
    trigger:'push (main)', color:'green',
    desc:'From commit to release note in one workflow — fully automated.',
    examples:['Semantic version bump from commit messages','Auto-generate CHANGELOG.md','Publish to npm with provenance','Trigger Docker build for the new version'],
    workflow:'release-automation.yml'
  },
  {
    id:'security', icon:'🛡️', title:'Security Automation',
    trigger:'push / schedule / PR', color:'red',
    desc:'Shift security left — catch vulnerabilities before they reach production.',
    examples:['CodeQL SAST on every PR','Dependency review blocks HIGH CVEs','Gitleaks secret scanning (full history)','OWASP ZAP DAST against staging API'],
    workflow:'security-scan.yml'
  },
  {
    id:'scheduled', icon:'⏰', title:'Scheduled Tasks (Cron Jobs)',
    trigger:'schedule (cron)', color:'orange',
    desc:'Replace your cron scripts. GitHub Actions is a hosted job scheduler.',
    examples:['Stale issue cleanup (daily 1am)','Weekly dependency audit + Slack report','TLS certificate expiry warnings','k6 performance baseline testing'],
    workflow:'scheduled-tasks.yml'
  },
  {
    id:'docker', icon:'🐳', title:'Docker Ops',
    trigger:'push / tags', color:'blue',
    desc:'Build, scan, sign, and push multi-platform images — 100% automated.',
    examples:['Multi-platform build (amd64 + arm64)','Layer caching via GitHub Actions cache','Push to GHCR + Docker Hub simultaneously','Trivy CVE scan before push'],
    workflow:'docker-build-push.yml'
  },
]

const colorMap = { blue:'var(--accent-blue)', purple:'var(--accent-purple)', green:'var(--accent-green)', red:'var(--accent-red)', orange:'var(--accent-orange)' }
const tagMap   = { blue:'tag-blue', purple:'tag-purple', green:'tag-green', red:'tag-red', orange:'tag-orange' }

export default function SlideAutomation() {
  const [active, setActive] = useState('cicd')
  const current = useCases.find(u => u.id === active)

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', gap:14, overflow:'hidden' }}>
      <div>
        <div className="tag tag-blue fade-up delay-1" style={{ marginBottom:8 }}>02 — Developer Automation</div>
        <h2 className="section-title fade-up delay-2">GitHub Actions: The Full Picture</h2>
        <p className="section-subtitle fade-up delay-3">It's not just CI/CD — it's a platform for automating your entire developer workflow</p>
      </div>

      <div className="fade-up delay-2" style={{ display:'flex', gap:14, flex:1, overflow:'hidden' }}>
        {/* Use case selector */}
        <div style={{ display:'flex', flexDirection:'column', gap:6, width:210, flexShrink:0 }}>
          {useCases.map(u => (
            <button key={u.id} onClick={() => setActive(u.id)}
              style={{ display:'flex', gap:10, alignItems:'center', padding:'10px 12px', border:`1px solid ${active === u.id ? colorMap[u.color] : 'var(--border)'}`, background: active === u.id ? `rgba(${u.color === 'blue' ? '88,166,255' : u.color === 'green' ? '63,185,80' : u.color === 'red' ? '248,81,73' : u.color === 'orange' ? '210,153,34' : '188,140,255'},0.1)` : 'var(--bg-card)', borderRadius:'var(--radius)', cursor:'pointer', textAlign:'left', transition:'all 0.2s', fontFamily:'var(--font-sans)' }}>
              <span style={{ fontSize:18, flexShrink:0 }}>{u.icon}</span>
              <div>
                <div style={{ fontSize:12.5, fontWeight:700, color: active === u.id ? colorMap[u.color] : 'var(--text-primary)' }}>{u.title}</div>
                <div style={{ fontSize:10, color:'var(--text-muted)', fontFamily:'var(--font-mono)' }}>{u.workflow}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        {current && (
          <div style={{ flex:1, display:'flex', flexDirection:'column', gap:12, overflow:'hidden' }}>
            <div className="card" style={{ borderTop:`3px solid ${colorMap[current.color]}`, flex:'none' }}>
              <div style={{ display:'flex', gap:12, alignItems:'flex-start', marginBottom:10 }}>
                <span style={{ fontSize:28 }}>{current.icon}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:17, fontWeight:800, marginBottom:4 }}>{current.title}</div>
                  <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                    <span className={`tag ${tagMap[current.color]}`} style={{ fontSize:10 }}>Trigger: {current.trigger}</span>
                    <span className="tag tag-blue" style={{ fontSize:10, fontFamily:'var(--font-mono)' }}>.github/workflows/{current.workflow}</span>
                  </div>
                </div>
              </div>
              <p style={{ fontSize:13, color:'var(--text-secondary)', lineHeight:1.6 }}>{current.desc}</p>
            </div>

            <div className="card" style={{ flex:1, overflow:'auto' }}>
              <div style={{ fontWeight:700, fontSize:13, marginBottom:10, color: colorMap[current.color] }}>✨ What it does in this repo:</div>
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {current.examples.map((ex, i) => (
                  <div key={i} style={{ display:'flex', gap:10, alignItems:'flex-start', padding:'8px 12px', background:'var(--bg-secondary)', border:'1px solid var(--border)', borderRadius:'var(--radius)', fontSize:13, color:'var(--text-primary)' }}>
                    <span style={{ color: colorMap[current.color], fontWeight:700, flexShrink:0 }}>▸</span>
                    {ex}
                  </div>
                ))}
              </div>

              <div style={{ marginTop:14, padding:'10px 14px', background:'rgba(88,166,255,0.06)', border:'1px solid rgba(88,166,255,0.15)', borderRadius:'var(--radius)', fontSize:12, color:'var(--text-secondary)' }}>
                💡 Open <code style={{ fontFamily:'var(--font-mono)', color:'var(--accent-cyan)' }}>.github/workflows/{current.workflow}</code> to see the full annotated workflow
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
