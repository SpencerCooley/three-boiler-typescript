import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

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
camera.position.z = -2.0
camera.position.x = 0
camera.position.y = 0

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

new OrbitControls(camera, renderer.domElement)




const geometry = new THREE.SphereGeometry( 1, 20, 20 )
const material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    wireframe: false,
    side: THREE.DoubleSide,
});

const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)


//lights
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0.0, 0.0, -4.0); 
scene.add(light);

const light2 = new THREE.PointLight(0xea7777, 1, 100);
light2.position.set(0.0, 0.0, 4.0); 
scene.add(light2);

//lights





// add helpers to make visualizing things a little easier
// add helpers to make visualizing things a little easier
// add helpers to make visualizing things a little easier
const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper( light, sphereSize );
scene.add( pointLightHelper );


const pointLightHelper2 = new THREE.PointLightHelper( light2, sphereSize );
scene.add( pointLightHelper2 );

const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

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

function onMouseUp( event ) {
    sphere.scale.set(1, 1, 1);
    document.body.style.cursor = 'default';
}

function onPointerClick( event ) {
    raycaster.setFromCamera(
        {
            x: (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
            y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1
        },
        camera
    )
    let intersects = raycaster.intersectObject(sphere, false);
    if(intersects.length) {
        document.body.style.cursor = 'pointer';
        sphere.scale.set(.9, .9, .9);
        // handle log in details here. 
    } 
}

function animate() {
    requestAnimationFrame(animate)
    // play around with sin wave
    // let wave = Math.sin(clock.getElapsedTime());
    // sphere.rotation.x += 0.01
    // sphere.rotation.y += 0.01
    // sphere.scale.set(wave, wave, wave);
    render()
}

function render() {
    renderer.render(scene, camera)
}

animate()
