
/* eslint-disable */
var width = 250;
var height = 250;

var personX_Offset = 0;
var personY_Offset = 0;
var originalLat = 0;
var originalLong = 0;
var currentLat = 0;
var currentLong = 0;

var polls = 0;
var zoomLevel = 20;

var cameraCoords = { lat: 0, lng: 0 };
var personCoords = { lat: 0, lng: 0 };


var platform = new H.service.Platform({
      'apikey': 'gHz9eB7Du7VFdBGn7Zt4KFjLxRZGxLF1nhRLy5J96ik'
    });

// Obtain the default map types from the platform object:
var defaultLayers = platform.createDefaultLayers();
var baseLayer = defaultLayers.raster.satellite.map;
baseLayer.setMax(30);

var map = new H.Map(
      document.getElementById('mapContainer'),
      baseLayer,
      //defaultLayers.vector.normal.map,
      {
        zoom: zoomLevel,
        center: cameraCoords
      });



// var svgMarkup = '<svg width="24" height="24" ' +
//       'xmlns="http://www.w3.org/2000/svg">' +
//       '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
//       'height="22" /><text x="12" y="18" font-size="12pt" ' +
//       'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
//       'fill="white">H</text></svg>';

var svgMarkup = '<svg width="10" height="10"> <circle cx="0" cy="0" r="10" fill="blue" /></svg>'


var icon = new H.map.DomIcon(svgMarkup)
var marker = new H.map.DomMarker(personCoords, {icon: icon});
// var icon2 = new H.map.DomIcon(svgMarkup2)
// var marker2 = new H.map.DomMarker(personCoords, {icon: icon2});
//map.setMax(25);

map.addObject(marker);
//map.addObject(marker2);
// Create an icon, an object holding the latitude and longitude, and a marker:
//var icon = new H.map.Icon(svgMarkup)
//var coords3 = {lat: 0, lng: 0}
//var marker = new H.map.Marker(coords3, {icon: icon});
//map.addObject(marker);
window.addEventListener('resize', () => map.getViewPort().resize());

UpdateCameraPosition();


setInterval(
      () => UpdateUserPosition(),
      50
    );



async function UpdateCameraPosition() {
      polls += 1;

      const { coords } = await getCurrentPosition();
      var { latitude, longitude } = coords;

      console.log("Found! " + latitude + " " + longitude);

      cameraCoords = {lat: latitude, lng: longitude}
      
      personCoords = {lat: latitude, lng: longitude}
      document.getElementById('xPos').innerHTML = "Lat: " + personCoords.lat;
      document.getElementById('yPos').innerHTML = "long: " + personCoords.lng;
      document.getElementById('tests').innerHTML = "location updates: " + polls;
      

      map.setCenter(cameraCoords);

      //var canvases = document.getElementsByTagName("canvas");
      //console.log(canvases.length);
      //var ctx = canvases[0].getContext("2d");
      //console.log(canvases[0]);

      //ctx.strokeRect(5, 5, 25, 15);
      //ctx.scale(2, 2);
      //ctx.strokeRect(5, 5, 25, 15);
      //var canvas = document.getElementById("myCanvas");

}
async function UpdateUserPosition(){
      polls += 1;

      const { coords } = await getCurrentPosition();
      var { latitude, longitude } = coords;
      //latitude += polls * 0.00001;
      personCoords = {lat: latitude, lng: longitude}
      document.getElementById('xPos').innerHTML = "Lat: " + personCoords.lat;
      document.getElementById('yPos').innerHTML = "long: " + personCoords.lng;
      document.getElementById('tests').innerHTML = "location updates: " + polls;
      marker.setGeometry(personCoords);
      //marker2.setGeometry(personCoords);

      
      // var canvases = document.getElementsByClassName("canvas");

      // var ctx = canvases[0].getContext("2d");
      //ctx.scale(8, 8);
      //ctx.strokeRect(5, 5, 25, 15);
}

function getCurrentPosition(options = {}) {
      return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });
  }

  function Reset() {
      personX_Offset = 0;
      personY_Offset = 0;
      originalLat = 0;
      originalLong = 0;
      polls = 0;
      document.getElementById('xPos').innerHTML = 0;
      document.getElementById('yPos').innerHTML = 0;
      document.getElementById('tests').innerHTML = 0;
      zoomLevel = 20;
      map.setZoom(zoomLevel);
      UpdateCameraPosition();
      
}

function ZoomIn() {
      zoomLevel += 1;
      map.setZoom(zoomLevel);
      
}
function ZoomOut() {
      zoomLevel -= 1;
      map.setZoom(zoomLevel);
      
}



//update();

//coords = await fetchCoordinates().then(console.log("Yes"););




// function geo_success(position) {
//       UpdatePosition(position.coords.latitude, position.coords.longitude);
// }

// function geo_error() {
//       alert("Sorry, no position available.");
// }

// var geo_options = {
//       enableHighAccuracy: true,
//       maximumAge: 10000,
//       timeout: 27000
// };

// var wpid = navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);



// function setup() {
//       height = screen.height - document.getElementById('Wrap').clientHeight - 7;
//       width = document.getElementById('Wrap').clientWidth;

//       canvas1 = createCanvas(width, height);
//       canvas1.parent("holder");
//       const_offsetX = width / 2;
//       const_offsetY = height / 2;

// }

// async function showPosition(position) {
//       UpdatePosition(position.coords.latitude, position.coords.longitude);
// }


// async function fetchCoordinates2(){
//       try {
//             const { coords } = await getCurrentPosition();
//             const { latitude, longitude } = coords;
    
//             console.log("Found! " + latitude + " " + longitude);


            
//             //console.log(currentLat + " " + currentLong)
//             // Instantiate (and display) a map object:
//             // var map = new H.Map(
//             //   document.getElementById('mapContainer'),
//             //   defaultLayers.raster.satellite.map,
//             //   //defaultLayers.vector.normal.map,
//             //   {
//             //     zoom: 20,
//             //     center: { lat: latitude, lng: longitude }
//             //   });
            
//             //var circle = new H.map.Circle(center, radius, opt_options)
            
//                         // Define a variable holding SVG mark-up that defines an icon image:
//             // var svgMarkup = '<svg width="24" height="24" ' +
//             // 'xmlns="http://www.w3.org/2000/svg">' +
//             // '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
//             // 'height="22" /><text x="12" y="18" font-size="12pt" ' +
//             // 'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
//             // 'fill="white">H</text></svg>';

//             // // Create an icon, an object holding the latitude and longitude, and a marker:
//             // var icon = new H.map.Icon(svgMarkup)
//             // var coords3 = {lat: latitude, lng: longitude}
//             // var marker = new H.map.Marker(coords3, {icon: icon});

//             // Add the marker to the map and center the map at the location of the marker:
//             map.addObject(marker);
//             map.setCenter(coords3);

//             console.log("Found2! " + latitude + " " + longitude);
//             // Handle coordinates
//         } catch (error) {
//             // Handle error
//             console.error(error);
//         }
// }

