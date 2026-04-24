import { useState } from 'react'

const checks = [
  { id:'deps',     icon:'📦', title:'Dependency Scanning',          tool:'Dependabot / Snyk',      status:'pass',   count:'0 critical', desc:'Scans package.json for CVEs. Dependabot auto-creates PRs for patches. Block PRs with critical CVEs via branch protection.' },
  { id:'sast',     icon:'🔍', title:'SAST — Static Analysis',       tool:'CodeQL / Semgrep',       status:'pass',   count:'2 warnings', desc:'Analyzes code for SQL injection, XSS, hardcoded secrets, and insecure patterns without running the app.' },
  { id:'secrets',  icon:'🔐', title:'Secret Scanning',              tool:'GitGuardian / truffleHog',status:'pass',  count:'0 leaks',    desc:'Prevents API keys, tokens, and passwords from being committed. Scans every push, branch, and PR.' },
  { id:'container',icon:'🐳', title:'Container Image Scanning',     tool:'Trivy / Grype',          status:'warn',   count:'3 medium',   desc:'Scans Docker images for OS-level CVEs before pushing to ECR/GCR. Gate deploy on severity threshold.' },
  { id:'iac',      icon:'🏗️', title:'IaC Security (Terraform)',     tool:'Checkov / tfsec',        status:'pass',   count:'1 warning',  desc:'Validates Terraform/CloudFormation for misconfigured S3 buckets, open security groups, missing encryption.' },
  { id:'oidc',     icon:'🆔', title:'OIDC (Passwordless Auth)',      tool:'GitHub OIDC → AWS/GCP',  status:'pass',   count:'Active',     desc:'Never store long-lived cloud credentials in GitHub Secrets. Use OIDC tokens for short-lived, scoped access.' },
]

const statusColor = { pass:'var(--accent-green)', warn:'var(--accent-orange)', fail:'var(--accent-red)' }
const statusBadge = { pass:'badge-success', warn:'badge-warning', fail:'badge-danger' }

export default function SlideSecurity() {
  const [expanded, setExpanded] = useState(null)

  return (
    <div style={{ height:'100%', overflow:'auto', display:'flex', flexDirection:'column', gap:14 }}>
      <div>
        <div className="tag tag-red fade-up delay-1" style={{ marginBottom:8 }}>08 — Security</div>
        <h2 className="section-title fade-up delay-2">Security Scanning & Hardening</h2>
        <p className="section-subtitle fade-up delay-3">Shift security left — catch vulnerabilities in CI, not in production</p>
      </div>

      <div className="grid-2 fade-up delay-2" style={{ gap:10, flex:1 }}>
        {checks.map((c) => (
          <div key={c.id} className="card card-sm" onClick={() => setExpanded(expanded === c.id ? null : c.id)}
            style={{ cursor:'pointer', border:`1px solid ${expanded === c.id ? statusColor[c.status] : 'var(--border)'}`, transition:'all 0.2s' }}>
            <div style={{ display:'flex', gap:10, alignItems:'center' }}>
              <span style={{ fontSize:20, flexShrink:0 }}>{c.icon}</span>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:700 }}>{c.title}</div>
                <div style={{ fontSize:10.5, color:'var(--text-muted)', fontFamily:'var(--font-mono)' }}>{c.tool}</div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:3 }}>
                <span className={`badge ${statusBadge[c.status]}`}>{c.status.toUpperCase()}</span>
                <span style={{ fontSize:10, color: statusColor[c.status], fontFamily:'var(--font-mono)' }}>{c.count}</span>
              </div>
            </div>
            {expanded === c.id && (
              <p style={{ marginTop:10, paddingTop:10, borderTop:'1px solid var(--border)', fontSize:11.5, color:'var(--text-secondary)', lineHeight:1.5 }}>{c.desc}</p>
            )}
          </div>
        ))}
      </div>

      <div className="fade-up delay-4 card card-sm" style={{ background:'rgba(248,81,73,0.06)', border:'1px solid rgba(248,81,73,0.15)', fontSize:12, color:'var(--text-secondary)', lineHeight:1.6 }}>
        🔑 <strong style={{ color:'var(--accent-red)' }}>Golden Rule:</strong> Never put secrets in workflow YAML. Use <code style={{ fontFamily:'var(--font-mono)', color:'var(--accent-cyan)' }}>$&#123;&#123; secrets.MY_KEY &#125;&#125;</code> — encrypted at rest, masked in logs, scoped per environment. Add OIDC to eliminate long-lived credentials entirely.
      </div>
    </div>
  )
}
