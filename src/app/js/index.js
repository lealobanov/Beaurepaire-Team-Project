function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  alert("Latitude: " + position.coords.latitude + "    Longitude: " + position.coords.longitude);
  if (position.coords.latitude > 54.790737 || position.coords.latitude < 54.788654 || position.coords.longitude > -1.621184 || position.coords.longitude < -1.6256) {
    alert("you aint in Beaurepaire")
  }
}

// 54.789525, -1.623473
