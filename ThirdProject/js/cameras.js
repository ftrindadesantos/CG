
function createPrespectiveCamera() {
    'use strict';

    var aspect_ratio = window.innerWidth / window.innerHeight;
    var fov = 100;
    var near = 1;
    var far = 1000;

    var tmp_camera = new THREE.PerspectiveCamera(fov, aspect_ratio, near, far);
    tmp_camera.position.x = 70;
    tmp_camera.position.y = 50;
    tmp_camera.position.z = 30;
    tmp_camera.lookAt(scene.position);
    return tmp_camera;
}

