/* eslint-env browser, jquery */
/* global firebaseui, firebase,attachCustomUploader */

var url = ".";//"http://localhost:8090";//"http://82.3.147.252:8090"; //"http://localhost:8090";//
var w3w_key = "CIKBIQIQ";
const POST_Access_Token = "Accordion";
var currentCategory = null;
var currentCategory_data = null;
var categories = [];
var userSignedIn = false;
var display_name = undefined;

var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function() {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          window.location.reload();
          return false;
        },
        uiShown: function() {
          // The widget is rendered.
          // Hide the loader.

          //document.getElementById('loader').style.display = 'none';
        }
      },
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInFlow: 'popup',
      signInSuccessUrl: '/signedIn',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      //   firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      //   firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      //   firebase.auth.GithubAuthProvider.PROVIDER_ID,
      //   firebase.auth.EmailAuthProvider.PROVIDER_ID,
      //   firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ],
      // Terms of service url.
      // tosUrl: '<your-tos-url>',
      // // Privacy policy url.
      // privacyPolicyUrl: '<your-privacy-policy-url>'
    };
ui.start('#firebaseui-auth-container', uiConfig);


firebase.auth().onAuthStateChanged(function(user) {
if (user) {
      //console.log("Signed in!");
      userSignedIn = true;
      display_name = user.displayName;

      // console.log(user.displayName);
      // console.log(user.email);
      // console.log(user.photoURL);
      // console.log(user.emailVerified);
      // console.log(user.uid);
      $("#user-logo").attr("src",user.photoURL);
      document.getElementById('firebaseui-auth-container').style.display = 'none';
      document.getElementById('Sign-out').style.display = 'block';
} else {
      // No user is signed in.
      //console.log("Signed out.");
      userSignedIn = false;
      document.getElementById('firebaseui-auth-container').style.display = 'block';
      document.getElementById('Sign-out').style.display = 'none';
}
});




// var uiConfig = {
//       callbacks: {
//         signInSuccessWithAuthResult: function(authResult, redirectUrl) {
//           // User successfully signed in.
          
//           window.location.reload();
//           return false;
//         },
//         uiShown: function() {

            
//         }
//       },
//       // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
//       signInFlow: 'popup',
//       signInSuccessUrl: '/signedIn',
//       signInOptions: [
//         firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//       //   firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//       //   firebase.auth.TwitterAuthProvider.PROVIDER_ID,
//       //   firebase.auth.GithubAuthProvider.PROVIDER_ID,
//       //   firebase.auth.EmailAuthProvider.PROVIDER_ID,
//       //   firebase.auth.PhoneAuthProvider.PROVIDER_ID
//       ],
//     };
// ui.start('#firebaseui-auth-container', uiConfig);




function moveSignInLocation(xMatch) {
      if (xMatch.matches) { // If media query matches
            $("#Sign-in").detach().appendTo("#Backup-Sign-in");
            $("#TopRightUpload").text("+");
            // $("#sidebar").mCustomScrollbar({
            //       setHeight: "85%"
            //   });
            
      } else {
            $("#Sign-in").detach().appendTo("#SearchBar");
            $("#TopRightUpload").text("Upload!");
            // $("#sidebar").mCustomScrollbar({
            //       setHeight: "100%"
            //   });
      }
}
var xMatch = window.matchMedia("(max-width: 858px)");
moveSignInLocation(xMatch); // Call listener function at run time
xMatch.addListener(moveSignInLocation); // Attach listener function on state changes



// eslint-disable-next-line no-unused-vars
function SignOut(){ // Sign out is a global method from firebase, therefore it is declared via another script.
      
      firebase.auth().signOut().then(function() {
            window.location.reload();
            // Sign-out successful.
      }).catch(function() {
            window.location.reload();
            // An error happened.
      });

}


// document.getElementById("Submit").addEventListener('click', AddNewInstrument);

// async function AddNewInstrument(event){

//       event.preventDefault();

//       try {
//             let newInstrument = document.getElementById("InputBox").value;            
//             let Json = {instrument: newInstrument};

//             let response = await fetch(url + "ui/add", {
//                   method: "POST", // *GET, POST, PUT, DELETE, etc.
//                   mode: "cors", // no-cors, cors, *same-origin
//                   cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//                   credentials: "same-origin", // include, *same-origin, omit
//                   headers: {
//                       "Content-Type": "application/json",
//                       // "Content-Type": "application/x-www-form-urlencoded",
//                   },
//                   redirect: "follow", // manual, *follow, error
//                   referrer: "no-referrer", // no-referrer, *client
//                   body: JSON.stringify(Json), // body data type must match "Content-Type" header
//               });
            
//             if (!response.ok){
//                   throw new Error("Issue adding: " + response.code);
//             }


//             // let response = await fetch('http://localhost:8090/list');
//             // let body = await response.text();
//             document.getElementById('DataArea').innerHTML=response.text;
//       }
//       catch(e) {
//             alert(e);
//       }
// }

document.addEventListener('DOMContentLoaded', PageLoaded);


async function UploadForm(){
      try {
            $("#Cards").empty();
            window.scrollTo(0, 0);
            if (!userSignedIn){
                  CreateUploadLoginError().appendTo('#Cards');
                  //console.log("Here");
            }
            else{
                  await $.get("upload_form.html", function(data){
                        $("#Cards").html(data);
                        let Options = $('#inputGroupSelect01');
                        for(let i = 0; i < categories.length; i++){
                              $("<option value='" + NameToID(categories[i]) + "'>").text(categories[i]).appendTo(Options);
                        }
                    });
                  attachCustomUploader("#file-holder");  
            }          
      }
      catch(e) {
            CreateServerError();
      }
}
function CreateUploadLoginError(){
      let mainContainer = $('<div class="alert alert-secondary w-75 justify-content-center" role="alert" >');
      $('<h4 class="alert-heading">').text("Please login to upload.").appendTo(mainContainer);
      $('<p>').text("Login to access all the features.").appendTo(mainContainer);
      $('<hr>').appendTo(mainContainer);
      let uploadBTN2 = $('<button type="button" class="btn btn-secondary" id="Back button">').text("Back").appendTo(mainContainer);
      uploadBTN2.on("click", function(){CategoryRequest(currentCategory)});      
      return mainContainer;
}



async function PageLoaded(){
      try {
            let errFlag = false;
            let response = await fetch(url + "/categories").catch(function(){
                  errFlag = true;
                  CreateServerError();
            });
            if(!errFlag){
                  let categories_body = await response.json();
                  categories = [];
                  for(let i = 0; i < categories_body.length; i++){
                        let categoryName = NameToID(categories_body[i]);
                        categories.push(categories_body[i]);
      
                        let listItem = $('<li/>').appendTo('#list_content');
                        let newElement = $('<a href="#"/>').text(categories_body[i]).appendTo(listItem);
                        $(newElement).on("click", function(e){
                              e.preventDefault();
                              CategoryRequest(categoryName);
                            }).prop('id', categoryName);
                  }      
                  CategoryRequest(NameToID(categories_body[0]));
            }

      }
      catch(e) {
            CreateServerError();
      }
}

function NameToID(name){
      let out = "";
      for(let i = 0; i < name.length; i++){
            if (name[i] == " "){
                  out += "-";
            }
            else{
                  out += name[i];
            }
      }
      return out;
}

async function CategoryRequest(ID){
      try {
            currentCategory = ID;

            SelectCategoryCSS($("#" + ID));

            let errorFlag = false;
            let response = await fetch(url + "/data/" + currentCategory + "/Items.json").catch(function(){
                  errorFlag = true;
                  $("#Cards").empty();                  
                  CreateErrorFound().appendTo('#Cards');
            });
            if(!errorFlag){
                  $("#Cards").empty();
                  let body = await response.json();

                  currentCategory_data = body;
                  if (body.items.length > 0){                  
                        for(let i = 0; i < body.items.length; i++){
                              let newCard = CardFromJSON(body.items[i], currentCategory, i);
                              newCard.appendTo('#Cards');
                        }
                  }
                  else{
                        CreateErrorFound().appendTo('#Cards');
                  }
            }
            else{
                  CreateServerError();
            }
      }
      catch(e) {
            $("#Cards").empty();
            CreateErrorFound().appendTo('#Cards');
      }
}



async function GetComments(category, post_index){
      try{
            //let errorFlag = false;
            let response = await fetch(url + "/comments?c=" + category + "&i=" + post_index).catch(function(){
                  //console.log("Issue");
                  return undefined;
            });
            const body = await response.json();
            if(JSON.stringify(body) == "{}"){
                  return undefined;
            }
            return body;
      }
      catch(e){
            return undefined;
      }
}

async function SendComment(category, post_index, text){
      let name = "Anonymous";
      if (display_name != undefined){
            name = display_name;
      }

      let new_comment = {"category": category, "index": post_index, "user": name, "comment": text, "authorization": POST_Access_Token};

      await fetch(url + "/add_comment", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            headers: {
                  "Content-Type": "application/json",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify(new_comment), // body data type must match "Content-Type" header
            }).then(function(){
                  try{
                        if($("#media").length){
                              if($('#no_comments').length){
                                    $('#media').empty();
                                    let holder_class = $('<div class="comment_holder" id="comment_holder">').appendTo($('#media'));
                                    MakeComment(name, text).appendTo($(holder_class));
                              }
                              else{
                                    MakeComment(name, text).appendTo($('#comment_holder'));
                              }
                        }
                  }
                  catch(e){
                        CreateServerError();
                  }
            }).catch(function(){
                  CreateServerError();
            });
}

async function MoreDetailRequest(item_index){
      try {
            $("#Cards").empty();
            let body = currentCategory_data;

            let comments = undefined;
            try{
                  comments = await GetComments(currentCategory, item_index);
                  
            }
            catch(e2){
                  comments = undefined;
            }            

            let newCard = await MoreDetailFromJSON(body.items[item_index], currentCategory, comments, item_index);
            newCard.appendTo('#Cards');

      }
      catch(e) {
            CreateServerError();
      }
}

async function MoreDetailFromJSON(jsonOBJ, category, comments, post_index){
      let mainContainer = $('<div class="w-75 container justify-content-center">');
      $('<br>').appendTo(mainContainer);
      let buttonHTML = $('<a href="#" class="btn btn-secondary">').text("Back").appendTo(mainContainer);      
      buttonHTML.on("click",function(){
            CategoryRequest(currentCategory);
      })
      $('<hr style="line-height: 150%;">').appendTo(mainContainer);
      $('<h1 class="alert-heading">').text(jsonOBJ.name).appendTo(mainContainer);
      $('<p>').text("Uploaded by " + jsonOBJ.user).appendTo(mainContainer);

      let carousel = $('<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">').appendTo(mainContainer);
      let carousel_inner = $('<div class="carousel-inner">').appendTo(carousel);

      let image_string = jsonOBJ.image;
      let images = image_string.split("/");

      if(image_string){
            let activeItem = $('<div class="carousel-item active">').appendTo(carousel_inner);
            $('<img src="data/' + category +'/' + images[0] + '" class="d-block w-100" alt="...">').appendTo(activeItem);
      
            if (images.length > 1){
                  for(let i = 1; i < images.length; i++){
                        let newItem = $('<div class="carousel-item">').appendTo(carousel_inner);
                        $('<img src="data/' + category +'/' + images[i] + '" class="d-block w-100" alt="...">').appendTo(newItem);
                  }
                  $(carousel).append('<a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a><a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a>');
            }
      }

      $('<br>').appendTo(mainContainer);
      $('<h4>').text("Description").appendTo(mainContainer);
      $('<p>').text(jsonOBJ.description).appendTo(mainContainer);
      $('<h4>').text("Location").appendTo(mainContainer);
      

      let APIobj = await APILocationMap(jsonOBJ.location);
      $(APIobj).appendTo(mainContainer);

      $('<hr style="margin-top: 1.5rem;">').appendTo(mainContainer);

      let CommentContainer = $('<div class="comments">').appendTo(mainContainer);
      $('<h5>').text("Comments").appendTo(CommentContainer);

      let input_group = $('<div class="input-group" style="margin-bottom: 3px;">').appendTo(CommentContainer);
      let input_group_prepend = $('<div class="input-group-prepend">').appendTo(input_group);
      

      if (userSignedIn){
            $('<span class="input-group-text" style="font-size: 0.8rem;">').text("Write comment").appendTo(input_group_prepend);
            let text_area = $('<textarea class="form-control" aria-label="With textarea">').appendTo(input_group);
            let submit_button = $('<button type="button" class="btn btn-secondary" style="float: right;">').text("Submit").appendTo(CommentContainer);
            $(submit_button).on("click", function(){
                  if($(text_area).val() != undefined && $(text_area).val() != ""){
                        SendComment(category, post_index, $(text_area).val());
                        $(text_area).val("");
                  }
            })
      }
      else{
            
            //$('<textarea class="form-control" aria-label="With textarea" disabled style="font-size: 0.6rem;">').text("Please sign in to leave a comment.").appendTo(input_group);
            $('<span class="input-group-text" style="font-size: 0.8rem;">').text("Please sign in to leave a comment.").appendTo(input_group_prepend);
            $('<br>').appendTo(input_group);
      }

      let media = $('<div id="media" class="media" style="margin-top: 3rem;">').appendTo(CommentContainer);

      if (comments != undefined){
            let holder_class = $('<div class="comment_holder" id="comment_holder">').appendTo($(media));
            comments.forEach(element => {
                  MakeComment(element.user, element.comment).appendTo($(holder_class));
            });
      }
      else{
            $('<p id="no_comments">').text("No comments").appendTo(media);
      }
      return mainContainer;
}

function MakeComment(user, text){
      let comment_class =  $('<div class="comment">');
      $('<h6 class="mt-0">').text(user).appendTo(comment_class);
      $('<p>').text(text).appendTo(comment_class);
      return comment_class;
}

async function APILocationMap(location_str){

            let API_Holder = $('<div class="api-holder">');

            //console.log(location_str.split(".").length-1);
            var start_str = location_str.substring(0, 3);
            let w3w_str = location_str.substr(3);

            if (w3w_str.split(".").length-1 == 2 && start_str == "///"){
                  
                  let errorFlag = false;
                  let response = await fetch('https://api.what3words.com/v3/convert-to-coordinates?words='+ w3w_str +'&key=' + w3w_key).catch(function(){
                        errorFlag = true;
                  });
                  if(!errorFlag){
                        let responseJSON = await response.json();
                        if (responseJSON.nearestPlace != undefined){
                              $('<p>').text("Nearest place: " + responseJSON.nearestPlace).appendTo(API_Holder);
                        }
                  }
                  
                  
                  $('<p>').text("What3Words sitemap:").appendTo(API_Holder);
                  let embed = $('<div class="embed-responsive embed-responsive-16by9" style="height: 600px;">').appendTo(API_Holder);
                  $('<object data="https://map.what3words.com/' + w3w_str +'?maptype=satellite" type="text/html">').appendTo(embed);




            }
            else{
                  $('<p>').text("No Longitude/Latitude data available. Location name:").appendTo(API_Holder);
                  $('<p>').text(location_str).appendTo(API_Holder);
            }

            return API_Holder;
      
}


function CreateErrorFound(){
      let mainContainer = $('<div class="alert alert-secondary w-75 justify-content-center" role="alert" >');
      $('<h4 class="alert-heading">').text("Nothing here!").appendTo(mainContainer);
      $('<p>').text("It seems there's no places submitted for this category.").appendTo(mainContainer);
      $('<hr>').appendTo(mainContainer);
      let uploadBTN = $('<button type="button" class="btn btn-success">').text("Upload!").appendTo(mainContainer);
      uploadBTN.on("click", UploadForm);
      
      return mainContainer;
}

function CreateServerError(){
      $("#Cards").empty();
      let mainContainer = $('<div class="alert alert-secondary w-75 justify-content-center" role="alert" >');
      $('<h4 class="alert-heading">').text("Server connection issue :(").appendTo(mainContainer);
      $('<p>').text("It seems there is an issue with sending/recieving requests from the server. The server may have disconnected.").appendTo(mainContainer);
      // $('<hr>').appendTo(mainContainer);
      // let uploadBTN = $('<button type="button" class="btn btn-success">').text("Upload!").appendTo(mainContainer);
      // uploadBTN.on("click", UploadForm);
      
      $(mainContainer).appendTo('#Cards');
}


function CardFromJSON(jsonOBJ, category, card_index){
      let mainContainer = $('<div class="card w-75 justify-content-center">');

      let image_string = jsonOBJ.image;
      let images = image_string.split("/");
      if (image_string){
            $('<img src="data/' + category +'/' + images[0] + '" class="card-img-top" alt="...">').appendTo(mainContainer);
      }

      let textContainer = $('<div class="card-body">').appendTo(mainContainer);
      $('<h5 class="card-title">').text(jsonOBJ.name).appendTo(textContainer);
      $('<p class="card-text">').text(jsonOBJ.description).appendTo(textContainer);
      let buttonHTML = $('<a href="#" class="btn btn-primary">').text("More details").appendTo(textContainer);
      buttonHTML.on("click",function(){
            MoreDetailRequest(card_index);
      })
      return mainContainer;
}


function SelectCategoryCSS(HTMLElement){
      $('a', $('#list_content')).each(function () {
            $(this).css({ 'background-color' : '', 'opacity' : '' });
            $(this).css({ 'color' : '', 'opacity' : '' });
        });  
      if (HTMLElement != null){
            $(HTMLElement).css("background-color", "#b4b9bd");
            $(HTMLElement).css("color", "#1e2022");
      }      
}
