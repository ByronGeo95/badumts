//Created by: Byron Georgopoulos
//Created on: 15/09/2022
//Last Modified on: 22/09/2022
/*Description: Main React App file that handles switching (routing) and all components and props*/

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

//Browser Router to switch between web pages
import { BrowserRouter, Switch } from 'react-router-dom';

import Login from './Components/Login.js';
import SignUp from './Components/SignUp.js';

import Landing from './Components/Landing.js';
import Employee from './Components/Employee.js';

class App extends React.Component {

    constructor (props)
    {
        super(props);

        this.state = {
          landingActive: true,
          dashboardActive: false,
          loginActive: true,
          signUpActive: false,
          userDetails: [],
          clicked_id: '',
        };
    };

    userDetails = (userDetails) => {
      this.setState({ userDetails: userDetails, landingActive: false, dashboardActive: true })
    };

    sendClickedEmployee = (_id) => {
      this.setState({ clicked_id: _id });
    };

    signUpActive = (signUpActive) => {
      this.setState({ loginActive: !signUpActive, signUpActive: signUpActive })
    };

    loginActive = (loginActive) => {
      this.setState({ loginActive: loginActive, signUpActive: !loginActive });
    };

    render ()
    {

      let landingActive = this.state.landingActive;
      let dashboardActive = this.state.dashboardActive;
      let loginActive = this.state.loginActive;
      let signUpActive = this.state.signUpActive;
      let userDetails = this.state.userDetails;
      let clicked_id = this.state.clicked_id;

      if (landingActive)
      {
          return (
            <div style={{ backgroundColor: 'white', height: '100vh', position: 'absolute', right: '0px', left: '0px' }} >
              {
                loginActive &&
                <div>
                  <Login userDetails={this.userDetails} signUpActive={this.signUpActive} />
                </div>
              }
              {
                signUpActive &&
                <div>
                  <SignUp userDetails={this.userDetails} loginActive={this.loginActive} />
                </div>
              }
            </div>
          );
      }
      else
      if (dashboardActive)
      {
        return (
          <div style={{ backgroundColor: 'white', height: '100vh', position: 'absolute', right: '0px', left: '0px' }} >
            <BrowserRouter>
            <Switch>
              <Landing exact path='/' userDetails={userDetails} sendClickedEmployee={this.sendClickedEmployee} />
              <Employee exact path={`/${clicked_id}`} clicked_id={clicked_id} userDetails={userDetails} />
            </Switch>
            </BrowserRouter>
          </div>
        );
      }      
    };
};

export default App;