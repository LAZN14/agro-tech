import fs from 'fs'
import path from 'path'

const root = path.resolve(import.meta.dirname, '..')
const apiPath = path.join(root, 'public/api/equipment.json')
const dir = path.join(root, 'public/images/equipment')
const src = path.join(dir, '1.jpeg')

if (!fs.existsSync(src)) {
  console.error('Нет файла public/images/equipment/1.jpeg')
  process.exit(1)
}

const data = JSON.parse(fs.readFileSync(apiPath, 'utf8'))

for (const item of data.items) {
  item.images = [1, 2, 3].map((n) => `/images/equipment/${item.slug}-${n}.jpeg`)

  for (const n of [1, 2, 3]) {
    const dest = path.join(dir, `${item.slug}-${n}.jpeg`)
    if (fs.existsSync(dest)) continue
    try {
      fs.linkSync(src, dest)
    } catch {
      fs.copyFileSync(src, dest)
    }
  }
}

fs.writeFileSync(apiPath, JSON.stringify(data, null, 2))
console.log(`Альбомы: ${data.items.length} моделей × 3 фото`)
