//Created by: Byron Georgopoulos
//Created on: 19/09/2022
//Last Modified on: 19/09/2022
/*Description: Route for employee controller*/

//Export the login route
module.exports = (app) => {
    const Employee = require('../controllers/employee.controller.js');
    app.post('/addCSVEmployee', Employee.addCSVEmployee);
};