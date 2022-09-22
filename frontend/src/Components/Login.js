//Created by: Byron Georgopoulos
//Created on: 15/09/2022
//Last Modified on: 21/09/2022
/*Description: Login page to access the database*/

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

class Login extends React.Component {

    constructor (props)
    {
        super(props);

        this.state = {
            email: '',
            password: '',
            token: '',
            errMsg: '',
            userDetails: [],
        };
    };

    handleEmail = (event) => {
        let email = event.target.value;
        this.setState({ email: email });
    };

    handlePassword = (event) => {
        let password = event.target.value;
        this.setState({ password: password });
    };

    clickLogin = () => {
        let email = this.state.email;
        let password = this.state.password;
   
        fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password }),
        })
        .then(res => res.json())
        .then(
        (result) => {
        this.setState({
                        token: result.token,
                        errMsg: result.errMsg
                    });
                    this.verifyUserToken(result.token);
            })
    };

    verifyUserToken = (token) => {
        //Fetch request that returns the a users details once the JWT has been verified
        fetch('/verifyUserToken', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` },
            })
            .then(res => res.json())
            .then(
            (result) => {
              //Sends the users details as props back to the App.js file
                this.props.userDetails(result);
                this.setState({
                    userDetails: result,
                });
            });
    };

    clickSignUp = () => {
        this.props.signUpActive(true);
    };

    render ()
    {

        let errMsg = this.state.errMsg;

        return (
        <div style={{ textAlign: 'center', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} >
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div style={{ backgroundColor: 'ghostwhite', width: '17.5%', borderStyle: 'solid', borderColor: 'grey', borderRadius: '4px', borderWidth: '0.5px',float: 'center', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }} >
                <Image style={{ width: '250px' }} src='https://imgur.com/EgsOE3g.png' />
                <br></br>
                <br></br>
                   <div style={{ fontSize: '16px', color: '#707070', fontWeight: 'bold', textAlign: 'center', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} >
                    Login To Get Started With Badumts Employee Managment Database.
                  </div>
                <br></br>
                <Form>
                    <Form.Group>
                        <Form.Control onChange={this.handleEmail} type='text' placeholder='Email Address' style={{ width: '90%', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} />
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Control onChange={this.handlePassword} type='password' placeholder='Password' style={{ width: '90%', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} />
                    </Form.Group>
                    <br></br>
                    <Button onClick={this.clickLogin} variant='primary' style={{ width: '90%', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} >
                        Login
                    </Button>
                    <br></br>
                    <br></br>
                    {
                        errMsg !== '' &&
                        <div style={{ color: 'red', fontSize: '13px' }} >
                            {errMsg}
                            <br></br>
                            <br></br>
                        </div>
                    }
                </Form>
            </div>
            <br></br>
            <div style={{ backgroundColor: 'ghostwhite', width: '17.5%', borderStyle: 'solid', borderColor: 'grey', borderRadius: '4px', borderWidth: '0.5px', height: '40px', float: 'center', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }} >
                <Row style={{ paddingLeft: '0px', paddingRight: '10px' }} >
                     <Col sm={8} style={{ textAlign: 'right', float: 'right', marginRight: '0px', paddingRight: '0px', paddingTop: '7.5px', fontSize: '15px' }} >
                        Don't have an account?
                     </Col>
                     <Col sm={4} style={{ textAlign: 'left', float: 'left', marginLeft: '0px', paddingLeft: '0px', paddingTop: '1.5px', fontSize: '15px' }} >
                        <Button style={{ fontSize: '15px' }} onClick={this.clickSignUp} variant='link' >Sign Up</Button>
                     </Col>
                </Row>
            </div>
        </div>
      );
      
    };
};

export default Login;