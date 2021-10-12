/* 
Filename: users.js
Name: Ikamjot Singh Hundal
StudentID: 301134374
Date: September 30th, 2021
*/

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Placeholder');
});

module.exports = router;
