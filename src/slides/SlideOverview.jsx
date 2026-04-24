const items = [
  { icon:'⚡', title:'Trigger & Run', desc:'Push, PR, schedule, or manual dispatch kicks off a workflow YAML', color:'blue' },
  { icon:'🏃', title:'Runner Provisioned', desc:'GitHub-hosted (ubuntu/mac/windows) or self-hosted runner spins up', color:'purple' },
  { icon:'📦', title:'Job Matrix', desc:'Parallel jobs across OS/Node versions reduce total pipeline time', color:'green' },
  { icon:'💾', title:'Cache & Artifacts', desc:'actions/cache for deps, upload-artifact for build outputs across jobs', color:'orange' },
  { icon:'🔐', title:'Secrets & OIDC', desc:'Encrypted secrets + OpenID Connect for passwordless cloud auth', color:'red' },
  { icon:'🚀', title:'Deploy & Notify', desc:'Deploy to cloud, post Slack/Teams notification, open release PR', color:'blue' },
]

const workflow = `name: Production Deploy
on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci && npm test

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - uses: actions/upload-artifact@v4
        with: { name: dist, path: ./dist }

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: production
    permissions:
      id-token: write   # OIDC
      contents: read
    steps:
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123:role/deploy
          aws-region: us-east-1
      - run: aws s3 sync dist/ s3://my-bucket --delete`

export default function SlideOverview() {
  return (
    <div style={{ height:'100%', overflow:'auto', display:'flex', flexDirection:'column', gap:16 }}>
      <div>
        <div className="tag tag-blue fade-up delay-1" style={{ marginBottom:8 }}>01 — Overview</div>
        <h2 className="section-title fade-up delay-2">GitHub Actions Architecture</h2>
        <p className="section-subtitle fade-up delay-3">How a workflow flows from trigger to production</p>
      </div>

      <div className="grid-3 fade-up delay-2" style={{ gap:10 }}>
        {items.map((it, i) => (
          <div key={i} className="card card-sm" style={{ animationDelay:`${i*0.05}s` }}>
            <div style={{ fontSize:22, marginBottom:6 }}>{it.icon}</div>
            <div style={{ fontSize:13, fontWeight:700, marginBottom:3 }}>{it.title}</div>
            <div style={{ fontSize:11.5, color:'var(--text-secondary)', lineHeight:1.5 }}>{it.desc}</div>
          </div>
        ))}
      </div>

      <div className="fade-up delay-4">
        <div className="code-block">
          <div className="code-header">
            <div className="code-dots">
              <div className="code-dot" style={{background:'#ff5f56'}} />
              <div className="code-dot" style={{background:'#ffbd2e'}} />
              <div className="code-dot" style={{background:'#27c93f'}} />
            </div>
            <span className="code-file">.github/workflows/deploy.yml</span>
            <span className="tag tag-green" style={{fontSize:10}}>Production</span>
          </div>
          <div className="code-body">
            <pre style={{ whiteSpace:'pre-wrap', color:'var(--text-secondary)', margin:0, fontSize:11.5 }}>
              {workflow.split('\n').map((line, i) => {
                const trimmed = line.trimStart()
                let color = 'var(--text-secondary)'
                if (trimmed.startsWith('name:') || trimmed.startsWith('on:') || trimmed.startsWith('jobs:')) color = 'var(--accent-red)'
                else if (trimmed.startsWith('- uses:') || trimmed.startsWith('- run:')) color = 'var(--accent-blue)'
                else if (trimmed.startsWith('#')) color = 'var(--text-muted)'
                else if (/^\s*\w+:$/.test(line) || /^\s*runs-on:|needs:|steps:|with:|permissions:/.test(line)) color = 'var(--accent-orange)'
                return <span key={i} style={{ color, display:'block' }}>{line}</span>
              })}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
