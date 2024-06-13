import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
/**
 * House File
 * 
 * This file contains the code for house objects.
 * It utilises the Three.js scene graph, with 'THREE.Group' 
 * used to organise and group together different components of the house.
 * Various 3D objects like roofs, main buildings, bases, fences, bars, 
 * and light stands are created as meshes and added to the house group.
 *
 * @author Pik Sum Siu
 * 
 */
export function createHouse() {
    const house = new THREE.Group();

    // Create the roof
    var loader = new THREE.TextureLoader();
    loader.load(
        './textures/smoothRoof_basecolor.jpg',
        //Roof texture
        function (texture) {
            texture.repeat.set(5, 5);
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.rotation = -Math.PI / 25;

            var bumpMap = new THREE.TextureLoader().load('./textures/smoothRoof_height.png', function (bumpMap) {
                bumpMap.repeat.set(5, 5);
                bumpMap.wrapS = THREE.RepeatWrapping;
                bumpMap.wrapT = THREE.RepeatWrapping;
                bumpMap.rotation = -Math.PI / 25;
            });

            var roofMaterial = new THREE.MeshPhongMaterial({
                map: texture,
                bumpMap: bumpMap,

            });

            const roofGeometry = new THREE.ConeGeometry(20, 10, 4);
            const roof = new THREE.Mesh(roofGeometry, roofMaterial);
            roof.position.y = 16;
            roof.rotation.y = Math.PI / 4;
            roof.castShadow = true;
            roof.receiveShadow = true;
            house.add(roof);
            const roofBaseGeometry = new THREE.BoxGeometry(29, 0.8, 29);
            const roofBaseMaterial = new THREE.MeshPhongMaterial({ color: 0x3A605E });
            const roofBase = new THREE.Mesh(roofBaseGeometry, roofBaseMaterial);
            roofBase.position.y = 11;
            roofBase.castShadow = true;
            roofBase.receiveShadow = true;
            house.add(roofBase);

        }
    );

    // Create the main building

    //Main building texture
    loader.load('./textures/sideWall.jpg', function (texture) {
        var material_left = new THREE.MeshPhongMaterial({
            map: texture,
        });
        var material_right = new THREE.MeshPhongMaterial({
            map: texture,
        });
        var material_back = new THREE.MeshPhongMaterial({
            map: texture,
        });

        loader.load('./textures/door.jpg', function (texture) {
            var material_front = new THREE.MeshPhongMaterial({
                map: texture,
            });

            var allMaterials = [
                material_right,       // Right side
                material_left,        // Left side
                new THREE.MeshPhongMaterial({ color: 0xFDF7EB }), // Top side
                new THREE.MeshPhongMaterial({ color: 0xFDF7EB }), // Bottom side
                material_front,       // Front side
                material_back         // Back side
            ];

            const mainGeometry = new THREE.BoxGeometry(20, 15, 20);
            for (let i = 0; i < mainGeometry.faces.length; i++) {
                mainGeometry.faces[i].materialIndex = Math.floor(i / 2);
            }

            const mainBuilding = new THREE.Mesh(mainGeometry, allMaterials);
            mainBuilding.position.y = 4;
            mainBuilding.castShadow = true;
            mainBuilding.receiveShadow = true;
            house.add(mainBuilding);
        });
    });

    // Create the base

    //Base texture
    loader.load(
        './textures/wood.jpg',
        function (texture) {
            texture.repeat.set(5, 5);
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.rotation = -Math.PI / 25;

            var bumpMap = new THREE.TextureLoader().load('./textures/wood_height.png', function (bumpMap) {
                bumpMap.repeat.set(5, 5);
                bumpMap.wrapS = THREE.RepeatWrapping;
                bumpMap.wrapT = THREE.RepeatWrapping;
                bumpMap.rotation = -Math.PI / 25;
            });

            var baseMaterial = new THREE.MeshPhongMaterial({
                map: texture,
                bumpMap: bumpMap,

            });

            const baseGeometry = new THREE.BoxGeometry(35, 2, 35);
            const base = new THREE.Mesh(baseGeometry, baseMaterial);
            base.position.y = -4;
            base.castShadow = true;
            base.receiveShadow = true;
            house.add(base);

        }
    );

    // Create the fence
    const fenceGeometry = new THREE.CylinderGeometry(0.3, 0.3, 3, 10);
    const fenceMaterial = new THREE.MeshPhongMaterial({ color: 0x825930 });

    const houseWidth = 30;
    const houseDepth = 30;

    const fenceSpacing = 6;
    const clearAreaWidth = 25;

    // Create the fence bars
    const barGeometry = new THREE.CylinderGeometry(0.1, 0.1, houseWidth, 10);
    const barMaterial = new THREE.MeshPhongMaterial({ color: 0x825930 });


    // Create fence posts along the width of the house
    for (let i = 0; i <= houseWidth; i += fenceSpacing) {

        for (let z of [-houseDepth / 2, houseDepth / 2]) {
            // Skip creating fence posts in the clear area at the front
            if (z === houseDepth / 2 && Math.abs(i - houseWidth / 2) < clearAreaWidth / 2) {
                continue;
            }
            const fence = new THREE.Mesh(fenceGeometry, fenceMaterial);
            fence.position.set(i - houseWidth / 2, 1, z);
            fence.position.y = -2;
            fence.castShadow = true;
            fence.receiveShadow = true;
            house.add(fence);
        }
    }

    // Create fence posts along the depth of the house (left and right side of the house)
    for (let i = 0; i < houseDepth; i += fenceSpacing) {

        for (let x of [-houseWidth / 2, houseWidth / 2]) {
            const fence = new THREE.Mesh(fenceGeometry, fenceMaterial);
            fence.position.set(x, 1, i - houseDepth / 2);
            fence.position.y = -2;
            fence.castShadow = true;
            fence.receiveShadow = true;
            house.add(fence);
        }
    }

    // Create fence bars on top of the fence posts
    for (let z of [-houseDepth / 2, houseDepth / 2]) {
        const bar = new THREE.Mesh(barGeometry, barMaterial);
        bar.position.set(0, 1, z);
        bar.position.y = -1;
        bar.rotation.z = Math.PI / 2;
        bar.castShadow = true;
        bar.receiveShadow = true;

        //Skip the front
        if (z === houseDepth / 2 && Math.abs(bar.position.x) < clearAreaWidth / 2) {
            continue;
        }

        house.add(bar);
    }

    // Create bars on top of the fence posts along the depth of the house
    for (let x of [-houseWidth / 2, houseWidth / 2]) {
        const bar = new THREE.Mesh(barGeometry, barMaterial);
        bar.position.set(x, -1, 0);
        bar.rotation.x = Math.PI / 2;
        bar.castShadow = true;
        bar.receiveShadow = true;
        house.add(bar);
    }

    // Create the light stands

    // Create the light stands group
    const standsGroup = new THREE.Group();
    const positions = [
        { x: -20, y: 0, z: 20 },
        { x: 20, y: 0, z: 20 },
    ];

    for (let i = 0; i < positions.length; i++) {
        const standTopGeometry = new THREE.SphereGeometry(0.6, 32, 16);
        const standTopMaterial = new THREE.MeshPhongMaterial({ color: 0x888C8D });
        const standTop = new THREE.Mesh(standTopGeometry, standTopMaterial);
        standTop.position.set(positions[i].x, positions[i].y, positions[i].z);
        standTop.position.y = 3;
        standTop.castShadow = true;
        standsGroup.add(standTop);


        const standGeometry = new THREE.CylinderGeometry(1, 1.5, 1, 6);
        const standMaterial = new THREE.MeshPhongMaterial({ color: 0x888C8D });
        const stand = new THREE.Mesh(standGeometry, standMaterial);
        stand.position.set(positions[i].x, positions[i].y, positions[i].z);
        stand.position.y = 2;
        stand.castShadow = true;
        stand.receiveShadow = true;
        standsGroup.add(stand);

        const standMidGeometry = new THREE.BoxGeometry(1.3, 1.3, 1);
        const standMidMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFF2E, transparent: true, opacity: 0.5 });
        const standMid = new THREE.Mesh(standMidGeometry, standMidMaterial);
        standMid.position.set(positions[i].x, positions[i].y, positions[i].z);
        standMid.position.y = 1;
        standMid.castShadow = true;
        standMid.receiveShadow = true;
        standsGroup.add(standMid);

        const standBaseGeometry = new THREE.CylinderGeometry(1, 1.8, 6, 5);
        const standBase = new THREE.Mesh(standBaseGeometry, standMaterial);
        standBase.position.set(positions[i].x, positions[i].y, positions[i].z);
        standBase.position.y = -2.5;
        standBase.castShadow = true;
        standBase.receiveShadow = true;
        standsGroup.add(standBase);

    }


    house.add(standsGroup);


    return house;
}