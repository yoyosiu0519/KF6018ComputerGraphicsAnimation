import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
/**
 * Ground Objects File
 * 
 * This file contains the code for generating the grass, ground and dirt layers.
 * A loop is used to group the grass together, this will be returned to create multiple grass patches.
 *
 * @author Pik Sum Siu
 * 
 */

// Create smaller clouds around the main cloud
export const floorMaterials = [];

// Create the ground layer
export function groundPlane() {
    const groundGeometry = new THREE.BoxGeometry(140, 3, 110);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x689F38 });
    floorMaterials.push(groundMaterial);
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.position.y = -1.5;
    ground.receiveShadow = true;
    return ground;
}

// Create the dirt layer
export function dirtPlane() {
    const dirtGeometry = new THREE.BoxGeometry(140, 5, 110);
    const dirtMaterial = new THREE.MeshStandardMaterial({ color: 0x964B00 });
    const dirt = new THREE.Mesh(dirtGeometry, dirtMaterial);
    dirt.position.y = -5.5;
    return dirt;
}

// Create the grass group
export function generateGrassGroup() {
    const group = new THREE.Group();

    for (let i = 0; i < 10; i++) {
        const geometry = new THREE.ConeGeometry(0.1, Math.random() * 0.8 + 0.8, Math.floor(Math.random() * 3) + 3);
        const material = new THREE.MeshStandardMaterial({ color: new THREE.Color(`hsl(${Math.random() * 40 + 80}, 100%, 35%)`) });
        const cone = new THREE.Mesh(geometry, material);

        cone.position.set(Math.random() - 0.3, 0.25, Math.random() - 0.5);
        group.add(cone);
    }

    return group;
}
