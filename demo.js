var firebase = require('firebase');


firebase.initializeApp({
    apiKey: "AIzaSyCOl462iFVVRwYTTAoZubovz2WsX7ztdM8",
      authDomain: "cgi-simpleapp.firebaseapp.com",
      databaseURL: "https://cgi-simpleapp.firebaseio.com",
      projectId: "cgi-simpleapp",
      storageBucket: "cgi-simpleapp.appspot.com",
      messagingSenderId: "872171092367"
    });

const AuthXYZ = firebase.auth();

console.log('no problem with: ' + JSON.stringify(AuthXYZ));

firebase.auth().signInWithEmailAndPassword('f.florey@gmail.com', 'test12345').catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log('dat war ja wohl nox: ' + errorMessage);
    // ...
  });

  console.log('well... logged in');