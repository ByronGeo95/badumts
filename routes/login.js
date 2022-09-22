//Created by: Byron Georgopoulos
//Created on: 15/09/2022
//Last Modified on: 15/09/2022
/*Description: Route for user controller*/

//Export the login route
module.exports = (app) => {
    const User = require('../controllers/user.controller.js');
    app.post('/login', User.login);
};