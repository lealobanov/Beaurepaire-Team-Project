
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
    k="myModal"
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
    yo.innerHTML="Maybe we could append different text all the time to the same template."

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


/**
 * This will be called upon loading.
 * To be filled out by Back-End crew.
 */
async function Get_All_Zone_Data() {
    let data = {};

    // GET data from backend

    return data;
}

/**
 * This will be called upon loading.
 * To be filled out by Back-End crew.
 */
async function Get_Coordinate_Data() {
    let coordinates = {};

    // GET coordinates from backend

    return coordinates;
}




/**
 * Callable function (If you need it):
 * Deselect_Zone();
 * Call this to deselect the current zone. (resets colouring etc)
 *
 */
