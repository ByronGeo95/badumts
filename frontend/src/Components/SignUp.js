//Created by: Byron Georgopoulos
//Created on: 15/09/2022
//Last Modified on: 5/09/2022
/*Description: Sign Up page. Needed before a user can login*/

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

class SignUp extends React.Component {

    constructor (props)
    {
        super(props);

        this.state = {
            email: '',
            emailValidBool: false,
            username: '',
            password: '',
            passValidBool: false,
            passwordCon: '',
            passwordConValidBool: false,
            firstName: '',
            lastName: '',
            address: '',
            role: '',
            passwordsDifBool: false,

            token: '',
            errMsg: '',
            userDetails: [],
        };
    };

    handleEmail = (event) => {
        let email = event.target.value;

        //Email address must contain an '@' and a '.'
        let re = /\S+@\S+\.\S+/;
        if (re.test(email))
        {
            this.setState({ emailValidBool: true });
        }
        if (!re.test(email))
        {
            this.setState({ emailValidBool: false });
        }

        this.setState({ email: email });
    };

    handleUsername = (event) => {
        let username = event.target.value;
        this.setState({ username: username });
    };

    handlePassword = (event) => {
        let password = event.target.value;

        //Checks to make sure the password is at least 8 characters in length
        if (password.length < 8)
        {
            this.setState({ passValidBool: false });
        }
        if (password.length >= 8)
        {
            this.setState({ passValidBool: true });
        }

        this.setState({ password: password });
    };

    handlePasswordCon = (event) => {
        let passwordCon = event.target.value;

        //Checks to make sure the password is at least 8 characters in length
        if (passwordCon.length < 8)
        {
            this.setState({ passwordConValidBool: false });
        }
        if (passwordCon.length >= 8)
        {
            this.setState({ passwordConValidBool: true });
        }

        this.setState({ passwordCon: passwordCon });
    };

    handleFirstName = (event) => {
        let firstName = event.target.value;
        this.setState({ firstName: firstName });
    };

    handleLastName = (event) => {
        let lastName = event.target.value;
        this.setState({ lastName: lastName });
    };

    handleAddress = (event) => {
        let address = event.target.value;
        this.setState({ address: address });
    };

    handleRole = (event) => {
        let role = event.target.value;
        this.setState({ role: role });
    };

    clickSignUp = () => {
        let email = this.state.email;
        let username = this.state.username;
        let password = this.state.password;
        let passwordCon = this.state.passwordCon;
        let firstName = this.state.firstName;
        let lastName = this.state.lastName;
        let address = this.state.address;
        let role = this.state.role;

        //Checks to see if passwords match
        if (password === passwordCon)
        {
            fetch('/signUp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, username: username, password: password, firstName: firstName, lastName: lastName, address: address, role: role }),
                })
                .then(res => res.json())
                .then(
                (result) => {
                console.log(result)
                this.setState({
                                token: result.token,
                                errMsg: result.errMsg
                            });
                            this.verifyUserToken(result.token);
            });
        }
        else
        {
            this.setState({ passwordsDifBool: true });
        }

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
            })

    };

    clickLogin = () => {
        this.props.loginActive(true);
    };

    render ()
    {

        let emailValidBool = this.state.emailValidBool;
        let passValidBool = this.state.passValidBool;
        let passwordConValidBool = this.state.passwordConValidBool;
        let signUpBtnBool = true;
        let passwordsDifBool = this.state.passwordsDifBool;

        let username = this.state.username;
        let firstName = this.state.firstName;
        let lastName = this.state.lastName;
        let address = this.state.address;
        let role = this.state.role

        //Checks to see if Sign Up Button should be enabled (if all fields have data and passwords match and valid email is used)
        if (emailValidBool === true && passValidBool === true && passwordConValidBool === true && username !== '' && firstName !== '' && lastName !== '' && address !== '' && role !== '')
        {
            signUpBtnBool = false;
        }
        
        return (
        <div style={{ textAlign: 'center', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} >
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div style={{ backgroundColor: 'ghostwhite', width: '17.5%', borderStyle: 'solid', borderColor: 'grey', borderRadius: '4px', borderWidth: '0.5px',float: 'center', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }} >
                {/* <h4>Badumts Employee Sign Up</h4> */}
                <Image style={{ width: '250px' }} src='https://imgur.com/EgsOE3g.png' />
                <br></br>
                <br></br>
                   <div style={{ fontSize: '16px', color: '#707070', fontWeight: 'bold', textAlign: 'center', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} >
                    Sign Up To Get Started With Badumts Employee Managment Database.
                  </div>
                <br></br>
                <Form>
                    <Form.Group>
                        <Form.Control onChange={this.handleEmail} type='text' placeholder='Email Address' style={{ width: '90%', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} />
                    </Form.Group>
                    <div style={{ color: 'grey', paddingTop: '5px', paddingBottom: '10px', float: 'left', textAlign: 'left', marginLeft: '20px', fontSize: '12px' }} >
                        Please Enter A Valid Email Address.
                    </div>
                    <br></br>
                    <Form.Group>
                        <Form.Control onChange={this.handleUsername} type='text' placeholder='Username' style={{ width: '90%', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} />
                    </Form.Group>
                    <div style={{ color: 'grey', paddingTop: '5px', paddingBottom: '10px', float: 'left', textAlign: 'left', marginLeft: '20px', fontSize: '12px' }} >
                        Doesn't Have To Be Unique.
                    </div>
                    <br></br>
                    <Form.Group>
                        <Form.Control onChange={this.handlePassword} type='password' placeholder='Password' style={{ width: '90%', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} />
                    </Form.Group>
                    <div style={{ color: 'grey', paddingTop: '5px', paddingBottom: '10px', float: 'left', textAlign: 'left', marginLeft: '20px', fontSize: '12px' }} >
                        Password Must Be At Leats 8 Characters.
                    </div>
                    <br></br>
                     <Form.Group>
                        <Form.Control onChange={this.handlePasswordCon} type='password' placeholder='Confirm Password' style={{ width: '90%', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} />
                    </Form.Group>
                    <div style={{ color: 'grey', paddingTop: '5px', paddingBottom: '10px', float: 'left', textAlign: 'left', marginLeft: '20px', fontSize: '12px' }} >
                        Confirm Your Password.
                    </div>
                    <br></br>
                     <Form.Group>
                        <Form.Control onChange={this.handleFirstName} type='text' placeholder='First Name' style={{ width: '90%', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} />
                    </Form.Group>
                    <div style={{ color: 'grey', paddingTop: '5px', paddingBottom: '10px', float: 'left', textAlign: 'left', marginLeft: '20px', fontSize: '12px' }} >
                        Your Legal First Name.
                    </div>
                    <br></br>
                     <Form.Group>
                        <Form.Control onChange={this.handleLastName} type='text' placeholder='Last Name' style={{ width: '90%', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} />
                    </Form.Group>
                    <div style={{ color: 'grey', paddingTop: '5px', paddingBottom: '10px', float: 'left', textAlign: 'left', marginLeft: '20px', fontSize: '12px' }} >
                        Your Legal Last Name.
                    </div>
                    <br></br>
                    <Form.Group>
                        <Form.Control onChange={this.handleAddress} type='text' placeholder='Address' style={{ width: '90%', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} />
                    </Form.Group>
                    <div style={{ color: 'grey', paddingTop: '5px', paddingBottom: '10px', float: 'left', textAlign: 'left', marginLeft: '20px', fontSize: '12px' }} >
                        Your Address (Standard German Format, Seperated By Commas).
                    </div>
                    <br></br>
                    <Form.Group>
                        <Form.Control onChange={this.handleRole} type='text' placeholder='Role' style={{ width: '90%', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} />
                    </Form.Group>
                    <div style={{ color: 'grey', paddingTop: '5px', paddingBottom: '10px', float: 'left', textAlign: 'left', marginLeft: '20px', fontSize: '12px' }} >
                        Your Role/Job At Badumts.
                    </div>
                    <br></br>
                    <Button disabled={signUpBtnBool} onClick={this.clickSignUp} variant='success' style={{ width: '90%', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} >
                        Sign Up
                    </Button>
                    <br></br>
                    <br></br>
                    {
                        !passwordsDifBool &&
                        <div style={{ color: 'grey', paddingTop: '5px', paddintBottom: '10px', textAlign: 'left', marginLeft: '20px', fontSize: '12px' }} >
                            Button Will Be Enabled Once All Form Entries Are Valid.
                            <br></br>
                            <br></br>
                        </div>
                    }
                    {
                        passwordsDifBool &&
                        <div style={{ color: 'red', paddingTop: '5px', paddintBottom: '10px', textAlign: 'left', marginLeft: '20px', fontSize: '12px' }} >
                            Passwords Do Not Match. Please Try Again.
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
                        Already have an account?
                     </Col>
                     <Col sm={4} style={{ textAlign: 'left', float: 'left', marginLeft: '0px', paddingLeft: '0px', paddingTop: '1.5px', fontSize: '15px' }} >
                        <Button style={{ fontSize: '15px' }} onClick={this.clickLogin} variant='link' >Login</Button>
                     </Col>
                </Row>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        </div>
      );
      
    };
};

export default SignUp;