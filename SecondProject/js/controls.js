function onKeyDown(e) {
    'use strict';
    
    switch (e.keyCode) {
   
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
    	break;
    case 50: //2
        camera = prespect_camera;
    	
    	break;
    case 51: //3
        camera = follow_camera;
    	
    	break; 

 
    }


}
