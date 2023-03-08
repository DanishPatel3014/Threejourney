import * as THREE from 'three'
console.log(THREE);

// Scence
const scene = new THREE.Scene();
// Cube
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color:'#8B0C3C'});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh)
// Sizes
const size = {
    width : '600',
    height : '800'
}
// Camera
const camera = new THREE.PerspectiveCamera(75,size.width/size.height)
camera.position.z = 3;
scene.add(camera);
// Render
const renderer = new THREE.WebGLRenderer({
    canvas : document.querySelector('canvas.webgl')
})

renderer.setSize(size.width,size.height)
renderer.render(scene,camera)