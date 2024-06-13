import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
/**
 * Tree File
 * 
 * This file contains the code for creating groups of trees. 
 * Each tree is represented as a Three.js Group, combining trunk and different sizes of leaves.
 *
 * @author Pik Sum Siu
 * 
 */
export const leafMaterials = [];

// Create the trees
export function createTrees() {
    const positions = [
        { x: -50, y: 0, z: -25 },
        { x: 42, y: 0, z: 18 },
        { x: 20, y: 0, z: -50 },
        { x: 30, y: 0, z: -30 },
        { x: 60, y: 0, z: 40 },
        { x: 10, y: 0, z: -10 },
        { x: 45, y: 0, z: -40 },
        { x: -53, y: 0.1, z: 13 },
    ];

    const trees = positions.map(position => {
        const tree = new THREE.Group();

        // Create the trunk
        const trunkHeight = 20;
        const trunkGeometry = new THREE.CylinderGeometry(0.6, 1, trunkHeight, 8);
        const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.y = 6;
        trunk.castShadow = true;
        trunk.receiveShadow = true;
        tree.add(trunk);

        // Create the leaves
        const leavesSize = Math.random() * 4 + 5;
        const leavesGeometry = new THREE.DodecahedronGeometry(leavesSize, 0);
        const leavesMaterial = new THREE.MeshPhongMaterial({ color: 0x228B22 });
        leafMaterials.push(leavesMaterial);
        const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
        leaves.position.y = 21;
        leaves.rotation.y = Math.random() * 2 * Math.PI;
        leaves.castShadow = true;
        leaves.receiveShadow = true;
        tree.add(leaves);

        // Create the smaller leaves
        const leavesSmallSize = Math.random() * 4 + 3;
        const leavesSmallGeometry = new THREE.DodecahedronGeometry(leavesSmallSize, 0);
        const leavesSmallMaterial = new THREE.MeshPhongMaterial({ color: 0x228B22 });
        leafMaterials.push(leavesSmallMaterial);
        const leavesSmall = new THREE.Mesh(leavesSmallGeometry, leavesSmallMaterial);
        leavesSmall.position.y = 21;
        leavesSmall.position.x = 5;
        leavesSmall.rotation.y = Math.random() * 2 * Math.PI;
        leavesSmall.castShadow = true;
        leavesSmall.receiveShadow = true;
        tree.add(leavesSmall);

        tree.position.set(position.x, position.y, position.z);

        return tree;
    });

    return trees;
}
