var camera, scene, renderer, firstBall,  ball_array;


var ortho_camera, prespect_camera, follow_camera;
var camera_height = 100;
var camera_width = 160;


const clock = new THREE.Clock();

var geometry, material, mesh;

var direction = new THREE.Vector3(1,0,0);


function checkBallCollision (obj1, obj2){
    "use strict";
    var r1 = obj1.getObjectByName("Bounding Sphere").geometry.boundingSphere.radius;
    var r2 = obj2.getObjectByName("Bounding Sphere").geometry.boundingSphere.radius;
    var distance = obj1.getWorldPosition().distanceTo(obj2.getWorldPosition());
    return Math.pow((r1 + r2), 2) >= Math.pow(distance, 2);
}

function checkWallColision(obj1){
    "use strict";
    var r1 = obj1.getObjectByName("Bounding Sphere").geometry.boundingSphere.radius;
    var p1 = obj1.getWorldPosition();

    if(obj1.position.x - r1 <= -23.75){
      //Colidir
      console.log("Colidi Atrás");
      return true;
    }
    if(obj1.position.x + r1 >= 23.75){
      //Colidir
      console.log("Colidi Frente");
      return true;
    }
    if(obj1.position.z - r1 <= -48.75){
      //Colidir
      console.log("Colidi Atrás");
      return true;
    }
    if(obj1.position.z + r1 >= 48.75){
      //Colidir
      console.log("Colidi Frente");
      return true;
    }

    return false;
}

function createScene() {
    'use strict';

    ball_array = new Array(0);

    scene = new THREE.Scene();

    scene.add(new THREE.AxisHelper(10));

    createFirstBall();
    createField(0,0,0);
    createBalls();

    ortho_camera = createOrthoCamera();
    prespect_camera = createPrespectiveCamera();
    camera = ortho_camera;


}


function onResize() {

    'use strict';

    var aspect_ratio = window.innerWidth / window.innerHeight;

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (camera === ortho_camera) {
        if (aspect_ratio >= 1) {
            camera.left   = -aspect_ratio * camera_height / 2;
            camera.right  =  aspect_ratio * camera_height / 2;
            camera.bottom = -camera_height / 2;
            camera.top    =  camera_height / 2;
        } else {
            camera.left   = -camera_width / 2;
            camera.right  =  camera_width / 2;
            camera.bottom = -camera_width / (2 * aspect_ratio);
            camera.top    =  camera_width / (2 * aspect_ratio);
        }
    } else {
        camera.aspect = renderer.getSize().width / renderer.getSize().height;
    }

    camera.updateProjectionMatrix();
}



function render() {
    'use strict';
    renderer.render(scene, camera);
}

function init() {
    'use strict';

    ball_array = null;

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    createScene();



    render();


    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);


}




function animateBall(delta) {
    'use strict';
    var b;


    for (var i = 0; i < ball_array.length; i++) {
        b = ball_array[i];
        b.userData.time += delta;
        if (b.userData.time > 1.5) {
            b.userData.speed = b.userData.speed * 1.01;
        }
        updatePosition(b);
        //getRotation(b);
        
    }
}


function updatePosition(obj) {

    'use strict';

    var speed = obj.userData.speed;

    //if(validBallPosition(obj)== false){
      //obj.userData.direction.applyEuler(Math.PI);
    //}

    obj.translateX(speed * obj.userData.direction.getComponent(0)) ;
    obj.translateZ(speed * obj.userData.direction.getComponent(2)) ;
}

function getRotation(obj){
    'use strict';

    var speed = obj.userData.speed;
    var dirX = obj.userData.direction.getComponent(0) * speed;
    var angleX = dirX / (Math.PI * 2) * Math.PI;
    obj.rotateX(angleX);
    var dirZ = obj.userData.direction.getComponent(2) * speed;
    var angleZ = dirZ / (Math.PI * 2) * Math.PI;
    obj.rotateZ(angleZ);
}



function animate() {
    'use strict';
    const delta = clock.getDelta();
    animateBall(delta);
    render();

	var deltaTime = clock.getDelta() ;
  
    requestAnimationFrame(animate);

}
