import React from 'react';
//import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import validation from '../images/Resource_Vallidation.png';

import { Card, Image} from 'react-bootstrap';
import signup from '../images/signup.png';
import createcard from '../images/create_card.jpg';
import '../style/css/CardDeckTemplate.css';
function Howitworks1() {


    return (
        <div class="row">
          
                      
    <div class="col-lg aligncenter">
    <Card style={{ height:'300px',width: '240px', backgroundColor:"#ccffdc"}}  className= "shadow-box expand-on-hover">
      <Card.Body className="aligncenter" >
      <Image src={signup} className="step_icon mx-auto" style={{marginBottom:"-50px",marginTop:"-20px", width:"180px",height:"auto"}}/>
    
        <Card.Title className="cardTitle"> 1. Sign Up </Card.Title>
        <Card.Text style={{fontSize:"12px"}}> Easy and smooth registration.</Card.Text>

        <Card.Subtitle><a href="/SignUp" style={{"color":"blue"}}>sign up now.</a></Card.Subtitle>

      </Card.Body>
      </Card>
    
    </div>
    <div class="col-lg aligncenter">
    <Card style={{ height:'300px',width: '240px', backgroundColor:"#ccffdc"}} rounded className= "shadow-box expand-on-hover rounded">
      <Card.Body className="aligncenter">

            <Image src={createcard} className="step_icon mx-auto" style={{marginBottom:"0px",marginTop:"0px", width:"120px",height:"auto"}}/>
            
        <Card.Title className="cardTitle"> 2. Create your card </Card.Title>
        <Card.Text style={{fontSize:"12px"}}> Demonstrate your skills.</Card.Text>

        <Card.Subtitle><a href="/Profile" style={{"color":"blue"}}>create it now.</a></Card.Subtitle>

      </Card.Body>
      </Card>
    
    </div>
    <div  className="col-lg aligncenter" >

    <Card style={{ height:'300px',width: '240px', backgroundColor:"#ccffdc"}} rounded className= "shadow-box expand-on-hover rounded">
    <Card.Body className="aligncenter">

    <Image src={validation} className="step_icon mx-auto" style={{marginBottom:"10px",marginTop:"0px", width:"160px",height:"auto"}}/>
      <Card.Title className="cardTitle"> 3. Make it live </Card.Title>
      <Card.Text style={{fontSize:"12px"}}>Make it available to the market</Card.Text>
      <Card.Subtitle><a href="/People/skilling" style={{"color":"blue"}}>see others card</a></Card.Subtitle>

    </Card.Body>
    </Card>
    </div>

        </div>
    
    )
}

export default Howitworks1

