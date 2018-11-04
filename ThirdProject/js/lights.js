function setupLights(){
  var aLight = new THREE.AmbientLight(0xffffff,0.5);
  scene.add(aLight);

  var pLight1 = new THREE.PointLight(0xffffff,0.5);
  pLight1.position.set(0,25,10);
  scene.add(pLight1);

  var pLight2 = new THREE.PointLight(0xffffff,0.5);
  pLight2.position.set(0,25,-10);
  scene.add(pLight2);
}
