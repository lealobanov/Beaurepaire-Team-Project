
var container = document.getElementsByClassName("renderObject")[0];
var scene = new THREE.Scene();


//## RENDERER

var renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;


renderer.setSize(container.scrollWidth, container.scrollHeight);

//## MATERIALS
// var material_grey = new THREE.MeshPhongMaterial({ color: 0x606060 });
// var material_light = new THREE.MeshPhongMaterial({ color: 0xd0d0d0 });
// var material_red = new THREE.MeshPhongMaterial({ color: 0xee4040 });
// material_red.wireframe = true;
// material_red.shininess = 50;
// var material_blue = new THREE.MeshPhysicalMaterial({ color: 0x444444 });
// material_blue.roughness = 0.1;

var material_selectable = new THREE.MeshPhongMaterial({ color: 0x90e090 });//0xd06050
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

var material_dashed_lines = new THREE.LineBasicMaterial({ color: 0x10c353 });//0xd18340
material_dashed_lines.linewidth = 2;

// function get_coords_TEMP() {

//     var coords = [
//         {
//             "id": 0,
//             "coord1": {
//                 "x": 1.2,
//                 "y": 0,
//                 "z": -3.2
//             },
//             "coord2": {
//                 "x": 6.8,
//                 "y": 1.3,
//                 "z": -1.5
//             },
//             "rotation": 0
//         },
//         {
//             "id": 1,
//             "coord1": {
//                 "x": -6.8,
//                 "y": 0,
//                 "z": -2.8
//             },
//             "coord2": {
//                 "x": -1.1,
//                 "y": 0.7,
//                 "z": -1.5
//             },
//             "rotation": 0.12
//         },
//         {
//             "id": 2,
//             "coord1": {
//                 "x": -0.4,
//                 "y": 0,
//                 "z": -3.3
//             },
//             "coord2": {
//                 "x": 0.5,
//                 "y": 0.8,
//                 "z": -1.5
//             },
//             "rotation": 0
//         },
//         {
//             "id": 3,
//             "coord1": {
//                 "x": -0.44,
//                 "y": 0,
//                 "z": -0.63
//             },
//             "coord2": {
//                 "x": 0.58,
//                 "y": 0.6,
//                 "z": 1.1
//             },
//             "rotation": 0
//         },
//         {
//             "id": 4,
//             "coord1": {
//                 "x": 5.8,
//                 "y": -0.1,
//                 "z": -0.5
//             },
//             "coord2": {
//                 "x": 6.9,
//                 "y": 0.6,
//                 "z": 1.3
//             },
//             "rotation": 0
//         },
//         {
//             "id": 5,
//             "coord1": {
//                 "x": 4.25,
//                 "y": 0,
//                 "z": 0.81
//             },
//             "coord2": {
//                 "x": 5,
//                 "y": 0.6,
//                 "z": 2.2
//             },
//             "rotation": 0.01
//         },
//         {
//             "id": 6,
//             "coord1": {
//                 "x": -7.3,
//                 "y": 0,
//                 "z": 0.1
//             },
//             "coord2": {
//                 "x": -6,
//                 "y": 0.6,
//                 "z": 2.8
//             },
//             "rotation": 0.28
//         },
//         {
//             "id": 7,
//             "coord1": {
//                 "x": -8.2,
//                 "y": 0,
//                 "z": -2.4
//             },
//             "coord2": {
//                 "x": -7.2,
//                 "y": 0.7,
//                 "z": -1
//             },
//             "rotation": 0.24
//         },
//         {
//             "id": 8,
//             "coord1": {
//                 "x": 5.7,
//                 "y": -0.2,
//                 "z": 3.55
//             },
//             "coord2": {
//                 "x": 6.8,
//                 "y": 0.5,
//                 "z": 4.6
//             },
//             "rotation": 0
//         }
//     ];
//     return coords;
// }


var coordinate_data = {};
var zone_data = {};
var selectable_zones = [];

async function SetupZones() {


    coordinate_data = await Get_Modeling_Data();
    refresh_zones(coordinate_data);
    GiveDataToZones();

}

async function GiveDataToZones() {
    zone_data = await Get_Modal_Data();

    for (var i = 0; i < zone_data.length; i++) {
        for (var n = 0; n < selectable_zones.length; n++) {
            if (selectable_zones[n].ID == zone_data[i]._id) {
                selectable_zones[n].data = zone_data[i];
                break;
            }
        }
    }
}





function zone_data_get(zone_id) {
    if (selectable_zones.length == 0) {
        return undefined;
    }
    else {
        var target = undefined;
        for (i = 0; i < selectable_zones.length; i++) {
            if (selectable_zones[i].ID == zone_id) {
                target = selectable_zones[i].data;
                return target;
            }
        }
        return target;
    }
}


function refresh_zones(coords) {

    clear_zones();

    standard_size = new THREE.Vector3(2, 1.3, 3);
    //console.log(coords);
    for (i = 0; i < coords.length; i++) {



        new_pos = new THREE.Vector3(i * 3 - 3.4, 0.5, 0);

        new_zone = new Selectable_Zone(coords[i]);
        scene.add(new_zone.mesh);
        scene.add(new_zone.line);
        selectable_zones.push(new_zone);


    }
}
function clear_zones() {
    if (selectable_zones.length > 0) {
        for (zoneID in selectable_zones) {
            scene.remove(selectable_zones[zoneID].mesh);
            scene.remove(selectable_zones[zoneID].line);
        }
    }
    selectable_zones = []
}



var loader = new THREE.GLTFLoader();

loader.load('img/Beaurapaire3D.glb', function (gltf) {

    scene.add(gltf.scene);
    gltf.scene.scale.set(0.008, 0.008, 0.008);
    gltf.scene.position.set(0, -0.7, 0.5);
    gltf.scene.rotation.set(0, Math.PI, 0);

    //console.log(scene);


}, undefined, function (error) {

    console.error(error);

});

SetupZones();

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
// scene.add(cone_mesh1);
// scene.add(cone_mesh2);
// scene.add(sphere_mesh1);
// scene.add(cube_mesh1);
// scene.add(cube_mesh2);
// scene.add(floor_mesh);
// scene.add(torusKnot);
scene.add(directionalLight);
scene.add(light);

//################################## WARRINININGING






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
renderer.domElement.addEventListener('mousedown', onTouchStart, false);
renderer.domElement.addEventListener('mouseup', onTouchEnd, false);
renderer.domElement.addEventListener('touchstart', onTouchStart, false);
renderer.domElement.addEventListener('touchend', onTouchEnd, false);

window.addEventListener('resize', onWindowResize, false);
//document.domElement.addEventListener("click", myFunction);

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

    var x_in;
    var y_in;
    if (event.type == "touchstart") {
        x_in = event.changedTouches[0].clientX;
        y_in = event.changedTouches[0].clientY;
    }
    else {
        x_in = event.clientX;
        y_in = event.clientY;
    }
    mouse_pos.x = ((x_in - renderer.domElement.offsetLeft) / renderer.domElement.width) * 2 - 1;
    mouse_pos.y = - ((y_in - renderer.domElement.offsetTop) / renderer.domElement.height) * 2 + 1;

    hovering_zone = raycast(mouse_pos);
    enableHovering_Zone(hovering_zone);
}
function onTouchEnd(event) {
    // calculate mouse position in normalized device coordinates

    var x_in;
    var y_in;
    if (event.type == "touchend") {
        x_in = event.changedTouches[0].clientX;
        y_in = event.changedTouches[0].clientY;
    }
    else {
        x_in = event.clientX;
        y_in = event.clientY;
    }

    mouse_pos.x = ((x_in - renderer.domElement.offsetLeft) / renderer.domElement.width) * 2 - 1;
    mouse_pos.y = - ((y_in - renderer.domElement.offsetTop) / renderer.domElement.height) * 2 + 1;
    target = raycast(mouse_pos);
    successful_select = false;

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
        Deselect_Zone();
        if (deselect == false) {
            select_zone(target);
        }
        else {
            Zone_Deselected();
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
    Zone_Clicked(selected_zone.object.userData.ID);

}

/**
 * Deselects whatever zone is currently selected.
 */
function Deselect_Zone() {
    if (selected_zone != undefined) {
        selected_zone.object.material = material_selectable;
        selected_zone = undefined;
    }
}

function start() {
    scene.background = new THREE.Color(0xf0f0f0);
    camera.position.set(0, 5, 3); //set(0, 5, 5);
    // cone_mesh1.position.set(2, 1, 0);
    // cone_mesh2.position.set(-1, 0.5, 1);
    // sphere_mesh1.position.set(-1, 0.9, -3);
    // cube_mesh1.position.set(0, 0.5, 3.2);
    // cube_mesh2.position.set(-3, 0.5, 0.2);
    // torusKnot.position.set(-1, 0.9, -3);
    // torusKnot.rotation.x = Math.PI / 2;
    // cube_mesh2.rotation.y = Math.PI / 2;

    // //cone_mesh.rotation.x = Math.PI;
    // floor_mesh.rotation.x = -Math.PI / 2;
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
