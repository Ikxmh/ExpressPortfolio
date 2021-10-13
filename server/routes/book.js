let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');


// connect to Our Book database 
// let Book = require('../models/book');

let bookController = require('../controllers/book')

// helper function for guard purposes 
function requireAuth(req,res,next)
{
    // check if the user is logged in 
    if (!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

/* GET route for Book List Page  READ OPERATION */
router.get('/', bookController.displayBookList);


/* GET route for displaying Add Page - CREATE Operation */
router.get('/add', requireAuth, bookController.displayAddPage);

/* POST route for processing Add Page - CREATE Operation */
router.post('/add', requireAuth, bookController.processAddPage);
    
/* GET route for displaying Edit Page - Update Operation */
router.get('/edit/:id', requireAuth, bookController.displayEditPage);

/* POST route for processing Edit Page - UPDATE Operation */
router.post('/edit/:id', requireAuth, bookController.processEditPage);

/* GET TO PERFORM Book Deletion- DELETE Operation */
router.get('/delete/:id', requireAuth, bookController.performDelete);

module.exports = router;