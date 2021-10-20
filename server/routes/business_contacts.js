let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
let passport = require('passport');


// connect to business_contacts database 
let Business_Contacts = require('../models/business_contacts');

let contactController = require('../controllers/business_contacts');

function requireAuth(req,res,next)
{
    // check if the user is logged in 
    if (!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
} 

/* GET route for Contact List Page  READ OPERATION */
router.get('/', contactController.displayContactsList);

/* GET route for displaying Add Page - CREATE Operation */
router.get('/add', requireAuth, contactController.displayAddPage);

/* POST route for processing Add Page - CREATE Operation */
router.post('/add', requireAuth, contactController.processAddPage);

/* GET route for displaying Edit Page - Update Operation */
router.get('/edit/:id', requireAuth, contactController.displayEditPage);

/* POST route for processing Edit Page - UPDATE Operation */
router.post('/edit/:id', requireAuth, contactController.processEditPage);

/* GET TO PERFORM Book Deletion- DELETE Operation */
router.get('/delete/:id', requireAuth, contactController.performDelete);

module.exports = router;