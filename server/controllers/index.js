/*
Filename: index.js
Name: Ikamjot Singh Hundal
StudentID: 301134374
Date: October 15th, 2021
*/

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// enable JWT 
let jwt = require('jsonwebtoken');
let DB = require('../config/db');

// create the the user model instance 
let UserModel = require('../models/user');
let User = UserModel.User; // alias


// path to pages 
module.exports.displayHomePage = (req, res, next) =>
{
    res.render('home', {title: 'Home', displayName: req.user ? req.user.displayName : ''}); 
}

module.exports.displayAboutPage = (req,res, next) =>
{
    res.render('about_me', { title: 'About Me', displayName: req.user ? req.user.displayName : '' });
}

module.exports.displayProjectsPage = (req,res, next) =>
{
    res.render('projects', { title: 'My Projects', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayServicesPage = (req,res, next) =>
{
    res.render('services', { title: 'Services', displayName: req.user ? req.user.displayName : '' });
}

module.exports.displayContactPage = (req,res, next) =>
{
    res.render('contact', { title: 'Contact', displayName: req.user ? req.user.displayName : '' });
}

module.exports.displayContactsListPage = (req,res, next) =>
{
    res.render('index', { title: 'Contacts', displayName: req.user ? req.user.displayName : '' });
}

module.exports.displayLoginPage = (req,res, next) => {
    // check if the user is already logged in 

    if (!req.user)
    {
        res.render('auth/login',
        {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        })
    }
    else 
    {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) =>
{
    passport.authenticate('local',
    (err, user, info) => {
        // sever err
        if(err)
        {
            return next(err);
        }
        // is there a user login error?
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            // server error?
            if(err)
            {
                return next(err);
            }
            
            const payload =
            {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email
            }

            const authToken = jwt.sign(payload, DB.Secret, {
                expiresIn: 604800 // 1 week
            });

            /* TODO -- getting ready to convert to API
            res.json({success: true, msg: 'User Logged in Successfully!', user: {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email
            }, token: authToken}); 
            */

            return res.redirect('/business_contacts-list');
        }); 
    })(req, res, next); 
}

module.exports.displayRegisterPage = (req,res, next) =>
{
    if(!req.user)
    {
        res.render('auth/register',
        {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else 
    {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req,res, next) =>
{
    // instantiate a user project 
    let newUser = new User(
        {
            username: req.body.username,
            // password : req.body.password,
            email: req.body.email,
            displayName: req.body.displayName
        });
    
        User.register(newUser, req.body.password, (err) => {
            if(err)
            {
                console.log("Error: Inserting New User");
                if(err.name == "UserExistsError")
                {
                    req.flash(
                        'registerMessage',
                        'Registeration error: User Already Exists!'
                    );
                    console.log('User Already Exists!')
                }
                return res.render('auth/register', 
                {
                    title: 'Register',
                    messages: req.flash('registerMessage'),
                    displayName: req.user ? req.user.displayName : ''
                });
            }
            else
            {
                // if no error exists, then registeration is successful 

                // redirect the user and authenticate  

                /* TODO -- GBetting Ready to convert to API
                res.json({success: true, msg: 'User Registered Successfully!'});
                */
                return passport.authenticate('local')(req,res, () =>
                {
                    res.redirect('/business_contacts-list')
                });
            }
        });
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}