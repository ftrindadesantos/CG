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

    var aspect_ratio = window.innerWidth / window.innerHeight;
    var fov = 90;
    var near = 1;
    var far = 1000;

    follow_camera = new THREE.PerspectiveCamera(fov, aspect_ratio, near, far);
    follow_camera.position.x = -20;
    follow_camera.position.y = 20;
    follow_camera.position.z = 0;
    follow_camera.lookAt(firstBall.position);

    firstBall.add(follow_camera);



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

