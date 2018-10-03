function addLampBase(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CylinderGeometry(5, 5, 2.5,10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y+1, z);

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

function addLampJunction2(obj, x,y,z) {
    'use strict';
    geometry = new THREE.SphereGeometry(2, 10, 10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);

    obj.add(mesh);
}

function addLampBulb(obj, x,y,z) {
    'use strict';
    material = new THREE.MeshBasicMaterial({ color: 0xf3ff1e, wireframe: true });
    geometry = new THREE.SphereGeometry(2, 10, 10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);

    obj.add(mesh);
}

function createLamp(x, y, z) {
    'use strict';
    
    var lamp = new THREE.Object3D();
    
    material = new THREE.MeshBasicMaterial({ color: 0xe5e3cc, wireframe: true });

    addLampBase(lamp, x,y-1,z);
    addLampPole(lamp, x,y+16,z);
    addLampPoleRot(lamp, x,y + 48,z);
    addLampJunction(lamp, x,y + 32,z);
    addLampJunction(lamp,x-9, y + 60, z+8.2);
    addLampCone(lamp,x-9, y + 60, z + 8.2);
    addLampJunction2(lamp,x-9, y+ 60, z + 8.2);
    addLampBulb(lamp,x-12.5, y+ 50.5, z + 7.2);

    scene.add(lamp);
    
    lamp.position.x = x;
    lamp.position.y = y;
    lamp.position.z = z;
}