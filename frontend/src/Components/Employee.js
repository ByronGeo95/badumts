//Created by: Byron Georgopoulos
//Created on: 15/09/2022
//Last Modified on: 22/09/2022
/*Description: Component that handles when a specific employee is clicked on from the landing (main) component*/

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft, faComment, faEnvelope, faFileCirclePlus, faLocationDot, faPen, faRotate, faSignature, faTrash, faUser, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

class Employee extends React.Component {

    constructor (props)
    {
        super(props);

        this.state = {
            _id: '',
            userDetails: [],
            employeeData: [],
            comment: '',

            editEmployeeModalBool: false,
            editEmail: '',
            editFirstName: '',
            editLastName: '',
            editUsername: '',
            editAddress: '',
            editRole: '',

            delete_id: '',
            deleteEployeeModalBool: false,

            detailsActive: true,
            commentsActive: false,
        };
    };

    componentDidMount = () => {
        let _id = this.props.clicked_id;
        let userDetails = this.props.userDetails;
        this.setState({ _id: _id, userDetails: userDetails });

        fetch('/fetchEmployee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: _id }),
        })
        .then(res => res.json())
        .then(
        (result) => {
        this.setState({
                        employeeData: result
                    });
        });

    };

    handleComment = (event) => {
        let comment = event.target.value;
        this.setState({ comment: comment });
    };

    clickPost = () => {
        let comment = this.state.comment;
        let _id = this.state._id;
        let userDetails = this.state.userDetails;

        fetch('/postComment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: _id, comment: comment, userDetails: userDetails }),
        })
        .then(res => res.json())
        .then(
        (result) => {
        console.log(JSON.stringify(result));
        this.setState({
                        employeeData: result,
                    });
        })
        .then(this.refs.commentTextBox.value = '');
    };

    clickEditEmployee = () => {
        let employeeData = this.state.employeeData;
        this.setState({ 
          edit_id: employeeData._id,
          editFirstName: employeeData.firstName,
          editLastName: employeeData.lastName,
          editRole: employeeData.role,
          editAddress: employeeData.address,
          editEmail: employeeData.email,
          editUsername: employeeData.username,
          editEmployeeModalBool: true,
         });
    };

    handleEditEmail = (event) => {
        let email = event.target.value;
        this.setState({ editEmail: email });
    };

    handleEditUsername = (event) => {
        let username = event.target.value;
        this.setState({ editUsername: username });
    };

    handleEditFirstName = (event) => {
        let firstName = event.target.value;
        this.setState({ editFirstName: firstName });
    };

    handleEditLastName = (event) => {
        let lastName = event.target.value;
        this.setState({ editLastName: lastName });
    };

    handleEditAddress = (event) => {
        let address = event.target.value;
        this.setState({ editAddress: address });
    };

    handleEditRole = (event) => {
        let role = event.target.value;
        this.setState({ editRole: role });
    };

    editEmployee = () => {
        let employeeData = this.state.employeeData;
        let edit_id = employeeData._id;
        let editEmail = this.state.editEmail;
        let editUsername = this.state.editUsername;
        let editFirstName = this.state.editFirstName;
        let editLastName = this.state.editLastName;
        let editAddress = this.state.editAddress;
        let editRole = this.state.editRole;

        fetch('/editEmployeeEmployeePage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: edit_id, email: editEmail, username: editUsername, firstName: editFirstName, lastName: editLastName, address: editAddress, role: editRole }),
        })
        .then(res => res.json())
        .then(
        (result) => {
        this.setState({
                        editEmployeeModalBool: false,
                        employeeData: result,
                    });
        })
    };

    closeEditEmployeeModal = () => {
        this.setState({ editEmployeeModalBool: false });
    };

    clickDeleteEmployee = () => {
        let employeeData = this.state.employeeData;
        this.setState({ delete_id: employeeData._id, deleteEmployeeModalBool: true })
    };

    confirmDeleteEmployee = () => {
        let delete_id = this.state.delete_id;

        fetch('/deleteEmployee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: delete_id }),
        })
        // .then(res => res.json())
        // .then(
        // (result) => {
        // let employeeData = this.state.employeeData;
        // employeeData.splice(deleteIndex, 1);
        // this.setState({
        //                 employeeData: employeeData,
        //                 deleteEmployeeModalBool: false,
        //             });
        // });
    };

    closeDeleteEmployeeModal = () => {
        this.setState({ deleteEmployeeModalBool: false });
    };

    detailsActive = () => {
      this.setState({ detailsActive: true, commentsActive: false })
    }

    commentsActive = () => {
      this.setState({ detailsActive: false, commentsActive: true })
    }

    render ()
    {

      let employeeData = this.state.employeeData;  
      let comments = employeeData.comments;
      let editEmployeeModalBool = this.state.editEmployeeModalBool;
      let detailsActive = this.state.detailsActive;
      let commentsActive = this.state.commentsActive;

      let mapComments;

      if (comments)
      {
          mapComments = comments.map(comment => {
            return (
              <div>
                <Row style={{ width: '100%', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} >
                  <Col md={2} >
                    <Image src='https://imgur.com/8ybKouN.png' style={{ width: '50px', float: 'right', marginRight: '0px' }} />
                  </Col>
                  <Col md={10} style={{ textAlign: 'left', float: 'left', fontSize: '14px' }} >
                    {comment.author}
                    <br></br>
                    {comment.date}
                  </Col>
                </Row>
                <Row style={{ width: '100%', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} >
                  <Col md={2} >

                  </Col>
                  <Col md={10} style={{ textAlign: 'left', float: 'left', paddingTop: '2px', width: '83.333%' }} >
                    {comment.comment}
                  </Col>
                </Row>
                <hr style={{ width: '100%', float: 'center', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }} ></hr>
              </div>
            );
          });
      }

      let editEmployeeModal = (
          <div>
            <Modal show={editEmployeeModalBool} style={{ textAlign: 'center', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} centered animation size='md' >
              <Modal.Body>
                <div>
                  <div style={{ fontSize: '2rem' }} >
                      Edit An Employee
                  </div>
                  <hr></hr>
                  <Form>
                    <Form.Group>
                      <Form.Control onChange={this.handleEditEmail} type='text' placeholder='Email' defaultValue={employeeData.email} style={{ width: '90%', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} />
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                      <Form.Control onChange={this.handleEditUsername} type='text' placeholder='Username' defaultValue={employeeData.username} style={{ width: '90%', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} />
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                      <Form.Control onChange={this.handleEditFirstName} type='text' placeholder='First Name' defaultValue={employeeData.firstName} style={{ width: '90%', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} />
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                      <Form.Control onChange={this.handleEditLastName} type='text' placeholder='Last Name' defaultValue={employeeData.lastName} style={{ width: '90%', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} />
                      </Form.Group>
                    <br></br>
                    <Form.Group>
                      <Form.Control onChange={this.handleEditAddress} type='text' placeholder='Address' defaultValue={employeeData.address} style={{ width: '90%', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} />
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                      <Form.Control onChange={this.handleEditRole} type='text' placeholder='Role' defaultValue={employeeData.role} style={{ width: '90%', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} />
                    </Form.Group>
                  </Form>
                  <hr></hr>
                  <Button style={{ textDecoration: 'none' }} onClick={this.editEmployee} variant='link'><FontAwesomeIcon icon={faPen} /> Edit Employee</Button>
                  <Button style={{ textDecoration: 'none', color: 'black' }} onClick={this.closeEditEmployeeModal} variant='link'><FontAwesomeIcon icon={faCircleXmark} /> Close</Button>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        );

        let deleteEmployeeModalBool = this.state.deleteEmployeeModalBool;

        let deleteEmployeeModal = (
            <div>
                <Modal show={deleteEmployeeModalBool} style={{ textAlign: 'center', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} centered animation size='md' >
                    <Modal.Body>
                        <div>
                            <div style={{ fontSize: '2rem' }} >
                                Delete An Employee
                            </div>
                            <hr></hr>
                            <div style={{ fontSize: '1rem' }} >
                                Are you sure you want to permenantly delete this employee?
                            </div>
                            <hr></hr>
                            <Link exact to='/' ><Button style={{ color: 'red', textDecoration: 'none' }} onClick={this.confirmDeleteEmployee} variant='link' ><FontAwesomeIcon icon={faTrash} /> Confirm Delete</Button></Link><Button style={{ color: 'black', textDecoration: 'none' }} onClick={this.closeDeleteEmployeeModal} variant='link' ><FontAwesomeIcon icon={faCircleXmark} /> Cancel</Button>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
      
      return (
        <div style={{ textAlign: 'center', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} >
          {editEmployeeModal}
          {deleteEmployeeModal}
          <Container fluid style={{ height: '100vh', overflow: 'hidden' }} >
             <Row>
              <Col md={2} style={{ borderRight: 'solid', borderRightColor: 'black', borderRightWidth: '1px', height: '100vh', backgroundColor: 'ghostwhite' }} >
                <br></br>
                <div style={{ fontSize: '1.5rem' }} >
                    <b>Badumts GmbH</b>
                </div>
                <hr></hr>
                <Button onClick={this.detailsActive} style={{ fontSize: '1.2rem', textDecoration: 'none' }} variant='link'><b><FontAwesomeIcon icon={faUser} /> Employee Details</b></Button>
                <br></br>
                <br></br>
                <Button onClick={this.commentsActive} style={{ fontSize: '1.2rem', textDecoration: 'none' }} variant='link'><b><FontAwesomeIcon icon={faComment} /> Employee Comments</b></Button>
                <br></br>
                <br></br>
                <Link style={{ fontSize: '1.2rem', textDecoration: 'none' }} exact to='/' ><b><FontAwesomeIcon icon={faCircleLeft} /> Back To Dashboard</b></Link>
              </Col>
              <Col md={10} >
              {
              detailsActive &&
              <div>
              <div style={{ fontSize: '3rem' }} >  
                {employeeData.firstName} {employeeData.lastName}'s Details
              </div>
              <hr></hr>
              <br></br>
              <br></br>
                    <Card style={{ width: '22rem', minHeight: '27.5rem', textAlign: 'center', float: 'center', marginLeft: 'auto', marginRight: 'auto', backgroundColor: 'ghostwhite' }}>
                        <Card.Img variant='top' src='https://imgur.com/8ybKouN.png' style={{ width: '150px', float: 'center', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', paddingTop: '20px' }} />
                        <Card.Body>
                             <Card.Title>{employeeData.firstName} {employeeData.lastName}</Card.Title>
                            <Card.Text>
                                <FontAwesomeIcon icon={faUser} /> {employeeData.role}
                                <br></br>
                                <FontAwesomeIcon icon={faEnvelope} /> {employeeData.email}
                                <br></br>
                                <FontAwesomeIcon icon={faLocationDot} /> {employeeData.address}
                                <br></br>
                                <FontAwesomeIcon icon={faSignature} /> {employeeData.username}
                            </Card.Text>
                            <div style={{ position: 'absolute', bottom: '1%', left: '26.5%' }} >
                                <Button style={{ textDecoration: 'none' }} onClick={this.clickEditEmployee.bind(this, employeeData._id, employeeData.firstName, employeeData.lastName, employeeData.role, employeeData.email, employeeData.address, employeeData.username)} variant='link'><FontAwesomeIcon icon={faPen} /> Edit</Button><Button onClick={this.clickDeleteEmployee} style={{ color: 'red', textDecoration: 'none' }} variant='link'><FontAwesomeIcon icon={faTrash} /> Delete</Button>
                            </div>
                        </Card.Body>
                    </Card>

                </div>
              }
              {
              commentsActive &&
              <div>
              <div style={{ fontSize: '3rem' }} >
                {employeeData.firstName} {employeeData.lastName}'s Comments
              </div>
              <hr></hr>
              <div style={{ width: '60%', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} >
              <div style={{ overflowY: 'scroll', height: '75vh' }} >
                   {mapComments}
              </div>
              <hr></hr>
                <InputGroup style={{ float: 'center', marginLeft: 'auto', marginRight: 'auto' }} > 
                <Form.Control ref='commentTextBox' onChange={this.handleComment} placeholder='Enter a comment...' as='textarea' rows={1} ></Form.Control>
                <Button style={{ width: '15%' }} onClick={this.clickPost} variant='primary' >Post</Button>
              </InputGroup>
              </div>
              </div>
              }
              </Col>
            </Row>
          </Container>
        </div>
      );
      
    };
};

export default Employee;