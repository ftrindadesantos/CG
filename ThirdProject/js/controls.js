function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {

    case 65: //A
    /*case 97: //a
        scene.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
                node.material.wireframe = !node.material.wireframe;
            }
        });
        break;
    */
    case 83:  //S
    case 69:  //E
    case 101: //e
         scene.traverse(function (node) {
            if (node instanceof THREE.AxisHelper) {
                node.visible = !node.visible;
            }
        });

        break;

    case 78: //N
        if (aux == 0) {
            light.intensity = 0.5;
            aux = 1;
        }

        else if (aux == 1) {
            light.intensity = 1.3;
            aux = 0;
        }
        break;


    case 71: //G  

        if (p == 0) {
            scene.remove(plane);
            plane = planeGauraud;
            scene.add(plane);
            p = 1;
        }

        else if (p == 1) {
            scene.remove(plane);
            plane = planePhong;
            scene.add(plane);
            p = 0;
        }
        break;

    case 37: //LEFT
        planePhong.rotateY(Math.PI/10);
        planeGauraud.rotateY(Math.PI/10);

    	break;
    case 39: //RIGHT
        planePhong.rotateY(-Math.PI/10);
        planeGauraud.rotateY(-Math.PI/10);

    	break;


    case 38: //UP
        planePhong.rotateX(Math.PI/10);
        planeGauraud.rotateX(Math.PI/10);
    	break;
    case 40: //DOWN
        planePhong.rotateX(-Math.PI/10);
        planeGauraud.rotateX(-Math.PI/10);
    	break;


    case 49: //1
        if (l1 == 0) {
            light1.intensity = 0;
            l1 = 1;
        }

        else if (l1 == 1) {
            light1.intensity = 1.3;
            l1 = 0;
        }

    	break;
    case 50: //2
        if (l2 == 0) {
            light2.intensity = 0;
            l2 = 1;
        }

        else if (l2 == 1) {
            light2.intensity = 1.3;
            l2 = 0;
        }

    	break;
    case 51: //3
        if (l3 == 0) {
            light3.intensity = 0;
            l3 = 1;
        }

        else if (l3 == 1) {
            light3.intensity = 1.3;
            l3 = 0;
        }

    	break;
    case 52: //3
            if (l4 == 0) {
                light4.intensity = 0;
                l4 = 1;
            }

            else if (l4 == 1) {
                light4.intensity = 1.3;
                l4 = 0;
            }

            break;


    }


}
