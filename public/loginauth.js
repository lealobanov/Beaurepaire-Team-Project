// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCWrK2oQ4cBQmqHRU6RcM-tsbq-5M8OkNg",
  authDomain: "beaurepaire-admin-portal.firebaseapp.com",
  databaseURL: "https://beaurepaire-admin-portal.firebaseio.com",
  projectId: "beaurepaire-admin-portal",
  storageBucket: "beaurepaire-admin-portal.appspot.com",
  messagingSenderId: "924306523021",
  appId: "1:924306523021:web:a6dd79aa0087aaf2d973c4",
  measurementId: "G-VLTKYP402W"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Defining Firebase authentication elements
const txtEmail = document.getElementById('username_login');
const txtPassword = document.getElementById('password_login');
const btnLogin = document.getElementById('btnLogin');
const btnLogoutTest = document.getElementById('btnLogoutTest');
const btnLogoutHBS = document.getElementById('btnLogoutHBS');

// Authenticate user login
btnLogin.addEventListener('click', e => {
  const email = txtEmail.value;
  console.log(email)
  const password = txtPassword.value;
  console.log(password)
  console.log("got click")
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(val) {
      //Success - redirect to admin page
      window.location = './features/list';
    })
    
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage)
    console.log("Login attempt failed.")
  }); 

});

// Realtime listener for authentication state change (logged in/logged out)
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser){
    console.log("Logged in.");
    console.log(firebaseUser)
  } else {
    console.log('Not logged in.');
  }
});


// Logout current user

btnLogoutHBS.addEventListener('click', e => {
  firebase.auth().signOut();
  window.location = '/backendlogin.html';
});




