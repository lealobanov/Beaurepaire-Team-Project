//import { Vector3, RGBA_ASTC_10x10_Format } from "./three";

var container = document.getElementsByClassName("renderObject")[0];
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, container.scrollWidth / container.scrollHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();


renderer.setSize(container.scrollWidth, container.scrollHeight);


var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshPhongMaterial();

var cube = new THREE.Mesh(geometry, material);
var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
var light = new THREE.AmbientLight(0x202020);

scene.add(cube);
scene.add(directionalLight);
scene.add(light);


scene.background = new THREE.Color(0xf0f0f0);



function start() {
    camera.position.z = 5;
    directionalLight.position.set(1, 1, 1);


    console.log("Started");
}

function animate() {

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;



    requestAnimationFrame(animate);
    renderer.render(scene, camera);


}

if (WEBGL.isWebGLAvailable()) {
    container.appendChild(renderer.domElement);
    start();

    animate();

} else {

    var warning = WEBGL.getWebGLErrorMessage();
    container.appendChild(warning);

}

