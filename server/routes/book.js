let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const book = require('../models/book');

// connect to Our Book database 
let Book = require('../models/book');

let bookController = require('../controllers/book')

/* GET route for Book List Page  READ OPERATION */
router.get('/', bookController.displayBookList);


/* GET route for displaying Add Page - CREATE Operation */

router.get('/add', bookController.displayAddPage);

/* POST route for processing Add Page - CREATE Operation */
router.post('/add', bookController.processAddPage);
    
/* GET route for displaying Edit Page - Update Operation */
router.get('/edit/:id', bookController.displayEditPage);

/* POST route for processing Edit Page - UPDATE Operation */
router.post('/edit/:id', bookController.processEditPage);

/* GET TO PERFORM Book Deletion- DELETE Operation */
router.get('/delete/:id', bookController.performDelete);

module.exports = router;