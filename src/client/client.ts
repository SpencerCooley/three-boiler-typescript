import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GrannyKnot, HeartCurve, VivianiCurve, TrefoilKnot, TorusKnot, CinquefoilKnot} from 'three/examples/jsm/curves/CurveExtras';

// avatar: 
// https://storage.googleapis.com/img-gorillaisms/thraxatar.glb

// court: 
// https://storage.googleapis.com/img-gorillaisms/orange.glb

//hdr: 
// https://storage.googleapis.com/img-gorillaisms/hamburg_hbf_1k.hdr


const skyBox = "https://storage.googleapis.com/img-gorillaisms/hamburg_hbf_1k.hdr";




// Load a glTF resource

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( 'https://threejs.org/examples/js/libs/draco/' );
loader.setDRACOLoader( dracoLoader );


loader.load(
    // resource URL
    'https://storage.googleapis.com/img-gorillaisms/orange.glb',
    // called when the resource is loaded
    function ( gltf ) {
        scene.add( gltf.scene );

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object
    },
    // called while loading is progressing
    function ( xhr ) {

        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

    },
    // called when loading has errors
    function ( error ) {
        console.log(error);
        console.log( 'An error happened' );

    }
);


loader.load(
    // resource URL
    'https://storage.googleapis.com/img-gorillaisms/thraxatar.glb',
    // called when the resource is loaded
    function ( gltf ) {
        scene.add( gltf.scene );
        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object
        
    },
    // called while loading is progressing
    function ( xhr ) {

        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

    },
    // called when loading has errors
    function ( error ) {
        console.log(error);
        console.log( 'An error happened' );

    }
);



const scene = new THREE.Scene()
const texture = new THREE.TextureLoader().load( skyBox ); 
scene.environment = texture;



const curve1 = new VivianiCurve(1);
const curve2 = new TorusKnot(1);
const curve3 = new CinquefoilKnot(1);

const curve1Geometry = new THREE.TubeBufferGeometry(curve1, 100, .2, 9, true);
const curve2Geometry = new THREE.TubeBufferGeometry(curve2, 100, .2, 9, true);
const curve3Geometry = new THREE.TubeBufferGeometry(curve3, 100, .2, 9, true);

const material1 = new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true, side: THREE.DoubleSide});

const tubeMesh1 = new THREE.Mesh(curve1Geometry, material1);
const tubeMesh2 = new THREE.Mesh(curve2Geometry, material1);
const tubeMesh3 = new THREE.Mesh(curve3Geometry, material1);


// scene.add(tubeMesh1);
// scene.add(tubeMesh2);
// scene.add(tubeMesh3);

let selectedPath = 0;
const possiblePaths = [
    tubeMesh1,
    tubeMesh2,
    tubeMesh3
];

const button1 = document.getElementById('path1');
const button2 = document.getElementById('path2');
const button3 = document.getElementById('path3');

button1.addEventListener('click', () => {
    selectedPath = 0;
});

button2.addEventListener('click', () => {
    selectedPath = 1;
});

button3.addEventListener('click', () => {
    selectedPath = 2;
});

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



// load outside 
function loadHDREquirect(path: any) {
    var pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    new RGBELoader().setPath('').load(path,
    function(texture) {
        var envMap = pmremGenerator.fromEquirectangular(texture).texture;
        scene.background = envMap;
        scene.environment = envMap;
        texture.dispose();
        pmremGenerator.dispose();
    })

}
loadHDREquirect(skyBox)



renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

new OrbitControls(camera, renderer.domElement)

const geometry = new THREE.SphereGeometry( 1, 8, 8 )
const material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    wireframe: false,
    side: THREE.DoubleSide,
});



// const light = new THREE.PointLight(0xffffff, 1, 100);
// light.position.set(0.0, 0.0, -4.0); 
// scene.add(light);

// const light2 = new THREE.PointLight(0xea7777, 1, 100);
// light2.position.set(0.0, 0.0, 4.0); 
// scene.add(light2);

// const sphere = new THREE.Mesh(geometry, material)
// scene.add(sphere)


// // add helpers to make visualizing things a little easier
// const sphereSize = 1;
// const pointLightHelper = new THREE.PointLightHelper( light, sphereSize );
// scene.add( pointLightHelper );


// const pointLightHelper2 = new THREE.PointLightHelper( light2, sphereSize );
// scene.add( pointLightHelper2 );

// const axesHelper = new THREE.AxesHelper( 5 );
// scene.add( axesHelper );

const clock = new THREE.Clock();

const cameraFollowsPath = (tube, elapsedTime) => {
    const loopTime = 50; 
    const t = (elapsedTime % loopTime)/loopTime;
    const t2 = ((elapsedTime + 0.1) % loopTime)/loopTime;

    const pos = tube.geometry.parameters.path.getPointAt(t);
    pos.y +=2;
    camera.position.copy(pos);
    camera.lookAt(0,1.5,0);
}



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
    // camera.position.z += -.01;
    render()
}

function render() {
    cameraFollowsPath(possiblePaths[selectedPath], clock.getElapsedTime())
    
    renderer.render(scene, camera)
}

animate()
