
/**
 * Activated when a particular zone is clicked on.
 * Also activated when swapped from one zone to another.
 * @param {number} zone_ID 
 */
function Zone_Clicked(zone_ID) {

    console.log("Zone " + zone_ID.toString() + " clicked.");

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