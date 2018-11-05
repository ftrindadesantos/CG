var metalmaterialPhong, metalmaterialGouraud ,glassmaterialGouraud, glassmaterialPhong;

function setupMaterials(){
    var loader = new THREE.TextureLoader();

    metalmaterialPhong = new THREE.MeshPhongMaterial( {

        color: 0xa0a0a0,
        specular: 0xffffff,
        shininess: 100,
        wireframe: false,
        //map: loader.load("https://i.imgur.com/dhvrzT5.jpg"),
        //normalMap: loader.load('https://i.imgur.com/dhvrzT5.jpg')
      } );
    metalmaterialGouraud = new THREE.MeshLambertMaterial( {

        color: 0xa0a0a0,
        wireframe: false,
        //map: loader.load("https://i.imgur.com/dhvrzT5.jpg"),
        //normalMap: loader.load('https://i.imgur.com/dhvrzT5.jpg')
      } );

    glassmaterialPhong = new THREE.MeshPhongMaterial( {

        color: 0x1a1a1a,
        specular: 0xffffff,
        shininess: 100,
        wireframe: false,
        //map: loader.load(),
        //normalMap: loader.load(),
      } );
    glassmaterialGouraud = new THREE.MeshLambertMaterial( {

        color: 0x1a1a1a,
        wireframe: false,
        //map: loader.load(),
        //normalMap: loader.load(),
      } );
}
