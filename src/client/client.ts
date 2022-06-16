import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { GrannyKnot, HeartCurve, VivianiCurve, TrefoilKnot, TorusKnot, CinquefoilKnot } from 'three/examples/jsm/curves/CurveExtras';

// avatar: 
// https://storage.googleapis.com/img-gorillaisms/thraxatar.glb

// court: 
// https://storage.googleapis.com/img-gorillaisms/orange.glb

//hdr: 
// https://storage.googleapis.com/img-gorillaisms/hamburg_hbf_1k.hdr

const lowPolyStadiumModel = 'https://storage.googleapis.com/img-gorillaisms/orange.glb';
const stadiumModel = 'https://storage.googleapis.com/img-gorillaisms/MetaBall_Stadium.glb';

const screen1 = 'https://storage.googleapis.com/img-gorillaisms/remapped-screen-large-1.glb';
const screen2 = 'https://storage.googleapis.com/img-gorillaisms/screen-large-2.glb';

const skyBox = "https://storage.googleapis.com/img-gorillaisms/hamburg_hbf_1k.hdr";


const stats = Stats()
document.body.appendChild(stats.dom)

// Load a glTF resource

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( 'https://threejs.org/examples/js/libs/draco/' );
loader.setDRACOLoader( dracoLoader );



const video = document.getElementById( 'videoElement' ) as HTMLVideoElement;
video.setAttribute("crossorigin", "anonymous");
video.play()
const videoTexture = new THREE.VideoTexture( video );

const videoMaterial = new THREE.MeshBasicMaterial({
    map: videoTexture,
    side: THREE.FrontSide,
    toneMapped: false,
})

let screen1Mesh = null;
loader.load(
    // resource URL
    screen1,
    // called when the resource is loaded
    function (gltf) {
        scene.add(gltf.scene);
        
        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object
        gltf.scene.traverse(function(o) {
            
            screen1Mesh = o;
            // @ts-ignore
            o.material = videoMaterial;
            if (o instanceof THREE.Mesh) { 
                console.log('look here');
                console.log(o);
                o.material = videoMaterial;
            } 
        });
    },
    // called while loading is progressing
    function ( xhr ) {

        // console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

    },
    // called when loading has errors
    function ( error ) {
        console.log(error);
        console.log( 'An error happened' );

    }
);


// loader.load(
//     // resource URL
//     screen2,
//     // called when the resource is loaded
//     function ( gltf ) {
//         scene.add( gltf.scene );

//         gltf.animations; // Array<THREE.AnimationClip>
//         gltf.scene; // THREE.Group
//         gltf.scenes; // Array<THREE.Group>
//         gltf.cameras; // Array<THREE.Camera>
//         gltf.asset; // Object
//     },
//     // called while loading is progressing
//     function ( xhr ) {

//         console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

//     },
//     // called when loading has errors
//     function ( error ) {
//         console.log(error);
//         console.log( 'An error happened' );

//     }
// );




loader.load(
    // resource URL
    stadiumModel,
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




// loader.load(
//     // resource URL
//     'https://storage.googleapis.com/img-gorillaisms/thraxatar.glb',
//     // called when the resource is loaded
//     function ( gltf ) {
//         scene.add( gltf.scene );
//         gltf.animations; // Array<THREE.AnimationClip>
//         gltf.scene; // THREE.Group
//         gltf.scenes; // Array<THREE.Group>
//         gltf.cameras; // Array<THREE.Camera>
//         gltf.asset; // Object
        
//     },
//     // called while loading is progressing
//     function ( xhr ) {

//         console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

//     },
//     // called when loading has errors
//     function ( error ) {
//         console.log(error);
//         console.log( 'An error happened' );

//     }
// );



const scene = new THREE.Scene()
const texture = new THREE.TextureLoader().load( skyBox ); 
scene.environment = texture;


const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)


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



camera.position.set(-2, 21, -17);

function render() {
    stats.update();

    // cameraFollowsPath(possiblePaths[selectedPath], clock.getElapsedTime())
    videoTexture.needsUpdate = true;
    video.play();
    renderer.render(scene, camera)
}

animate()
