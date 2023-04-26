import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import * as dat from "lil-gui";

// textures
// const image = new Image()
// const texture = new THREE.Texture(image)
// image.onload = () => {
// texture.needsUpdate = true
// }
// image.src = '/textures/door/color.jpg'

const textureLoader = new THREE.TextureLoader
const texture = textureLoader.load('/textures/door/paper.jpg')

texture.minFilter = THREE.NearestFilter

// debug
const gui = new dat.GUI();

const parameters = {
  color : 0x696be0,
  spin:() => {
   gsap.to(mesh.rotation,{duration:1,y:mesh.rotation.y + Math.PI * 2})
  }
}

// Cursor
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / sizes.width - 0.5;
  cursor.y = -(e.clientY / sizes.height - 0.5);
});

// canvas
const canvas = document.querySelector("canvas.webgl");
const sizes = {
  width: innerWidth,
  height: innerHeight,
};

window.addEventListener("resize", () => {
  // Updates Sizes
  (sizes.width = window.innerWidth), (sizes.height = window.innerHeight);
  // Update Camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  //  Updates Renderer
  Renderer.setSize(sizes.width, sizes.height);
  Renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// window.addEventListener("dblclick", () => {
//   const fullscreenElement =
//     document.fullscreenElement || document.webkitFullscreenElement;
//   if (!fullscreenElement) {
//     if (canvas.requestFullscreen) {
//       canvas.requestFullscreen();
//     } else if (canvas.webkitFullscreenElement) {
//       canvas.requestFullscreen();
//     }
//   } else {
//     if (document.exitFullscreen) {
//       document.exitFullscreen();
//     } else if (document.webkitExitFullscreen) {
//       document.webkitExitFullscreen();
//     }
//   }
// });

const scene = new THREE.Scene();

// const positionArry = new Float32Array([
//   0,0,0,
//   0,1,0,
//   1,0,0
// ])

// const positionAttriute = new THREE.BufferAttribute(positionArry,3)
// const geometry = new THREE.BufferGeometry()
// geometry.setAttribute('position',positionAttriute)

// Mesh
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({map: texture })
);

scene.add(mesh);

gui.add(mesh.position, "y")
.min(-3)
.max(3)
.step(0.01)
.name('elevation')
gui
.add(mesh, 'visible')
gui
.add(mesh.material, 'wireframe')
// gui
// .addColor(parameters, 'color')
// .onChange(() => {
//   mesh.material.color.set(parameters.color)
// })
gui
.add(parameters,'spin')
// camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

// Renderer
const Renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
Renderer.setSize(sizes.width, sizes.height);

// Reduce the Past Time
const clock = new THREE.Clock();

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Animation
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // mesh.rotation.y =  elapsedTime

  // Update camera
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
  // camera.position.y = cursor.y * 3;
  // camera.lookAt(mesh.position);

  controls.update();

  Renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
