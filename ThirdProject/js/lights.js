function createLight(){
	var light1 = new THREE.DirectionalLight(0xffffff,1.3);
	return light1;
}



function spotLight(x, y, z){
	var spotlight = new THREE.SpotLight(0xffffff);
	spotlight.position.set(x, y-2, z);

	spotlight.castShadow = true;
	spotlight.shadow.mapSize.width = 1024;
	spotlight.shadow.mapSize.height = 1024;

	spotlight.shadow.camera.near = 50;
	spotlight.shadow.camera.far = 400;
	spotlight.shadow.camera.fov = 30;

	return spotlight;
}

function createSpotLight(x, y, z){

	'use strict';
    
    var spotLight = new THREE.Object3D();
    
    material = new THREE.MeshBasicMaterial({ color: 0xe5e3cc, wireframe: false });

    addCone(spotLight, x, y, z); 
    addBulb(spotLight, x, y-2 , z );

    
    
    spotLight.position.x = x;
    spotLight.position.y = y;
    spotLight.position.z = z;

    return spotLight;
}


function addBulb(obj, x,y,z) {
    'use strict';
    material = new THREE.MeshBasicMaterial({ color: 0xf3ff1e, wireframe: true });
    geometry = new THREE.SphereGeometry(1, 10, 10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);

    obj.add(mesh);
}


function addCone(obj, x,y,z) {
    'use strict';
    geometry = new THREE.ConeGeometry(2, 5, 20);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    

    obj.add(mesh);
}