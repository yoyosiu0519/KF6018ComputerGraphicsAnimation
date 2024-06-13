import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
/**
 * Blossom Petal File
 * 
 * This file contains the code to create the falling petals for the cherry blossom tree.
 * This is only triggered when the user selects 'Spring' season.
 * It uses rotation to mimic the movement of falling petals.
 * A loop is used to generate a group of petals with randomisation for location and speed.
 *
 * @author Pik Sum Siu
 * 
 */
export function createBlossomPetals(numPetals) {
    // An array to hold the petals
    const petals = [];

    for (let i = 0; i < numPetals; i++) {
        // Create the petal
        const petalShape = new THREE.Shape();
        petalShape.absellipse(0, 0, 0.5, 1, 0, Math.PI * 2, false, 0);
        const petalGeometry = new THREE.ShapeGeometry(petalShape);
        const petalMaterial = new THREE.MeshBasicMaterial({ color: 0xFFC0CB });
        const petal = new THREE.Mesh(petalGeometry, petalMaterial);

        //Setting for the petals
        petal.position.set(Math.random() * 100 - 50, Math.random() * 20, Math.random() * 100 - 50);
        petal.speed = Math.random() * 0.5 + 0.1;
        petal.rotationSpeed = Math.random() * 0.1 + 0.05;
        petal.receiveShadow = true;
        petal.castShadow = true;

        petals.push(petal);
    }

    return petals;
}