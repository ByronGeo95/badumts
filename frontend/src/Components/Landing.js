//Created by: Byron Georgopoulos
//Created on: 17/09/2022
//Last Modified on: 22/09/2022
/*Description: Component that handles and displays all employees on the database*/

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';

import Papa from 'papaparse';

//Browser Router to switch between web pages
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircleXmark, faEnvelope, faFileCirclePlus, faLocationDot, faPen, faRotate, faSignature, faTrash, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';

class Login extends React.Component {

    constructor (props)
    {
        super(props);

        this.state = {
            userDetails: [],
            employeeData: [],

            addEmployeeModalBool: false,
            email: '',
            username: '',
            firstName: '',
            lastName: '',
            address: '',
            role: '',
            errAddingEmployeeBool: false,
            errAddingEmployeeData: [],
            addEmployeeErrMsg: '',

            csvData: [],
            csvDataModalBool: false,
            editCSVIndex: null,
            editCSVFirstName: '',
            editCSVLastName: '',
            editCSVRole: '',
            editCSVAddress: '',
            editCSVUsername: '',
            editCSVEmail: '',
            editCSVEmailInUseBool: false,

            edit_id: '',
            editFirstName: '',
            editLastName: '',
            editRole: '',
            editEmail: '',
            editEmailInUseBool: false,
            editAddress: '',
            editUsername: '',
            editEmployeeModalBool: false,

            deleteEmployeeModalBool: false,
            delete_id: '',
            deleteIndex: '',
        };
    };

    componentDidMount = () => {
      let userDetails = this.props.userDetails;
      this.setState({ userDetails: userDetails });

        fetch('/fetchAllEmployees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userDetails: userDetails }),
        })
        .then(res => res.json())
        .then(
        (result) => {
        this.setState({
                        employeeData: result
                    });
        });

    };

    fetchAllEmployees = () => {
        let userDetails = this.props.userDetails;
        fetch('/fetchAllEmployees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userDetails: userDetails }),
        })
        .then(res => res.json())
        .then(
        (result) => {
        this.setState({
                        employeeData: result
                    });
        });
    };

    openAddEmployeeModal = () => {
        this.setState({ addEmployeeModalBool: true })
    };

    closeAddEmployeeModal = () => {
        this.setState({ addEmployeeModalBool: false, errAddingEmployeeBool: false, errAddingEmployeeData: [] });
    };

    handleEmail = (event) => {
        let email = event.target.value;
        this.setState({ email: email });
    };

    handleUsername = (event) => {
        let username = event.target.value;
        this.setState({ username: username });
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

    clickAddEmployee = () => {
        let email = this.state.email;
        let username = this.state.username;
        let firstName = this.state.firstName;
        let lastName = this.state.lastName;
        let address = this.state.address;
        let role = this.state.role;

        fetch('/addEmployee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, username: username, firstName: firstName, lastName: lastName, address: address, role: role }),
        })
        .then(res => res.json())
        .then(
        (result) => {
        if (result.errMsg === '')
        {
            let employeeData = this.state.employeeData;
            employeeData.push(result.data);
            this.setState({
                            employeeData: employeeData,
                            addEmployeeModalBool: false,
                            errAddingEmployeeBool: false,
                        });
        }
        else
        {
            this.setState({
                errAddingEmployeeBool: true,
                errAddingEmployeeData: result.data,
                addEmployeeErrMsg: result.errMsg,
            });
        }
        })
    };

    handleCSVInput = (event) => {
        Papa.parse(event.target.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
            let resultsLength = results.data.length-1;
            let csvData = [];
                for (let i = 0; i <= resultsLength; i++)
                {
                    let employeeObj = {
                        email: results.data[i].email,
                        username: results.data[i].username,
                        firstName: results.data[i].Vorname,
                        lastName: results.data[i].Nachname,
                        address: `${results.data[i].Strasse} ${results.data[i].Nr}, ${results.data[i].PLZ} ${results.data[i].Ort}, ${results.data[i].Land}`,
                        role: results.data[i].Rolle
                    };
                    csvData.push(employeeObj);
                }
                this.setState({ csvDataModalBool: true, csvData: csvData })
        }.bind(this),
        });
    };

    editCSVRow = (index, firstName, lastName, role, address, username, email) => {
        this.setState({ editCSVIndex: index, editCSVFirstName: firstName, editCSVLastName: lastName, editCSVRole: role, editCSVAddress: address, editSCVUsername: username, editCSVEmail: email });
    };

    deleteCSVRow = (index) => {
        let csvData = this.state.csvData;
        csvData.splice(index, 1);
        this.setState({ csvData: csvData });
    };

    saveCSVRow = () => {
        let index = this.state.editCSVIndex;
        let firstName = this.state.editCSVFirstName;
        let lastName = this.state.editCSVLastName;
        let email = this.state.editCSVEmail;
        let username = this.state.editCSVUsername;
        let role = this.state.editCSVRole;
        let address = this.state.editCSVAddress;
        let csvData = this.state.csvData;

        let employeeObj = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            role: role,
            address: address
        };

        csvData.splice(index, 1, employeeObj);
        this.setState({ csvData: csvData, editCSVIndex: null });
    };

    handleEditCSVEmail = (event) => {
        let email = event.target.value;
        let employeeData = this.state.employeeData;
        let csvData = this.state.csvData;

        if (employeeData.some(e => e.email === email) || csvData.some(e => e.email === email))
        {
            this.setState({ editCSVEmailInUseBool: true });
        }
        else
        {
            this.setState({ editCSVEmail: email, editCSVEmailInUseBool: false });
        }

    };

    handleEditCSVUsername = (event) => {
        let username = event.target.value;
        this.setState({ editCSVUsername: username });
    };

    handleEditCSVFirstName = (event) => {
        let firstName = event.target.value;
        this.setState({ editCSVFirstName: firstName });
    };

    handleEditCSVLastName = (event) => {
        let lastName = event.target.value;
        this.setState({ editCSVLastName: lastName });
    };

    handleEditCSVAddress = (event) => {
        let address = event.target.value;
        this.setState({ editCSVAddress: address });
    };

    handleEditCSVRole = (event) => {
        let role = event.target.value;
        this.setState({ editCSVRole: role });
    };

    addCSVEmployee = () => {
        let csvData = this.state.csvData;

        fetch('/addCSVEmployee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ csvData: csvData }),
        })
        .then(res => res.json())
        .then(
        (result) => {
        let employeeData = this.state.employeeData;
        employeeData = employeeData.concat(result);
        this.setState({
                        employeeData: employeeData,
                        csvDataModalBool: false,
                    });
        })
    };

    closeAddCSVEmployeeModal = () => {
        this.setState({ csvDataModalBool: false });
    };

    clickEditEmployee = (_id, firstName, lastName, role, email, address, username) => {
        this.setState({
            edit_id: _id,
            editFirstName: firstName,
            editLastName: lastName,
            editRole: role,
            editEmail: email,
            clickedEditEmail: email,
            editAddress: address,
            editUsername: username,
            editEmployeeModalBool: true,
        });
    };

    handleEditEmail = (event) => {
        let email = event.target.value;
        let employeeData = this.state.employeeData;
        let editEmail = this.state.editEmail;

        if (employeeData.some(e => e.email === email))
        {
            this.setState({ editEmail: email, editEmailInUseBool: true });
        }
        else
        {
            this.setState({ editEmail: email, editEmailInUseBool: false });
        }
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
        let edit_id = this.state.edit_id;
        let editEmail = this.state.editEmail;
        let editUsername = this.state.editUsername;
        let editFirstName = this.state.editFirstName;
        let editLastName = this.state.editLastName;
        let editAddress = this.state.editAddress;
        let editRole = this.state.editRole;

        fetch('/editEmployee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: edit_id, email: editEmail, username: editUsername, firstName: editFirstName, lastName: editLastName, address: editAddress, role: editRole }),
        })
        .then(res => res.json())
        .then(
        (result) => {
        this.setState({
                        editEmployeeModalBool: false,
                        addEmployeeModalBool: false,
                        errAddingEmployeeBool: false,
                        employeeData: result,
                    });
        })
    };

    closeEditEmployeeModal = () => {
        this.setState({ editEmployeeModalBool: false });
    };

    clickDeleteEmployee = (_id, index) => {
        this.setState({ delete_id: _id, deleteIndex: index, deleteEmployeeModalBool: true })
    };

    confirmDeleteEmployee = () => {
        let delete_id = this.state.delete_id;
        let deleteIndex = this.state.deleteIndex;

        fetch('/deleteEmployee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: delete_id }),
        })
        .then(res => res.json())
        .then(
        (result) => {
        let employeeData = this.state.employeeData;
        employeeData.splice(deleteIndex, 1);
        this.setState({
                        employeeData: employeeData,
                        deleteEmployeeModalBool: false,
                    });
        });
    };

    closeDeleteEmployeeModal = () => {
        this.setState({ deleteEmployeeModalBool: false });
    };

    sendClickedEmployee = (_id) => {
        this.props.sendClickedEmployee(_id);
    };

    render ()
    {

        let employeeData = this.state.employeeData;
        let mapEmployeeData;

        if (employeeData)
        {
            mapEmployeeData = employeeData.map((employee, index) => {
            return (
                <div className='col-md-4'  >
                    <Card style={{ width: '22rem', minHeight: '27.5rem', textAlign: 'center', float: 'center', marginLeft: 'auto', marginRight: 'auto', backgroundColor: 'ghostwhite' }}>
                        <Card.Img variant='top' src='https://imgur.com/8ybKouN.png' style={{ width: '150px', float: 'center', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto', paddingTop: '20px' }} />
                        <Card.Body>
                            <Card.Title><Link onClick={this.sendClickedEmployee.bind(this, employee._id)} exact to={`/${employee._id}`} >{employee.firstName} {employee.lastName}</Link></Card.Title>
                            <Card.Text>
                                <FontAwesomeIcon icon={faUser} /> {employee.role}
                                <br></br>
                                <FontAwesomeIcon icon={faEnvelope} /> {employee.email}
                                <br></br>
                                <FontAwesomeIcon icon={faLocationDot} /> {employee.address}
                                <br></br>
                                <FontAwesomeIcon icon={faSignature} /> {employee.username}
                            </Card.Text>
                            <div style={{ position: 'absolute', bottom: '1%', left: '26.5%' }} >
                                <Button style={{ textDecoration: 'none' }} onClick={this.clickEditEmployee.bind(this, employee._id, employee.firstName, employee.lastName, employee.role, employee.email, employee.address, employee.username)} variant='link'><FontAwesomeIcon icon={faPen} /> Edit</Button><Button onClick={this.clickDeleteEmployee.bind(this, employee._id, index)} style={{ color: 'red', textDecoration: 'none' }} variant='link'><FontAwesomeIcon icon={faTrash} /> Delete</Button>
                            </div>
                        </Card.Body>
                    </Card>
                    <br></br>
                    <br></br>
                </div>
            )
        });
        }

        let addEmployeeModalBool = this.state.addEmployeeModalBool;
        let errAddingEmployeeBool = this.state.errAddingEmployeeBool;
        let errAddingEmployeeData = this.state.errAddingEmployeeData;
        let addEmployeeErrMsg = this.state.addEmployeeErrMsg;

        let addEmployeeModal = (
            <div>
                <Modal show={addEmployeeModalBool} style={{ textAlign: 'center', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} centered animation size='md' >
                    <Modal.Body>
                        <div>
                            <div style={{ fontSize: '2rem' }} >
                                Add An Employee
                            </div>
                            <hr></hr>
                            {
                               errAddingEmployeeBool &&
                               <div>
                                    <div style={{ color: 'red' }} >
                                    {addEmployeeErrMsg}
                                    </div>
                                    <br></br>
                                    <Card style={{ width: '22rem', minHeight: '27.5rem', textAlign: 'center', float: 'center', marginLeft: 'auto', marginRight: 'auto', backgroundColor: 'ghostwhite' }} >
                                        <Card.Img variant='top' src='https://imgur.com/8ybKouN.png' style={{ width: '150px', float: 'center', textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }} />
                                        <Card.Body>
                                            <Card.Title>{errAddingEmployeeData.firstName} {errAddingEmployeeData.lastName}</Card.Title>
                                            <Card.Text>
                                                {errAddingEmployeeData.role}
                                                <br></br>
                                                {errAddingEmployeeData.email}
                                                <br></br>
                                                {errAddingEmployeeData.address}
                                                <br></br>
                                                {errAddingEmployeeData.username}
                                            </Card.Text>
                                            <div style={{ position: 'absolute', bottom: '1%', left: '38.5%' }} >
                                                <Button style={{ textDecoration: 'none' }} onClick={this.clickEditEmployee.bind(this, errAddingEmployeeData._id, errAddingEmployeeData.firstName, errAddingEmployeeData.lastName, errAddingEmployeeData.role, errAddingEmployeeData.email, errAddingEmployeeData.address, errAddingEmployeeData.username)} variant='link'><FontAwesomeIcon icon={faPen} /> Edit</Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                    <hr></hr>
                                    <Button style={{ color: 'black', textDecoration: 'none' }} onClick={this.closeAddEmployeeModal} variant='link'><FontAwesomeIcon icon={faCircleXmark} /> Close</Button>
                                </div>
                            }
                            {
                                !errAddingEmployeeBool &&
                                <div>
                                    <Form>
                                    <Form.Group>
                                        <Form.Control onChange={this.handleEmail} type='text' placeholder='Email Address' style={{ width: '90%', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} />
                                    </Form.Group>
                                    <br></br>
                                    <Form.Group>
                                        <Form.Control onChange={this.handleUsername} type='text' placeholder='Username' style={{ width: '90%', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} />
                                    </Form.Group>
                                    <br></br>
                                    <Form.Group>
                                        <Form.Control onChange={this.handleFirstName} type='text' placeholder='First Name' style={{ width: '90%', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} />
                                    </Form.Group>
                                    <br></br>
                                    <Form.Group>
                                        <Form.Control onChange={this.handleLastName} type='text' placeholder='Last Name' style={{ width: '90%', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} />
                                    </Form.Group>
                                    <br></br>
                                    <Form.Group>
                                        <Form.Control onChange={this.handleAddress} type='text' placeholder='Address' style={{ width: '90%', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} />
                                    </Form.Group>
                                    <br></br>
                                    <Form.Group>
                                        <Form.Control onChange={this.handleRole} type='text' placeholder='Role' style={{ width: '90%', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} />
                                    </Form.Group>
                                    </Form>
                                    <hr></hr>
                                    <Button style={{ color: 'green', textDecoration: 'none' }} onClick={this.clickAddEmployee} variant='link'><FontAwesomeIcon icon={faUserPlus} /> Add Employee</Button>
                                    <Button style={{ color: 'black', textDecoration: 'none' }} onClick={this.closeAddEmployeeModal} variant='link'><FontAwesomeIcon icon={faCircleXmark} /> Close</Button>
                                </div>
                            }
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );

        let csvData = this.state.csvData;
        let csvDataModalBool = this.state.csvDataModalBool;
        let editCSVIndex = this.state.editCSVIndex;
        let editCSVEmailInUseBool = this.state.editCSVEmailInUseBool;

        let mapCSVData = csvData.map((employee, index) => {
            return (
                    <tr>
                        <td>
                            {
                                editCSVIndex === index &&
                                <div>
                                      <Form.Control onChange={this.handleEditCSVFirstName} type='text' defaultValue={employee.firstName} />
                                </div>
                            }
                            {
                                editCSVIndex !== index &&
                                <div>
                                    {employee.firstName}
                                </div>
                            }
                        </td>
                        <td>
                            {
                                editCSVIndex === index &&
                                <div>
                                      <Form.Control type='text' onChange={this.handleEditCSVLastName} defaultValue={employee.lastName} />
                                </div>
                            }
                            {
                                editCSVIndex !== index &&
                                <div>
                                    {employee.lastName}
                                </div>
                            }
                        </td>
                        <td>
                            {
                                editCSVIndex === index &&
                                <div>
                                      <Form.Control type='text' onChange={this.handleEditCSVRole} defaultValue={employee.role} />
                                </div>
                            }
                            {
                                editCSVIndex !== index &&
                                <div>
                                    {employee.role}
                                </div>
                            }
                        </td>
                        <td>
                            {
                                editCSVIndex === index &&
                                <div>
                                      <Form.Control type='text' onChange={this.handleEditCSVEmail} defaultValue={employee.email} />
                                </div>
                            }
                            {
                                editCSVIndex !== index &&
                                <div>
                                    {employee.email}
                                </div>
                            }
                        </td>
                        <td>
                            {
                                editCSVIndex === index &&
                                <div>
                                      <Form.Control type='text' onChange={this.handleEditCSVAddress} defaultValue={employee.address} />
                                </div>
                            }
                            {
                                editCSVIndex !== index &&
                                <div>
                                    {employee.address}
                                </div>
                            }
                        </td>
                        <td>
                            {
                                editCSVIndex === index &&
                                <div>
                                      <Form.Control type='text' onChange={this.handleEditCSVUsername} defaultValue={employee.username} />
                                </div>
                            }
                            {
                                editCSVIndex !== index &&
                                <div>
                                    {employee.username}
                                </div>
                            }
                        </td>
                        <td>
                            {
                               editCSVIndex === index &&
                               <div>
                                    <Button disabled={editCSVEmailInUseBool} style={{ color: 'green', textDecoration: 'none' }} onClick={this.saveCSVRow} variant='link' ><FontAwesomeIcon icon={faCheck} /> Save</Button>
                               </div> 
                            }
                            {
                                editCSVIndex !== index &&
                               <div>
                                    <Button style={{ textDecoration: 'none' }} onClick={this.editCSVRow.bind(this, index, employee.firstName, employee.lastName, employee.role, employee.address, employee.username, employee.email)} variant='link' ><FontAwesomeIcon icon={faPen} /> Edit</Button>
                                    <Button style={{ color: 'red', textDecoration: 'none' }} onClick={this.deleteCSVRow.bind(this, index)} variant='link' ><FontAwesomeIcon icon={faTrash} /> Delete</Button>
                               </div> 
                            }
                        </td>
                    </tr>
            )
        });

        let csvDataModal = (
            <div>
                <Modal show={csvDataModalBool} style={{ textAlign: 'center', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} centered animation size='xl' >
                    <Modal.Body>
                        <div>
                            <div style={{ fontSize: '2rem' }} >
                                Import from CSV File
                            </div>
                            <hr></hr>
                            {
                                editCSVEmailInUseBool &&
                                <div style={{ color: 'red' }} >
                                    The Email You Have Entered In The Edited Row Is Already In Use. Please Use A Different Email.
                                </div>
                            }
                            <Table striped bordered>
                                    <thead>
                                        <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Role</th>
                                        <th>Email Address</th>
                                        <th>Address</th>
                                        <th>Username</th>
                                        <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mapCSVData}
                                    </tbody>
                                </Table>
                                <hr></hr>
                                <Button style={{ textDecoration: 'none', color: 'green' }} onClick={this.addCSVEmployee} variant='link'><FontAwesomeIcon icon={faFileCirclePlus} /> Add Employee(s)</Button>
                                <Button style={{ textDecoration: 'none', color: 'black' }} onClick={this.closeAddCSVEmployeeModal} variant='link'><FontAwesomeIcon icon={faCircleXmark} /> Close</Button>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );

        let editEmployeeModalBool = this.state.editEmployeeModalBool;

        let editFirstName = this.state.editFirstName;
        let editLastName = this.state.editLastName;
        let editRole = this.state.editRole;
        let editAddress = this.state.editAddress;
        let editEmail = this.state.editEmail;
        let editUsername = this.state.editUsername;
        let editEmailInUseBool = this.state.editEmailInUseBool;

        let editEmployeeModal = (
            <div>
                <Modal show={editEmployeeModalBool} style={{ textAlign: 'center', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} centered animation size='md' >
                    <Modal.Body>
                        <div>
                            <div style={{ fontSize: '2rem' }} >
                                Edit An Employee
                            </div>
                            <hr></hr>
                            {
                                editEmailInUseBool &&
                                <div style={{ color: 'red' }} >
                                    The Email You Have Entered Is Already In Use. Please Use A Different Email.
                                </div>
                            }
                                <Form>
                                    <Form.Group>
                                        <Form.Control onChange={this.handleEditEmail} type='text' placeholder='Email' defaultValue={editEmail} style={{ width: '90%', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} />
                                    </Form.Group>
                                    <br></br>
                                    <Form.Group>
                                        <Form.Control onChange={this.handleEditUsername} type='text' placeholder='Username' defaultValue={editUsername} style={{ width: '90%', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} />
                                    </Form.Group>
                                    <br></br>
                                    <Form.Group>
                                        <Form.Control onChange={this.handleEditFirstName} type='text' placeholder='First Name' defaultValue={editFirstName} style={{ width: '90%', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} />
                                    </Form.Group>
                                    <br></br>
                                    <Form.Group>
                                        <Form.Control onChange={this.handleEditLastName} type='text' placeholder='Last Name' defaultValue={editLastName} style={{ width: '90%', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} />
                                    </Form.Group>
                                    <br></br>
                                    <Form.Group>
                                        <Form.Control onChange={this.handleEditAddress} type='text' placeholder='Address' defaultValue={editAddress} style={{ width: '90%', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} />
                                    </Form.Group>
                                    <br></br>
                                    <Form.Group>
                                        <Form.Control onChange={this.handleEditRole} type='text' placeholder='Role' defaultValue={editRole} style={{ width: '90%', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} />
                                    </Form.Group>
                                </Form>
                                <hr></hr>
                                <Button style={{ textDecoration: 'none' }} disabled={editEmailInUseBool} onClick={this.editEmployee} variant='link'><FontAwesomeIcon icon={faPen} /> Edit Employee</Button>
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
                            <Button style={{ textDecoration: 'none', color: 'red' }} onClick={this.confirmDeleteEmployee} variant='link' ><FontAwesomeIcon icon={faTrash} /> Confirm Delete</Button><Button style={{ color: 'black', textDecoration: 'none' }} onClick={this.closeDeleteEmployeeModal} variant='link' ><FontAwesomeIcon icon={faCircleXmark} /> Cancel</Button>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
        

        return (
        <div style={{ textAlign: 'center', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} >
            {addEmployeeModal}
            {csvDataModal}
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
                        <Button onClick={this.openAddEmployeeModal} style={{ fontSize: '1.2rem', textDecoration: 'none' }} variant='link'><b><FontAwesomeIcon icon={faUserPlus} /> Add Employee</b></Button>
                        <br></br>
                        <br></br>
                        <input ref='fileInput' onChange={this.handleCSVInput}  style={{ display: 'none' }} type='file' accept='.csv' />
                        <Button onClick={() => this.refs.fileInput.click()} style={{ fontSize: '1.2rem', textDecoration: 'none' }}  variant='link'><b><FontAwesomeIcon icon={faFileCirclePlus} /> Add From .CSV File</b></Button>
                        <br></br>
                        <br></br>
                        <Button onClick={this.fetchAllEmployees} style={{ fontSize: '1.2rem', textDecoration: 'none' }}  variant='link' ><b><FontAwesomeIcon icon={faRotate} /> Refresh Database</b></Button>
                    </Col>
                    <Col md={10}  >
                        <div style={{ fontSize: '3rem' }} >
                            Badumts GmbH Employee Overview
                            <hr></hr>
                        </div>
                        <br></br>
                        <br></br>
                        <div style={{ height: '82vh', overflowY: 'scroll' }} >
                        <Container style={{ textAlign: 'center', float: 'center', marginLeft: 'auto', marginRight: 'auto' }} >
                            <Row>
                                {mapEmployeeData}
                            </Row>
                        </Container>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
      );
      
    };
};

export default Login;