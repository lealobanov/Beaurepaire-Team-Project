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
//firebase.initializeApp(firebaseConfig);



// Defining Firebase authentication elements
const txtEmail = document.getElementById('username_login');
const txtPassword = document.getElementById('password_login');
const btnLogin = document.getElementById('btnLogin');
const btnLogout = document.getElementById('btnLogout');

// Authenticate user login
btnLogin.addEventListener('click', e => {
  const email = txtEmail.value;
  console.log(email)
  const password = txtPassword.value;
  console.log(password)
  console.log("got click")
  //Force to client portal w/out auth 
  window.location = '/features/list';
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage)
    // ...
  });
  

});

// Realtime listener for authentication state change (logged in/logged out)
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser){
    console.log("Logged in.");
    //btnLogout.classList.remove('d-none');
    //btnMyPosts.classList.remove('d-none');
    //btnLoginheader.classList.add('d-none');
    //btnRegisterheader.classList.add('d-none');
    window.location = '/features/list';
  } else {
    console.log('Not logged in.');
    //btnLogout.classList.add('d-none');
    
  }
// Logout current user
btnLogout.addEventListener('click', e => {
  console.log("got logout click")
  firebase.auth().signOut();
  window.location = '/backendlogin.html';
});

});
