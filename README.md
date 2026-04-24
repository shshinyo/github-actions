# GitHub Actions Presentation & Automation Demos

This repository contains:
1. **Interactive React Presentation**: A high-impact dashboard for demonstrating GitHub Actions concepts.
2. **6 Production-Grade Workflows**: Real YAML files in `.github/workflows/` that you can live-demo to your team.

---

## 🚀 How to Run the Presentation Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` and use arrow keys to navigate.

---

## 🧪 How to Demo the Workflows

| Workflow | How to Demo |
| :--- | :--- |
| **🐳 Docker** | Create a tag starting with `v` (e.g., `git tag v1.0.0 && git push --tags`). Show the multi-platform build in the Actions tab. |
| **🧪 Advanced CI** | Navigate to Actions → "Advanced CI Pipeline" and click **Run workflow**. Show the parallel matrix jobs. |
| **🚀 Auto-Release** | Push a commit with a message like `feat: add new feature`. A new GitHub Release will appear automatically. |
| **🤖 PR Assistant** | Open a new Pull Request. Check the automated "Size" labels and the checklist comment. |
| **🛡️ Security** | Go to the **Security** tab in this repo to see reports from CodeQL, Gitleaks, and Trivy. |
| **⏰ Scheduled** | Trigger "Scheduled Developer Tasks" manually to see the "Weekly Velocity Report" issue be created. |

---

## 🛠 Manual Push Instructions
If you have permissions issues pushing code from this environment, run these commands in your local terminal:

```bash
git remote set-url origin https://github.com/shshinyo/github-actions.git
git add .
git commit -m "feat: complete presentation app and workflow demos"
git push origin main
```

---

## 📚 Presentation Structure
- **Intro**: Framing GHA as a developer automation platform.
- **Automation Deep Dive**: 6 real-world use cases.
- **Docker Integration**: Building multi-arch images.
- **Presenter Guide**: How to test every file.
- **Demos**: Interactive simulators for Pipeline, Health Checks, Rollbacks, Feature Flags, and Canary Deployments.
- **Advanced**: Security scanning, Observability, and System Enhancements.