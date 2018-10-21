function addTapete (obj, x, y, z){
    'use strict';
    geometry = new THREE.CubeGeometry(150, 0, 100);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function createTapete(x, y, z) {
    'use strict';
    
    var tapete = new THREE.Object3D();
    
    material = new THREE.MeshBasicMaterial( {color: 0x555556, wireframe: true} );

    addTapete(tapete, 0, 0, 0);


    scene.add(tapete);

    
    tapete.position.x = x;
    tapete.position.y = y;
    tapete.position.z = z;
}
