import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/** GitHub Pages: https://user.github.io/REPO/ */
function pagesBase(): string {
  const repo = process.env.GITHUB_REPOSITORY?.split('/')[1]
  if (repo) return `/${repo}/`
  const custom = process.env.VITE_BASE_PATH
  if (custom) return custom.endsWith('/') ? custom : `${custom}/`
  return '/'
}

export default defineConfig({
  base: pagesBase(),
  plugins: [react(), tailwindcss()],
})
