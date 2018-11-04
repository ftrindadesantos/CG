function createField(x, y, z) {
    'use strict';

    var field = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({ color: 0x826032, wireframe: true });

    addFieldBottom(field, 0, 0, 0);
    addShortWall(field,0,0,48.75);
    addShortWall(field,0,0,-48.75);
    addLongWall(field,23.75,0,0);
    addLongWall(field,-23.75,0,0);

    scene.add(field);

    field.position.x = x;
    field.position.y = y;
    field.position.z = z;
}

function addFieldBottom(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(50, 0, 100);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addShortWall(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(50, 11.2, 2.5);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y + 11.2/2, z);
    obj.add(mesh);
}

function addLongWall(obj, x, y, z) {
    'use strict';
    geometry = new THREE.BoxGeometry(2.5, 11.2, 100);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y + 11.2/2, z);
    obj.add(mesh);
}
