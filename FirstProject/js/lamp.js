function addLampBase(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CylinderGeometry(5, 5, 3,10);
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
    mesh.position.set(x-4.5, y-2, z+4);
    mesh.rotateX(0.3);
    mesh.rotateZ(0.3);
    obj.add(mesh);
}

function addLampJunction(obj, x,y,z) {
    'use strict';
    geometry = new THREE.SphereGeometry(1.2, 10, 10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);

    obj.add(mesh);
}

function addLampCone(obj, x,y,z) {
    'use strict';
    geometry = new THREE.ConeGeometry(4, 10, 20);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x-2, y-4, z);
    mesh.rotateX(0.3);
    mesh.rotateZ(-0.3);

    obj.add(mesh);
}

function addLampBulb(obj, x,y,z) {
    'use strict';
    geometry = new THREE.SphereGeometry(2, 10, 10);
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
    addLampJunction(lamp,x-9, y + 60, z+8.2);
    addLampCone(lamp,x-9, y + 60, z + 8.2);
    addLampBulb(lamp,x-9, y+ 60, z + 8.2);

    scene.add(lamp);
    
    lamp.position.x = x;
    lamp.position.y = y;
    lamp.position.z = z;
}