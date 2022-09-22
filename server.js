//Created by: Byron Georgopoulos
//Created on: 15/09/2022
//Last Modified on: 22/09/2022
/*Description: Main server file that handles all routing, MongoDB access, and more.*/

const express = require('express');
const app = express();

const path = require('path');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

require('dotenv').config();

require('./routes/login.js')(app);
require('./routes/signUp.js')(app);
require('./routes/verifyUserToken.js')(app);

require('./routes/fetchAllEmployees.js')(app);
require('./routes/addEmployee.js')(app);

require('./routes/addCSVEmployee.js')(app);

require('./routes/editEmployee.js')(app);

require('./routes/deleteEmployee.js')(app);

require('./routes/fetchEmployee.js')(app);

require('./routes/postComment.js')(app);
require('./routes/editEmployeeEmployeePage.js')(app);

//Require Mongoose
const mongoose = require('mongoose');

//Login to my MongoDB
const uri = process.env.MONGO_URI;
mongoose.Promise = global.Promise;

//Connect to MongoDB
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Function for successful connection to Mongo but not to the required DB
mongoose.connection.on('error', function () {
    console.log('Connection to Mongo established.');
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

//All connections to Mongo and DB successful
mongoose.connection.once('open', function () {
    console.log("Successfully connected to the database");
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend', 'build'), {
        setHeaders: function (res, path) {
        res.set('Content-Security-Policy', '');
        res.set('Cross-Origin-Embedder-Policy', 'unsafe-none');
        }
}));

app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

//Express app listening on port 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
    console.log(`App is listening on PORT: ${PORT}`);
});