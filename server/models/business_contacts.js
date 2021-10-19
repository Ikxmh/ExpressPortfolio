/*
Filename: business_contacts.js
Name: Ikamjot Singh Hundal
StudentID: 301134374
Date: October 16th, 2021
*/


let mongoose = require('mongoose');

// create a model class 
let contactsModel = mongoose.Schema
(
    {
        contact_name: String,
        contact_number: String,
        contact_email: String
    },
    {
        collection: "contacts"
    });

    module.exports = mongoose.model('Business_Contacts', contactsModel);
