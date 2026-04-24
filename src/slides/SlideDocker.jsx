import { useState } from 'react'

const dockerYml = `.github/workflows/docker-build-push.yml`

const steps = [
  { icon:'🔐', title:'Login to GHCR', status:'success', detail:'Uses GITHUB_TOKEN — no manual secret needed. Auto-revokes after the run.' },
  { icon:'🔐', title:'Login to Docker Hub', status:'success', detail:'Uses DOCKERHUB_USERNAME + DOCKERHUB_TOKEN secrets encrypted in repo settings.' },
  { icon:'⚙️', title:'Set up QEMU + Buildx', status:'success', detail:'QEMU enables arm64 emulation. Buildx is the multi-platform build driver.' },
  { icon:'🏷️', title:'Extract Metadata', status:'success', detail:'Auto-generates tags: :main, :1.2.3, :1.2, :1, :latest, :sha-abc1234 based on git context.' },
  { icon:'🏗️', title:'Build (amd64 + arm64)', status:'running', detail:'Builds for two CPU architectures in one step. Cache-from/to via GitHub Actions cache.' },
  { icon:'📤', title:'Push to GHCR + DockerHub', status:'waiting', detail:'One push creates a multi-arch image manifest. Works on linux, mac M1, raspberry pi.' },
  { icon:'🛡️', title:'Trivy CVE Scan', status:'waiting', detail:'Scans pushed image for HIGH/CRITICAL CVEs. Uploads SARIF to GitHub Security tab.' },
  { icon:'📜', title:'SBOM Attestation', status:'waiting', detail:'Cryptographic provenance record — proves this exact image was built by this pipeline.' },
]

const registries = [
  { name:'GitHub Container Registry', short:'GHCR', url:'ghcr.io/org/my-app', auth:'GITHUB_TOKEN (auto)', free:true, private:true },
  { name:'Docker Hub', short:'DockerHub', url:'docker.io/org/my-app', auth:'DOCKERHUB_TOKEN secret', free:true, private:false },
  { name:'Amazon ECR', short:'ECR', url:'123.dkr.ecr.us-east-1.amazonaws.com/app', auth:'OIDC (no secrets!)', free:false, private:true },
  { name:'Google Artifact Registry', short:'GAR', url:'us-docker.pkg.dev/proj/repo/app', auth:'OIDC (no secrets!)', free:false, private:true },
]

const dockerfile = `FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Final minimal image
FROM nginx:alpine AS runtime
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

# Build args injected by GitHub Actions workflow
ARG GIT_SHA BUILD_DATE VERSION
LABEL org.opencontainers.image.revision=\${GIT_SHA} \\
      org.opencontainers.image.created=\${BUILD_DATE} \\
      org.opencontainers.image.version=\${VERSION}

EXPOSE 80
HEALTHCHECK --interval=30s CMD curl -f http://localhost/health || exit 1`

export default function SlideDocker() {
  const [activeReg, setActiveReg] = useState(0)

  return (
    <div style={{ height:'100%', overflow:'auto', display:'flex', flexDirection:'column', gap:14 }}>
      <div>
        <div className="tag tag-blue fade-up delay-1" style={{ marginBottom:8 }}>03 — Docker Integration</div>
        <h2 className="section-title fade-up delay-2">Docker Build & Multi-Registry Push</h2>
        <p className="section-subtitle fade-up delay-3">
          <code style={{ fontFamily:'var(--font-mono)', color:'var(--accent-cyan)', fontSize:12 }}>{dockerYml}</code>
          {' '}— Multi-platform, cached, scanned, signed
        </p>
      </div>

      <div className="grid-2 fade-up delay-2" style={{ gap:14 }}>
        {/* Pipeline steps */}
        <div className="card" style={{ display:'flex', flexDirection:'column', gap:6 }}>
          <div style={{ fontWeight:700, fontSize:13, marginBottom:6 }}>🐳 docker-build-push.yml — Steps</div>
          {steps.map((s, i) => (
            <div key={i} style={{ display:'flex', gap:10, alignItems:'flex-start', padding:'7px 10px', background:'var(--bg-secondary)', borderRadius:'var(--radius)', border:`1px solid ${s.status === 'success' ? 'rgba(63,185,80,0.2)' : s.status === 'running' ? 'rgba(88,166,255,0.3)' : 'var(--border)'}` }}>
              <span style={{ fontSize:14, flexShrink:0 }}>{s.icon}</span>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:2 }}>
                  <span style={{ fontSize:12, fontWeight:700, color: s.status === 'success' ? 'var(--accent-green)' : s.status === 'running' ? 'var(--accent-blue)' : 'var(--text-muted)' }}>{s.title}</span>
                  <span className={`badge ${s.status === 'success' ? 'badge-success' : s.status === 'running' ? 'badge-info' : 'badge-neutral'}`} style={{ fontSize:9 }}>{s.status}</span>
                </div>
                <div style={{ fontSize:11, color:'var(--text-muted)', lineHeight:1.4 }}>{s.detail}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Right column: registries + Dockerfile */}
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {/* Registry selector */}
          <div className="card" style={{ padding:14 }}>
            <div style={{ fontWeight:700, fontSize:13, marginBottom:8 }}>📦 Supported Registries</div>
            <div style={{ display:'flex', gap:6, marginBottom:10 }}>
              {registries.map((r, i) => (
                <button key={i} onClick={() => setActiveReg(i)}
                  style={{ padding:'5px 10px', fontSize:11, fontWeight:700, border:`1px solid ${activeReg === i ? 'var(--accent-blue)' : 'var(--border)'}`, background: activeReg === i ? 'rgba(88,166,255,0.12)' : 'var(--bg-secondary)', color: activeReg === i ? 'var(--accent-blue)' : 'var(--text-secondary)', borderRadius:'var(--radius)', cursor:'pointer', fontFamily:'var(--font-sans)', transition:'all 0.2s' }}>
                  {r.short}
                </button>
              ))}
            </div>
            {(() => {
              const r = registries[activeReg]
              return (
                <div style={{ display:'flex', flexDirection:'column', gap:6, fontSize:12 }}>
                  <div style={{ display:'flex', gap:6 }}>
                    <span style={{ color:'var(--text-muted)', width:60, flexShrink:0 }}>Image:</span>
                    <code style={{ fontFamily:'var(--font-mono)', color:'var(--accent-cyan)', fontSize:11 }}>{r.url}</code>
                  </div>
                  <div style={{ display:'flex', gap:6 }}>
                    <span style={{ color:'var(--text-muted)', width:60, flexShrink:0 }}>Auth:</span>
                    <span style={{ color:'var(--text-primary)' }}>{r.auth}</span>
                  </div>
                  <div style={{ display:'flex', gap:10 }}>
                    <span className={`badge ${r.free ? 'badge-success' : 'badge-warning'}`}>{r.free ? 'Free tier' : 'Paid'}</span>
                    <span className={`badge ${r.private ? 'badge-info' : 'badge-neutral'}`}>{r.private ? 'Private repos' : 'Public only (free)'}</span>
                  </div>
                </div>
              )
            })()}
          </div>

          {/* Dockerfile */}
          <div className="code-block" style={{ flex:1 }}>
            <div className="code-header">
              <div className="code-dots">
                <div className="code-dot" style={{background:'#ff5f56'}} />
                <div className="code-dot" style={{background:'#ffbd2e'}} />
                <div className="code-dot" style={{background:'#27c93f'}} />
              </div>
              <span className="code-file">Dockerfile — multi-stage build</span>
              <span className="tag tag-green" style={{fontSize:10}}>Best Practice</span>
            </div>
            <div className="code-body" style={{ maxHeight:220 }}>
              <pre style={{ margin:0, fontSize:10.5, lineHeight:1.6, whiteSpace:'pre-wrap', color:'var(--text-secondary)' }}>
                {dockerfile.split('\n').map((line, i) => {
                  const t = line.trim()
                  let c = 'var(--text-secondary)'
                  if (t.startsWith('FROM')) c = 'var(--accent-red)'
                  else if (t.startsWith('RUN') || t.startsWith('CMD') || t.startsWith('ENTRYPOINT')) c = 'var(--accent-orange)'
                  else if (t.startsWith('COPY') || t.startsWith('WORKDIR') || t.startsWith('ARG')) c = 'var(--accent-blue)'
                  else if (t.startsWith('LABEL') || t.startsWith('EXPOSE') || t.startsWith('HEALTHCHECK')) c = 'var(--accent-purple)'
                  else if (t.startsWith('#')) c = 'var(--text-muted)'
                  return <span key={i} style={{ color:c, display:'block' }}>{line}</span>
                })}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
