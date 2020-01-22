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
var material_red = new THREE.MeshPhongMaterial({ color: 0xee4040 });
var material_selectable = new THREE.MeshPhongMaterial({ color: 0xd06050 });
material_selectable.opacity = 0.2;
material_selectable.transparent = true;
material_selectable.name = "selectable";
var material_hovering = new THREE.MeshPhongMaterial({ color: 0x9090e0 });
material_hovering.opacity = 0.6;
material_hovering.transparent = true;
material_hovering.name = "selectable";
var material_selected = new THREE.MeshPhongMaterial({ color: 0x3030f0 });
material_selected.opacity = 0.4;
material_selected.transparent = true;
material_selected.name = "selectable";

var material_dashed_lines = new THREE.LineBasicMaterial({ color: 0xd18340 });
material_dashed_lines.linewidth = 2;
var selectable_zones = [];

function refresh_zones() {
    selectable_zones = []
    standard_size = new THREE.Vector3(2, 1.3, 3);
    for (i = 0; i < 3; i++) {
        new_pos = new THREE.Vector3(i * 3 - 3.4, 0.5, 0);

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

var sphere_geometry1 = new THREE.SphereGeometry(0.1, 15, 15);
var sphere_mesh1 = new THREE.Mesh(sphere_geometry1, material_red);
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
scene.fog = new THREE.FogExp2(0xfefefe);//, 4, 40 );
scene.fog.density = 0.03;
var raycaster = new THREE.Raycaster();
var mouse_pos = new THREE.Vector2(0, 0);

if (WEBGL.isWebGLAvailable()) {
    container.appendChild(renderer.domElement);
    start();

    animate();

} else {

    var warning = WEBGL.getWebGLErrorMessage();
    container.appendChild(warning);

}
renderer.domElement.addEventListener('touchstart', onTouchStart, false);
renderer.domElement.addEventListener('touchend', onTouchEnd, false);
window.addEventListener('resize', onWindowResize, false);
//document.domElement.addEventListener("click", myFunction);
function myFunction() {
    alert("Hello World!");
}
function onWindowResize() {
    camera.aspect = container.scrollWidth / container.scrollHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.scrollWidth, container.scrollHeight);
    console.log("resized");
}

var hovering_zone = undefined;
var selected_zone = undefined;

function onTouchStart(event) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components

    mouse_pos.x = ((event.changedTouches[0].clientX - renderer.domElement.offsetLeft) / renderer.domElement.width) * 2 - 1;
    mouse_pos.y = - ((event.changedTouches[0].clientY - renderer.domElement.offsetTop) / renderer.domElement.height) * 2 + 1;
    //console.log(event.changedTouches[0].clientY, renderer.domElement.height);

    hovering_zone = raycast(mouse_pos);
    enableHovering_Zone(hovering_zone);
}
function onTouchEnd(event) {
    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components

    mouse_pos.x = ((event.changedTouches[0].clientX - renderer.domElement.offsetLeft) / renderer.domElement.width) * 2 - 1;
    mouse_pos.y = - ((event.changedTouches[0].clientY - renderer.domElement.offsetTop) / renderer.domElement.height) * 2 + 1;
    //console.log(event.changedTouches[0].clientY, renderer.domElement.height);
    target = raycast(mouse_pos);
    successful_select = false;
    //console.log(target, hovering_zone);
    if (target != undefined && hovering_zone != undefined) {
        if (target.object.uuid == hovering_zone.object.uuid) {
            successful_select = true;
        }
    }

    disableHovering_Zone();
    if (successful_select) {
        var deselect = false;
        if (selected_zone != null) {
            if (selected_zone.object.uuid == target.object.uuid) {
                deselect = true;
            }
        }
        deselect_zone();
        if (deselect == false) {
            select_zone(target);
        }
    }
}
function disableHovering_Zone() {
    if (hovering_zone != undefined) {
        var skip = false;
        if (selected_zone != undefined) {
            if (selected_zone.object.uuid == hovering_zone.object.uuid) {
                hovering_zone.object.material = material_selected;
                skip = true;
            }
        }
        if (skip == false) {
            hovering_zone.object.material = material_selectable;
        }

        hovering_zone = undefined;
    }
}
function enableHovering_Zone(zone) {
    if (hovering_zone != undefined) {
        disableHovering_Zone();
    }
    if (zone != undefined) {
        hovering_zone = zone;
        hovering_zone.object.material = material_hovering;
    }
}
function select_zone(zone) {
    selected_zone = zone;
    selected_zone.object.material = material_selected;
    console.log(selected_zone);
}
function deselect_zone() {
    if (selected_zone != undefined) {
        selected_zone.object.material = material_selectable;
        selected_zone = undefined;
    }
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

function raycast(pos) {
    raycaster.setFromCamera(pos, camera);
    var intersects = raycaster.intersectObjects(scene.children);
    var closest_point;
    var closest_dist = 100000;
    var closest_obj = undefined;
    for (var i = 0; i < intersects.length; i++) {

        //intersects[i].object.material.color.set(0xff0000);
        var dist = intersects[i].point.distanceTo(camera.position);
        if (dist < closest_dist && intersects[i].object.type == "Mesh") {
            closest_dist = dist;
            closest_point = intersects[i].point;
            closest_obj = intersects[i];
        }
    }
    if (closest_point) {
        //console.log(closest_obj);
        if (closest_obj.object.material.name != "selectable") {
            closest_obj = undefined;
            //sphere_mesh1.position.set(closest_point.x, closest_point.y, closest_point.z);
        }


    }
    return closest_obj;

}

function animate() {

    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;
    //console.log(mouse_pos);


    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);


}


