import React,{Component} from 'react';
import {Form,Col,Button,Container} from 'react-bootstrap';
import firebase from './firebase/firebase';
import Footer from './footer';


class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email_id:""
        };
    }
    handleEmailChange=event =>{
        this.setState({
            email_id: event.target.value
        })
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        firebase.auth().sendPasswordResetEmail(this.state.email_id)
        .then(()=>{
            alert("Password reset email sent successfully")
        }).catch((error)=>{
            alert(error);
        })
    }
    render(){
        return(
            <div>
            <div class="main-title">
            <Container className="login" fluid>
                <br/>
                <h2><u>Forgot Password</u></h2>
                <br />
                <Form>
                <br />
                    <Form.Group>
                        <Form.Row>
                            <Form.Label column="lg" lg={3}>
                                Email ID : 
                            </Form.Label>
                            <Col>
                            <Form.Control
                            required
                            type="email"
                            placeholder="Email ID"
                            value={this.state.email_id}
                            onChange={this.handleEmailChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please write correct email id
                            </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                    </Form.Group>
                    <Button
                    variant="primary"  
                    type="submit"
                    onClick={this.handleSubmit.bind(this)}
                    >
                    Submit
                    </Button>
                </Form>
            </Container></div>
            <Footer />
            </div>
        );
    }
}
 export default ResetPassword;