import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

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

const geometry = new THREE.SphereGeometry( 1, 8, 8 )
const material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    wireframe: false,
    side: THREE.DoubleSide,
});



const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0.0, 0.0, -4.0); 
scene.add(light);

const light2 = new THREE.PointLight(0xea7777, 1, 100);
light2.position.set(0.0, 0.0, 4.0); 
scene.add(light2);

const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)


// add helpers to make visualizing things a little easier
const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper( light, sphereSize );
scene.add( pointLightHelper );


const pointLightHelper2 = new THREE.PointLightHelper( light2, sphereSize );
scene.add( pointLightHelper2 );

const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

const clock = new THREE.Clock();


window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function animate() {
    requestAnimationFrame(animate)
    // play around with sin wave
    let wave = Math.sin(clock.getElapsedTime());
    sphere.rotation.x += 0.01
    sphere.rotation.y += 0.01
    sphere.scale.set(wave, wave, wave);
    render()
}

function render() {
    renderer.render(scene, camera)
}

animate()
