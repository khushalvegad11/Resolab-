import React, { Component } from 'react';
import LoadingElement from './Loader';
import Footer from './footer';
import { Form, Col, Button, Container,Row } from 'react-bootstrap';
import firebase from './firebase/firebase';
import axios from 'axios';
import Cookies from "universal-cookie";

import "../style/css/contact.css";

class ContactPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            full_name: '',
            email: '',
            phone_number:'',
            message: '',
            userID: null,
            token: '',
            loader: false
        };
    }
    handleFull_nameNameChange = event => {
        this.setState({
            full_name: event.target.value
        });
    };

    handlePhoneNumberChange = event => {
        this.setState({
            phone_number: event.target.value
        });
    };
    handleEmailChange = event => {
        this.setState({
            email: event.target.value
        });
    };
    handleMessageChange = event => {
        this.setState({
            message: event.target.value
        });
    };
    handleSubmit = () => {
        this.setState({
            loader: true
        })
        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((response) => {
                console.log(response);
                firebase.auth().currentUser.getIdToken().then((data) => {
                    this.setState({
                        // currentUser: true,
                        userID: data,
                    });
                    console.log("token");
                    console.log(data);
                    // alert("Login Successful " + this.state.userID);
                    axios.post('https://www.resolabindia.com/api/core/login/', {
                        id_token: data,
                    })
                        .then((response) => {
                            this.setState({
                                currentUser: true,
                                token: response.data.token,
                                loader: false
                            })
                            const cookies = new Cookies();
                            console.log(response.data);
                            console.log(response.data.token);
                            cookies.set("token", response.data.token, {
                                path: "/",
                            });
                            cookies.set("name", response.data.user_profile.name, {
                                path: "/",
                            });
                            cookies.set("phone_number", response.data.user_profile.phone_number, {
                                path: "/",
                            });
                            cookies.set("picture", response.data.user_profile.profile_pic_url, {
                                path: "/",
                            });
                            cookies.set("email", response.data.user_profile.email, {
                                path: "/",
                            });
                            cookies.set("is_subscribed", response.data.user_profile.is_subscribed, {
                                path: "/",
                            });
                            cookies.set("is_verified", response.data.user_profile.is_verified, {
                                path: "/",
                            });
                            cookies.set("id", response.data.user_profile.id, {
                                path: "/",
                            });
                            window.location.replace('/Profile');
                            // console.log(response);
                            // alert("Success");
                        }, (error) => {
                            this.setState({
                                loader: false
                            })
                            console.log(error.response + ". Contact Team if you have already registered!!");
                            alert(error.response.data.non_field_errors[0]);
                        });
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    loader: false
                })
                alert(error.message);
            });
    };


    render() {
        if (this.state.loader === true) {
            return (
                <LoadingElement />
            );
        }

        else {
            return (
                <div >

                    <div className="contact_d2">
                        <Container fluid style={{ "padding-top": "80px" }}>

                        <Row>
                            <Col column="lg" lg={1}>
                            </Col>
                            <Col column="lg" lg={5}>
                                <div className="contact1 ">
                                    <br />
                                    <h1 style={{ "text-align": "center" }}>Contact Us</h1>
                                    <br />
                                    <div className="contact1_1">
                                        <h4>Contact</h4>
                                        <h6>‎+91 79 4100 5625</h6>
                                    </div>
                                    <div className="contact1_1">
                                        <h4>Email</h4>
                                        <h6>support@enliven-solutions.com</h6>
                                    </div>
                                    <div className="contact1_1">
                                        <h4>Address</h4>
                                        <h6>D-706 , Titanium City Center 100 ft. Road , Anandnagar , Satellite , Ahmedabad-380015</h6>
                                    </div>
                                </div >
                            </Col>
                            <Col column="lg" lg={6}>

								<div class="contact2" >


                                <Form className="contact_c1" noValidate onSubmit={this.handleSubmit}>
                                    <br />
                                    <Form.Group>
                                        <Form.Row>
                                                <Form.Label >
                                                    Your Name
                                                </Form.Label>
                                                <Form.Control

                                                    required
                                                    type="text"
                                                    placeholder="Full Name"
                                                    value={this.state.full_name}
                                                    onChange={this.handleFull_nameNameChange}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please write correct Full Name
                                            </Form.Control.Feedback>

                                        </Form.Row>
                                        <br />
                                        <Form.Row>
                                                <Form.Label >
                                                    Phone Number
                                                </Form.Label>
                                                <Form.Control

                                                    required
                                                    type="text"
                                                    placeholder="Phone Number"
                                                    value={this.state.phone_number}
                                                    onChange={this.handlePhoneNumberChange}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please write correct Email
                                        </Form.Control.Feedback>

                                        </Form.Row>
                                        <br />
                                        <Form.Row>
                                                <Form.Label >
                                                    Email
                                                </Form.Label>
                                                <Form.Control

                                                    required
                                                    type="email"
                                                    placeholder="Email ID"
                                                    value={this.state.email}
                                                    onChange={this.handleEmailChange}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please write correct Email
                                        </Form.Control.Feedback>

                                        </Form.Row>
                                        <br />
                                        <Form.Row>
                                                <Form.Label >
                                                    Feedback/Query
                                                </Form.Label>
                                                <Form.Control

                                                    required
                                                    as="textarea"
                                                    rows="4"
                                                    placeholder="Message*"
                                                    value={this.state.message}
                                                    onChange={this.handleMessageChange}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please write correct Message
                                        </Form.Control.Feedback>

                                        </Form.Row>
                                        <br />
                                    </Form.Group>
                                    <Button
                                            style={{ width:"50%"}}
                                        variant="primary"
                                        type="submit"
                                        onClick={this.handleSubmit.bind(this)}
                                    >
                                        Submit
                                </Button>
                                </Form>

                                </div>
                            </Col>
                         </Row>
                        </Container>
                    </div>

                    <Footer />
                </div >
            );

        }
    }

}

export default ContactPage;
