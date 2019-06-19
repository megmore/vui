/* eslint-disable */
const path = require('path')
const fs = require('fs')
const sourceDir = '../src/icon/icons-src/SVG/'
const outputDir = '../src/icon/icons/'
const libDir = '../lib/icons/'

String.prototype.getTags = function (name = 'svg') {
  const Regex = new RegExp(`<${name}(“[^”]*”|’[^’]*’|[^’”>])*>`, 'gi')
  return this.match(Regex)
}
String.prototype.getAttributes = function (name = 'height') {
  const Regex = new RegExp(`${name}="(.*?)"`, 'gi')
  return Regex.exec(this)[1]
}

let fileEntries = fs.readdirSync(path.resolve(__dirname, sourceDir))
let collectBuffers = ''

fileEntries.forEach((fileName, index) => {
  const name = fileName.split('.')[0]
  let data = fs.readFileSync(path.resolve(__dirname, `${sourceDir + fileName}`))
  const strSVG = data.toString().getTags('svg')[0]
  const strPaths = data.toString().getTags('path')
  const strPolygons = data.toString().getTags('polygon')
  let svgData = {}
  svgData[name] = {
    height: strSVG.getAttributes('height'),
    width: strSVG.getAttributes('width'),
    viewBox: strSVG.getAttributes('viewBox')
  }
  if (strPaths) {
    svgData[name].paths = (() => {
      let temp = []
      strPaths.forEach(item => {
        temp.push(item.getAttributes('d'))
      })
      return temp
    })()
  }

  if (strPolygons) {
    svgData[name].polygons = (() => {
      let temp = []
      strPolygons.forEach(item => {
        temp.push(item.getAttributes('points'))
      })
      return temp
    })()
  }
  let buffer = `/* eslint-disable */
  export default ${JSON.stringify(svgData, null, '\t')}
  `
  fs.writeFile(path.resolve(__dirname, `${outputDir + name}.ts`), buffer, (err) => { if (err) throw err })
  fs.writeFile(path.resolve(__dirname, `${libDir + name}.js`), buffer, (err) => { if (err) throw err })
  // collectBuffers += `export { default as MIcon_${name} } from './${name}.js'\n`
})
