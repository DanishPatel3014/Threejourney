import * as THREE from 'three'


// Canvas

const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
  width : 800,
  height : 600
}

// Scene
const scene = new THREE.Scene()

// Object

const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1,5,5,5),
  new THREE.MeshBasicMaterial({color : 0xff0000})
)
scene.add(mesh)


// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height,0.1,100)
camera.position.z = 3
console.log(camera.position.length());
camera.lookAt(mesh.position)
scene.add(camera)


// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)