function createLight(){
	var light1 = new THREE.DirectionalLight(0xffffff,1.3);
	return light1;
}

function addLampBulb(obj, x,y,z) {
    'use strict';
    material = new THREE.MeshBasicMaterial({ color: 0xf3ff1e, wireframe: true });
    geometry = new THREE.SphereGeometry(2, 10, 10);
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