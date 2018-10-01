function addChairSeat(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(15, 3, 15);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y+12, z);
    obj.add(mesh);
}
function addChairTop(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(3, 25, 15);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x-2, y+20, z);
    obj.add(mesh);
}

function addChairLeg(obj, x, y, z) {
    'use strict';

    geometry = new THREE.CylinderGeometry(1.5, 2, 15,10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y+4 , z);
    obj.add(mesh);
}

function addChairCubeWheels1(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(1, 1, 10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y+2, z);
    obj.add(mesh);
}
function addChairCubeWheels2(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(10, 1, 1);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y+2, z);
    obj.add(mesh);
}

function addChairWheels(obj, x, y, z) {
    'use strict';

    geometry = new THREE.TorusGeometry(0.8, 0.3,10 ,30);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y - 2.7    , z);
    obj.add(mesh);
}


function createBall(x, y, z) {
    'use strict';
    
    ball = new THREE.Object3D();
    ball.userData = { jumping: true, step: 0 };
    
    material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    geometry = new THREE.SphereGeometry(4, 10, 10);
    mesh = new THREE.Mesh(geometry, material);
    
    ball.add(mesh);
    ball.position.set(x, y, z);
    
    scene.add(ball);
}

function createChair(x, y, z) {
    'use strict';
    
    var chair = new THREE.Object3D();
    
    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
   
    addChairSeat(chair, 0, 3, 0);
    addChairLeg(chair, 0, 3, 0);
    addChairTop(chair,-4,9,0);
    addChairCubeWheels1(chair,0,-3,0);
    addChairCubeWheels2(chair,0,-3,0);
    addChairWheels(chair,5,0,-0.5);
    addChairWheels(chair,5,0,0.5);
    addChairWheels(chair,-5,0,0.5);
    addChairWheels(chair,-5,0,-0.5);
    addChairWheels(chair,0,0,5);
    addChairWheels(chair,0,0,-5);

   
    scene.add(chair);

    
    chair.position.x = x;
    chair.position.y = y;
    chair.position.z = z;
}
