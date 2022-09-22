//Created by: Byron Georgopoulos
//Created on: 15/09/2022
//Last Modified on: 19/09/2022
/*Description: Controller containing all the functions that CRUD the user collection on MongoDB*/

//Requirement declarations
let User = require('../models/user.model.js');
let jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

        User.findOne({ 'email': email }, (err, data) => {
        try
        {
            //Checks if email matches and password matches what is in the database
            if (email === data.email && password === data.password)
            {   
                //JWT Payload 
                payload = {
                    '_id': data._id,
                    'email' : data.email,
                    'address': data.address,
                    'firstName': data.firstName,
                    'lastName': data.lastName,
                    'role': data.role,
                    'username': data.username,
                };

                //Creates new JWT based on the previous payload, and sends it back to the frontend
                const token = jwt.sign( JSON.stringify(payload), 'jwt-secret', { algorithm: 'HS256' });
                res.send({ 
                    'token' : token,
                    'errMsg': '',
                });
            }
            else
            {
                res.send({ 
                    'errMsg': `Email & password don't match. Please try again...`,
                });
            }
        }
        catch (err)
        {
            res.send({ 
                'errMsg': `Email not found. Please create an account...`,
            });
        }
    });

};

exports.verifyUserToken = (req, res) => {
    //Receives the token from the frontend, and splits it
    const auth = req.headers['authorization'];
    const token = auth.split(' ')[1];
    try
    {
        //Decodes (i.e. puts the token back into useable data) the JWT
        const decoded = jwt.verify(token, 'jwt-secret' );
        res.send({ 
            '_id': decoded._id,
            'email': decoded.email,
            'address': decoded.address,
            'firstName': decoded.firstName,
            'lastName': decoded.lastName,
            'role': decoded.role,
            'username': decoded.username,
        });
    }
    catch (err)
    {
        console.log(`Bad JWT: ${err}`);
    }
};

exports.signUp = (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let address = req.body.address;
    let role = req.body.role;

    User.findOne({ 'email': email }, (err, data) => {
        try
        {
            if (data !== null)
            {
                console.log(`Email already in use`);
                res.send({
                    errMsg: 'The email address you entered is already in use. Please try again with a different email address, or contact support...'
                });
            }
            else
            {
                User.findOne({ 'username': username }, (err, data) => {
                    try
                    {
                        if (data != null)
                        {
                            console.log(`Username Already In Use`);
                            res.send({ 'errMsg': 'The username you entered is already in use. Please try again with a different username.' });
                        }
                        else
                        {
                            let newUser = new User({
                                email: email,
                                password: password,
                                username: username,
                                firstName: firstName,
                                lastName: lastName,
                                address: address,
                                role: role
                            });
                            newUser.save((err, data) => {
                                if (err)
                                {
                                    console.log(err);
                                }
                                else
                                {
                                    console.log(`newUser.save: ${data}`);
                                    //JWT Payload
                                    payload = {
                                        '_id': data._id,
                                        'email': data.email,
                                        'address': data.address,
                                        'firstName': data.firstName,
                                        'lastName': data.lastName,
                                        'role': data.role,
                                        'username': data.username
                                    };
                                    //Creates new JWT based on previous payload, and sends it back to the frontend
                                    const token = jwt.sign( JSON.stringify(payload), 'jwt-secret', { algorithm: 'HS256' });
                                    res.send({ 
                                        'token' : token,
                                    });
                                }
                            });
                        }
                    }
                    catch (err)
                    {
                        console.log(`Catch Error: ${err}`);
                    }
                });
            }
        }
        catch (err)
        {
            console.log(`Catch Error: ${err}`);
        }
    });

};