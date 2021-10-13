/* 
Filename: index.js
Name: Ikamjot Singh Hundal
StudentID: 301134374
Date: September 30th, 2021
*/

let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

/* GET Home page. */
router.get('/', indexController.displayHomePage);
/* GET Home page. */
router.get('/home', indexController.displayHomePage);

/* GET About Me page. */
router.get('/about', indexController.displayAboutPage);

/* GET Projects page. */
router.get('/projects', indexController.displayProjectsPage);

/* GET Services page. */
router.get('/services', indexController.displayServicesPage);

/* GET Contact page. */
router.get('/contact', indexController.displayContactPage);

/* GET route for displaying Login Page */
router.get('/login', indexController.displayLoginPage);

/* POST route for processing Login Page */
router.post('/login', indexController.processLoginPage);

/* GET route for displaying Register Page*/
router.get('/register', indexController.displayRegisterPage);

/* POST route for processing Register Page */
router.post('/register', indexController.processRegisterPage);

/* GET TO PERFORM User Logout */
router.get('/logout', indexController.performLogOut);

module.exports = router;
