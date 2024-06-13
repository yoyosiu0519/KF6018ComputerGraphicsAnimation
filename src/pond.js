import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
import { Water } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/objects/Water.js';
/**
 * Pond File
 * 
 * This file contains the code for the pond object. It uses the 'Water' class from the Three.js library 
 * to create a water body and added water normals to simulate water texture. 
 * Rocks are also added around the edge of the pond to make it look more realistic.
 *
 * @author Pik Sum Siu
 * 
 */

// Create the pond
export function createPond() {
    var waterGeometry = new THREE.CircleBufferGeometry(15, 15);
    var loader = new THREE.TextureLoader();
    var waterNormals = loader.load('./textures/waterNormals.jpg', function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    });
    var pond = new Water(waterGeometry, {
        color: 0x001e0f,
        waterNormals: waterNormals,
        scale: 4,
        flowDirection: new THREE.Vector2(-4, -1),
    });
    pond.rotation.x = -Math.PI / 2;

    return pond;
}

// Create the rocks around the edge of the pond
export function createRocks(rockCount, pondRadius, pondPosition) {
    var rocks = [];
    var angleStep = 2 * Math.PI / rockCount;

    for (var i = 0; i < rockCount; i++) {
        const rockSize = Math.random() * 1 + 2;
        var rockGeometry = new THREE.DodecahedronGeometry(rockSize, 0);
        var rockMaterial = new THREE.MeshStandardMaterial({ color: 0x5B5B5B });
        var rock = new THREE.Mesh(rockGeometry, rockMaterial);

        rock.position.x = pondPosition.x + pondRadius * Math.cos(i * angleStep);
        rock.position.z = pondPosition.z + pondRadius * Math.sin(i * angleStep);
        rock.position.y = pondPosition.y;

        rocks.push(rock);
    }

    return rocks;
}