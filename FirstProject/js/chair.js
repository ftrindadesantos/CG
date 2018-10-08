function addChairSeat(obj, x, y, z) {
    'use strict';

    material = new THREE.MeshBasicMaterial({ color: 0x2a2a6d, wireframe: true });

    geometry = new THREE.CubeGeometry(15, 3, 15);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y+12, z);
    obj.add(mesh);
}
function addChairTop(obj, x, y, z) {
    'use strict';

    material = new THREE.MeshBasicMaterial({ color: 0x2a2a6d, wireframe: true });
    
    
    
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



function createChairTop(x, y, z) {
    'use strict';
    
    var chair = new THREE.Object3D();
    material = new THREE.MeshBasicMaterial({ color: 0xbfbc9c, wireframe: true });



    chairTop.userData = {direction: new THREE.Vector3(0,0,0),
                    speed: 0,
                    left: false,
                    right: false,
                    stopping: false};


    addChairSeat(chair, 0, 3,0);
    addChairTop(chair,-4,9,0);
   
    chairTop.add(chair);

    
    chair.position.x = x;
    chair.position.y = y;
    chair.position.z = z;
}


function createChairBottom(x, y, z) {
    'use strict';
    
    var chair = new THREE.Object3D();
    material = new THREE.MeshBasicMaterial({ color: 0xbfbc9c, wireframe: true });
    
    
    addChairLeg(chair, 0, 3, 0);
    addChairCubeWheels1(chair,0,-3,0);
    addChairCubeWheels2(chair,0,-3,0);
    addChairWheels(chair,5,0,-0.5);
    addChairWheels(chair,5,0,0.5);
    addChairWheels(chair,-5,0,0.5);
    addChairWheels(chair,-5,0,-0.5);
    addChairWheels(chair,0,0,5.5);
    addChairWheels(chair,0,0,4.5);
    addChairWheels(chair,0,0,-5.5);
    addChairWheels(chair,0,0,-4.5);

   
    chairBottom.add(chair);

    
    chair.position.x = x;
    chair.position.y = y;
    chair.position.z = z;
}

