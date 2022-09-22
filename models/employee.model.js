//Created by: Byron Georgopoulos
//Created on: 18/09/2022
//Last Modified on: 18/09/2022
/*Description: Model (Schema) for the employee collection of the web app. All employees created must follow this format*/

//Require Mongoose
const mongoose = require('mongoose');

//User Schema
let EmployeeSchema = mongoose.Schema({
    username: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    firstName: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        default: ''
    },
    comments: {
        type: Array,
        //default: ''
    },
});

//Exports the User Schema
module.exports = mongoose.model('employees', EmployeeSchema);