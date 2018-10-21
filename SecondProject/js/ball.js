

function addBall(obj, x, y, z){

	'use strict';
    geometry = new THREE.SphereGeometry(11.2, 10, 10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);

    obj.add(mesh);

}


function createBall(x, y, z){
    'use strict';

    var ball = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });

    addBall(ball, 0, 0, 0);

    scene.add(ball);

    ball.position.x = x;
    ball.position.y = y;
    ball.position.z = z;

}
