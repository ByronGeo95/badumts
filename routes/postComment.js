//Created by: Byron Georgopoulos
//Created on: 21/09/2022
//Last Modified on: 21/09/2022
/*Description: Route for employee controller*/

module.exports = (app) => {
    const Employee = require('../controllers/employee.controller.js');
    app.post('/postComment', Employee.postComment);
};