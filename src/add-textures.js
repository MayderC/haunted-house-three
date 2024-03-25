import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();

export const addDoorTexture = (door) => {
  const doorTexture = textureLoader.load("/textures/door/color.jpg");
  const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
  const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
  const aoTexture = textureLoader.load("/textures/door/ambientOcclusion.jpg");
  const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
  const normalTexture = textureLoader.load("/textures/door/normal.jpg");
  const roughness = textureLoader.load("/textures/door/roughness.jpg");

  doorTexture.colorSpace = THREE.SRGBColorSpace;

  door.material.roughnessMap = roughness;
  door.material.normalMap = normalTexture;
  door.material.metalnessMap = metalnessTexture;
  door.material.aoMap = aoTexture;
  door.material.aoMapIntensity = 1;
  door.material.displacementMap = doorHeightTexture;
  door.material.displacementScale = 0.1;
  door.material.transparent = true;
  door.material.alphaMap = doorAlphaTexture;
  door.material.map = doorTexture;

  door.material.metalness = 0.1;
  door.material.roughness = 0.05;

  return door;
};

export const addWallTexture = (wall) => {
  // load brick texture
  const wallTexture = textureLoader.load("/textures/bricks/color.jpg");
  const wallNormalTexture = textureLoader.load("/textures/bricks/normal.jpg");
  const wallRoughnessTexture = textureLoader.load(
    "/textures/bricks/roughness.jpg"
  );
  const wallAmbientOcclusionTexture = textureLoader.load(
    "/textures/bricks/ambientOcclusion.jpg"
  );

  wallTexture.colorSpace = THREE.SRGBColorSpace;

  wall.material.map = wallTexture;
  wall.material.normalMap = wallNormalTexture;
  wall.material.roughnessMap = wallRoughnessTexture;
  wall.material.aoMap = wallAmbientOcclusionTexture;
  wall.material.aoMapIntensity = 1;

  return wall;
};

export const addRoofTexture = (roof) => {
  const roofTexture = textureLoader.load("/textures/roof/Roofbasecolor.jpg");
  const roofNormalTexture = textureLoader.load("/textures/roof/Roofnormal.jpg");
  const roofRoughnessTexture = textureLoader.load(
    "/textures/roof/Roofroughness.jpg"
  );
  const roofAmbientOcclusionTexture = textureLoader.load(
    "/textures/roof/RoofambientOcclusion.jpg"
  );

  //roofTexture.colorSpace = THREE.SRGBColorSpace;

  roof.material.map = roofTexture;
  roof.material.normalMap = roofNormalTexture;
  roof.material.roughnessMap = roofRoughnessTexture;
  roof.material.aoMap = roofAmbientOcclusionTexture;

  roof.material.aoMapIntensity = 1;

  //scale down the texture
  roofTexture.repeat.set(4, 4);
  roofNormalTexture.repeat.set(4, 4);
  roofRoughnessTexture.repeat.set(4, 4);
  roofAmbientOcclusionTexture.repeat.set(4, 4);

  roofTexture.wrapS = THREE.RepeatWrapping;
  roofTexture.wrapT = THREE.RepeatWrapping;

  roofNormalTexture.wrapS = THREE.RepeatWrapping;
  roofNormalTexture.wrapT = THREE.RepeatWrapping;

  roofRoughnessTexture.wrapS = THREE.RepeatWrapping;
  roofRoughnessTexture.wrapT = THREE.RepeatWrapping;

  roofAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
  roofAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;

  return roof;
};

export const addGrassTexture = (grass) => {
  const grassColorTexture = textureLoader.load("/textures/grass/color.jpg");
  const grassNormalTexture = textureLoader.load("/textures/grass/normal.jpg");
  const grassRoughnessTexture = textureLoader.load(
    "/textures/grass/roughness.jpg"
  );
  const ambientOcclusionTexture = textureLoader.load(
    "/textures/grass/ambientOcclusion.jpg"
  );

  grassColorTexture.colorSpace = THREE.SRGBColorSpace;

  grass.material.map = grassColorTexture;
  grass.material.normalMap = grassNormalTexture;
  grass.material.roughnessMap = grassRoughnessTexture;
  grass.material.aoMap = ambientOcclusionTexture;

  grass.material.aoMapIntensity = 1;

  // scale down the texture

  grassColorTexture.repeat.set(10, 10);
  grassNormalTexture.repeat.set(10, 10);
  grassRoughnessTexture.repeat.set(10, 10);
  ambientOcclusionTexture.repeat.set(10, 10);

  grassColorTexture.wrapS = THREE.RepeatWrapping;
  grassColorTexture.wrapT = THREE.RepeatWrapping;
  grassNormalTexture.wrapS = THREE.RepeatWrapping;
  grassNormalTexture.wrapT = THREE.RepeatWrapping;
  grassRoughnessTexture.wrapS = THREE.RepeatWrapping;
  grassRoughnessTexture.wrapT = THREE.RepeatWrapping;
  ambientOcclusionTexture.wrapS = THREE.RepeatWrapping;
  ambientOcclusionTexture.wrapT = THREE.RepeatWrapping;

  return grass;
};

export const addBushTexture = (bush) => {};
