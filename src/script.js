import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import {
  addDoorTexture,
  addWallTexture,
  addGrassTexture,
  addRoofTexture,
} from "./add-textures";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * House
 */

const house = new THREE.Group();

//walls
const houseCube = new THREE.Mesh(
  new THREE.BoxGeometry(5, 3, 5),
  new THREE.MeshStandardMaterial({ color: "#ac8e82" })
);
houseCube.position.y = 1.5;
houseCube.castShadow = true;

addWallTexture(houseCube);

house.add(houseCube);
scene.add(house);

//roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(4.5, 2, 4),
  new THREE.MeshStandardMaterial({ color: "#b35f45" })
);

roof.rotation.y = Math.PI * 0.25;
roof.position.y = 3.7;

addRoofTexture(roof);

house.add(roof);

//door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2, 100, 100),
  new THREE.MeshStandardMaterial({ color: "#c9c9c9" })
);
door.position.y = 1;
door.position.z = 2.48;

addDoorTexture(door);

house.add(door);

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({ color: "#a9c388" })
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;

floor.receiveShadow = true;

addGrassTexture(floor);

scene.add(floor);

//bushes

const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({ color: "#89c854" });

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);

const bushg1 = new THREE.Group();
bush1.scale.set(0.5, 0.5, 0.5);
bush2.scale.set(0.27, 0.27, 0.27);
bush3.scale.set(0.27, 0.27, 0.27);

bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;

//move 2 and 3
bush2.position.x = 0.5;
bush3.position.x = -0.5;
bush2.position.y = -0;
bush3.position.y = -0;
bushg1.add(bush1, bush2, bush3);
bushg1.position.set(1.7, 0.0, 2.5);

addGrassTexture(bush1);

const bushg2 = bushg1.clone();

bushg2.position.set(-1.7, 0.0, 2.5);

scene.add(bushg1, bushg2);

// Graves

const graves = new THREE.Group();

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({ color: "#b2b6b1" });

for (let i = 0; i < 20; i++) {
  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  const radius = 4 + Math.random() * 5;
  const angle = Math.random() * Math.PI * 2;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  grave.position.set(x, 0.4, z);
  grave.rotation.y = (Math.random() - 0.5) * 0.4;
  grave.castShadow = true;
  graves.add(grave);
}
scene.add(graves);

//ghost

const ghost1 = new THREE.PointLight("#ff00ff", 6, 3);
ghost1.castShadow = true;
ghost1.position.set(0, 1, 5);
scene.add(ghost1);

const ghost2 = new THREE.PointLight("#00ffff", 6, 3);
ghost2.castShadow = true;
ghost2.position.set(0, 1, 6);
scene.add(ghost2);

const ghost3 = new THREE.PointLight("#ffff00", 6, 3);
ghost3.castShadow = true;
ghost3.position.set(0, 1, 7);
scene.add(ghost3);

//fog

const fog = new THREE.Fog("#262837", 1, 15);
scene.fog = fog;

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#ffffff", 0.066);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight("#ffffff", 0);
moonLight.position.set(4, 5, -2);
gui.add(moonLight, "intensity").min(0).max(1).step(0.001);
gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);
scene.add(moonLight);

//door light

const doorLight = new THREE.PointLight("orange", 4);
doorLight.position.set(0, 1.6, 0.5);
doorLight.castShadow = true;
doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;

doorLight.shadow.camera.far = 13;
doorLight.shadow.camera.near = 1;
doorLight.shadow.camera.top = 2;
doorLight.shadow.camera.right = 2;
doorLight.shadow.camera.bottom = -2;
doorLight.shadow.camera.left = -2;

doorLight.shadow.radius = 5;
doorLight.shadow.mapSize.width = 900;
doorLight.shadow.mapSize.height = 900;

const cameraHelper = new THREE.CameraHelper(doorLight.shadow.camera);
const lightHelper = new THREE.PointLightHelper(doorLight);

cameraHelper.visible = false;
lightHelper.visible = false;

scene.add(cameraHelper);
scene.add(lightHelper);
door.add(doorLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

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
camera.position.x = 4.8;
camera.position.y = 2;
camera.position.z = 5.8;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//background

renderer.setClearColor("#262837");

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //update ghost

  const ghost1Angle = elapsedTime * 0.5;

  ghost1.position.x = Math.cos(ghost1Angle) * (5 + Math.sin(elapsedTime * 2.3));
  ghost1.position.z = Math.sin(ghost1Angle) * (5 + Math.sin(elapsedTime * 3.2));
  ghost1.position.y = Math.sin(elapsedTime * 4);

  const ghost2Angle = -elapsedTime * 0.4;

  ghost2.position.x = Math.cos(ghost2Angle) * (6 + Math.sin(elapsedTime * 3.4));
  ghost2.position.z = Math.sin(ghost2Angle) * (6 + Math.sin(elapsedTime * 4.4));
  ghost2.position.y = Math.sin(elapsedTime * 5.3);

  const ghost3Angle = -elapsedTime * 0.8;

  ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 3.6));
  ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 4.3));
  ghost3.position.y = Math.sin(elapsedTime * 3.5) + Math.sin(elapsedTime * 5.3);

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
