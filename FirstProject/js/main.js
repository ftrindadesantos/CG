var camera, scene, renderer, chair, chairTop, chairBottom;

var geometry, material, mesh;

function createScene() {
    'use strict';
    
    scene = new THREE.Scene();
    
    scene.add(new THREE.AxisHelper(10));


    chair = new THREE.Object3D();
    chairBottom = new THREE.Object3D();
    chairTop = new THREE.Object3D();

    chair.add(chairTop);
    chair.add(chairBottom);

    scene.add(chair);

    createChairTop(0, 4, 30);
    createChairBottom(0, 4, 30);
    
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
    
    window.addEventListener("keydown", onKeyDown);    
    window.addEventListener("resize", onResize);
}

function animateChairTop(acceleration, delta) {
    'use strict';

    if (chairTop.userData.direction.x !== 0) {
        newSpeed(acceleration, delta);
    }
    if (chairTop.userData.left) {
        car.rotateY(Math.PI / 40);
    } else if (chairTop.userData.right) {
        car.rotateY(-Math.PI / 40);
    }
}

function newSpeed(acceleration, delta) {
    'use strict';

    var vel_max = 0.5;

    if (!chairTop.userData.stopping && chairTop.userData.speed < vel_max) {
        var new_speed = c.userData.speed + acceleration * delta;
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
    render();
    
    requestAnimationFrame(animate);

}