let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to Our Book database 
let Book = require('../models/book');

/* GET route for Book List Page */
router.get('/', (req, res, next) => {
    Book.find((err, bookList) => {
        if (err)
        {
            return console.error(err);
        }
        else
        {
            // console.log(BookList);
            res.render('book', {title: 'Book List', BookList: bookList})   
        }
    });
});

module.exports = router;