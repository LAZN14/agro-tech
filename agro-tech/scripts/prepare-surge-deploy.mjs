/**
 * Уменьшает dist для Surge: одно фото 1.jpeg вместо десятков копий по ~5 МБ.
 */
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const dist = path.join(root, 'dist')
const equipDir = path.join(dist, 'images', 'equipment')
const jsonPath = path.join(dist, 'api', 'equipment.json')

if (!fs.existsSync(dist)) {
  console.error('Сначала выполните: npm run build')
  process.exit(1)
}

const ONE = '/images/equipment/1.jpeg'

if (fs.existsSync(equipDir)) {
  for (const name of fs.readdirSync(equipDir)) {
    if (/\.jpe?g$/i.test(name) && name !== '1.jpeg') {
      fs.unlinkSync(path.join(equipDir, name))
    }
  }
}

if (fs.existsSync(jsonPath)) {
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
  for (const item of data.items ?? []) {
    item.images = [ONE, ONE, ONE]
  }
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2))
}

const copy200 = path.join(dist, '200.html')
if (!fs.existsSync(copy200) && fs.existsSync(path.join(dist, 'index.html'))) {
  fs.copyFileSync(path.join(dist, 'index.html'), copy200)
}

function dirSize(dir) {
  let s = 0
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name)
    s += ent.isDirectory() ? dirSize(p) : fs.statSync(p).size
  }
  return s
}
const bytes = dirSize(dist)

console.log(`Готово к Surge: ~${(bytes / 1024 / 1024).toFixed(1)} МБ`)
