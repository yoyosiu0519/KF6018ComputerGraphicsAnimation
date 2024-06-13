import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
/**
 * Sand Rake File
 * 
 * This file contains the code for creating sand rake elements to be used in the scene.
 *
 * @author Pik Sum Siu
 * 
 */

export function createSandRake() {
    const sandRake = new THREE.Group();
    const positions = [
        { x: -50, y: 0.1, z: 25 },
        { x: -35, y: 0.14, z: 36 },
        { x: -20, y: 0.19, z: 25 },
    ];

    var loader = new THREE.TextureLoader();
    loader.load(
        './textures/sandRaking.jpg',

        function (texture) {

            var bumpMap = new THREE.TextureLoader().load('./textures/sandRaking_height.jpg', function (bumpMap) {
                bumpMap.repeat.set(5, 5);
                bumpMap.wrapS = THREE.RepeatWrapping;
                bumpMap.wrapT = THREE.RepeatWrapping;
                bumpMap.rotation = -Math.PI / 25;
            });

            var sandMaterial = new THREE.MeshStandardMaterial({
                map: texture,
                bumpMap: bumpMap,
            });

            for (let i = 0; i < positions.length; i++) {
                const size = 14 + i * 2;
                const sandGeometry = new THREE.CircleGeometry(size, 22);
                const sand = new THREE.Mesh(sandGeometry, sandMaterial);
                sand.position.set(positions[i].x, positions[i].y, positions[i].z);
                sand.rotation.x = 270 * (Math.PI / 180);
                sand.castShadow = true;
                sand.receiveShadow = true;
                sandRake.add(sand);
            }
        }
    );

    return sandRake;
}