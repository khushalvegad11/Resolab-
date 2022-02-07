import React,{Component} from 'react';
import LoadingElement from './Loader';
import {Form,Col,Row,Button,Container,Image} from 'react-bootstrap';
import firebase from './firebase/firebase';
import DetailForm from './Details';
import "../style/css/signup.css";
import Footer from './footer'
import one from './one.jpg'

class SignUpForm extends Component{
    constructor(props){
        super(props);
        this.state={
            sendOTP:false,
            phone_number:"",
            currentUser:false,
            otp:"",
            isButtonDisabled:false,
            loader:false
        };
    }
    componentDidMount() {
        // this.countdown();
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
            "sign-in-button", {
                size: "invisible",
                callback: response => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                    // ...
                    // this.setState({
                    //     isButtonDisabled: false
                    // });
                },
                "expired-callback": response => {
                    // Response expired. Ask user to solve reCAPTCHA again.
                    // ...
                    // this.setState({
                    //     isButtonDisabled: true
                    // });
                    alert("Recaptcha Expired, Please try again");
                }
            }
        );
        window.recaptchaVerifier.render().then(function (widgetId) {
            window.recaptchaWidgetId = widgetId;
        });
    }

    handlePhoneChange = event => {
        this.setState({
            phone_number: event.target.value
        });
    };
    handleOTPChange = event => {
        this.setState({
            otp: event.target.value
        });
    };
    handleLogin = () => {
        document.getElementById("wait").textContent = "Please wait for OTP.....";
        let appVerifier = window.recaptchaVerifier;
        console.log(appVerifier);
        firebase
        .auth()
        .signInWithPhoneNumber("+91"+this.state.phone_number, appVerifier)
        .then(confirmationResult => {
            this.setState({
                loader:false,
                sendOTP: true
            });

            window.confirmationResult = confirmationResult;
        })
        .catch(err => {
            this.setState({
                loader:false
            })

            console.log(err);
            alert(err.message);
        });
    };

    handleOTPCheck = () => {
        this.setState({
            loader:true
        })
        window.confirmationResult
            .confirm(this.state.otp)
            .then(result=>{
                // User signed in successfully.
                this.setState({
                    currentUser:true,
                    loader:false
                })
                console.log("Sign in Successful");

            })
            .catch(err => {
                this.setState({
                    loader:false,
                    sendOTP:false
                })
                // User couldn't sign in (bad verification code?)
                console.log(err);
                alert("Enter correct OTP!");
            });
    };
    handleSubmit(event) {
        event.preventDefault();
    };

    render(){
    if(this.state.loader === true)
    {
        return (
            <LoadingElement />
        );
    }
    else if (this.state.currentUser===true)
    {
        return(
            <DetailForm phone_number={this.state.phone_number} />
        );
    }
    else if (this.state.sendOTP === false)
    {

        return (

            
            <Container fluid>
            <Row className="vh-100 login-row row p-0">
                <Col md="6" className="text-center py-5 d-flex flex-column justify-content-center text-white login-bg">
                    <h1 className="text-reset">Welcome to Resolab</h1>
                    <p className="font-weight-bold text-reset">Enter your personal details and Resolab.</p>
                 </Col>
                 <Col md="6" className="d-flex flex-column py-5 justify-content-center bg-white">
                    <div className="login-container">
                        <div className="login-logo text-center">
                        <Image src="http://www.resolabindia.com/static/media/logo_hd.6620dd1a.png" className="img-fluid" alt="resolabindia"/>
                        </div>
                    <h2 className="text-center">Register</h2>
                    <p id="wait" style={{color:"blue",fontWeight:"bold"}}></p>
                    <Form className="text-left" noValidate onSubmit={this.handleSubmit}>
                    
                    <Form.Group>
                        

                            <Form.Label class="required" >
                                Mobile Number :
                            </Form.Label>

                            <Form.Control
                            required
                            type="tel"
                            placeholder="Mobile Number"
                            value={this.state.phone_number}
                            onChange={this.handlePhoneChange}
                            pattern="[0-9]{10}"
                            />
                            <Form.Control.Feedback type="invalid">
                                Please write correct phone number
                            </Form.Control.Feedback>

                        
                        
                    </Form.Group>
                    <Button
                        className="signup_b1 btn-block w-100"
                    id="sign-in-button"
                    variant="primary"
                    type="submit"
                    onClick={this.handleLogin.bind(this)}
                    disabled={this.state.isButtonDisabled}
                    >
                    Verify
                    </Button>
                    
                    <small className="mt-3 d-block text-center">
                         By tapping Verify, an SMS may be sent. Message &amp; data rates may apply.
                    </small>
                </Form>            
                   </div>
                 </Col>
                
                
                
              
                
                </Row>
                </Container>
                
        );
    }
    else {
        return (
                
                <Container fluid>
                    <Row className="vh-100 login-row p-0">
                        <Col md="6" className="h-100 text-center py-5 d-flex flex-column justify-content-center text-white login-bg">
                            <h1 className="text-reset">Welcome to Resolab</h1>
                            <p className="font-weight-bold text-reset">Enter your personal details and Resolab.</p>
                        </Col>
                        <Col md="6" className="h-100 d-flex flex-column py-5 justify-content-center bg-white">
                            <div className="login-container">
                                <div className="login-logo text-center">
                                    <Image src="http://www.resolabindia.com/static/media/logo_hd.6620dd1a.png" className="img-fluid" alt="resolabindia"/>
                                </div>
                                 <h2 className="text-center">Verification</h2>
                                 <Form className="text-left" noValidate onSubmit={this.handleSubmit}>
                                   
                                    <Form.Group>
                                         

                                            <Form.Label class="required">
                                                Enter OTP :
                                            </Form.Label>

                                            <Form.Control
                                            required
                                            value={this.state.otp}
                                            placeholder="Enter OTP"
                                            onChange={this.handleOTPChange}
                                            type="text"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please write 6 digit number
                                            </Form.Control.Feedback>

                                       
                                       
                                    </Form.Group>
                                     <Button
                                         className="signup_b1 btn-block w-100"
                                    onClick={this.handleOTPCheck.bind(this)}
                                    type="submit"
                                    disabled={this.state.isButtonDisabled}
                                    >
                                        Continue
                                    </Button>
                                </Form>
                            </div>  
                        </Col>
                    </Row>
                </Container>
           
        );
    }
    }

}

export default SignUpForm;
