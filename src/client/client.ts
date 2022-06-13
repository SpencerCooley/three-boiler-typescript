import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as TWEEN from '@tweenjs/tween.js'
// create a class for a button 
// pass the button an object that determines all of it's properties
// pass the button a position {x,y,z}
//

// let loginButton = {
//     item: 'geometry',
//     model: 'url to model object',
//     extraSetup: 'function that determins interactions need for button' ,
//     extraanimate: 'function that determins how the '
// }

/* Moralis init code */

/* TODO: Add Moralis Authentication code */


const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = -6.0
camera.position.x = 0
camera.position.y = 0

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

new OrbitControls(camera, renderer.domElement)




const geometry = new THREE.BoxGeometry( 2, 1, 1 );
const geometry2 = new THREE.BoxGeometry( 3, 2, .1 );
const geometry1 = new THREE.PlaneGeometry( 16, 9 );

const video = document.getElementById( 'videoElement' ) as HTMLVideoElement;
video.setAttribute("crossorigin", "anonymous");
video.play()
const videoTexture = new THREE.VideoTexture( video );

const videoMaterial = new THREE.MeshBasicMaterial({
    map: videoTexture,
    side: THREE.DoubleSide,
    toneMapped: false,
})
const material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    wireframe: false,
    side: THREE.DoubleSide,
});

const material2 = new THREE.MeshPhongMaterial({
    color: 0x666666,
    wireframe: false,
    side: THREE.DoubleSide,
});


const button = new THREE.Mesh(geometry, material);
const buttonBack = new THREE.Mesh(geometry2, material2);
const screen = new THREE.Mesh(geometry1, videoMaterial)
scene.add(screen)
scene.add(button)
scene.add(buttonBack)
button.rotation.x = -.13;

const tween1 = new TWEEN.Tween({x:0, y:0, z: 20})
.to({x:0, y:0, z: 0}, 500);
tween1.onUpdate((object, elapsed) => {
    screen.position.set(object.x, object.y, object.z);
});
tween1.start();


const tween2 = new TWEEN.Tween({x:0, y:0, z: -20})
.to({x:0, y:0, z: 0}, 1000);
tween2.onUpdate((object, elapsed) => {
    button.position.set(object.x, object.y, object.z);
});
tween2.start();


const tween3 = new TWEEN.Tween({x:0, y:0, z: -20})
.to({x:0, y:0, z: 0}, 800);
tween3.onUpdate((object, elapsed) => {
    buttonBack.position.set(object.x, object.y, object.z);
});
tween3.start();

//lights
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, -1, -1.0); 
scene.add(light);

const light2 = new THREE.PointLight(0xea7777, 1, 100);
light2.position.set(0.0, 0.0, 10.0); 
scene.add(light2);

//lights





// add helpers to make visualizing things a little easier
// add helpers to make visualizing things a little easier
// add helpers to make visualizing things a little easier
const helpers = false;
if(helpers) {
    const sphereSize = 1;
    const pointLightHelper = new THREE.PointLightHelper( light, sphereSize );
    scene.add( pointLightHelper );


    const pointLightHelper2 = new THREE.PointLightHelper( light2, sphereSize );
    scene.add( pointLightHelper2 );

    const axesHelper = new THREE.AxesHelper( 5 );
    scene.add( axesHelper );
}

// end helpers to make visualizing things a little easier
// end helpers to make visualizing things a little easier
// end helpers to make visualizing things a little easier


const clock = new THREE.Clock();



window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

// set up ray casting for clicking object 
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

window.addEventListener( 'mousedown', onPointerClick );
window.addEventListener( 'mouseup', onMouseUp );
window.addEventListener( 'mousemove', onMouseMove);

function onMouseMove( event ) {
    raycaster.setFromCamera(
        {
            x: (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
            y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1
        },
        camera
    )
    let intersects = raycaster.intersectObject(button, false);
    if(intersects.length) {
        document.body.style.cursor = 'pointer';
        button.scale.set(.94, .94, .94);
        // handle log in details here. 
    } else {
        document.body.style.cursor = 'default';
        button.scale.set(1, 1, 1);
    }
}

function onMouseUp( event ) {
    button.scale.set(1, 1, 1);
}

function onPointerClick( event ) {
    raycaster.setFromCamera(
        {
            x: (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
            y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1
        },
        camera
    )
    let intersects = raycaster.intersectObject(button, false);
    if(intersects.length) {
        alert('log in the user.');
        document.body.style.cursor = 'pointer';
        button.scale.set(.9, .9, .9);
        // handle log in details here. 
    } 
}



function animate() {
    requestAnimationFrame(animate)
    
    // play around with sin wave
    // let wave = Math.sin(clock.getElapsedTime());
    // sphere.rotation.x += 0.01
    // sphere.rotation.y += 0.1
    // sphere.scale.set(5.0, 5.0, .2);
    render()
}

function render() {
    renderer.render(scene, camera);
    TWEEN.update();
    videoTexture.needsUpdate = true;
    video.play();
}

animate()
