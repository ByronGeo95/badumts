//Created by: Byron Georgopoulos
//Created on: 18/09/2022
//Last Modified on: 22/09/2022
/*Description: Controller containing all the functions that CRUD the employee collection on MongoDB*/

//Requirement declarations
let Employee = require('../models/employee.model.js');

exports.fetchAllEmployees = (req, res) => {

    Employee.find({  }, (err, data) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.send(data);
        }
    });

};

exports.addEmployee = (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let address = req.body.address;
    let role = req.body.role;

    Employee.findOne({ 'email': email }, (err, data) => {
        if (data !== null)
        {
            console.log(`There is already an employee with the email: ${data.email}`);
            res.send({
                   data: data,
                   errMsg: 'There is already an employee on the database with that email.',
                });
        }
        else
        {
            let newEmployee = new Employee({
                email: email,
                username: username,
                firstName: firstName,
                lastName: lastName,
                address: address,
                role: role
            });

            newEmployee.save({new: true}, (err, data) => {
                if (err)
                {
                    console.log(err);
                }
                else
                {
                    console.log(data);
                    res.send({
                        data: data,
                        errMsg: '',
                    });
                }
            });

        }
    });
};

exports.addCSVEmployee = (req, res) => {
    let csvData = req.body.csvData;

    Employee.insertMany(csvData, (err, data) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            console.log(data);
            res.send(data);
        }
    })

};

exports.editEmployee = (req, res) => {
    let _id = req.body._id;
    let email = req.body.email;
    let username = req.body.username;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let address = req.body.address;
    let role = req.body.role;

    Employee.findByIdAndUpdate({ '_id': _id }, { 'email': email, 'username': username, 'firstName': firstName, 'lastName': lastName, 'address': address, 'role': role }, { upsert: true, new: true }, (err, data) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            console.log(data);
            Employee.find({  }, (err, data) => {
            if (err)
            {
                console.log(err);
            }
            else
            {
                res.send(data);
            }
        }); 
        }
    });

};

exports.editEmployeeEmployeePage = (req, res) => {
    let _id = req.body._id;
    let email = req.body.email;
    let username = req.body.username;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let address = req.body.address;
    let role = req.body.role;

    Employee.findByIdAndUpdate({ '_id': _id }, { 'email': email, 'username': username, 'firstName': firstName, 'lastName': lastName, 'address': address, 'role': role }, { upsert: true, new: true }, (err, data) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            console.log(data);
            res.send(data);
        }
    });
};

exports.deleteEmployee = (req, res) => {
    let _id = req.body._id;

    Employee.findByIdAndDelete({ '_id': _id }, {new: true}, (err, data) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            console.log(data);
            res.send(data);
        }
    });
};

exports.fetchEmployee = (req, res) => {
    let _id = req.body._id;

    Employee.findById({ '_id': _id }, (err, data) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            console.log(data);
            res.send(data);
        }
    });
};

exports.postComment = (req, res) => {
    let comment = req.body.comment;
    let _id = req.body._id;
    let userDetails = req.body.userDetails;
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    Employee.findByIdAndUpdate({ '_id': _id }, { $push: { comments: { 'author': `${userDetails.firstName} ${userDetails.lastName}`, 'date': `${day}/${month}/${year}`, 'comment': comment } } }, { new: true }, (err, data) => {
        if (err)
        {
            console.log(err);
        }
        else
        {
            console.log(data);
            res.send(data);
        }
    });
};