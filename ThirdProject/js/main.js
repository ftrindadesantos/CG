var camera, scene, renderer,  light, aux=0, aux1=0, planeObj, metalmaterial, glassmaterial, plane;

var spotlight1, spotlight2, spotlight3, spotlight4;
var light1, light2, light3, light4;
var l1 = 0, l2 = 0, l3 = 0, l4 = 0;

var ortho_camera, prespect_camera, follow_camera;
var camera_height = 100;
var camera_width = 160;


const clock = new THREE.Clock();

var geometry, material, mesh;
var plane;

var direction = new THREE.Vector3(1,0,0);


function createScene() {
    'use strict';
    scene = new THREE.Scene();

    planeObj = new THREE.Object3D();
    plane = new THREE.Object3D();
    metalmaterial = new THREE.Object3D();
    glassmaterial = new THREE.Object3D();



    scene.add(new THREE.AxisHelper(10));

    light = createLight();
    scene.add(light);

    
    
    planeObj.add(plane);
    planeObj.add(metalmaterial);
    planeObj.add(glassmaterial);
  
    setupMaterials();
    metalmaterial = metalmaterialPhong;
    glassmaterial = glassmaterialPhong;
    createPlane(0,0,0);

    ortho_camera = createOrthoCamera();
    prespect_camera = createPrespectiveCamera();
    camera = prespect_camera;

    scene.add(planeObj); 

    spotlight1 = createSpotLight( 20, 20, -20 );
    spotlight1.rotateX(-0.3);
    spotlight1.rotateZ(-0.3);
    light1 = spotLight(20, 20, -20);
    scene.add(light1);

   

    spotlight2 = createSpotLight( 20, 20, 20 );
    spotlight2.rotateX(0.3);
    spotlight2.rotateZ(-0.3);
    light2 = spotLight(20, 20, 20);
    scene.add(light2);
  

    spotlight3= createSpotLight( -20, 20, 20 );
    spotlight3.rotateX(0.3);
    spotlight3.rotateZ(0.3);
    light3 = spotLight(-20, 20, 20);
    scene.add(light3);
  

    spotlight4 = createSpotLight( -20, 20, -20 );
    spotlight4.rotateX(-0.3);
    spotlight4.rotateZ(0.3);
    light4 = spotLight(-20, 20, -20);
    scene.add(light4);

    scene.add(spotlight1);
    scene.add(spotlight2);
    scene.add(spotlight3);
    scene.add(spotlight4);

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


}



function animate() {
    'use strict';
    const delta = clock.getDelta();
    render();

	  var deltaTime = clock.getDelta() ;

    requestAnimationFrame(animate);

}
