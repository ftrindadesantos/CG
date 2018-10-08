function onKeyDown(e) {
    'use strict';
    
    switch (e.keyCode) {
    case 37: //LEFT
        chairTop.userData.right = false;
        chairTop.userData.left = true;

        //chairTop.rotateY(Math.PI / -50);     
        break;
    case 38:
        chair.translateX(10);
        break;
    case 39: //RIGHT
        chairTop.userData.right = true;
        chairTop.userData.left = false;
        //chairTop.rotateY(Math.PI / 50);     
        break;
    case 40:
        chair.translateX(-10);
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
    	createCamera(0,100,0);
    	break;
    case 50: //2
    	createCamera(0,0,100);
    	break;
    case 51: //3
    	createCamera(100,0,0);
    	break;
    case 52: //4 CAMERA PRINCIPAL
    	createCamera(100,100,100);
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
        console.log(chairTop.userData.left);
        chairTop.userData.left = false;
        break;

    case 39: //right
        chairTop.userData.right = false;
        break;
    }
}