var camera, scene, renderer, chair, chairTop, chairBottom, speed=1;

const clock = new THREE.Clock();

var geometry, material, mesh;

var direction = new THREE.Vector3(1,0,0);

function createScene() {
    'use strict';
    
    scene = new THREE.Scene();
    
    scene.add(new THREE.AxisHelper(10));


    chair = new THREE.Object3D();
    chairBottom = new THREE.Object3D();
    chairTop = new THREE.Object3D();

    chair.add(chairTop);
    chair.add(chairBottom);

    chair.position.set(0, 4, 30);

    createChairTop(0, 0, 0);
    createChairBottom(0, 0, 0);

    scene.add(chair);

    createTable(0, 8, 0);
    createLamp(15,0.7,-3);
    createTapete(0,0,0);
}

function createCamera(x,y,z) {
    'use strict';
    camera = new THREE.OrthographicCamera(100*(window.innerWidth / window.innerHeight)/-2,100*(window.innerWidth / window.innerHeight)/2,100*(window.innerWidth / window.innerHeight)/2,100*(window.innerWidth / window.innerHeight)/-2,1,1000);
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
    createCamera(100,100,100);

    
    render();
    

    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);    
    window.addEventListener("keyup", onKeyUp);
}

function animateChairTop(acceleration, delta) {
    'use strict';
    //console.log(acceleration, delta);
    if(chairTop.userData.direction.x != 0){
     updateVel(acceleration, delta);      
     updatePosition(chairTop);

    }
    
    if (chairTop.userData.left) {
        chairTop.rotateY(Math.PI / 40);
        direction.applyAxisAngle((0,1,0),Math.PI / 40);
    } else if (chairTop.userData.right) {
        chairTop.rotateY(-Math.PI / 40);
        direction.applyAxisAngle((0,1,0),-Math.PI / 40);
    }
}



function updatePosition(obj) {
    'use strict';

    var speed = obj.userData.speed;
    direction.applyAxisAngle(direction,chairTop.rotation.y);
    chair.translateX(speed * direction.getComponent(0)) ;
    chair.translateZ(speed * direction.getComponent(2)) ;
}



function updateVel(acceleration, delta) {
    'use strict';

    var vel_max = 0.5;

    if (!chairTop.userData.stopping && chairTop.userData.speed < vel_max) {
        var new_speed = chairTop.userData.speed + acceleration * delta;
        if (new_speed > vel_max)
            chairTop.userData.speed = vel_max;
        else
            chairTop.userData.speed = new_speed;

    } else if (chairTop.userData.stopping && chairTop.userData.speed > 0) {
        var new_speed = chairTop.userData.speed - acceleration * delta;
        if (new_speed < 0) {
            chairTop.userData.speed = 0;
            chairTop.userData.direction.setX(0);
        } else
            chairTop.userData.speed = new_speed;
    }
}

function animate() {
    'use strict';

    const acceleration = 0.5;
    const delta = clock.getDelta();

    animateChairTop(acceleration, delta);


    render();
    
    requestAnimationFrame(animate);

}