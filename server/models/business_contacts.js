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
