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
var material_light = new THREE.MeshPhongMaterial({ color: 0xd0d0d0 });
var material_selectable =  new THREE.MeshPhongMaterial({ color: 0xd06050 });
material_selectable.opacity = 0.2;
material_selectable.transparent = true;
var material_dashed_lines = new THREE.LineBasicMaterial({color: 0xd18340});
material_dashed_lines.linewidth = 2;
//material_dashed_lines.dashSize= 3;


//## GEOMETRY AND MESHES


class Selectable_Zone{
    mesh;
    line;
    constructor(ID, position, size){
        this.ID = ID;
        this.position = position;
        this.size = size;
        this.geometry = new THREE.CubeGeometry(this.size.x, this.size.y, this.size.z);
        this.mesh = new THREE.Mesh(this.geometry, material_selectable);
        this.edges = new THREE.EdgesGeometry(this.geometry);
        this.line = new THREE.LineSegments(this.edges, material_dashed_lines);
        this.mesh.position.set(position.x, position.y, position.z);
        this.line.position.set(position.x, position.y, position.z);
    }

}

let selectable_zones = []

function refresh_zones(){
    selectable_zones = []
    standard_size = new THREE.Vector3(2,1.3,3);
    for (i = 0; i < 3; i++) {
        new_pos = new THREE.Vector3(i*3 - 3.4, 0.5, 0);
        
        new_zone = new Selectable_Zone(i, new_pos, standard_size);
        scene.add(new_zone.mesh);
        scene.add(new_zone.line);
      }
}

refresh_zones();



var cone_geometry1 = new THREE.ConeGeometry(1, 2, 15);
var cone_mesh1 = new THREE.Mesh(cone_geometry1, material_light);
cone_mesh1.castShadow = true;

var cone_geometry2 = new THREE.ConeGeometry(1, 1, 15);
var cone_mesh2 = new THREE.Mesh(cone_geometry2, material_light);
cone_mesh2.castShadow = true;

var sphere_geometry1 = new THREE.SphereGeometry(1, 15, 15);
var sphere_mesh1 = new THREE.Mesh(sphere_geometry1, material_light);
sphere_mesh1.castShadow = true;

var cube_geometry1 = new THREE.CubeGeometry(5, 1, 1);
var cube_mesh1 = new THREE.Mesh(cube_geometry1, material_light);
cube_mesh1.castShadow = true;

var cube_geometry2 = new THREE.CubeGeometry(7, 1, 1);
var cube_mesh2 = new THREE.Mesh(cube_geometry2, material_light);
cube_mesh2.castShadow = true;

var floor_geometry = new THREE.PlaneGeometry(10, 10);
var floor_mesh = new THREE.Mesh(floor_geometry, material_grey);
floor_mesh.receiveShadow = true;


//## LIGHTS

var directionalLight = new THREE.DirectionalLight(0xffffff, 1, 100);
directionalLight.position.set(1.1, 1.5, 1.3);
directionalLight.castShadow = true;


var light = new THREE.AmbientLight(0x202020);

//## CAMERA CONTROL
var camera = new THREE.PerspectiveCamera(85, container.scrollWidth / container.scrollHeight, 0.1, 1000);
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.screenSpacePanning = false;
controls.minDistance = 1;
controls.maxDistance = 100;
controls.maxPolarAngle = Math.PI / 2.1;


//## SCENE INITIALISATION
scene.add(cone_mesh1);
scene.add(cone_mesh2);
scene.add(sphere_mesh1);
scene.add(cube_mesh1);
scene.add(cube_mesh2);
scene.add(floor_mesh);
scene.add(directionalLight);
scene.add(light);
scene.fog = new THREE.FogExp2( 0xfefefe);//, 4, 40 );
scene.fog.density = 0.03;

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



function start() {
    scene.background = new THREE.Color(0xf0f0f0);
    camera.position.set(0, 5, 5);
    cone_mesh1.position.set(2, 1, 0);
    cone_mesh2.position.set(-1, 0.5, 1);
    sphere_mesh1.position.set(0, 0.9, -2);
    cube_mesh1.position.set(0, 0.5, 3.2);
    cube_mesh2.position.set(-3, 0.5, 0.2);
    cube_mesh2.rotation.y = Math.PI / 2;

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


