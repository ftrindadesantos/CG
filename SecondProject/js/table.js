function addTableLeg(obj, x, y, z) {
    'use strict';

    geometry = new THREE.CylinderGeometry(1.5, 1.5,35,10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y+10.5, z);
    obj.add(mesh);
}

function addTableTop(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(55, 2, 33);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y+26, z);
    obj.add(mesh);
}

function createTable(x, y, z) {
    'use strict';

    var table = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({ color: 0x826032, wireframe: true });

    addTableTop(table, 0, 0, 0);
    addTableLeg(table, -26, -1, -15);
    addTableLeg(table, -26, -1, 15);
    addTableLeg(table, 26, -1, 15);
    addTableLeg(table, 26, -1, -15);

    scene.add(table);

    table.position.x = x;
    table.position.y = y;
    table.position.z = z;
}
