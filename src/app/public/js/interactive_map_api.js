
/**
 * Activated when a particular zone is clicked on.
 * Also activated when swapped from one zone to another.
 * @param {number} zone_ID
 */
function Zone_Clicked(zone_ID) {

    console.log("Zone " + zone_ID.toString() + " clicked.");
    // inserted code by Alex
    // m=Get_Data_For_Zone(selected_zone.object.userData.ID);
    // console.log(m);
    // k = "zone"+zone_ID.toString();
    k = "myModal"
    Display(k);
    // end of inserted code by Alex
}

/**
 * Activated when the current zone is manually deselected.
 * AKA clicked on again.
 */
function Zone_Deselected() {

    console.log("Current zone was deselected");

}

/**
 * This can be aync called by the front end to get the data on a particular zone.
 * Returns some JSON describing the particular zone.
 * Waits until the data has been retrieved.
 * @param {number} zone_ID
 */
async function Get_Data_For_Zone(zone_ID) {
    let data = zone_data(zone_ID);
    while (data == undefined) {
        let promise = new Promise((res) => {
            setTimeout(() => res(200), 20)
        });
        await promise;
        data = zone_data(zone_ID);
    }
    return data;
}

// code inserted by Alex
async function Display(id_zone) {
    // Get the modal
    var modal = document.getElementById(id_zone);

    var btn = document.getElementById("CloseBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    // append HTML with javascript
    var yo = document.getElementById("insertModal");
    yo.innerHTML = "Maybe we could append different text all the time to the same template."


    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
        Deselect_Zone();
    }
    // When the user clicks on Close button, close the modal
    btn.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            Deselect_Zone();
        }
    }
}
// end of code inserted by Alex

//Retrieve all data by individual ID
async function Get_Feature_Data(id) {
    let response = await fetch(`/features/retrieverecords/${id}`);
    let body = await response.text();
    let record = JSON.parse(body);
    //console.log(record)
    return record;
}

//Retrieve all data
async function GetAllData() {
    let response = await fetch('/features/retrieverecords');
    let body = await response.text();
    let records = JSON.parse(body);
    //console.log(records);
    return records
}

//Retrieve only modeling-specific data (feature id, coordinates 1, coordinates 2, rotation)
async function Get_Modeling_Data() {
    let data = await GetAllData();
    modeling_data = [];
    for (var i = 0; i < data.length; i++) {
        _id = data[i]._id;
        // Probably need to parse these further into individual x1,y1,z1 and x2,y2,z2
        coordinates_1 = data[i].coordinates_1;
        coordinates_2 = data[i].coordinates_2;
        rotation = data[i].rotation;
        entry = { "_id": _id, "coordinates_1": coordinates_1, "coordinates_2": coordinates_2, "rotation": rotation }
        modeling_data.push(entry);
    }
    //console.log(modeling_data);
    return modeling_data
}
//Get_Modeling_Data();

//Retrieve modal-specific data (feature id, modal title, modal content)
async function Get_Modal_Data() {
    let data = await GetAllData();
    modal_data = [];
    for (var i = 0; i < data.length; i++) {
        _id = data[i]._id;
        //In the future images and other media will be served here
        feature_title = data[i].feature_title;
        feature_content = data[i].feature_content;
        entry = { "_id": _id, "feature_title": feature_title, "feature_content": feature_content }
        modal_data.push(entry);
    }
    //console.log(modal_data);
    return modal_data
}
//Get_Modal_Data();

/**
 * Callable function (If you need it):
 * Deselect_Zone();
 * Call this to deselect the current zone. (resets colouring etc)
 *
 */
