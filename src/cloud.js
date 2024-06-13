import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
/**
 * Cloud File
 * 
 * This file contains the code for generating groups of clouds in various sizes.
 * A loop is used to generate randomisation for location.
 *
 * @author Pik Sum Siu
 * 
 */

// Create smaller clouds around the main cloud
function createSmallClouds(mainCloud) {
    const cloudGeometry = new THREE.IcosahedronGeometry(5, 0);
    const cloudMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, flatShading: true });
    const smallClouds = [];

    for (let i = 0; i < 2; i++) {
        const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
        cloud.position.x = mainCloud.position.x + (Math.random() - 0.5) * 20;
        cloud.position.y = mainCloud.position.y + (Math.random() - 0.5) * 20;
        cloud.position.z = mainCloud.position.z + (Math.random() - 0.5) * 20;
        cloud.scale.setScalar(Math.random() * 0.25 + 0.25);
        cloud.castShadow = true;
        smallClouds.push(cloud);
    }

    return smallClouds;
}

// Create the main clouds
export function createClouds() {
    const cloudGeometry = new THREE.IcosahedronGeometry(10, 0);
    const cloudMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, flatShading: true });
    const clouds = [];

    for (let i = 0; i < 12; i++) {
        const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
        cloud.position.x = (Math.random() - 0.5) * 100;
        cloud.position.y = Math.random() * 25 + 50;
        cloud.position.z = (Math.random() - 0.5) * 100;
        cloud.scale.setScalar(Math.random() * 0.5 + 0.5);
        cloud.castShadow = true;
        clouds.push(cloud);

        const smallClouds = createSmallClouds(cloud);
        clouds.push(...smallClouds);
    }

    return clouds;
}