//var THREE = require('three');
//import { OrbitControls } from '../js/OrbitControls.js';


var container = document.getElementsByClassName("renderObject")[0];
var scene = new THREE.Scene();

//## RENDERER

var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.setSize(container.scrollWidth, container.scrollHeight);

//## MATERIALS
var material_grey = new THREE.MeshPhongMaterial({ color: 0x606060 });
var material_light = new THREE.MeshPhongMaterial({ color: 0x8f6f7a });

//## GEOMETRY AND MESHES

var cone_geometry = new THREE.ConeGeometry(1, 2, 15);
var cone_mesh = new THREE.Mesh(cone_geometry, material_light);
cone_mesh.castShadow = true;

var floor_geometry = new THREE.PlaneGeometry(5, 5);
var floor_mesh = new THREE.Mesh(floor_geometry, material_grey);
floor_mesh.receiveShadow = true;

//## LIGHTS

var directionalLight = new THREE.DirectionalLight(0xffffff, 1, 100);
directionalLight.position.set(1, 1, 1);
directionalLight.castShadow = true;


var light = new THREE.AmbientLight(0x202020);

//## CAMERA CONTROL
var camera = new THREE.PerspectiveCamera(75, container.scrollWidth / container.scrollHeight, 0.1, 1000);
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.screenSpacePanning = false;
controls.minDistance = 1;
controls.maxDistance = 100;
controls.maxPolarAngle = Math.PI / 2.1;


//## SCENE INITIALISATION
scene.add(cone_mesh);
scene.add(floor_mesh);
scene.add(directionalLight);
scene.add(light);


if (WEBGL.isWebGLAvailable()) {
    container.appendChild(renderer.domElement);
    start();

    animate();

} else {

    var warning = WEBGL.getWebGLErrorMessage();
    container.appendChild(warning);

}
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = container.scrollWidth / container.scrollHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.scrollWidth, container.scrollHeight);
}


//####### WEBGL three.js code  \/ \/


function start() {
    scene.background = new THREE.Color(0xf0f0f0);
    camera.position.set(0, 5, 5);
    cone_mesh.position.set(0, 1, 0);
    //cone_mesh.rotation.x = Math.PI;
    floor_mesh.rotation.x = -Math.PI / 2;
    controls.update();



    console.log("Started");
}

function animate() {

    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;



    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);


}


