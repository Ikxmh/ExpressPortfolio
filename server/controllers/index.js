let express = require('express');
let router = express.Router();


module.exports.displayHomePage = (req, res, next) =>
{
    res.render('index', {title: 'Home'}); 
}

module.exports.displayAboutPage = (req,res, next) =>
{
    res.render('index', { title: 'About Me' });
}

module.exports.displayProjectsPage = (req,res, next) =>
{
    res.render('index', { title: 'My Projects' });
}

module.exports.displayServicesPage = (req,res, next) =>
{
    res.render('index', { title: 'Services' });
}

module.exports.displayContactPage = (req,res, next) =>
{
    res.render('index', { title: 'Contact' });
}

module.exports.displayBooksPage = (req,res, next) =>
{
    res.render('index', { title: 'Books' });
}