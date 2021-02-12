import { CatmullRomCurve3, Color, PerspectiveCamera, Scene, Vector2, Vector3, WebGLRenderer } from 'three'
import { ThickLine } from '../ThickLine'
import { ThickLineGeometry } from '../ThickLineGeometry'
import { ThickLineMaterial } from '../ThickLineMaterial'

document.body.style.margin = '0'

const scene = new Scene()
const camera = new PerspectiveCamera(60)
const renderer = new WebGLRenderer()
const resolution = new Vector2()
document.body.appendChild(renderer.domElement)

camera.position.z = 20

const onResize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  resolution.set(window.innerWidth, window.innerHeight)
  camera.updateProjectionMatrix()
}

onResize()
window.addEventListener('resize', onResize)

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
animate()

const positions = []
const colors = []
// const points = GeometryUtils.hilbert3D(new Vector3(0, 0, 0), 20.0, 1, 0, 1, 2, 3, 4, 5, 6, 7)
const points = [
  new Vector3(-10, 0, 0),
  new Vector3(10, 0, 0),
  new Vector3(10, 10, 0),
  new Vector3(-10, 10, 0),
  new Vector3(10, 20, 0),
]
const spline = new CatmullRomCurve3(points)
// const divisions = Math.round(12 * points.length)
const point = new Vector3()
const color = new Color()

// for (let i = 0, l = divisions; i < l; i++) {
for (let i = 0, l = points.length; i < l; i++) {
  const t = i / l

  // spline.getPoint(t, point)
  point.copy(points[i])
  positions.push(point.x, point.y, point.z)

  color.setHSL(t, 1.0, 0.5)
  colors.push(color.r, color.g, color.b)
}

const geometry = new ThickLineGeometry()
geometry.setPositions(positions)
// geometry.setColors(colors)

const matLine = new ThickLineMaterial({
  color: 0xffffff,
  linewidth: 5, // in pixels
  // vertexColors: false,
  resolution,
  dashed: false,
})

const line = new ThickLine(geometry, matLine)
line.computeLineDistances()
line.scale.multiplyScalar(0.5)
scene.add(line)

// scene.add(line2)
