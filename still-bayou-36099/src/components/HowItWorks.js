import React, { Component } from 'react';
//import LoadingElement from './Loader';
//import Footer from './footer';
import { Col,Card, Row, Image} from 'react-bootstrap';
//import firebase from './firebase/firebase';
//import axios from 'axios';
//import { Link } from 'react-router-dom';
//import Cookies from "universal-cookie";
import "../style/css/HowItWorks.css";
//import howitworks1 from '../images/how-it-works-1.png';
import createaccount from '../images/create-account.webp';
import signup from '../images/signup.png';
import createcard from '../images/create_card.jpg';
//import { bottom } from '@popperjs/core';
import createresource from '../images/Create_Resource_Card.jpg';
import subscription from '../images/Enable_Subscription.jpg';
import validation from '../images/Resource_Vallidation.png';


class HowItWorks extends Component {

  oldContent = () =>{
    return(
      <div>
          <div className="container">
              <Row className="raw">
                  <Col className="text_left" column="lg" lg={6}>
                      <h1>Create Account / Login</h1>
                      <p>Individual working for any PIA or Training partner (Mobilizer to Project Head), Food Vendor to Infra Provider can create account as Resource Provider. </p>
                      <br />
                      <p>PIA /Training Partner can create account as resource seeker as they need resources (people & other services) for implementation of project.</p>
                      <br />
                      <p>Employer who wishes to hire skilled manpower can register as resource seeker and hire skilled manpower in bulk. </p>
                      <br />

                      <a href="/signup" class=" btn htw_btn">My Account</a>
                  </Col>
                  <Col column="lg" lg={6}>
                      <Image src={createaccount} style={{ height: '90%', width: "80%" }} />
                  </Col>
              </Row>
          </div>
          <div style={{ "background-color": "#fafafa " }}>
          <div className="container">
              <Row className="raw" >
                  <Col column="lg" lg={6}>
                      <Image src={createresource} style={{ height: '90%', width: "80%" }} />
                  </Col>
                  <Col className="text_right" column="lg" lg={6}>
                      <h1>Create Resource Card</h1>
                      <p>Resource card is showing details of the resource available or required. One can select or identify resources he or she wanted to access by simply clicking on details of card.</p>
                      <br />
                      <p>By creating REOSURCE CARD, user is entitled for business subscription without any cost.</p>
                      <br />
                      <br />

                      <a href="/signup" class=" btn htw_btn">Create Card</a>
                  </Col>

                  </Row>
              </div>
          </div>
          <div className="container">
              <Row className="raw">
                  <Col className="text_left" column="lg" lg={6}>
                      <h1>Resource Validation</h1>
                      <p>Back end team of resource lab can verify and validate information provided by user and other sources.</p>
                      <br />
                      <p>In case of requirement supporting document may be collected from user depending upon what resources he or she is offering or searching.</p>
                      <br />
                      <p>For example: Salary slip, TOT certificate, Trade License, Property Ownership etc.</p>
                      <br />

                      <a href="/login" class=" btn htw_btn">Verify</a>
                  </Col>
                  <Col column="lg" lg={6}>
                      <Image src={validation} style={{ height: '90%', width: "80%" }} />
                  </Col>
              </Row>
          </div>
          <div style={{ "background-color": "#fafafa " }}>
          <div className="container" >
              <Row className="raw" >
                  <Col column="lg" lg={6}>
                      <Image src={subscription} style={{ height: '90%', width: "80%" }} />
                  </Col>
                  <Col className="text_right" column="lg" lg={6}>
                      <h1>Enable Subscription </h1>
                      <p>After Verification /validation business subscription will be enabled for all users.</p>
                      <br />
                      <p>User can choose standard subscription plan to get more information and details. </p>
                      <br />

                      <a href="/signup" class=" btn htw_btn">Subscribe Now</a>
                  </Col>

              </Row >
           </div>
          </div>
      </div>
    )
  }
  //<a href='https://www.freepik.com/vectors/background'>Background vector created by freepik - www.freepik.com</a>

  getContent = () =>{
    return(
      <div className = "container htw_content" stye={{margin:"auto"}}>

      <Card style={{ height:'250px',width: '230px',margin:"auto",marginBottom:'20px'}} rounded className= "shadow-box expand-on-hover rounded">
      <Card.Body className="aligncenter" style={{backgroundColor:"white",margin:"auto",padding:"auto"}}>
      <Image src={signup} className="step_icon mx-auto" style={{marginBottom:"-50px",marginTop:"-20px", width:"180px",height:"auto"}}/>
    
        <Card.Title className="cardTitle"> 1. Sign Up </Card.Title>
        <Card.Text style={{fontSize:"12px"}}> Easy and smooth registration.</Card.Text>

        <Card.Subtitle><a href="/SignUp" style={{"color":"blue"}}>sign up now.</a></Card.Subtitle>

      </Card.Body>
      </Card>
      <Card style={{ height:'250px',width: '230px',margin:"auto",marginBottom:'20px'}} rounded className= "shadow-box expand-on-hover rounded">
      <Card.Body className="aligncenter" style={{backgroundColor:"white",margin:"auto",padding:"auto"}}>

            <Image src={createcard} className="step_icon mx-auto" style={{marginBottom:"0px",marginTop:"0px", width:"120px",height:"auto"}}/>
            
        <Card.Title className="cardTitle"> 2. Demo skills </Card.Title>
        <Card.Text style={{fontSize:"12px"}}> Create your resource card.</Card.Text>

        <Card.Subtitle><a href="/Profile" style={{"color":"blue"}}>create it now.</a></Card.Subtitle>

      </Card.Body>
      </Card>


      <Card style={{ height:'250px',width: '230px',margin:"auto",marginBottom:'20px'}} rounded className= "shadow-box expand-on-hover rounded">
      <Card.Body className="aligncenter" style={{backgroundColor:"white",margin:"auto",padding:"auto"}}>

      <Image src={validation} className="step_icon mx-auto" style={{marginBottom:"10px",marginTop:"auto", width:"160px",height:"auto"}}/>
        <Card.Title className="cardTitle"> 3. Live ResoCard </Card.Title>
        <Card.Text style={{fontSize:"12px"}}>We will make your card live.</Card.Text>
        <Card.Subtitle><a href="/People/skilling" style={{"color":"blue"}}>see others card</a></Card.Subtitle>

      </Card.Body>
      </Card>
      </div>
    )
  }
    render() {

            return (
                <div>
                    <h4 class="text-light d-none d-lg-block">Get started with three easy steps.</h4>
                    <h5 class="text-light d-lg-none"><br/>Get started with three easy steps.</h5>
                    <br/>
                    <div>
                    <this.getContent/>
                    <br/>
                    </div>
                </div >
            );


    }

}

export default HowItWorks;
