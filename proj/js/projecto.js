/*
 * global variables
 */

var camera, ortho_camera, static_camera, car_camera;
var camera_height = 100;
var camera_width = 160;

var scene, renderer;
const clock = new THREE.Clock();
var speed = 1;

var car;
var torus_array, butter_array, orange_array, plight_array, lives_array;
var butter_num;
var orange_num;
var lives_num;

var plight_flag;
var light_calc_flag;
var shader_flag;
var current_material;
var previous_material;

var game_paused;
var game_ended;

/*
 * scene creation
 */

function createTable(x, y, z) {
    'use strict';

    var i;
    var table = new THREE.Object3D();
    torus_array = new Array(0);
    butter_array = new Array(0);
    orange_array = new Array(0);

    addTableTop(table, 0, -10, 0);
    createTrack();

    for(i=0; i < butter_num; i++)
        addButter((Math.random()*97)-48.5, 0.5, (Math.random()*98)-49);

    for(i=0; i < orange_num; i++)
        addOrange((Math.random()*98)-49, 2, (Math.random()*98)-49);

    table.name = "Table";
    scene.add(table);
    table.position.x = x;
    table.position.y = y;
    table.position.z = z;
}


function addTableTop(obj, x, y, z) {
    'use strict';
    var texture = new THREE.TextureLoader().load('textures/red-white-tablecloth.jpg');
    var material = new THREE.MeshBasicMaterial( { map: texture } );
    var geometry = new THREE.CubeGeometry(100, 20, 100);
    var mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(x, y, z);
    obj.add(mesh);
}


function createTrack() {
    'use strict';

    for (var angle = 0; angle < 2*Math.PI; angle += Math.PI / 20) {
        if (angle % (Math.PI / 10) == 0)
            addTorus(25*Math.cos(angle), 0.25, 25*Math.sin(angle));

        addTorus(40*Math.cos(angle), 0.25, 40*Math.sin(angle));
    }
}


function addTorus(x, y, z) {
    'use strict';

    var torus = new THREE.Object3D();
    torus.name = "Torus";
    torus.userData = {direction: new THREE.Vector3(0, 0, 0),
                      speed: 0};
    var material = new THREE.MeshBasicMaterial({ color: 0xE9C40C });
    var geometry = new THREE.TorusGeometry(1, 0.5, 15, 30);
    var mesh = new THREE.Mesh(geometry, material);

    mesh.rotateX(Math.PI / 2);
    torus.add(mesh);
    torus.position.set(x, y, z);

    //bounding sphere
    material = new THREE.MeshBasicMaterial( {visible: false} );
    var bounding_sphere = new THREE.Mesh(new THREE.SphereGeometry(1.25, 15, 15), material);
    bounding_sphere.name = "Bounding Sphere";
    bounding_sphere.position.set(0,0,0);
    torus.add(bounding_sphere);

    torus_array.push(torus);

    scene.add(torus);
}


function createCar(x, y, z) {
    'use strict';

    car = new THREE.Object3D();
    //car.add(new THREE.AxisHelper(10));
    car.name = "Car";
    car.userData = {direction: new THREE.Vector3(0, 0, 0),
                    speed: 0,
                    left: false,
                    right: false,
                    stopping: false,
                    lives: 5};

    addCar(car, 0, 2.5, 0);
    addWheels(car, -2, 1.1, -1.5-0.5); //-2.5 - 0.5 pq e qd o carro acaba mais largura do toru
    addWheels(car, -2, 1.1, 1.5+0.5);
    addWheels(car, 2.25, 1.1, -1.5-0.5);
    addWheels(car, 2.25, 1.1, 1.5+0.5);
    addCarLight(car, 3.5, 2, -1.25);
    addCarLight(car, 3.5, 2, 1.25);

    createCarCamera();

    //car.rotateY(Math.PI/2);
    car.position.x = x;
    car.position.y = y;
    car.position.z = z;

    scene.add(car);
}


function createLives(x, y, z) {
    'use strict';

    var life = new THREE.Object3D();
    life.name = "Life";

    addCar(life, 0, 2.5, 0);
    addWheels(life, -2, 1.1, -1.5-0.5); //-2.5 - 0.5 pq e qd o carro acaba mais largura do toru
    addWheels(life, -2, 1.1, 1.5+0.5);
    addWheels(life, 2.25, 1.1, -1.5-0.5);
    addWheels(life, 2.25, 1.1, 1.5+0.5);

    life.rotateY(Math.PI/2);
    life.position.x = x;
    life.position.y = y;
    life.position.z = z;

    scene.add(life);
    return life;
}


function addCar(obj, x, y, z) {
  'use strict';

  var material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
  var geometry = new THREE.CubeGeometry(5, 4, 3.5);
  var mesh = new THREE.Mesh(geometry, material);

  var material = new THREE.MeshBasicMaterial({color: 0x5E1111});
  var geometry = new THREE.Geometry();

  //addBody
  geometry.vertices.push(new THREE.Vector3(1.5,1.25,1.5));    //0
  geometry.vertices.push(new THREE.Vector3(1.5,1.25,-1.5));   //1
  geometry.vertices.push(new THREE.Vector3(-1.5,1.25,-1.5));  //2
  geometry.vertices.push(new THREE.Vector3(-1.5,1.25,1.5));   //3
  geometry.vertices.push(new THREE.Vector3(1.5,-1.25,1.5));   //4
  geometry.vertices.push(new THREE.Vector3(1.5,-1.25,-1.5));  //5
  geometry.vertices.push(new THREE.Vector3(-1.5,-1.25,-1.5)); //6
  geometry.vertices.push(new THREE.Vector3(-1.5,-1.25,1.5));  //7
  geometry.vertices.push(new THREE.Vector3(1.5,0,1.5));       //8
  geometry.vertices.push(new THREE.Vector3(1.5,0,-1.5));      //9
  geometry.vertices.push(new THREE.Vector3(3.5,-0.25,-1.5));  //10
  geometry.vertices.push(new THREE.Vector3(3.5,-0.25,1.5));   //11
  geometry.vertices.push(new THREE.Vector3(3.5,-1.25,1.5));   //12
  geometry.vertices.push(new THREE.Vector3(3.5,-1.25,-1.5));  //13
  geometry.vertices.push(new THREE.Vector3(0.75,2,0.75));     //14
  geometry.vertices.push(new THREE.Vector3(0.75,2,-0.75));    //15
  geometry.vertices.push(new THREE.Vector3(-0.75,2,-0.75));   //16
  geometry.vertices.push(new THREE.Vector3(-0.75,2,0.75));    //17

  geometry.faces.push(new THREE.Face3(1,6,2));//left back
  geometry.faces.push(new THREE.Face3(1,5,6));

  geometry.faces.push(new THREE.Face3(0,3,7));//right back
  geometry.faces.push(new THREE.Face3(0,7,4));

  geometry.faces.push(new THREE.Face3(0,8,9));//front up
  geometry.faces.push(new THREE.Face3(0,9,1));

  geometry.faces.push(new THREE.Face3(2,6,3));//back
  geometry.faces.push(new THREE.Face3(3,6,7));

  geometry.faces.push(new THREE.Face3(14,15,16));//up roof
  geometry.faces.push(new THREE.Face3(14,16,17));

  geometry.faces.push(new THREE.Face3(7,6,12));//down
  geometry.faces.push(new THREE.Face3(6,13,12));

  geometry.faces.push(new THREE.Face3(9,11,10));//up front

  geometry.faces.push(new THREE.Face3(9,8,11));

  geometry.faces.push(new THREE.Face3(10,11,12));//front down
  geometry.faces.push(new THREE.Face3(10,12,13));

  geometry.faces.push(new THREE.Face3(8,4,11));//right front
  geometry.faces.push(new THREE.Face3(4,12,11));

  geometry.faces.push(new THREE.Face3(10,13,9));//left front
  geometry.faces.push(new THREE.Face3(9,13,5));

  geometry.faces.push(new THREE.Face3(15,1,16));//left roof
  geometry.faces.push(new THREE.Face3(1,2,16));

  geometry.faces.push(new THREE.Face3(0,14,17));//right roof
  geometry.faces.push(new THREE.Face3(0,17,3));

  geometry.faces.push(new THREE.Face3(0,1,15));//front roof
  geometry.faces.push(new THREE.Face3(0,15,14));

  geometry.faces.push(new THREE.Face3(3,17,2));//back roof
  geometry.faces.push(new THREE.Face3(2,17,16));

  geometry.computeFaceNormals();
  geometry.computeVertexNormals();

  var mesh = new THREE.Mesh(geometry, material);

  mesh.position.set(x, y, z);
  obj.add(mesh);

  //bounding sphere
  material = new THREE.MeshBasicMaterial( {visible: false} );
  var sphere  = new THREE.Mesh(new THREE.SphereGeometry(2.5, 20, 20), material);
  sphere.name = "Bounding Sphere";
  sphere.position.set(x+1, y, z);
  obj.add(sphere);
}

function addWheels(obj, x , y , z){
    'use strict';


    var material = new THREE.MeshBasicMaterial({ color: 0x615F5F });
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(0,0,-0.2));//0
    geometry.vertices.push(new THREE.Vector3(0,1,-0.2));//1
    geometry.vertices.push(new THREE.Vector3(1,1,-0.2));//2
    geometry.vertices.push(new THREE.Vector3(1.5,0,-0.2));//3
    geometry.vertices.push(new THREE.Vector3(1,-1,-0.2));//4
    geometry.vertices.push(new THREE.Vector3(0,-1,-0.2));//5
    geometry.vertices.push(new THREE.Vector3(-0.5,0,-0.2));//6
    geometry.vertices.push(new THREE.Vector3(0,0,0.2));//7
    geometry.vertices.push(new THREE.Vector3(0,1,0.2));//8
    geometry.vertices.push(new THREE.Vector3(1,1,0.2));//9
    geometry.vertices.push(new THREE.Vector3(1.5,0,0.2));//10
    geometry.vertices.push(new THREE.Vector3(1,-1,0.2));//11
    geometry.vertices.push(new THREE.Vector3(0,-1,0.2));//12
    geometry.vertices.push(new THREE.Vector3(-0.5,0,0.2));//13
    //back
    geometry.faces.push(new THREE.Face3(2,1,0));
    geometry.faces.push(new THREE.Face3(1,6,0));
    geometry.faces.push(new THREE.Face3(6,5,0));
    geometry.faces.push(new THREE.Face3(5,4,0));
    geometry.faces.push(new THREE.Face3(0,4,3));
    geometry.faces.push(new THREE.Face3(2,0,3));
    //front
    geometry.faces.push(new THREE.Face3(8,9,7));
    geometry.faces.push(new THREE.Face3(9,10,7));
    geometry.faces.push(new THREE.Face3(7,10,11));
    geometry.faces.push(new THREE.Face3(7,11,12));
    geometry.faces.push(new THREE.Face3(7,12,13));
    geometry.faces.push(new THREE.Face3(8,7,13));
    //rectangles
    geometry.faces.push(new THREE.Face3(8,1,6));
    geometry.faces.push(new THREE.Face3(6,13,8)); //right up

    geometry.faces.push(new THREE.Face3(9,2,1));
    geometry.faces.push(new THREE.Face3(1,8,9)); //up

    geometry.faces.push(new THREE.Face3(3,10,9));
    geometry.faces.push(new THREE.Face3(9,2,3)); //left up

    geometry.faces.push(new THREE.Face3(11,10,3));
    geometry.faces.push(new THREE.Face3(3,4,11)); //left down

    geometry.faces.push(new THREE.Face3(11,4,5));
    geometry.faces.push(new THREE.Face3(5,12,11)); //down

    geometry.faces.push(new THREE.Face3(13,6,12)); //right down
    geometry.faces.push(new THREE.Face3(5,12,13));

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    var mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(x,y,z);
    obj.add(mesh);
}

function addCarLight(obj, x,y,z){
    var spotLight = new THREE.SpotLight(0xFFFF66, 1, 4, Math.PI / 6, 0.7, 2);
    var sphere = new THREE.SphereGeometry( 0.25, 16, 8 );
    spotLight.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xFFFF66 } ) ) );
    var target = new THREE.Object3D();
    target.position.set(-32,5,5);
    spotLight.target = target;
    spotLight.position.set(x, y, z);
    obj.add(spotLight);
    obj.add(target);
    scene.add(new THREE.SpotLightHelper(spotLight));
}

function addButter(x, y ,z){
	'use strict';

    var butter = new THREE.Object3D();
    var material = new THREE.MeshBasicMaterial({ color: 0xFAFD62 });
    var geometry = new THREE.CubeGeometry(3, 1, 2);
    var mesh = new THREE.Mesh(geometry, material);

    butter.position.set(x,y,z);
    butter.add(mesh);

    //bounding sphere
    material = new THREE.MeshBasicMaterial( {visible: false} );
    var bounding_sphere = new THREE.Mesh(new THREE.SphereGeometry(1.803, 20, 20), material);
    bounding_sphere.name = "Bounding Sphere";
    bounding_sphere.position.set(0,0,0);
    butter.add(bounding_sphere);

    scene.add(butter);
    butter_array.push(butter);
}


function addOrange(x, y, z){
    'use strict';

    var vector = new THREE.Vector3(Math.random()*2 -1, 0, Math.random()*2 -1);
    var orange = new THREE.Object3D();
    orange.name = "Orange";
    orange.userData = {direction : vector.normalize(),
                        speed: Math.random()*0.1 + 0.001,
                        timePassed: 0}
	var geometry = new THREE.SphereGeometry(2, 20, 20);
	var material
    if (current_material === "Gouraud"){
        material = new THREE.MeshLambertMaterial( {color: 0xDE8520} );
    } else if (current_material === "Phong") {
        material = new THREE.MeshPhongMaterial( {color: 0xDE8520} );
    } else {
        material = new THREE.MeshBasicMaterial( {color: 0xDE8520} );
    }

	var sphere = new THREE.Mesh( geometry, material );
    sphere.position.set(0,0,0);
    orange.add(sphere);


    geometry = new THREE.CylinderGeometry(0.2, 0.2, 1, 20);
    if (current_material === "Gouraud"){
        material = new THREE.MeshLambertMaterial( {color: 0x663300} );
    } else if (current_material === "Phong") {
        material = new THREE.MeshPhongMaterial( {color: 0x663300} );
    } else {
        material = new THREE.MeshBasicMaterial( {color: 0x663300} );
    }
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0,2,0);
    orange.add(mesh);

    //bounding sphere
    material = new THREE.MeshBasicMaterial( {visible: false} );
    var bounding_sphere = new THREE.Mesh(new THREE.SphereGeometry(2, 20, 20), material);
    bounding_sphere.name = "Bounding Sphere";
    bounding_sphere.position.set(0, 0, 0);
    orange.add(bounding_sphere);

    orange_array.push(orange);

    orange.position.set(x,y,z);
    scene.add(orange);
}

/*
 * lighting
 */
function createDirectionalLight(x, y, z) {
    "use strict";
    var directional_light = new THREE.DirectionalLight(0xFFF55B, 0.8);
    directional_light.name = "Directional Light";
    directional_light.position.set(x, y, z);

    scene.add(directional_light);
}

function addPointlight(x,y,z) {
    var plight = new THREE.PointLight(0xF0C420, 0.5, 100, 3);
    var sphere = new THREE.SphereGeometry( 0.25, 16, 8 );
    plight.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xFFFF66 } ) ) );
    plight.position.set(x,y,z);
    plight_array.push(plight);
    scene.add(plight);
}

function createPointlights() {
    plight_array = new Array(0);
    for (var angle = 0; angle < 2*Math.PI; angle += Math.PI / 3)
        addPointlight(33*Math.cos(angle), 5, 33*Math.sin(angle));
}

function togglePointlight() {
    var plight, length;
    var length = plight_array.length;
    for (var i = 0; i < length; i++) {
        plight = plight_array[i];
        plight.visible = !plight.visible
    }
    plight_flag = false;
}

function toggleLightCalc() {
    scene.traverse(function (node) {
        var texture;
        if (node.name == "Table") {
            console.log("Table has been found\n");
            texture = new THREE.TextureLoader().load('textures/red-white-tablecloth.jpg');
        } else {
            texture = false;
        }
        if (node.material instanceof THREE.MeshBasicMaterial && !(node.name === "Bounding Sphere")) {
            if (previous_material === "Gouraud") {
                node.material = new THREE.MeshLambertMaterial({color: node.material.color,
                                                               map: texture,
                                                               wireframe: node.material.wireframe});
                current_material = "Gouraud";
            }
            else if (previous_material === "Phong") {
                node.material = new THREE.MeshPhongMaterial({color: node.material.color,
                                                             map: texture,
                                                             wireframe: node.material.wireframe,
                                                             shininess: 20,
                                                             specular: node.material.color});
                current_material = "Phong";
            }
        } else if (node.material instanceof THREE.MeshLambertMaterial && !(node.name === "Bounding Sphere")) {
            previous_material = "Gouraud";
            node.material = new THREE.MeshBasicMaterial({color: node.material.color,
                                                         map: texture,
                                                         wireframe: node.material.wireframe});
            current_material = "Basic";
        } else if (node.material instanceof THREE.MeshPhongMaterial && !(node.name === "Bounding Sphere")) {
            previous_material = "Phong";
            node.material = new THREE.MeshBasicMaterial({color: node.material.color,
                                                         map: texture,
                                                         wireframe: node.material.wireframe});
            current_material = "Basic";
        }
        light_calc_flag = false;
    });
}

function switchShaders() {
    scene.traverse(function (node) {
        if (node.material instanceof THREE.MeshLambertMaterial && !(node.name === "Bounding Sphere")) {
            node.material = new THREE.MeshPhongMaterial({color: node.material.color,
                                                         wireframe: node.material.wireframe,
                                                         shininess: 20,
                                                         specular: node.material.color});
            current_material = "Phong";

        } else if (node.material instanceof THREE.MeshPhongMaterial
                    || node.material instanceof THREE.MeshBasicMaterial
                    && !(node.name === "Bounding Sphere")) {
            node.material = new THREE.MeshLambertMaterial({color: node.material.color,
                                                           wireframe: node.material.wireframe});
            current_material = "Gouraud";
        }
        shader_flag = false;
    });
}


/*
 * cameras
 */

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

function createStaticCamera() {
    'use strict';

    var aspect_ratio = window.innerWidth / window.innerHeight;
    var fov = 90;
    var near = 1;
    var far = 1000;

    var tmp_camera = new THREE.PerspectiveCamera(fov, aspect_ratio, near, far);
    tmp_camera.position.x = 0;
    tmp_camera.position.y = 70;
    tmp_camera.position.z = 100;
    tmp_camera.lookAt(scene.position);
    return tmp_camera;
}

function createCarCamera() {
    'use strict';

    var aspect_ratio = window.innerWidth / window.innerHeight;
    var fov = 90;
    var near = 1;
    var far = 100;

    car_camera = new THREE.PerspectiveCamera(fov, aspect_ratio, near, far);
    car_camera.position.x = -10;
    car_camera.position.y = 10;
    car_camera.position. z = 0;
    car_camera.lookAt(car.position);
    car.add(car_camera);
}

function addPlane(obj, plane_x, plane_y, pos_y) {
    'use strict';

    return function (texture) {
        var material = new THREE.MeshBasicMaterial({wireframe: false,
                                                    reflectivity: 0,
                                                    refractionRatio: 0,
                                                    map: texture});
        var mesh = new THREE.Mesh(new THREE.PlaneGeometry(plane_x, plane_y), material);
        mesh.rotateX(-Math.PI / 2); // Make it orthogonal to Y.
        obj.add(mesh);
        obj.translateY(pos_y);
    };
}

function createPlanes () {
    'use strict';

    var loader = new THREE.TextureLoader();

    // Pause plane.
    var pause_plane = new THREE.Object3D();
    pause_plane.name = "pause_plane";
    pause_plane.visible = false;
    loader.load(
        "textures/game_paused.png",
        addPlane(pause_plane, 80, 50, 20),
        function (xhr) { },
        function (xhr) { console.log("Error loading texture."); }
    );

    // Game over plane.
    var gameover_plane = new THREE.Object3D();
    gameover_plane.name = "gameover_plane";
    gameover_plane.visible = false;
    loader.load(
        "textures/game_over.png",
        addPlane(gameover_plane, 80, 50, 20),
        function (xhr) { },
        function (xhr) { console.log("Error loading texture."); })

    scene.add(pause_plane);
    scene.add(gameover_plane);
}

function fixPlanesDirection(x, y, z, sx, sz, f = false) {

    var planes = [scene.getObjectByName("pause_plane"),
                  scene.getObjectByName("gameover_plane")];

    console.log("camera x: " + car_camera.position.x + " y: " + car_camera.position.y + " z: " + car_camera.position.z + "\n");
    console.log("car x: " + car.position.x + " y: " + car.position.y + " z: " + car.position.z + "\n");
    console.log("plane x: " + (camera.position.x - x) + " y: " + (camera.position.y - y) + " z: " + (camera.position.z - z) + "\n");

    for (var j = 0; j < planes.length; ++j) {
        planes[j].position.setX(camera.position.x - x);
        planes[j].position.setY(camera.position.y - y);
        planes[j].position.setZ(camera.position.z - z);
        planes[j].scale.x = sx;
        planes[j].scale.z = sz;
        if (!f) {
            planes[j].lookAt(camera.position);
        } else {
            planes[j].lookAt(new THREE.Vector3(car.position.x,car.position.y+5,car.position.z));
        }
        planes[j].rotateX(Math.PI / 2);
    }
}

function updatePlanes () {
    'use strict';

    switch (camera) {
    case ortho_camera:
        fixPlanesDirection(0, 5, 0, 1, 1);
        break;
    case static_camera:
        fixPlanesDirection(0, 40, 50, 0.5, 0.5);
        break;
    case car_camera:
        fixPlanesDirection(-car.position.x + camera.position.x + 5, 5, -car.position.z, 0.35, 0.35, true);
        break;
    }
}

function endGame (end) {
    "use strict";
    game_ended = end;
    scene.getObjectByName("gameover_plane").visible = game_ended;
    updatePlanes();
    if (!game_ended) {
        var i;
        for (i = 0; i < orange_array.length; i++) {
            var orange = orange_array[i];
            scene.remove(orange);
        }
        orange_array = new Array(0);
        for (i = 0; i < butter_array.length; i++) {
            var butter = butter_array[i];
            scene.remove(butter);
        }
        butter_array = new Array(0);
        for (i = 0; i < torus_array.length; i++) {
            var torus = torus_array[i];
            scene.remove(torus);
        }
        torus_array = new Array(0);
        lives_array = new Array(0);
        for(i=0; i < butter_num; i++)
            addButter((Math.random()*97)-48.5, 0.5, (Math.random()*98)-49);

        for(i=0; i < orange_num; i++)
            addOrange((Math.random()*98)-49, 2, (Math.random()*98)-49);

        var x = 55;
        for (i=0; i<lives_num; i++) {
            var life = createLives(x+(i*10), -100, -45);
            lives_array.push(life);
        }
        
        createTrack();
        car.userData.lives = lives_num;
    }
}


function createScene() {
    'use strict';

    scene = new THREE.Scene();

    createPlanes();
    createTable(0, 0, 0);
    createCar(-32, 0, 0);
    createDirectionalLight(0, 200, 0);
    ortho_camera = createOrthoCamera();
    static_camera = createStaticCamera();
    camera = ortho_camera;
    createPointlights();
}


/*
 * animating the board and its elements
 */

function animate() {
    'use strict';

    if (!game_paused && !game_ended) {
        var i;
        var torus;
        const acceleration   = 0.5;
        const delta = clock.getDelta();

        animateCar(acceleration, delta);
        animateTorus(acceleration, delta);
        animateOrange(delta);
        if (plight_flag)
            togglePointlight();

        if (shader_flag === true) {
            switchShaders();
        }

        if (light_calc_flag === true) {
            toggleLightCalc();
        }

    }

    render();
    requestAnimationFrame(animate);
    validPosition(car);
    for (i=0; i<torus_array.length; i++){
        torus = torus_array[i];
        validPosition(torus);
    }
}


function animateCar(acceleration, delta) {
    'use strict';

    console.log(acceleration, delta);
    
    if (car.userData.direction.x !== 0) {
        newSpeed(acceleration, delta);
        getNewPosition(car);
    }
    if (car.userData.left) {
        car.rotateY(Math.PI / 40);
    } else if (car.userData.right) {
        car.rotateY(-Math.PI / 40);
    }
}

function animateOrange(delta){
    'use strict';

    var i, x, z, orange;
    var min = -50;
    var max = 50;
    for(i=0; i < orange_array.length; i++){
        orange = orange_array[i];
        orange.userData.timePassed += delta;
        if( orange.userData.timePassed > 1){
            orange.userData.speed = orange.userData.speed * 1.01;
        }
        getNewPosition(orange);
        x = orange.getWorldPosition().x;
        z = orange.getWorldPosition().z;
        if (x >= max || x <= min || z >= max || z <= min){
            scene.remove(orange);
            orange_array.splice(i,1);
            setTimeout(timerOrange, Math.random()*5000 );
            i++;
        }
        getNewRotation(orange);
    }
}

function animateTorus(acceleration, delta) {
    'use strict';
    var i;
    var torus;
    var new_torus_speed;
    for (i=0; i<torus_array.length; i++) {
        torus = torus_array[i];
        if (torus.userData.speed == 0)
            continue;

        new_torus_speed = torus.userData.speed - acceleration * delta;

        if(new_torus_speed < 0) {
            torus.userData.speed = 0;
            torus.userData.direction.setX(0);
            torus.userData.direction.setZ(0);
        } else
            torus.userData.speed = new_torus_speed;

        getNewPosition(torus);
    }
}


function getNewPosition(obj) {
    'use strict';

    var speed = obj.userData.speed;
    obj.translateX(obj.userData.direction.getComponent(0) * speed);
    obj.translateZ(obj.userData.direction.getComponent(2) * speed);
}

function getNewRotation(obj){
    'use strict'

    var speed = obj.userData.speed;
    var distanceX = obj.userData.direction.getComponent(0) * speed;
    var angleX = distanceX / (Math.PI * 2) * Math.PI;
    obj.rotateX(angleX);
    var distanceZ = obj.userData.direction.getComponent(2) * speed;
    var angleZ = distanceZ / (Math.PI * 2) * Math.PI;
    obj.rotateZ(angleZ);
}

function timerOrange(){
    'use strict'

    addOrange((Math.random()*98)-49, 2, (Math.random()*98)-49);
}

function newSpeed(acceleration, delta) {
    'use strict';

    var vel_max = 0.5;

    if (!car.userData.stopping && car.userData.speed < vel_max) {
        var new_speed = car.userData.speed + acceleration * delta;
        if (new_speed > vel_max)
            car.userData.speed = vel_max;
        else
            car.userData.speed = new_speed;

    } else if (car.userData.stopping && car.userData.speed > 0) {
        var new_speed = car.userData.speed - acceleration * delta;
        if (new_speed < 0) {
            car.userData.speed = 0;
            car.userData.direction.setX(0);
        } else
            car.userData.speed = new_speed;
    }
}


/*
 * collision checking and handling
 */

function validPosition(obj) { //checks if obj collided with another object or the map limits
    "use strict";
    var i, x, z;
    var vector;
    var torus;
    var orange;
    var butter;
    if (obj.name === "Torus") {
        for (i=0; i<torus_array.length; i++){
            torus = torus_array[i]
            if (torus === obj)
                continue;

            if (checkCollision(obj, torus)) {
                //Transferir velocidade entre ambos
                if (obj.userData.speed > 0) {
                    x = torus.getWorldPosition().x - obj.getWorldPosition().x;
                    z = torus.getWorldPosition().z - obj.getWorldPosition().z;
                    vector = new THREE.Vector3(x, 0, z);
                    torus.userData.speed = obj.userData.speed/2;
                    obj.userData.speed = obj.userData.speed / 2;
                    torus.userData.direction = vector.normalize();
                }
            }
        }

    } else if (obj.name === "Car") {
        var life = lives_array[0];
        for (i=0; i<torus_array.length; i++) {
            torus = torus_array[i];
            if (checkCollision(obj, torus)){
                //transferir velocidade etc
                if (obj.userData.speed > 0){
                    x = torus.getWorldPosition().x - obj.getWorldPosition().x;
                    z = torus.getWorldPosition().z - obj.getWorldPosition().z;
                    vector = new THREE.Vector3(x, 0, z);
                    torus.userData.speed = obj.userData.speed;
                    torus.userData.direction = vector.normalize();
                }
            }
        }
        for (i=0; i<orange_array.length; i++) {
            orange = orange_array[i];
            if (checkCollision(obj, orange)){
                //carro vai para a posicao inicial
                obj.position.set(-32, 0, 0);
                obj.userData.speed = 0;
                obj.rotation.y = Math.PI / 2;
                obj.userData.direction = new THREE.Vector3(0, 0, 0);
                scene.remove(life);
                lives_array.splice(0,1);
                obj.userData.lives--;
                if (obj.userData.lives === 0) {
                    endGame(true);
                }
            }
        }
        for (i=0; i<butter_array.length; i++) {
            butter = butter_array[i];
            if (checkCollision(obj, butter)) {
                //carro para de se mexer completamente
                if (obj.userData.speed > 0) {
                    obj.userData.stopping = true;
                    obj.userData.speed = 0;
                }
            }
        }

        if (obj.position.x >= 50 || obj.position.x <= -50 || obj.position.z >= 50 || obj.position.z <= -50) {
            obj.position.set(-32, 0, 0);
            obj.userData.speed = 0;
            obj.rotation.y = Math.PI / 2;
            obj.userData.direction = new THREE.Vector3(0, 0, 0);
            scene.remove(life);
            lives_array.splice(0,1);
            obj.userData.lives--;
            if (obj.userData.lives === 0) {
                endGame(true);
            }
        }
    }
}


function checkCollision(obj1, obj2) { //aux to actually calculate if a collision happened
    //"use strict";
    var r1 = obj1.getObjectByName("Bounding Sphere").geometry.boundingSphere.radius;
    var r2 = obj2.getObjectByName("Bounding Sphere").geometry.boundingSphere.radius;
    var distance = obj1.getWorldPosition().distanceTo(obj2.getWorldPosition());
    return (r1 + r2) * (r1 + r2) >= distance * distance;
}



/*
 * Event handling for window resize and key presses
 */

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


function onKeyDown(key) {
    'use strict';

    switch(key.keyCode) {
    case 49: // 1
        camera = ortho_camera;
        if (game_paused || game_ended) {
            updatePlanes();
            onResize();
        }
        break;

    case 50: // 2
        camera = static_camera;
        if (game_paused || game_ended) {
            updatePlanes();
            onResize();
        }
        break;

    case 51: // 3
        camera = car_camera;
        if (game_paused || game_ended) {
            updatePlanes();
            onResize();
        }
        break;

    case 37: //left
        car.userData.right = false;
        car.userData.left = true;
        break;

    case 39: //right
        car.userData.left = false;
        car.userData.right = true;
        break;

    case 38: //up
        if (car.userData.direction.x === -1 && car.userData.speed !== 0) {
            car.userData.stopping = true;
        } else if (car.userData.speed === 0) {
            car.userData.stopping = false;
            car.userData.direction.setX(1);
        } else {
            car.userData.stopping = false;
        }
        break;

    case 40: //down
        if (car.userData.direction.x === 1 && car.userData.speed !== 0) {
            car.userData.stopping = true;
        } else if (car.userData.speed === 0) {
            car.userData.stopping = false;
            car.userData.direction.setX(-1);
        } else {
            car.userData.stopping = false;
        }
        break;


    case 65: // A
    case 97: // a
        scene.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
                node.material.wireframe = !node.material.wireframe;
            }
        });
        break;

    case 67: //C
    case 99: //c
        plight_flag = true;
        break;

    case 71: //G
    case 103: //g
        shader_flag = true;
        break;

    case 76:  // L
    case 108: // l
        light_calc_flag = true;
        break;


    case 78: //N
    case 110: //n
        var light = scene.getObjectByName("Directional Light");
        light.visible = !light.visible;
        break;

    case 82: // R
    case 114: //r
        if(game_ended) {
            endGame(false);
        }
        break;

    case 83:  // S
    case 115: // s
        if(!game_ended) {
          game_paused = !game_paused;
          updatePlanes();
          scene.getObjectByName("pause_plane").visible = game_paused;
        }
        break;
    }
}

function onKeyUp (key){
    'use strict';
    switch (key.keyCode) {

    case 38: // up
        if (car.userData.direction.x === 1 && !car.userData.stopping) {
            car.userData.stopping = true;
        }
        break;

    case 40: // down
        if (car.userData.direction.x === -1 && !car.userData.stopping) {
            car.userData.stopping = true;
        }
        break;

    case 37: //left
        car.userData.left = false;
        break;

    case 39: //right
        car.userData.right = false;
        break;
    }
}

/*
 * initialize the map
 */
function init() {
    'use strict';

    orange_array = null;
    torus_array = null;
    butter_array = null;
    plight_array = null;
    lives_array = null;
    car = null;
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);
    renderer.autoClear = false;
    document.body.appendChild(renderer.domElement);

    butter_num = 5;
    orange_num = 3;
    lives_num = 5;

    plight_flag = false;
    light_calc_flag = false;
    shader_flag = false;
    current_material = "Basic";
    previous_material = "Gouraud";

    game_paused = false;
    game_ended = false;

    createScene();

    var i;
    var x = 55;
    var life;
    lives_array = new Array(0);
    for (i=0; i<lives_num; i++) {
      life = createLives(x+(i*10), -100, -45);
      lives_array.push(life);
    }

    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
}

/*
 * drawing the elements on screen.
 * animate() calls it according to the update/display cycle
 */
function render() {
    'use strict';

    renderer.render(scene, camera);
}
