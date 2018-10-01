/*global THREE, requestAnimationFrame, console*/

var camera, scene, renderer;

var geometry, material, mesh;

var ball;

function addTableLeg(obj, x, y, z) {
    'use strict';

    geometry = new THREE.CylinderGeometry(1, 1, 70,10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y - 3, z);
    obj.add(mesh);
}

function addTableTop(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(50, 2, 30);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addChairSeat(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(10, 2, 10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}
function addChairTop(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(2, 10, 10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addChairLeg(obj, x, y, z) {
    'use strict';

    geometry = new THREE.CylinderGeometry(2.5, 1.5, 7,10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y - 3, z);
    obj.add(mesh);
}

function addChairCubeWheels(obj, x, y, z) {
    'use strict';
    geometry = new THREE.CubeGeometry(7, 1, 1);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}


function addChairWheels(obj, x, y, z) {
    'use strict';

    geometry = new THREE.TorusGeometry(0.8, 0.3,10 ,30);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y - 3, z);
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
    addChairCubeWheels(chair,0,-3,0);
    //addChairCubeWheels(chair,0,-3,0);
    addChairWheels(chair,4,-5,0);
    //addChairWheels(chair,0,-7,0);

   
    scene.add(chair);

    
    chair.position.x = x;
    chair.position.y = y;
    chair.position.z = z;
}


function createTable(x, y, z) {
    'use strict';
    
    var table = new THREE.Object3D();
    
    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
   
    addTableTop(table, 0, 0, 0);
    addTableLeg(table, -25, -1, -8);
    addTableLeg(table, -25, -1, 8);
    addTableLeg(table, 25, -1, 8);
    addTableLeg(table, 25, -1, -8);
    
    scene.add(table);
    
    table.position.x = x;
    table.position.y = y;
    table.position.z = z;
}

function createScene() {
    'use strict';
    
    scene = new THREE.Scene();
    

    scene.add(new THREE.AxisHelper(10));
    
    createTable(0, 8, 0);
    
    createBall(0, 0, 15);

    createChair(10, 4, 20);
}

function createCamera(x,y,z) {
    'use strict';
    camera = new THREE.OrthographicCamera(50*(window.innerWidth / window.innerHeight)/-2,50*(window.innerWidth / window.innerHeight)/2,50*(window.innerWidth / window.innerHeight)/2,50*(window.innerWidth / window.innerHeight)/-2,1,1000);
    camera.position.x = x;
    camera.position.y = y;
    camera.position.z = z;
    camera.lookAt(scene.position);
}


function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);
    
    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

}

function onKeyDown(e) {
    'use strict';
    
    switch (e.keyCode) {
    case 65: //A
    case 97: //a
        scene.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
                node.material.wireframe = !node.material.wireframe;
            }
        });
        break;
    case 83:  //S
    case 115: //s
        ball.userData.jumping = !ball.userData.jumping;
        break;
    case 69:  //E
    case 101: //e 
        scene.traverse(function (node) {
            if (node instanceof THREE.AxisHelper) {
                node.visible = !node.visible;
            }
        });
        break;
    case 49: //1
    	createCamera(0,50,0);
    	break;
    case 50: //2
    	createCamera(0,0,50);
    	break;
    case 51: //3
    	createCamera(50,0,0);
    	break;
    case 52: //4 CAMERA PRINCIPAL
    	createCamera(50,50,50);
    	break;

 
    }
}

function render() {
    'use strict';
    renderer.render(scene, camera);
}

function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
   
    createScene();
    createCamera(50,50,50);

    
    render();
    
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);


}

function animate() {
    'use strict';
    render();
    
    requestAnimationFrame(animate);
}

