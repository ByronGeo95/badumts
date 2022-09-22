//Created by: Byron Georgopoulos
//Created on: 15/09/2022
//Last Modified on: 15/09/2022
/*Description: Model (Schema) for the user collection of the web app. All users created must follow this format*/

//Require Mongoose
const mongoose = require('mongoose');

//User Schema
let UserSchema = mongoose.Schema({
    username: {
        type: String,
        default: ''
    },
    email: {
        type: String,
    },
    lastName: {
        type: String
    },
    firstName: {
        type: String
    },
    address: {
        type: String
    },
    role: {
        type: String
    },
    password: {
        type: String
    },
});

//Exports the User Schema
module.exports = mongoose.model('users', UserSchema);