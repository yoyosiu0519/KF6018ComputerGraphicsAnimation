import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
/**
 * Bamboo File
 * 
 * This file contains the code to create the bamboo, uses the texture mapping to create the bamboo.
 * A loop is used to generate a group of bamboo with random heights, widths and location randomisation.
 *
 * @author Pik Sum Siu
 * 
 */
export function createBamboo() {

    var loader = new THREE.TextureLoader();
    const bamboo = new THREE.Group();
    // Load bamboo texture
    loader.load(
        './textures/bamboo.jpg',

        function (texture) {
            texture.repeat.set(1, 3);
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;


            var bumpMap = new THREE.TextureLoader().load('./textures/bamboo_height.jpg', function (bumpMap) {
                bumpMap.repeat.set(1, 3);
                bumpMap.wrapS = THREE.RepeatWrapping;
                bumpMap.wrapT = THREE.RepeatWrapping;

            });

            var bambooMaterial = new THREE.MeshPhongMaterial({
                map: texture,
                bumpMap: bumpMap,

            });
            // Create a group of bamboo
            for (let i = 0; i < 10; i++) {
                // Generate random height and width
                const height = Math.random() * 5 + 20;
                const width = Math.random() * 0.3 + 0.5;

                const bambooGeometry = new THREE.CylinderGeometry(width, width, height, 32);
                const bambooGroup = new THREE.Mesh(bambooGeometry, bambooMaterial);
                // Generate random location
                const x = Math.random() * 30 + 25;
                const z = Math.random() * 25 - 20;
                const y = height / 2;

                bambooGroup.position.set(x, y, z);
                bambooGroup.castShadow = true;
                bambooGroup.receiveShadow = true;
                bamboo.add(bambooGroup);
            }

        }
    );

    return bamboo;
}