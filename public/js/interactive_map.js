
var container = document.getElementsByClassName("renderObject")[0];
var scene = new THREE.Scene();

let adminMode = false;
if (container.className.includes("adminMode")) {
    adminMode = true;
    // console.log("Admin mode set to true.");
}

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

var material_dashed_lines = new THREE.LineBasicMaterial({ color: 0x10c353 });
material_dashed_lines.linewidth = 2;

if (adminMode) {
    // material_selected.opacity = 0.2;
    // material_hovering.opacity = 0.3;
    material_selectable.opacity = 0.05;
    // material_dashed_lines = new THREE.LineBasicMaterial({ color: 0x043313 });
    // material_selected.color = 0x90e090;
    // material_hovering.color = 0x3030f0;
    // material_selectable.color =new THREE.color();

    var material_helper_grid = new THREE.LineBasicMaterial({ color: 0x10c353 });//0xd18340
    material_helper_grid.opacity = 0;
    material_helper_grid.transparent = true;
    material_helper_grid.name = "grid";


    var material_temporary_zone = new THREE.LineBasicMaterial({ color: 0x99C5DE });//0xd18340
    material_temporary_zone.opacity = 0.6;
    material_temporary_zone.transparent = true;

    var material_temporary_zone_lines = new THREE.LineBasicMaterial({ color: 0x0e20e0 });//0xd18340
    material_temporary_zone_lines.linewidth = 2;
}
// material_dashed_lines.linewidth = 2;

//#region coords

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
//#endregion

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

loader.load('../img/Beaurapaire3D.glb', function (gltf) {

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
if (adminMode) {
    const width = 600;
    const height = 300;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.screenSpacePanning = false;
controls.minDistance = 1;
controls.maxDistance = 100;
controls.maxPolarAngle = Math.PI / 2.1;

if (adminMode == true) {
    controls.enableKeys = false;
    controls.enabled = false;
    // console.log("here");
}


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



//##################################### Admin mode placement

var raycaster = new THREE.Raycaster();
var mouse_pos = new THREE.Vector2(0, 0);
control_key_down = false;
let helper_grid_geo = undefined;
let helper_grid = undefined;

let temp_zone_lines = undefined;
let temporary_zone = undefined;

if (adminMode) {

    helper_grid_geo = new THREE.CubeGeometry(25, 0.4, 15);
    helper_grid = new THREE.Mesh(helper_grid_geo, material_helper_grid);
    helper_grid.position.set(0, 0, 0);
    helper_grid.name = "grid_help";
    scene.add(helper_grid);


    let temporary_zone_geo = new THREE.CubeGeometry(1, 1, 1);
    temporary_zone = new THREE.Mesh(temporary_zone_geo, material_temporary_zone);
    scene.add(temporary_zone);
    temporary_zone.material.visible = false;

    let temp_zone_edges = new THREE.EdgesGeometry(temporary_zone_geo);
    temp_zone_lines = new THREE.LineSegments(temp_zone_edges, material_temporary_zone_lines);
    scene.add(temp_zone_lines);
    temp_zone_lines.material.visible = false;
}


//##################




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

if (adminMode) {
    renderer.domElement.addEventListener('touchmove', onTouchDrag, false);
    renderer.domElement.addEventListener('mousemove', onTouchDrag, false);
}

window.addEventListener('resize', onWindowResize, false);
//document.domElement.addEventListener("click", myFunction);

window.addEventListener('keydown', keyDown, false);
window.addEventListener('keyup', keyUp, false);

function onWindowResize() {
    if (adminMode) {
        const width = 600;
        const height = 300;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    } else {
        camera.aspect = container.scrollWidth / container.scrollHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.scrollWidth, container.scrollHeight);
    }

}

var hovering_zone = undefined;
var selected_zone = undefined;
var dragging = false;

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

    if (adminMode) {
        let dom_rect = renderer.domElement.getBoundingClientRect();
        mouse_pos.x = ((x_in - dom_rect.x) / renderer.domElement.width) * 2 - 1;
        mouse_pos.y = - ((y_in - dom_rect.y) / renderer.domElement.height) * 2 + 1;
    }

    dragging = true;

    if (adminMode == false) {
        hovering_zone = raycast(mouse_pos);
        enableHovering_Zone(hovering_zone);
    } else {

        if (control_key_down == false) {
            ClearZoneDrag();
            StartZoneDrag();
        }

    }

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
    if (adminMode) {
        let dom_rect = renderer.domElement.getBoundingClientRect();
        mouse_pos.x = ((x_in - dom_rect.x) / renderer.domElement.width) * 2 - 1;
        mouse_pos.y = - ((y_in - dom_rect.y) / renderer.domElement.height) * 2 + 1;
    }
    target = raycast(mouse_pos);
    successful_select = false;
    dragging = false;

    if (target != undefined && hovering_zone != undefined) {
        if (target.object.uuid == hovering_zone.object.uuid) {
            successful_select = true;
        }
    }

    if (adminMode == false) {
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
    } else {
        EndZoneDrag();
    }

}

function onTouchDrag(event) {
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
    if (adminMode) {
        let dom_rect = renderer.domElement.getBoundingClientRect();
        mouse_pos.x = ((x_in - dom_rect.x) / renderer.domElement.width) * 2 - 1;
        mouse_pos.y = - ((y_in - dom_rect.y) / renderer.domElement.height) * 2 + 1;
    }
}

let new_zone_being_dragged = false;
let new_zone_rendered = false;
let original_start_point = new THREE.Vector3(0, 0, 0);
let original_end_point = new THREE.Vector3(0, 0, 0);
let start_point = new THREE.Vector3(0, 0, 0);
let end_point = new THREE.Vector3(0, 0, 0);
let rotate = 0;



function StartZoneDrag() {
    // console.log("started");
    let hit_point = ground_raycast(mouse_pos);
    if (hit_point == undefined) {
        new_zone_being_dragged = false;
        new_zone_rendered = false;
    } else {
        new_zone_being_dragged = true;
        new_zone_rendered = true;
        rotate_slider.disabled = false;
        height_slider.disabled = false;
        rotate_slider.style.opacity = 1;
        rotate_label.style.opacity = 1;
        height_slider.style.opacity = 1;
        height_label.style.opacity = 1;

        start_point = hit_point;
        original_start_point = new THREE.Vector3(start_point.x, start_point.y, start_point.z);
        end_point = new THREE.Vector3(start_point.x, start_point.y, start_point.z);
        original_end_point = new THREE.Vector3(start_point.x, start_point.y, start_point.z);
        temporary_zone.material.visible = true;
        temporary_zone.position.set(start_point.x, start_point.y, start_point.z);
        temp_zone_lines.material.visible = true;
        temp_zone_lines.position.set(start_point.x, start_point.y, start_point.z);
        rotate = 0;
    }
}

function Render_Temp_Zone() {
    let new_position = new THREE.Vector3(0, 1, 0);
    let new_size = new THREE.Vector3(0.1, 0.1, 0.1);

    new_size.x = Math.abs(start_point.x - end_point.x);
    if (start_point.x > end_point.x) {
        //x size range
        new_position.x = end_point.x + (new_size.x / 2);
    }
    else {
        new_position.x = start_point.x + (new_size.x / 2);
    }

    new_size.y = Math.abs(start_point.y - end_point.y);
    if (start_point.y > end_point.y) {
        //y size range
        new_position.y = end_point.y + (new_size.y / 2);
    } else {
        new_position.y = start_point.y + (new_size.y / 2);
    }

    new_size.z = Math.abs(start_point.z - end_point.z);
    if (start_point.z > end_point.z) {
        //z size range
        new_position.z = end_point.z + (new_size.z / 2);
    }
    else {
        new_position.z = start_point.z + (new_size.z / 2);
    }
    if (new_size.x == 0) {
        new_size.x = 0.1;
    }
    if (new_size.y == 0) {
        new_size.y = 0.1;
    }
    if (new_size.z == 0) {
        new_size.z = 0.1;
    }

    temporary_zone.position.set(new_position.x, new_position.y, new_position.z);
    temporary_zone.scale.set(new_size.x, new_size.y, new_size.z);
    temp_zone_lines.scale.set(new_size.x, new_size.y, new_size.z);
    temp_zone_lines.position.set(new_position.x, new_position.y, new_position.z);

    temporary_zone.rotation.y = rotate;
    temp_zone_lines.rotation.y = rotate;
}

function DoDrag() {

    if (new_zone_being_dragged && new_zone_rendered) {
        let hit_point = ground_raycast(mouse_pos);
        if (hit_point != undefined) {
            // console.log("dragged");
            let x_size = Math.abs(start_point.x - hit_point.x);
            let y_size = Math.abs(start_point.z - hit_point.z);
            let height = Math.log(x_size * y_size + Math.E) * 0.25 + 0.3;
            end_point = new THREE.Vector3(hit_point.x, start_point.y + height, hit_point.z);
            original_end_point = new THREE.Vector3(hit_point.x, start_point.y + height, hit_point.z);
            rotate = 0;
            NewCoords(start_point, end_point, rotate);
            Render_Temp_Zone();
        }
    }
}
var rotate_label = undefined;
var rotate_slider = undefined;
var height_label = undefined;
var height_slider = undefined;
var coordinate_entry_point1 = undefined;
var coordinate_entry_point2 = undefined;
var rotation_entry_point = undefined;


function attempt_parse_coord(coord) {
    var no_b1 = coord.replace("(", "");
    var no_b2 = no_b1.replace(")", "");
    var split = no_b2.split(",");
    if (split.length != 3) {
        return undefined;
    }
    var coord_new = {
        "x": parseFloat(split[0]),
        "y": parseFloat(split[1]),
        "z": parseFloat(split[2])
    }

    if (isNaN(coord_new.x) || isNaN(coord_new.y) || isNaN(coord_new.z)) {
        return undefined;
    }
    return coord_new;
}

if (adminMode) {
    rotate_label = document.getElementById("rotateChangerLabel");
    rotate_slider = document.getElementById("rotateChanger");
    height_label = document.getElementById("heightChangerLabel");
    height_slider = document.getElementById("heightChanger");
    coordinate_entry_point1 = document.getElementById("coord_entry_1");
    coordinate_entry_point2 = document.getElementById("coord_entry_2");
    rotation_entry_point = document.getElementById("rotation_entry");

    // rotate_slider.domElement.addEventListener('touchend', onTouchEnd, false);
    rotate_slider.oninput = function () {
        let new_val = -(rotate_slider.value / 360) * Math.PI * 2;
        SetRotate(new_val);
    }
    height_slider.oninput = function () {
        let new_val = height_slider.value / 100;
        SetRaise(new_val);
    }
    coordinate_entry_point1.oninput = function () {

        let new_coord = attempt_parse_coord(coordinate_entry_point1.value);
        if (new_coord != undefined) {
            start_point = new THREE.Vector3(new_coord.x, new_coord.y, new_coord.z);
            Render_Temp_Zone();
        }
    }
    coordinate_entry_point2.oninput = function () {
        let new_coord = attempt_parse_coord(coordinate_entry_point2.value);
        if (new_coord != undefined) {
            end_point = new THREE.Vector3(new_coord.x, new_coord.y, new_coord.z);
            Render_Temp_Zone();
        }
    }
    rotation_entry_point.oninput = function () {

        let new_val = parseFloat(rotation_entry_point.value);
        if (isNaN(new_val) != true) {
            SetRotate(-(new_val / 360) * Math.PI * 2);
        }
    }
    coordinate_entry_point2.value = "";
    coordinate_entry_point1.value = "";
    rotation_entry_point.value = "";
    rotate_slider.disabled = true;
    height_slider.disabled = true;
    rotate_slider.style.opacity = 0.5;
    rotate_label.style.opacity = 0.5;
    height_slider.style.opacity = 0.5;
    height_label.style.opacity = 0.5;
}

// renderer.domElement.addEventListener('touchend', onTouchEnd, false);

function SetRaise(new_raise) {
    start_point.y = original_start_point.y + new_raise;
    end_point.y = original_end_point.y + new_raise;
    NewCoords(start_point, end_point, rotate);
    Render_Temp_Zone();



}
function SetRotate(new_rotate) {
    rotate = new_rotate;
    NewCoords(start_point, end_point, rotate);
    Render_Temp_Zone();
}

function NewCoords(start, end, rot) {

    coordinate_entry_point1.value = "(" + start.x.toFixed(2).toString() + "," + start.y.toFixed(2).toString() + "," + start.z.toFixed(2).toString() + ")";
    coordinate_entry_point2.value = "(" + end.x.toFixed(2).toString() + "," + end.y.toFixed(2).toString() + "," + end.z.toFixed(2).toString() + ")";
    rotation_entry_point.value = (-360 * (rot / (Math.PI * 2))).toFixed(2).toString();

    // console.log("Start:", start);
    // console.log("End:", end);
    // console.log("Rotation:", rot);
}


function EndZoneDrag() {
    new_zone_being_dragged = false;

}

function ClearZoneDrag() {
    new_zone_rendered = false;
    new_zone_being_dragged = false;

    temporary_zone.material.visible = false;
    temp_zone_lines.material.visible = false;
    rotate_slider.value = 0;
    height_slider.value = 0;
    rotate_slider.disabled = true;
    height_slider.disabled = true;
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

    if (adminMode) {
        camera.position.set(0, 6, 0.5);
    } else {
        camera.position.set(0, 5, 3);
    }
    //set(0, 5, 5);
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
function ground_raycast(pos) {
    raycaster.setFromCamera(pos, camera);
    var intersects = raycaster.intersectObjects(scene.children);
    var closest_point = undefined;
    var closest_dist = 100000;
    // console.log(intersects.length);
    for (var i = 0; i < intersects.length; i++) {

        //intersects[i].object.material.color.set(0xff0000);

        var dist = intersects[i].point.distanceTo(camera.position);
        if (dist < closest_dist && intersects[i].object.name == "grid_help") {
            // console.log(intersects[i].object);
            closest_dist = dist;
            closest_point = intersects[i].point;
        }
    }
    if (closest_point) {
        // console.log(closest_point);
        return closest_point;
    }
    else {
        return undefined;
    }
}


function animate() {



    requestAnimationFrame(animate);
    controls.update();
    if (dragging && adminMode) {
        DoDrag();
    }
    renderer.render(scene, camera);


}

function keyDown(e) {
    // console.log("Key down:", e);
    if (e.code == "AltLeft" && adminMode == true) {
        // console.log("Key down:", e);
        control_key_down = true;
        controls.enabled = true;
    }
}
function keyUp(e) {
    if (e.code == "AltLeft" && adminMode == true) {
        control_key_down = false;
        controls.enabled = false;

    }

}
