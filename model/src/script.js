import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import * as dat from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// model
const dracoloader = new DRACOLoader();
dracoloader.setDecoderPath("/draco/");

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoloader);

let mixer = null;
let model;
gltfLoader.load(
  "/models/Man/glTF/Man.gltf",

  (gltf) => {
     model = gltf.scene;

    model.rotation.y = 0.27
   console.log(model);
    scene.add(model);

    const target = new THREE.Object3D()
   scene.add(target);
    mixer = new THREE.AnimationMixer(model);
    const action = mixer.clipAction(gltf.animations[0]);

    action.play();

    gui.add(model.rotation, "y").min(-3).max(3).step(0.01).name("model y");
    //   gui.add(model.rotation, "x")
    //   .min(-3)
    //   .max(3)
    //   .step(0.01)
    //   .name('model x')
  }
);
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

/**
 * Floor
 */
// const floor = new THREE.Mesh(
//     new THREE.PlaneGeometry(10, 10),
//     new THREE.MeshStandardMaterial({
//         color: '#444444',
//         metalness: 0,
//         roughness: 0.5
//     })
// )
// floor.receiveShadow = true
// floor.rotation.x = - Math.PI * 0.5
// scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xfffff, 1);
ambientLight.castShadow = false;
scene.add(ambientLight);



const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.castShadow = true;
directionalLight.frustumCulled = true;

directionalLight.isLight = true;
directionalLight.isObject3D = true;

directionalLight.position.set(0.12, 1.67, 3);
gui.add(directionalLight.position, "y")
.min(-3)
.max(3)
.step(0.01)
.name('L')
gui.add(directionalLight.position, "x")
.min(-3)
.max(3)
.step(0.01)
.name('L')
gui.add(directionalLight.position, "z")
.min(-3)
.max(3)
.step(0.01)
.name('L')
scene.add(directionalLight);

// Material


/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Cursor
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (e) => {
  cursor.x = - (e.clientX / sizes.width - 0.5);
  cursor.y = -(e.clientY / sizes.height - 0.5);
  
});

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth; 
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.y = 2.12;
camera.position.z = 1.6;
scene.add(camera);

gui.add(camera.position, "x").min(-3).max(30).step(0.01).name("camera x");
gui.add(camera.position, "y").min(-3).max(30).step(0.01).name("camera y");
gui.add(camera.position, "z").min(-3).max(30).step(0.01).name("camera z");

// Controls
// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha : true
});

// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.LinearToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  // update mixer
  if (mixer) {
    mixer.update(deltaTime);
  }

  // Update camera
 if(model)
 {
  
 model.rotation.y = cursor.x * 0.8;

 }
 // Update controls
//  controls.update()
 
// Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
