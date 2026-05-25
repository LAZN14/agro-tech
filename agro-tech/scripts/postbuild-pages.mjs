import fs from 'node:fs'
import path from 'node:path'

const index = path.resolve(import.meta.dirname, '../dist/index.html')
const notFound = path.resolve(import.meta.dirname, '../dist/404.html')

if (!fs.existsSync(index)) {
  console.error('Нет dist/index.html — сначала npm run build')
  process.exit(1)
}

fs.copyFileSync(index, notFound)
console.log('Создан dist/404.html для SPA на GitHub Pages')
