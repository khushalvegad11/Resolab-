import React, { Component } from 'react';
import LoadingElement from './Loader';
import {Form,Button,Container,Row,Col,Image } from 'react-bootstrap';
import firebase from './firebase/firebase';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from "universal-cookie";
import Profile from "./Profile";
import "../style/css/login.css";
import Footer from './footer'

class Loginform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      login_using_email: true,
      login_using_phone: false,
      phone_number: '',
      password: '',
      userID: null,
      token: '',
      loader: false
    };
  }
  handleEmailChange = event => {
    this.setState({
      email: event.target.value
    });
  };
  handlePhoneChange = event => {
    this.setState({
      phone_number: event.target.value
    })
  }
  changeLoginMethod = event => {
    event.preventDefault()
    if (this.state.login_using_email) {
      this.setState({
        login_using_email: false,
        login_using_phone: true
      })
    }
    else {
      this.setState({
        login_using_email: true,
        login_using_phone: false
      })
    }
  }
  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    });
  };
  loginUsingEmail = (email) => {

    firebase
      .auth()
      .signInWithEmailAndPassword(email, this.state.password)
      .then((response) => {
        firebase.auth().currentUser.getIdToken().then((data) => {
          this.setState({
            // currentUser: true,
            userID: data,
          });
          // console.log("token");
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
              cookies.set("token", response.data.token, {
                path: "/",
              });
              cookies.set("card_made", response.data.user_profile.card_made, {
                path: "/",
              });
              cookies.set("user", response.data.user_profile.user, {
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
              cookies.set("addedparam", response.data.user_profile.addedparam, {
                path: "/",
              });
              cookies.set("industry", response.data.user_profile.industry, {
                path: "/",
              });
              cookies.set("is_seeker", response.data.user_profile.is_seeker, {
                path: "/",
              });
              cookies.set("staff", response.data.user_profile.staff, {
                path: "/",
              });
              cookies.set("is_provider", response.data.user_profile.is_provider, {
                path: "/",
              });

              cookies.set("plan_id", response.data.user_profile.plan_id, {
                path: "/",
              });
              cookies.set("sub_id", response.data.user_profile.sub_id, {
                path: "/",
              });
              // console.log("Cookie is " + cookies.get("token"));
              // console.log("Cookie is " + cookies.get("name"));
              window.location.replace('/profile');
              // console.log(response);
              // alert("Success");
            }, (error) => {
              // console.log(error.response + ". Error occured");
              alert("Could not sign you in. Contact Team if you have already registered!!");
              this.setState({
                loader: false
              })
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
    const is_user_subscribed_api = "https://www.resolabindia.com/api/verification/is-user-subscribed/"
    const cookies = new Cookies();
    axios.get(is_user_subscribed_api, {
      headers: {
        'Authorization': `Token ${cookies.get("token")}`
      }
    })
      .then(res => {
        const is_user_subscribed = res.data;
        const cookies = new Cookies();
        cookies.set("is_user_subscribed", res.data.is_user_subscribed, {
          path: "/",

        });

      })
  }
  getUserByPhoneNumber = (phone_number) => {
    /*
    admin.auth().getUserByPhoneNumber(phone_number)
    .then(
      result=>{
        return result
      }
    )
    .catch(error=>{
      console.log(error)
    })
    */
  }
  handleLogin = (event) => {
    event.preventDefault()
    this.setState({
      loader: true
    })

    if (this.state.login_using_phone) {
      const user = this.getUserByPhoneNumber(this.state.phone_number)
      // console.log(user)

      this.setState({
        //   email:user.email
      }, () => {
        // console.log(user)
      }
      )
      if (user) {
        this.loginUsingEmail(user.email)
      }

      else {
        alert("Can't find user with this phone number. Log in using Email ID.")
        this.setState({
          loader: false
        })
      }
    }

    else if (this.state.email) {
      this.loginUsingEmail(this.state.email)
    }

  };
  handleSubmit(event) {
    event.preventDefault();
  };


  render() {
    if (this.state.loader === true) {
      return (
        <LoadingElement />
      );
    }
    else if (this.state.currentUser === true) {
      return null;
    }
    else {

        return (

            <Container fluid>
            <Row className="vh-100 login-row p-0">
                <Col md="6" className="text-center py-5 d-flex flex-column justify-content-center text-white login-bg">
                    <h1 className="text-reset">Welcome to Resolab</h1>
                    <p className="font-weight-bold text-reset">Enter your personal details in Resolab.</p>
                 </Col>
                 <Col md="6" className="text-center d-flex flex-column py-5 justify-content-center bg-white">
                    <div className="login-container">
                    <div className="login-logo">
                        <Image src="http://www.resolabindia.com/static/media/logo_hd.6620dd1a.png" className="img-fluid" alt="resolabindia"/>
                    </div>
                        <h2>Login</h2>
                    <Form noValidate onSubmit={this.handleSubmit} >

                        <div style={{ "text-align": "left" }}>



                  {
                    this.state.login_using_email ?
                      <Form.Group>
                        <Form.Label >Email ID :
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
                      </Form.Group>
                      :
                      <Form.Group>
                        <Form.Label >Phone Number :
                        </Form.Label>

                        <Form.Control

                          required
                          type="tel"
                          placeholder="Phone Number"
                          value={this.state.phone_number}
                          onChange={this.handlePhoneChange}
                        />
                        <a href="/" onClick={this.changeLoginMethod}>Login using Email.</a>
                        <Form.Control.Feedback type="invalid">
                          Please write correct Email
                        </Form.Control.Feedback>
                      </Form.Group>
                  }





                <Form.Group>
                                <Form.Label >
                                    Password :
                                  </Form.Label>


                  <Form.Control

                    required
                    type="password"
                    placeholder="********"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please write correct Password
                  </Form.Control.Feedback>


                            </Form.Group>

                    </div>

                    <Button
                    className="btn-block login_b1"
                    variant="primary"
                    type="submit"
                    onClick={this.handleLogin.bind(this)}
                    >
                    Login
                    </Button>
                    <pre />
                    <Link to="/rpassword">Forget Password?</Link>
                    <Link to="/signup">Sign Up</Link>
                </Form>
                    </div>
                 </Col>
            </Row>



                </Container>






      );
    }
  }

}

export default Loginform;
