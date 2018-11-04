var metalmaterial,glassmaterial;

function setupMaterials(){
    metalmaterial = new THREE.MeshLambertMaterial( {

        color: 0xffffff,
      } );

    glassmaterial = new THREE.MeshLambertMaterial( {

        color: 0xa0a0a0,
      } );
}
