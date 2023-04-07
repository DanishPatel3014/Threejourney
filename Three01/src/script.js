import * as THREE from 'three'


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scence
const scene = new THREE.Scene();
// Cube
const group = new THREE.Group()
scene.add(group)



const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
group.add(cube1)


const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: '#705DF2' })
)
group.add(cube2)


// Axes Helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper)

// Sizes
const size = {
    width : '800',
    height : '600'
}
// Camera
const camera = new THREE.PerspectiveCamera(75,size.width/size.height)
camera.position.z = 3;
// camera.position.x = 1;
// camera.position.y = 1;
scene.add(camera);


// camera.lookAt(mesh.position)
// Render
const renderer = new THREE.WebGLRenderer({
    canvas : canvas
})

renderer.setSize(size.width,size.height)
renderer.render(scene,camera)