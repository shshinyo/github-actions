import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub project Pages serves the app under /<repo>/; set VITE_BASE in CI when deploying.
  base: process.env.VITE_BASE || '/',
})
