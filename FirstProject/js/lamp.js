function addLampBase(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CylinderGeometry(4, 4, 3,10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y + 1, z);

    obj.add(mesh);
}

function addLampPole(obj, x,y,z) {
    'use strict';
    geometry = new THREE.CylinderGeometry(0.8, 0.8, 30,10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);

    obj.add(mesh);
}

function addLampPoleRot(obj, x,y,z) {
    'use strict';
    geometry = new THREE.CylinderGeometry(0.8, 0.8, 30,10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y -2, z-4.3);
    mesh.rotateX(-0.3);
    obj.add(mesh);
}

function addLampJunction(obj, x,y,z) {
    'use strict';
    geometry = new THREE.SphereGeometry(1.2, 10, 10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);

    obj.add(mesh);
}

function createLamp(x, y, z) {
    'use strict';
    
    var lamp = new THREE.Object3D();
    
    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

    addLampBase(lamp, x,y,z);
    addLampPole(lamp, x,y+16,z);
    addLampPoleRot(lamp, x,y + 48,z);
    addLampJunction(lamp, x,y + 32,z);

    scene.add(lamp);
    
    lamp.position.x = x;
    lamp.position.y = y;
    lamp.position.z = z;
}