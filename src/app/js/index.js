function getLocation() {
  if (isMobile()) {
    try {
      navigator.geolocation.getCurrentPosition(showPosition);
    } catch (err) {
      alert("Error: " + err.message + ". Unable to obtain location information");
    }
  }
}

function showPosition(position) {
  alert("Latitude: " + position.coords.latitude + "    Longitude: " + position.coords.longitude);
  if (position.coords.latitude > 54.790737 || position.coords.latitude < 54.788654 ||
      position.coords.longitude > -1.621184 || position.coords.longitude < -1.6256) {
    alert("you aint in Beaurepaire")
  }
}

// Return whether user is viewing site on mobile
function isMobile() {
  var width = Math.max(document.documentElement.clientWidth, window.innerWidth);

  if (width < 600) {
    return true;
  }
  return false;
}

// 54.789525, -1.623473
