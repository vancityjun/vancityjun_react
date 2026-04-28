// Vite's import.meta.glob replaces dynamic require() for images.
// `eager: true` returns resolved modules; `import: 'default'` returns URL strings.
const modules = import.meta.glob('../img/**/*.{png,jpg,jpeg,svg}', {
  eager: true,
  import: 'default',
})

const projectImages = {}
for (const path in modules) {
  const relativePath = path.replace(/^\.\.\/img\//, '')
  projectImages[relativePath] = modules[path]
}

export default projectImages
