function getLocation() {
  if (isMobile()) {
    try {
      navigator.geolocation.getCurrentPosition(displayButtons);
    } catch (err) {
      alert("Error: " + err.message + ". Unable to obtain location information");
    }
  }
}

// Display appropriate buttons depending on user location (coords will need improving)
function displayButtons(position) {
  // Hide request for location access
  document.getElementById("info-text").style.display = "none";

  // Display buttons
  if (54.790737 < position.coords.latitude < 54.788654 &&
      -1.621184 < position.coords.longitude < -1.6256) {
    document.getElementById("header").innerHTML = "Welcome to Beaurepaire";
    document.getElementById("explore-btn").style.display = "block";
  } else {
    document.getElementById("header").innerHTML = "It appears you're not at Beaurepaire";
    document.getElementById("direction-btn").style.display = "block";
    document.getElementById("tour-btn").style.display = "block";
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

//Modal creation for images gallery
function createModal(){
  var modal = document.getElementById('theModal');
  var imgName = event.target.id
  var img = document.getElementById(imgName);
  var modalImg = document.getElementById('modalImg01');
  img.onclick = function(){
    modal.style.display = "block";
    modalImg.src = this.src;
  }
  var span = document.getElementsByClassName("close")[0];
  span.onclick = function(){
    modal.style.display = "none";
  }
}