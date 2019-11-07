/* eslint-disable */
var width = 250;
var height = 250;

var const_offsetX = 100;
var const_offsetY = 100;
var personX = 0;
var personY = 0;
var originalLat = 0;
var originalLong = 0;

var meters_per_lat = 111319.39694466339;
var meters_per_long = 64346.67617209433;
var polls = 0;


var pixelsPerMeter = 40;



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



function setup() {
      height = screen.height - document.getElementById('Wrap').clientHeight - 7;
      width = document.getElementById('Wrap').clientWidth;

      canvas1 = createCanvas(width, height);
      canvas1.parent("holder");
      const_offsetX = width / 2;
      const_offsetY = height / 2;

}

function UpdatePosition(lat, long) {
      polls += 1;
      document.getElementById('xPos').innerHTML = "Lat: " + lat;
      document.getElementById('yPos').innerHTML = "long: " + long;
      document.getElementById('tests').innerHTML = "location updates: " + polls;

      if (originalLat == 0) {
            originalLat = lat;
            originalLong = long;
            personX = 0;
            personY = 0;
      }
      if (originalLong == 0) {
            originalLong = long;
            originalLat = lat;
            personX = 0;
            personY = 0;
      }
      x_diff = lat - originalLat;
      y_diff = long - originalLong;
      personX = x_diff * meters_per_lat;
      personY = y_diff * meters_per_long;
}

function drawLines() {
      stroke(180);
      strokeWeight(1);
      //line(const_offsetX - personX, 0, const_offsetX - personX, height); // Central Vertical line
      //line(0, const_offsetY + personY, width, const_offsetY + personY);
      var xCount = width / pixelsPerMeter;
      var yCount = height / pixelsPerMeter;

      for (let i = 0; i < xCount; i += 1) {
            line((i * pixelsPerMeter) - personX, 0, (i * pixelsPerMeter) - personX, height);
      }
      for (let i = 0; i < yCount; i += 1) {
            line(0, (i * pixelsPerMeter) + personY, width, (i * pixelsPerMeter) + personY);
      }
      // for (let i = this.particles.length - 1; i >= 0; i -= 1) {
      //       this.particles[i].set_h(value);
      // }
}

function showPosition(position) {
      UpdatePosition(position.coords.latitude, position.coords.longitude);
}

function draw() {
      background(255);
      drawLines();


      if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
      } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
      }
      // if (mouseIsPressed) {
      //       fill(0);
      // } else {
      //       fill(255);
      // }
      strokeWeight(1);

      fill(color(100, 100, 200))
      ellipse(const_offsetX, const_offsetY, 5, 5);

}

function Reset() {
      personX = 0;
      personY = 0;
      originalLat = 0;
      originalLong = 0;
      polls = 0;
      document.getElementById('xPos').innerHTML = 0;
      document.getElementById('yPos').innerHTML = 0;
      document.getElementById('tests').innerHTML = 0;
}