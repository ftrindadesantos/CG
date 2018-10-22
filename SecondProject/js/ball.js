function createFirstBall(){

    'use strict';

    firstBall = new THREE.Object3D();
   


    material = new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true });

    addBall(firstBall, 0, 5.6, 0);

    createFollowPrespectiveCamera();

    var x = Math.random()*33.8 - 16.9;
    var z = Math.random()*83.8 - 41.9;

    firstBall.position.x = x;
    firstBall.position.y = 0;
    firstBall.position.z = z;


    ball_array.push(firstBall);

    firstBall.add(new THREE.AxisHelper(10));

}

function addBall(obj, x, y, z){

    'use strict';
    var vector = new THREE.Vector3(Math.random()*2-1, 0 , Math.random()*2-1);

    obj.userData = {direction : vector.normalize(),
                    speed : Math.random()*0.1 + 0.001,
                    time : 0}


  

    geometry = new THREE.SphereGeometry(5.6, 10, 10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);

    obj.add(mesh);

    //bounding sphere
    material = new THREE.MeshBasicMaterial( {visible: false} );
    var boundingSphere = new THREE.Mesh(new THREE.SphereGeometry(5.6, 10, 10), material);
    boundingSphere.name = "Bounding Sphere";   
    boundingSphere.position.set(0, 0, 0);
    obj.add(boundingSphere);


}

function createBalls(){

   while(ball_array.length <= 10){
    ball = createBall();
    if (validBallPosition(ball)) {
     ball_array.push(ball);
    }
   }
   for (var i = 0; i < ball_array.length - 1 ; i++){
    scene.add(ball_array[i]);
   }

}
function validBallPosition(ball){
    for(var i = 0; i < ball_array.length ; i++){
        if (checkCollision(ball, ball_array[i]) ) {
            return false; 
        }
    }
    return true;

}


function createBall(){
    'use strict';

    var ball = new THREE.Object3D();

    material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });

    addBall(ball, 0, 5.6, 0);

    

    var x = Math.random()*33.8 - 16.9;
    var z = Math.random()*83.8 - 41.9;

    ball.position.x = x;
    ball.position.y = 0;
    ball.position.z = z;


    return ball;


}