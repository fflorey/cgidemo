var express = require('express');
var router = express.Router();


// Initialize default app
// Retrieve your own options values by adding a web app on
// https://console.firebase.google.com


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
