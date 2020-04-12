//Find the canvas container. An HTML DIV with class "renderObject"
var container = document.getElementsByClassName("renderObject")[0];
var scene = new THREE.Scene();

// AdminMode restricts camera movement and allows the user to draw new zones by hand.
// This is used in the sandman backend.
let adminMode = false;
if (container.className.includes("adminMode")) {
    adminMode = true;
}

//## RENDERER

var renderer = new THREE.WebGLRenderer();
//renderer.shadowMap.enabled = false;
//renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Set canvas size
renderer.setSize(container.scrollWidth, container.scrollHeight);

//## MATERIALS

// Material for selectable zones
var material_selectable = new THREE.MeshPhongMaterial({ color: 0x90e090 });//0xd06050
material_selectable.opacity = 0.2;
material_selectable.transparent = true;
material_selectable.name = "selectable";

// Material for hovering over a zone
var material_hovering = new THREE.MeshPhongMaterial({ color: 0x9090e0 });
material_hovering.opacity = 0.6;
material_hovering.transparent = true;
material_hovering.name = "selectable";

// Material for a selected zone
var material_selected = new THREE.MeshPhongMaterial({ color: 0x3030f0 });
material_selected.opacity = 0.4;
material_selected.transparent = true;
material_selected.name = "selectable";

// Material for outline of zones
var material_dashed_lines = new THREE.LineBasicMaterial({ color: 0x10c353 });
material_dashed_lines.linewidth = 2;

if (adminMode) {
    // If in admin mode, change some visuals to make it easier to understand.
    material_selectable.opacity = 0.05;
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

// Initialize data relating to backend zone info.
var coordinate_data = {};
var zone_data = {};
var selectable_zones = [];

async function SetupZones() {
    // Start get data sequence from backend (async)
    coordinate_data = await Get_Modeling_Data();
    refresh_zones(coordinate_data);
    GiveDataToZones();
}

async function GiveDataToZones() {
    // Wait fo rthe zone data to come in.
    zone_data = await Get_Modal_Data();
    // For each zone, assign it data
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
        // If the backend has no zones
        return undefined;
    }
    else {
        var target = undefined;
        // Look through each zone, see if the ID matches the requested one.
        for (i = 0; i < selectable_zones.length; i++) {
            if (selectable_zones[i].ID == zone_id) {
                // ID matched, return data.
                target = selectable_zones[i].data;
                return target;
            }
        }
        return target;
    }
}


function refresh_zones(coords) {
    // Delete all existing zone objects
    clear_zones();

    standard_size = new THREE.Vector3(2, 1.3, 3);

    // Go through each coord set and create new zone.
    for (i = 0; i < coords.length; i++) {
        // Generate standard pos (overwritten soon)
        new_pos = new THREE.Vector3(i * 3 - 3.4, 0.5, 0);
        // Create new zone from the coords
        new_zone = new Selectable_Zone(coords[i]);
        // Add the zone into the scene
        scene.add(new_zone.mesh);
        scene.add(new_zone.line);
        // Store the zone into the reference list.
        selectable_zones.push(new_zone);
    }
}
function clear_zones() {
    // Go through each zone and delete it
    if (selectable_zones.length > 0) {
        for (zoneID in selectable_zones) {
            scene.remove(selectable_zones[zoneID].mesh);
            scene.remove(selectable_zones[zoneID].line);
        }
    }
    selectable_zones = []
}


// Greate GLTF loader to load in the 3D map.
var loader = new THREE.GLTFLoader();

// Load in 3D map
loader.load('../img/2020ScanCompositeUVmap.glb', function (gltf) {
    // When map is loaded, add it into the scene.
    scene.add(gltf.scene);
    // Resize and reposition model
    gltf.scene.scale.set(0.008, 0.008, 0.008);
    gltf.scene.position.set(0, -0.4, 0.5);
    gltf.scene.rotation.set(0, Math.PI, 0);
    // Update UI to tell user it's loaded
    OnMapLoad();
}, undefined, function (error) {
    // Cross origin error or such-like!
    console.error(error);
    // Show error to user
    OnMapError();
});

// Load in the zones from the backend
SetupZones();

//## LIGHTS

// Create sunlight
var directionalLight = new THREE.DirectionalLight(0xffffff, 1, 100);
directionalLight.position.set(1.1, 1.5, 1.3);
//directionalLight.castShadow = true;

// Create ambient light so the shadows aren't black
var light = new THREE.AmbientLight(0x202020);

//## CAMERA CONTROL

// Create new camera, with aspect ratio of the canvas
var camera = new THREE.PerspectiveCamera(85, container.scrollWidth / container.scrollHeight, 0.1, 1000);
if (adminMode) {
    // Force size of adminmode canvas
    const width = 600;
    const height = 300;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}
// Create orbit controls for a mobile device.
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.screenSpacePanning = false;
controls.minDistance = 1;
controls.maxDistance = 100;
controls.maxPolarAngle = Math.PI / 2.1;

if (adminMode == true) {
    // In adminmode, require the user to press alt to move the camera
    controls.enableKeys = false;
    controls.enabled = false;
}


//## SCENE INITIALISATION

scene.add(directionalLight);
scene.add(light);
// Add a bit of fog for the looks
scene.fog = new THREE.FogExp2(0xfefefe);//, 4, 40 );
scene.fog.density = 0.03;

//##################################### Admin mode placement

// Raycaster to work out where the user has clicked
var raycaster = new THREE.Raycaster();
var mouse_pos = new THREE.Vector2(0, 0);
control_key_down = false;
// Geometry of the invisible clickable plane
let helper_grid_geo = undefined;
let helper_grid = undefined;

let temp_zone_lines = undefined;
let temporary_zone = undefined;

if (adminMode) {
    // Set large invisible cube to position and initialize
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



// Check if the user's browser actually has webGL
if (WEBGL.isWebGLAvailable()) {
    // Add the canvas to the HTML page
    container.appendChild(renderer.domElement);
    // Do all code required upon start
    start();
    // Start loop sequence
    animate();

} else {
    // If no WEBGL available:
    var warning = WEBGL.getWebGLErrorMessage();
    container.appendChild(warning);
}
// add the events for when the user interacts with the site
renderer.domElement.addEventListener('mousedown', onTouchStart, false);
renderer.domElement.addEventListener('mouseup', onTouchEnd, false);
renderer.domElement.addEventListener('touchstart', onTouchStart, false);
renderer.domElement.addEventListener('touchend', onTouchEnd, false);

if (adminMode) {
    renderer.domElement.addEventListener('touchmove', onTouchDrag, false);
    renderer.domElement.addEventListener('mousemove', onTouchDrag, false);
}

// Try to detect if the page is resized
window.addEventListener('resize', onWindowResize, false);

window.addEventListener('keydown', keyDown, false);
window.addEventListener('keyup', keyUp, false);

function onWindowResize() {
    // If the canvas is resized, attempt to adjust the camera appropriately
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

// When user clicks on the screen
function onTouchStart(event) {

   
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
     // calculate mouse position in normalized device coordinates
    mouse_pos.x = ((x_in - renderer.domElement.offsetLeft) / renderer.domElement.width) * 2 - 1;
    mouse_pos.y = - ((y_in - renderer.domElement.offsetTop) / renderer.domElement.height) * 2 + 1;

    // If admin mode, take into account x width too
    if (adminMode) {
        let dom_rect = renderer.domElement.getBoundingClientRect();
        mouse_pos.x = ((x_in - dom_rect.x) / renderer.domElement.width) * 2 - 1;
        mouse_pos.y = - ((y_in - dom_rect.y) / renderer.domElement.height) * 2 + 1;
    }
    dragging = true;

    if (adminMode == false) {
        // Find out which zone the mouse is over
        hovering_zone = raycast(mouse_pos);
        // Change visuals of the zone to give user feedback
        enableHovering_Zone(hovering_zone);
    } else {
        // If in adminmode, check if the move key isn't pressed
        if (control_key_down == false) {
            // Move key not pressed, so start a draggable zone visual
            ClearZoneDrag();
            StartZoneDrag();
        }

    }

}
function onTouchEnd(event) {
    // When the user finishes clicking
    // This second function is used to check on a mobile device they did intend to
    // select the particular zone, instead of just moving the camera about.
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
    // calculate mouse position in normalized device coordinate
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
            // Deselect any currently selected zones
            Deselect_Zone();
            if (deselect == false) {
                select_zone(target);
            }
            else {
                // Tell UI the zone has been deselected
                Zone_Deselected();
            }
        }
    } else {
        // Finish dragging current zone
        EndZoneDrag();
    }

}

function onTouchDrag(event) {
    // When using a mobile device, upon drag.
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
    // Calculate screenspace position
    mouse_pos.x = ((x_in - renderer.domElement.offsetLeft) / renderer.domElement.width) * 2 - 1;
    mouse_pos.y = - ((y_in - renderer.domElement.offsetTop) / renderer.domElement.height) * 2 + 1;
    if (adminMode) {
        // Update dragging position
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
    // Create temporary draggable zone object
    // Raycast to work out where the mouse is clicking
    let hit_point = ground_raycast(mouse_pos);
    if (hit_point == undefined) {
        new_zone_being_dragged = false;
        new_zone_rendered = false;
    } else {
        // Change visuals of UI elements to reflect a zone has been dragged
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
    
    // Calculate the required size of the temporary dragged zone for rendering.

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

    // Re-assign the zone's variables
    temporary_zone.position.set(new_position.x, new_position.y, new_position.z);
    temporary_zone.scale.set(new_size.x, new_size.y, new_size.z);
    temp_zone_lines.scale.set(new_size.x, new_size.y, new_size.z);
    temp_zone_lines.position.set(new_position.x, new_position.y, new_position.z);

    temporary_zone.rotation.y = rotate;
    temp_zone_lines.rotation.y = rotate;
}

function DoDrag() {
    // Work out the current end point of the dragging
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
            // Update UI
            NewCoords(start_point, end_point, rotate);
            // Render zone in new position/scale
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
    // Parse UI inputted coordinate
    var no_b1 = coord.replace("(", "");
    var no_b2 = no_b1.replace(")", "");
    var split = no_b2.split(",");
    if (split.length != 3) {
        return undefined;
    }
    // Create new coord JSON object.
    var coord_new = {
        "x": parseFloat(split[0]),
        "y": parseFloat(split[1]),
        "z": parseFloat(split[2])
    }
    // If the parse failed, return undefined.
    if (isNaN(coord_new.x) || isNaN(coord_new.y) || isNaN(coord_new.z)) {
        return undefined;
    }
    return coord_new;
}

if (adminMode) {
    // Gather required UI elements
    rotate_label = document.getElementById("rotateChangerLabel");
    rotate_slider = document.getElementById("rotateChanger");
    height_label = document.getElementById("heightChangerLabel");
    height_slider = document.getElementById("heightChanger");
    coordinate_entry_point1 = document.getElementById("coord_entry_1");
    coordinate_entry_point2 = document.getElementById("coord_entry_2");
    rotation_entry_point = document.getElementById("rotation_entry");

    // When rotate slider is used
    rotate_slider.oninput = function () {
        let new_val = -(rotate_slider.value / 360) * Math.PI * 2;
        SetRotate(new_val);
    }
    // When height slider is used
    height_slider.oninput = function () {
        let new_val = height_slider.value / 100;
        SetRaise(new_val);
    }
    // When a new coord is manually entered
    coordinate_entry_point1.oninput = function () {

        let new_coord = attempt_parse_coord(coordinate_entry_point1.value);
        if (new_coord != undefined) {
            start_point = new THREE.Vector3(new_coord.x, new_coord.y, new_coord.z);
            Render_Temp_Zone();
        }
    }
    // When a new coord is manually entered
    coordinate_entry_point2.oninput = function () {
        let new_coord = attempt_parse_coord(coordinate_entry_point2.value);
        if (new_coord != undefined) {
            end_point = new THREE.Vector3(new_coord.x, new_coord.y, new_coord.z);
            Render_Temp_Zone();
        }
    }
    // When a new rotation is manually entered
    rotation_entry_point.oninput = function () {

        let new_val = parseFloat(rotation_entry_point.value);
        if (isNaN(new_val) != true) {
            SetRotate(-(new_val / 360) * Math.PI * 2);
        }
    }
    // Set UI visuals
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


function SetRaise(new_raise) {
    // Set height of draggable to new height
    start_point.y = original_start_point.y + new_raise;
    end_point.y = original_end_point.y + new_raise;
    NewCoords(start_point, end_point, rotate);
    Render_Temp_Zone();

}
function SetRotate(new_rotate) {
    // Set rotation of draggable to new rotation
    rotate = new_rotate;
    NewCoords(start_point, end_point, rotate);
    Render_Temp_Zone();
}

function NewCoords(start, end, rot) {
    // Move draggable to new position
    coordinate_entry_point1.value = "(" + start.x.toFixed(2).toString() + "," + start.y.toFixed(2).toString() + "," + start.z.toFixed(2).toString() + ")";
    coordinate_entry_point2.value = "(" + end.x.toFixed(2).toString() + "," + end.y.toFixed(2).toString() + "," + end.z.toFixed(2).toString() + ")";
    rotation_entry_point.value = (-360 * (rot / (Math.PI * 2))).toFixed(2).toString();
}


function EndZoneDrag() {
    // Finish dragging a zone
    new_zone_being_dragged = false;
}

function ClearZoneDrag() {
    // Reset and clear the draggable zone
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
    // Set zone to look like a normal zone
    if (hovering_zone != undefined) {
        var skip = false;
        if (selected_zone != undefined) {
            // Set this zone to be the selected one
            if (selected_zone.object.uuid == hovering_zone.object.uuid) {
                hovering_zone.object.material = material_selected;
                skip = true;
            }
        }
        if (skip == false) {
            // Skip is used to prevent this being done twice to an object
            hovering_zone.object.material = material_selectable;
        }

        hovering_zone = undefined;
    }
}
function enableHovering_Zone(zone) {
    // Change visuals of zone as the mouse is over it.
    if (hovering_zone != undefined) {
        disableHovering_Zone();
    }
    if (zone != undefined) {
        hovering_zone = zone;
        hovering_zone.object.material = material_hovering;
    }
}
function select_zone(zone) {
    // When zone is selected, change it's material
    selected_zone = zone;
    selected_zone.object.material = material_selected;
    // Tell UI a zone has been clicked on, and give it the relevant data
    Zone_Clicked(selected_zone.object.userData.ID);

}

function Deselect_Zone() {
    // Deselects whatever zone is currently selected.
    if (selected_zone != undefined) {
        selected_zone.object.material = material_selectable;
        selected_zone = undefined;
    }
}

function start() {
    // Does everything required on map startup
    
    // Set background to white
    scene.background = new THREE.Color(0xf0f0f0);

    // Set the default starting camera position
    if (adminMode) {
        camera.position.set(0, 6, 0.5);
    } else {
        camera.position.set(0, 5, 3);
    }
    // Initialize orbit controls
    controls.update();
    // State start in console log
    console.log("Started");
}

function raycast(pos) {
    // Set direction of raycast, then perform raycast
    raycaster.setFromCamera(pos, camera);
    // Get all objects the raycast intersected with
    var intersects = raycaster.intersectObjects(scene.children);
    var closest_point;
    var closest_dist = 100000;
    var closest_obj = undefined;
    // Loop through all intersecting objects to find closest object
    for (var i = 0; i < intersects.length; i++) {

        var dist = intersects[i].point.distanceTo(camera.position);
        // Check the object is a mesh
        if (dist < closest_dist && intersects[i].object.type == "Mesh") {
            closest_dist = dist;
            closest_point = intersects[i].point;
            closest_obj = intersects[i];
        }
    }

    if (closest_point) {
        // Check closest object is one that is selectable
        if (closest_obj.object.material.name != "selectable") {
            closest_obj = undefined;
        }
    }
    // Return object that is closest after raycasting
    return closest_obj;

}
function ground_raycast(pos) {
    // Perform raycast where it collides with the invisible ground object.
    // Used in Admin Mode
    raycaster.setFromCamera(pos, camera);
    // Get objects that intersect with the ray
    var intersects = raycaster.intersectObjects(scene.children);
    var closest_point = undefined;
    var closest_dist = 100000;
    for (var i = 0; i < intersects.length; i++) {
        var dist = intersects[i].point.distanceTo(camera.position);
        // Check the object is the invisible ground object
        if (dist < closest_dist && intersects[i].object.name == "grid_help") {
            closest_dist = dist;
            closest_point = intersects[i].point;
        }
    }
    if (closest_point) {
        // Return ground object
        return closest_point;
    }
    else {
        // Raycast failed, user clicked elsewhere
        return undefined;
    }
}


function animate() {
    // Each frame, request a new frame
    requestAnimationFrame(animate);
    // Update camera orbit controls
    controls.update();
    // If dragging, update the drag object
    if (dragging && adminMode) {
        DoDrag();
    }
    // Render scene to the UI
    renderer.render(scene, camera);
}

function keyDown(e) {
    // When ALT is pressed and it's in admin mode, allow for camera control
    if (e.code == "AltLeft" && adminMode == true) {
        control_key_down = true;
        controls.enabled = true;
    }
}
function keyUp(e) {
    // When ALT is let go, turn off camera control
    if (e.code == "AltLeft" && adminMode == true) {
        control_key_down = false;
        controls.enabled = false;
    }
}
