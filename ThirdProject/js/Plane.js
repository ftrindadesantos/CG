function createPlane(x, y, z) {
  'use strict';
  var planet = new THREE.Object3D();
  var planetemp = new THREE.Object3D();
  material = new THREE.MeshBasicMaterial({ color: 0xbfbc9c, wireframe: true });

  planet.userData = {direction: new THREE.Vector3(0,0,0),
                  speed: 0,
                  left: false,
                  right: false,
                  stopping: false};

  addPlaneBody(planetemp,x,y,z);
  addPlaneNose(planetemp,x,y,z);
  addPlaneCockPit(planetemp,x,y,z);
  addPlaneLeftWing(planetemp,x,y,z);
  addPlaneRightWing(planetemp,x,y,z);
  addPlaneLeftStabelizer(planetemp,x,y,z);
  addPlaneRightStabelizer(planetemp,x,y,z);
  addPlaneTail(planetemp,x,y,z);

  planet.add(planetemp);

  planet.position.x = x;
  planet.position.y = y;
  planet.position.z = z;

  return planet;
}

function addPlaneBody(obj,x,y,z){

  var geometry = new THREE.CylinderGeometry( 10, 5, 40, 32 );
  var body = new THREE.Mesh( geometry, metalmaterial ) ;

  body.rotateX(Math.PI/2);
  body.position.set(x,y,z-12);

  obj.add( body );
}

function addPlaneNose(obj,x,y,z){
  var geometry = new THREE.ConeBufferGeometry( 10, 20, 32 );
  var nose = new THREE.Mesh( geometry, metalmaterial );

  nose.rotateX(Math.PI/2);
  nose.position.set(x,y,z+18);

  obj.add( nose );
}

function addPlaneCockPit(obj,x,y,z){
  var geometry = new THREE.SphereGeometry( 4, 20, 20 );
  var cpit = new THREE.Mesh( geometry, glassmaterial );

  cpit.scale.set(1,1,2.5);
  cpit.rotateX(Math.PI/6);
  cpit.position.set(x,y+4,z+16);

  obj.add( cpit );
}

function addPlaneLeftWing(obj,x,y,z){
  var geometry = new THREE.CylinderGeometry( 3, 1, 30, 32 );
  var lwing = new THREE.Mesh( geometry, metalmaterial );

  lwing.scale.set(1,1,2.5);
  lwing.rotateZ(Math.PI/2);
  lwing.position.set(x+20,y+3,z);

  obj.add( lwing );
}

function addPlaneRightWing(obj,x,y,z){
  var geometry = new THREE.CylinderGeometry( 3, 1, 30, 32 );
  var rwing = new THREE.Mesh( geometry, metalmaterial );

  rwing.scale.set(1,1,2.5);
  rwing.rotateZ(-Math.PI/2);
  rwing.position.set(x-20,y+3,z);

  obj.add( rwing );
}

function addPlaneLeftStabelizer(obj,x,y,z){
  var geometry = new THREE.CylinderGeometry( 3, 1, 30, 32 );
  var lstab = new THREE.Mesh( geometry, metalmaterial );

  lstab.scale.set(0.5,0.5,1.25);
  lstab.rotateZ(Math.PI/2);
  lstab.position.set(x+11,y+3,z-22);

  obj.add( lstab );
}

function addPlaneRightStabelizer(obj,x,y,z){
  var geometry = new THREE.CylinderGeometry( 3, 1, 30, 32 );
  var rstab = new THREE.Mesh( geometry, metalmaterial );

  rstab.scale.set(0.5,0.5,1.25);
  rstab.rotateZ(-Math.PI/2);
  rstab.position.set(x-11,y+3,z-22);

  obj.add( rstab );
}

function addPlaneTail(obj,x,y,z){
  var geometry = new THREE.CylinderGeometry( 1, 3, 25, 32 );
  var tail = new THREE.Mesh( geometry, metalmaterial );

  tail.scale.set(0.75,0.75,1.75);
  tail.position.set(x,y+10,z-26.8);

  var geometry = new THREE.BoxGeometry( 20, 1, 7);
  var tailStabelizer = new THREE.Mesh( geometry, metalmaterial );

  tailStabelizer.position.set(x,y+15,z-27);

  obj.add( tail );
  obj.add( tailStabelizer );
}
