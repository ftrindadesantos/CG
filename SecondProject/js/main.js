var camera, scene, renderer, chair, chairTop, chairBottom, speed=1;

const clock = new THREE.Clock();

var geometry, material, mesh;

var direction = new THREE.Vector3(1,0,0);

function createScene() {
    'use strict';

    scene = new THREE.Scene();

    scene.add(new THREE.AxisHelper(10));

    //chair = new THREE.Object3D();
    //chairBottom = new THREE.Object3D();
    //chairTop = new THREE.Object3D();

    //chair.add(chairTop);
    //chair.add(chairBottom);

    //chair.position.set(0, 4, 30);

    //createChairTop(0, 0, 0);
    //createChairBottom(0, 0, 0);

    //scene.add(chair);

    createField(0,0,0);
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


function animate() {
    'use strict';

    render();

    requestAnimationFrame(animate);

}
