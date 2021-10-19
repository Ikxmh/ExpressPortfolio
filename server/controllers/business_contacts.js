/*
Filename: business_contacts.js
Name: Ikamjot Singh Hundal
StudentID: 301134374
Date: October 16th, 2021
*/

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let Business_Contacts = require('../models/business_contacts');

module.exports.displayContactsList = (req,res,next) => {
    Business_Contacts.find((err, contactList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(BookList);
            let list = []

            for(let fillIn = 0; fillIn<contactList.length; fillIn++)
            {
                 list.push(contactList[fillIn]);
            } 
            list.sort((a,b) => (a.contact_email > b.contact_email) ? 1 : -1);

            
            res.render('business_contacts/list', 
            {title: 'Contacts', 
            ContactList: list, 
            displayName: req.user ? req.user.displayName : ''}); 
        }
    });
}


module.exports.displayAddPage = (req, res, next) => {
    res.render('business_contacts/add', {title: 'Add Contact', 
    displayName: req.user ? req.user.displayName : ''})          
}

module.exports.processAddPage = (req,res,next) => {
    let newBusiness_Contacts = Business_Contacts({
        "contact_name": req.body.contact_name,
        "contact_number": req.body.contact_number,
        "contact_email": req.body.contact_email
    });
    
    Business_Contacts.create(newBusiness_Contacts, (err, Business_Contacts) =>
    {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/business_contacts-list');
        }
    });
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Business_Contacts.findById(id, (err, currentContactToEdit) =>
    {
        if(err)
        {
            console.log(err)
            res.end(err)
        }
        else
        {
            // show the edit view
            res.render('business_contacts/edit', {title: 'Edit Contact', contact: currentContactToEdit, 
            displayName: req.user ? req.user.displayName : ''})
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedContact = Business_Contacts({
        "_id": id,
        "contact_name": req.body.contact_name,
        "contact_number": req.body.contact_number,
        "contact_email": req.body.contact_email
    });

    Business_Contacts.updateOne({_id: id}, updatedContact,(err) =>
    {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else 
        {
            // refresh the contact-list 
            res.redirect('/business_contacts-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Business_Contacts.remove({_id: id},(err) =>
    {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/business_contacts-list');
        }
    });
} 
