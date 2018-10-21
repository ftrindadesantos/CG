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
    createBall(0,0,0);
    

}

function addBall(obj, x, y, z){

    'use strict';
    geometry = new THREE.SphereGeometry(5.6, 10, 10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);

    obj.add(mesh);

    //bounding sphere
    material = new THREE.MeshBasicMaterial( {visible: false} );
    var boundingSphere = new THREE.Mesh(new THREE.SphereGeometry(5.6, 10, 10), material);
    boundingSphere.position.set(0, 0, 0);
    obj.add(boundingSphere);


}


function createBall(x, y, z){
    'use strict';

    var ball = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });

    addBall(ball, 0, 5.6, 0);

    scene.add(ball);

    ball.position.x = x;
    ball.position.y = y;
    ball.position.z = z;

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
