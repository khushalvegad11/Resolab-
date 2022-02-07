import React,{Component} from 'react';
import {Card,ListGroup} from 'react-bootstrap';
import Cookies from "universal-cookie";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {Link} from 'react-router-dom'
import Plans from '../plans.js';
//import Carousel from 'react-bootstrap/Carousel';
import Footer from '../footer.js';

const cookies = new Cookies();
class AlliedSeekerDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            active_index:"about"
        }
    }
    componentDidMount(){
       
    }

  about=()=>{
  var object = this.props.location.state.cObject;
  console.log(this.props);
    return(
      <Card style={{ width: '100%' }}>
      <Card.Body>
          <Card.Header as="h4">{object.user.name}</Card.Header>
          <ListGroup variant="flush">
              <ListGroup.Item>Phone Number: {object.user.phone_number}</ListGroup.Item>
              <ListGroup.Item>Email: {object.user.email} </ListGroup.Item>
              <ListGroup.Item>Date of Birth: {object.user.date_of_birth} </ListGroup.Item>
              <ListGroup.Item>Registered Region: {object.user.registered_region} </ListGroup.Item>
              <ListGroup.Item>Designation: {object.contact_designation}</ListGroup.Item>
          </ListGroup>
      </Card.Body>
      </Card>
    )
  }

  requirements=()=>{
  var object = this.props.location.state.cObject;
    return(
      <Card style={{ width: '100%' }}>
      <Card.Body>
          <Card.Header as="h4">Services Required</Card.Header>
          <ListGroup variant="flush">
              {/*<ListGroup.Item>Job Category: {object.job.category.category_name}</ListGroup.Item>*/}
              <ListGroup.Item>Job Name: {object.job}</ListGroup.Item>
              <ListGroup.Item>PIA/TP Name: {object.pia_tp_name}</ListGroup.Item>
              <ListGroup.Item>Project: {object.project}</ListGroup.Item>
              <ListGroup.Item>Project Location: {object.project_location}</ListGroup.Item>
          </ListGroup>
      </Card.Body>
      </Card>
    )
  }
  contact=()=>{
  var object = this.props.location.state.cObject;
    return(
      <Card style={{ width: '100%' }}>
      <Card.Body>
          <Card.Header as="h4">Manager Details</Card.Header>
          <ListGroup variant="flush">
              <ListGroup.Item>Name: {object.user.name}</ListGroup.Item>
              <ListGroup.Item>Phone Number: {object.user.phone_number}</ListGroup.Item>
              <ListGroup.Item>EmailID: {object.user.email}</ListGroup.Item>
              <ListGroup.Item>Designation: {object.manager_designation}</ListGroup.Item>
          </ListGroup>
      </Card.Body>
      </Card>
    )
  }
  openTab=(evt,tabName)=> {
      // Declare all variables
    //  console.log("openTab "+tabName);
      evt.preventDefault();
      var i, tabcontent, tablinks;

      // Get all elements with class="tabcontent" and hide them
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
      }

      // Get all elements with class="tablinks" and remove the class "active"
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
      }

      // Show the current tab, and add an "active" class to the button that opened the tab
      document.getElementById(tabName).style.display = "block";
      evt.currentTarget.className += " active";
  }

  hasAccess=()=>{
    var object = this.props.location.state.cObject;
    console.log(object.user.id)
    if( object.user.id.toString()===cookies.get("id") && cookies.get("token"))
    {
      return true;
    }
    else if(cookies.get('staff')=='true')
      return true;
    else if (cookies.get("is_provider")==="false")
    {
        return false;
    }
    else if(cookies.get('is_subscribed')==="false")
        return false;
    else if (cookies.get("token") && (Plans.institution.monthly===cookies.get("plan_id")||Plans.institution.yearly===cookies.get("plan_id"))) {
        return true;
    }
    else{
      return false;
    }
  }
    render(){
        //const cookies = new Cookies();
        //var isoffer=true;
        var object = this.props.location.state.cObject;
        console.log(object);
        if (this.hasAccess())
        {
            return(
              <div class="detail-page-1">

              {object.user.id.toString()===cookies.get("id")? <h3><br/>Your Card<br/><br/></h3>
            :null}

              <div className="detail-page">
                  
              <div className="detail-container">
                <div className="res-detail-pic">

                <h3 style={{marginLeft:"auto",color:"green"}}><u>{object.contact_name.toUpperCase()}</u></h3>
                <br/>
                <LazyLoadImage
                variant="top"
                src={this.state.profile_pic_url}
                style={{ width: "300px", height: "auto" }}
                effect="blur"
                alt="Error image can't be loaded"
                />
                <br/>
                </div>

                <div className="res-detail-content" style={{margin:"auto",marginTop:"0px",paddingTop:"0px"}}>
                <div class="tab">
                <button class="active tablinks" id="defaultOpen" onClick={(e)=>{this.openTab(e,'res-seeker')}}>Resource Seeker</button>
                <button class="tablinks" onClick={(e)=>{this.openTab(e,'requirements')}}>Requirement</button>
                <button class="tablinks" onClick={(e)=>{this.openTab(e,'contact')}}>Contact</button>
                </div>
                    <div id="res-seeker" class="tabcontent"  style={{height:"auto", display:"block"}}>
                    <this.about/>
                    </div>

                    <div id="requirements" class="tabcontent">
                    <this.requirements/>
                    </div>

                    <div id="contact" class="tabcontent">
                    <this.contact/>
                    </div>

                  </div>
                </div>

              </div>

              <Footer/>
              </div>
                    );
        }
        else{
            return (<>
                        <h1>You are not allowed to view details.<br/>Go to <Link to="/payment">payment</Link> Page.</h1>
                    </>);
        }
    }

}
export default AlliedSeekerDetails;
