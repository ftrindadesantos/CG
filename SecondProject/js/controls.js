function onKeyDown(e) {
    'use strict';
    
    switch (e.keyCode) {
    case 37: //LEFT
        chairTop.userData.right = false;
        chairTop.userData.left = true;  
        break;
    case 38: //UP
        if (chairTop.userData.direction.x === 1 && chairTop.userData.speed !== 0) {
            chairTop.userData.stopping = true;
        } else if (chairTop.userData.speed === 0) {
            chairTop.userData.stopping = false;
            chairTop.userData.direction.setX(1);
        } else {
            chairTop.userData.stopping = false;
        }
        break;
    case 39: //RIGHT
        
        chairTop.userData.right = true;
        chairTop.userData.left = false;   
        break;
    case 40: //DOWN
        if (chairTop.userData.direction.x === 1 && chairTop.userData.speed !== 0) {
            chairTop.userData.stopping = true;
        } else if (chairTop.userData.speed === 0) {
            chairTop.userData.stopping = false;
            chairTop.userData.direction.setX(-1);
        } else {
            chairTop.userData.stopping = false;
        }
        break;
    case 65: //A
    case 97: //a
        scene.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
                node.material.wireframe = !node.material.wireframe;
            }
        });
        break;

    case 83:  //S
    case 69:  //E
    case 101: //e 
         scene.traverse(function (node) {
            if (node instanceof THREE.AxisHelper) {
                node.visible = !node.visible;
            }
        });
        
        break;
    case 49: //1
        camera = ortho_camera;
    	//createCamera(0,100,0);
    	break;
    case 50: //2
        camera = prespect_camera;
    	
    	break;
    case 51: //3
        camera = follow_camera;
    	
    	break; 

 
    }


}

function onKeyUp (e){
    'use strict';
    switch (e.keyCode) {

    case 38: // up
        if ( !chairTop.userData.stopping) {
            chairTop.userData.stopping = true;
        }
        break;

    case 40: // down
        if ( !chairTop.userData.stopping) {
            chairTop.userData.stopping = true;
        }
        break;

    case 37: //left
        chairTop.userData.left = false;
        break;

    case 39: //right
        chairTop.userData.right = false;
        break;
    }
}