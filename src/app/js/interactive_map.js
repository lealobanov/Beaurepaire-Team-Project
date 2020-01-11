
var container = document.getElementsByClassName("renderObject")[0];
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, container.scrollWidth / container.scrollHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();


renderer.setSize(container.scrollWidth, container.scrollHeight);


var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

var cube = new THREE.Mesh(geometry, material);

scene.add(cube);

camera.position.z = 5;




function start() {


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

