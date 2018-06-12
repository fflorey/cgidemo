var express = require('express');
var router = express.Router();
var firebase = require('firebase');
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
// CORS Express middleware to enable CORS Requests.
const cors = require('cors')({ origin: true });
const cookieParser = require('cookie-parser')();

admin.initializeApp(functions.config().firebase);

// Get the Database service for the default app

firebase.initializeApp({
  apiKey: "AIzaSyBaCQ9G7H7OQfTOphWoSSfC3JVaGs7MTZc",
  authDomain: "cgidemo-4b932.firebaseapp.com",
  databaseURL: "https://cgidemo-4b932.firebaseio.com",
  projectId: "cgidemo-4b932",
  storageBucket: "cgidemo-4b932.appspot.com",
  messagingSenderId: "1026068444460"
});

var defaultDatabase = firebase.database();

// Get the Auth service for the default app

// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
const validateFirebaseIdToken = (req, res, next) => {
  console.log('Check if request is authorized with Firebase ID token');

  if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
      !(req.cookies && req.cookies.__session)) {
    console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
        'Make sure you authorize your request by providing the following HTTP header:',
        'Authorization: Bearer <Firebase ID Token>',
        'or by passing a "__session" cookie.');
    res.status(403).send('Unauthorized');
    return;
  }

  let idToken;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    console.log('Found "Authorization" header');
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split('Bearer ')[1];
    console.log('id: ' + idToken);
  } else if(req.cookies) {
    console.log('Found "__session" cookie');
    // Read the ID Token from cookie.
    idToken = req.cookies.__session;
  } else {
    // No cookie
    res.status(403).send('Unauthorized');
    return;
  }
  
  admin.auth().verifyIdToken(idToken).then((decodedIdToken) => {
    console.log('ID Token correctly decoded', decodedIdToken);
    req.user = decodedIdToken;
    return next();
  }).catch((error) => {
    console.error('token: ' + idToken);
    console.error('Error while verifying Firebase ID token:', error);
    res.status(403).send('Unauthorized');
  });
};

router.use(cors);
router.use(cookieParser);
router.use(validateFirebaseIdToken);

  /* GET users listing. */
  router.get('/readdb', function (req, res, next) {
    //console.log('token: ' + JSON.stringify(req.user));
    var currentUser = req.user.user_id;
    console.log('readdb -> user: ' + currentUser);

    admin.database().ref('/addresses/' + currentUser).once('value').then((snapshot) => {
      res.send(JSON.stringify(snapshot));
    }).catch((err) => {
      res.status(200);
      res.send('hups... error: ' + err);
    });

  });

  /* GET users listing. */
  router.post('/storedb', function (req, res, next) {
    //console.log('STOREDB: token: ' + JSON.stringify(req.user));
    var currentUser = req.user.user_id;
    console.log('storedb -> user: ' + currentUser);

    name = req.body['name'];
    phone = req.body['phone'];
    street = req.body['street'];
    console.log(`name: ${name} phone: ${phone} street:${street}`);

    var userdata = {mobile: phone, street: street};
    var updates = {};
    updates[`/${name}`] = userdata;

    admin.database().ref('/addresses/' + currentUser).update(updates).then( () => {
      res.status(200);
      res.send( { "status": "done" });  
    }).catch ( (err) => {
      console.log('error: ' + err);
      res.status(500);
      res.send( { "status": "error" });  
    });

  });

  ////////////////////////////////////////////////////////////////////////////////
  // for testing

  router.get('/helloworld', function (req, res, next) {
    res.send('hello world');
  });

  module.exports = router;
