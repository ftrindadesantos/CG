var camera, scene, renderer, chair, chairTop, chairBottom, speed=1;


var ortho_camera, prespect_camera, follow_camera;
var camera_height = 100;
var camera_width = 160;


const clock = new THREE.Clock();

var geometry, material, mesh;

var direction = new THREE.Vector3(1,0,0);



function createOrthoCamera() {
    'use strict';

    var aspect_ratio = window.innerWidth / window.innerHeight;
    var near = 1;
    var far = 500;
    var left, right, bottom, top;

    if (aspect_ratio < 1) {
        left = -camera_width / 2;
        right = camera_width / 2;
        bottom = -camera_width / (2*aspect_ratio);
        top = camera_width / (2*aspect_ratio);
    } else {
        left = -aspect_ratio * camera_height / 2;
        right = aspect_ratio * camera_height / 2;
        bottom = - camera_height / 2;
        top = camera_height / 2;
    }

    var tmp_camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);

    tmp_camera.position.x = 0;
    tmp_camera.position.y = 10;
    tmp_camera.position.z = 0;
    tmp_camera.lookAt(scene.position);
    return tmp_camera;
}

function createFollowPrespectiveCamera(){
	'use strict'




}


function createPrespectiveCamera() {
    'use strict';

    var aspect_ratio = window.innerWidth / window.innerHeight;
    var fov = 80;
    var near = 1;
    var far = 1000;

    var tmp_camera = new THREE.PerspectiveCamera(fov, aspect_ratio, near, far);
    tmp_camera.position.x = 100;
    tmp_camera.position.y = 80;
    tmp_camera.position.z = 70;
    tmp_camera.lookAt(scene.position);
    return tmp_camera;
}

function createCarCamera() {
    'use strict';

    var aspect_ratio = window.innerWidth / window.innerHeight;
    var fov = 90;
    var near = 1;
    var far = 100;

    //car_camera = new THREE.PerspectiveCamera(fov, aspect_ratio, near, far);
    //car_camera.position.x = -10;
    //car_camera.position.y = 10;
    //car_camera.position. z = 0;
    //car_camera.lookAt(car.position);
    //car.add(car_camera);
}



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

 	ortho_camera = createOrthoCamera();
    prespect_camera = createPrespectiveCamera();
    follow_camera = createFollowPrespectiveCamera();
    


    camera = ortho_camera;
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
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    createScene();
    	


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
