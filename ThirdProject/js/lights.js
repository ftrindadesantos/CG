function setupLights(){
  var aLight = new THREE.AmbientLight(0xffffff,0.5);
  scene.add(aLight);

  var pLight = new THREE.PointLight(0xffffff,0.5);
  pLight.position.set(0,25,5);
  scene.add(pLight);
}
