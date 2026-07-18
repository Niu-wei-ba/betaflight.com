import { createHash } from 'node:crypto'
import { readFile, readdir, rm, symlink } from 'node:fs/promises'
import path from 'node:path'

const buildDir = path.resolve('build')
const sourceDir = path.join(buildDir, 'assets', 'images')
const localeDir = path.join(buildDir, 'zh-CN', 'assets', 'images')

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(dir, entry.name)
      return entry.isDirectory() ? walk(entryPath) : [entryPath]
    }),
  )
  return files.flat()
}

async function sameFile(firstPath, secondPath) {
  const [first, second] = await Promise.all([readFile(firstPath), readFile(secondPath)])
  if (first.length !== second.length) return false

  const hash = (content) => createHash('sha256').update(content).digest('hex')
  return hash(first) === hash(second)
}

let linked = 0

for (const localeImage of await walk(localeDir)) {
  const relativePath = path.relative(localeDir, localeImage)
  const sourceImage = path.join(sourceDir, relativePath)

  try {
    if (!(await sameFile(sourceImage, localeImage))) continue
  } catch {
    continue
  }

  await rm(localeImage)
  await symlink(path.relative(path.dirname(localeImage), sourceImage), localeImage)
  linked += 1
}

console.log(`Linked ${linked} identical zh-CN images to the English build assets.`)
