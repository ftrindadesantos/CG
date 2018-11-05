var camera, scene, renderer, firstBall,  ball_array, light, aux=0;


var ortho_camera, prespect_camera, follow_camera;
var camera_height = 100;
var camera_width = 160;


const clock = new THREE.Clock();

var geometry, material, mesh;
var plane;

var direction = new THREE.Vector3(1,0,0);


function createScene() {
    'use strict';
    plane = new THREE.Object3D();
    scene = new THREE.Scene();

    scene.add(new THREE.AxisHelper(10));




    light = createLight();
    scene.add(light);
    

    setupMaterials();

    createPlane(0,0,0);

    ortho_camera = createOrthoCamera();
    prespect_camera = createPrespectiveCamera();
    camera = prespect_camera;

    scene.add(plane);

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



function animate() {
    'use strict';
    const delta = clock.getDelta();
    render();

	  var deltaTime = clock.getDelta() ;

    requestAnimationFrame(animate);

}
