import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
import * as dat from 'https://cdn.skypack.dev/dat.gui';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js';
import { groundPlane, dirtPlane, generateGrassGroup, floorMaterials } from './src/groundObjects.js';
import { createHouse } from './src/house.js';
import { createTrees, leafMaterials } from './src/tree.js';
import { createPond, createRocks } from './src/pond.js';
import { createClouds } from './src/cloud.js';
import { createSandRake } from './src/sandRake.js';
import { createBlossomPetals } from './src/blossomPetal.js';
import { createBamboo } from './src/bamboo.js';
/**
 * Main File
 * 
 * This is the main file for the project. It contains the code for creating the 
 * scene, camera, renderer, lights and returning objects to the scene.
 * It also contains the animation loop and GUI controls for the scene.
 * Blender models are also loaded into the scene using the GLTFLoader.
 *
 * @author Pik Sum Siu
 * 
 */

/**************************************Scene**************************************/
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.x = 53;
camera.position.y = 50;
camera.position.z = 150;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.75;
controls.screenSpacePanning = false;

/**************************************Background**************************************/

//Low poly background
const backgroundGeometry = new THREE.IcosahedronGeometry(800, 10); // Large radius, low detail
const backgroundMaterial = new THREE.MeshPhongMaterial({ color: 0x87CEEB, flatShading: true, side: THREE.BackSide }); // Use BackSide to render the inside of the geometry
const background = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
scene.add(background);


/**************************************GUI Control**************************************/
const gui = new dat.GUI();

//GUI Control - Add controls for camera position
const cameraFolder = gui.addFolder('Camera Position');
cameraFolder.add(camera.position, 'x', -200, 200);
cameraFolder.add(camera.position, 'y', -200, 200);
cameraFolder.add(camera.position, 'z', -200, 200);
cameraFolder.open();

// Define the seasons and their corresponding properties
const seasons = {
    Spring: {
        leavesColor: 0xe5acb6,
        floorColor: 0x7AB17C
    },
    Summer: {
        leavesColor: 0x228B22,
        floorColor: 0x689F38
    },
    Autumn: {
        leavesColor: 0xc26c11,
        floorColor: 0xA5BD54
    },
    Winter: {
        leavesColor: 0xFFFFFF,
        floorColor: 0xFFFFFF
    }
};

// Create an object to hold the current season
const currentSeason = { season: 'Summer' };

// GUI for the season
const seasonFolder = gui.addFolder('Season');
seasonFolder.add(currentSeason, 'season', ['Summer', 'Autumn', 'Winter', 'Spring']).name('Season').onChange((season) => {
    const newColor = new THREE.Color(seasons[season].leavesColor);
    const newFloorColor = new THREE.Color(seasons[season].floorColor);
    leafMaterials.forEach(material => material.color.set(newColor));
    floorMaterials.forEach(material => material.color.set(newFloorColor));
});
seasonFolder.open();

// Create an object to hold the current time of day
const currentDayTime = { timeOfDay: 'Day' };

// Times of day and their corresponding colors
const timesOfDay = {
    Day: { skyColor: 0xDAF0FF, groundColor: 0xE3FDCF, intensity: 0.7 },
    Evening: { skyColor: 0xFF7F50, groundColor: 0x808080, intensity: 0.5 },
    Night: { skyColor: 0x000033, groundColor: 0x000000, intensity: 0.5 }
};

// GUI for the time of day
const backgroundFolder = gui.addFolder('Background');
backgroundFolder.add(currentDayTime, 'timeOfDay', ['Day', 'Evening', 'Night']).name('Time of Day').onChange((timeOfDay) => {

    backgroundMaterial.color.set(timesOfDay[timeOfDay]);
    hemiLight.color.set(timesOfDay[timeOfDay].skyColor);
    hemiLight.groundColor.set(timesOfDay[timeOfDay].groundColor);
    hemiLight.intensity = timesOfDay[timeOfDay].intensity;

    // If the time of day is 'Night', add the point lights to the scene
    if (timeOfDay === 'Night') {
        for (let i = 0; i < pointLights.length; i++) {
            scene.add(pointLights[i]);
        }
    } else {
        for (let i = 0; i < pointLights.length; i++) {
            scene.remove(pointLights[i]);
        }
    }
});
backgroundFolder.open();

//GUI for the light position
function addGuiControls(light) {
    const lightFolder = gui.addFolder('Light Position');
    lightFolder.add(light.position, 'x', -50, 50).name('X');
    lightFolder.add(light.position, 'y', -50, 50).name('Y');
    lightFolder.add(light.position, 'z', -50, 50).name('Z');
    lightFolder.open();
}

//GUI for the reload scene
gui.add({ reloadScene: function() { location.reload(); } }, 'reloadScene').name('Reload Scene');

/**************************************Objects**************************************/
// Create Ground Plane Group
const groundGroup = new THREE.Group();
const ground = groundPlane();
const dirt = dirtPlane();
groundGroup.add(ground, dirt);
scene.add(groundGroup);

// Create a house
const house = createHouse();
house.position.set(-25, 5, -20);
scene.add(house);

// Create a pond
var pondRadius = 15;
var pondPosition = new THREE.Vector3(40, 0.1, 35);
const pond = createPond();
pond.position.copy(pondPosition);
scene.add(pond);
var rocks = createRocks(25, pondRadius, pondPosition);
rocks.forEach(rock => scene.add(rock));

// Create multiple grass patches
for (let i = 0; i < 400; i++) {
    const grassGroup = generateGrassGroup();

    var grassPosition = new THREE.Vector3(Math.random() * 135 - 70, 0.25, Math.random() * 108 - 55);
    if (grassPosition.distanceTo(pondPosition) < pondRadius) {
        continue;
    }
    grassGroup.position.copy(grassPosition);
    groundGroup.add(grassGroup);
}

// Create trees
const trees = createTrees();
trees.forEach(tree => scene.add(tree));

// Create clouds
const clouds = createClouds();
clouds.forEach(cloud => scene.add(cloud));

// Create sand rakes
const sandRake = createSandRake();
scene.add(sandRake);

// Create bamboo
const bamboo = createBamboo();
scene.add(bamboo);

// Create the petals
const petals = createBlossomPetals(150);
petals.forEach(petal => scene.add(petal));

/**************************************Blender**************************************/
//Create a loader
const loader = new GLTFLoader();

// Load your .glb or .gltf file
loader.load(
    'blender/well.glb',
    function (gltf) {
        gltf.scene.position.set(7, 0, -38);
        gltf.scene.rotation.y = Math.PI / 2;
        scene.add(gltf.scene);
    },
    undefined,
    function (error) {
        console.error(error);
    }
);

/**************************************Light & Shadow**************************************/
// Create a directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 20, 5);
scene.add(directionalLight);
addGuiControls(directionalLight);

// Create a hemisphere light
const hemiLight = new THREE.HemisphereLight(
    timesOfDay[currentDayTime.timeOfDay].skyColor,
    timesOfDay[currentDayTime.timeOfDay].groundColor,
    timesOfDay[currentDayTime.timeOfDay].intensity
);
scene.add(hemiLight);

// Create point lights
const positions = [
    { x: -45, y: 5, z: 4 },
    { x: -5, y: 5, z: 4 },
];

let pointLights = [];

for (let i = 0; i < positions.length; i++) {
    const pointLight = new THREE.PointLight(0xffffff, 1, 50);
    pointLight.position.set(positions[i].x, positions[i].y, positions[i].z);
    pointLights.push(pointLight);
}

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 512;
directionalLight.shadow.mapSize.height = 512;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 500;
directionalLight.shadow.radius = 10.0;
directionalLight.shadow.camera.left = -60;
directionalLight.shadow.camera.right = 60;
directionalLight.shadow.camera.top = 60;
directionalLight.shadow.camera.bottom = -60;
directionalLight.shadow.radius = 10.0;


/**************************************Animate**************************************/

console.log("Define the animation function");
var iFrame = 0;

function animate() {
    requestAnimationFrame(animate);

    // Check if the current season is Spring
    const isSpring = currentSeason.season === 'Spring';


    // Animate the movement of the petals
    petals.forEach(petal => {
        petal.visible = isSpring;
        if (isSpring) {
            petal.position.y -= petal.speed;
            petal.rotation.x += petal.rotationSpeed;
            petal.rotation.y += petal.rotationSpeed;
        }
        if (petal.position.y < 0) {
            petal.position.y = 20;
        }
    });

    iFrame++;
    controls.update();
    renderer.render(scene, camera);
}
animate();
