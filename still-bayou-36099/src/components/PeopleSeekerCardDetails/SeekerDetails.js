
import React, { Component } from 'react';
//import { Redirect } from 'react-router-dom';
import {Card,ListGroup, Container } from 'react-bootstrap';
import axios from 'axios';
import Cookies from "universal-cookie";
import LoadingElement from '../Loader';
import Login1 from '../Login1';
import ConnectForm2 from '../ConnectForm2'
//import bg from '../images/bg1.jpg'

import Footer from '../footer.js';
import { LazyLoadImage } from "react-lazy-load-image-component";
import {Link} from 'react-router-dom';
import '../../style/css/Seeker.css';
import Plans from '../plans.js';
import Requirement from './Requirement';
import ContactPerson from './ContactPerson';
import ResourceSeeker from './ResourceSeeker';
const cookies = new Cookies();


class SeekerDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            resSeeker:{},
            date_of_birth: "",
            email:"",
            name:"",
            phone_number:"",
            profile_pic_url:"",
            registered_region:"",
            loader:true,
            error:false,
            index:null,
            company_name:"",
            active_index:"Contact",
            designation:"",
            active_plan:cookies.get("plan_id"),
            is_subscribed:cookies.get("is_subscribed"),
            is_provider:cookies.is_provider
        }
    }
    componentDidMount() {
      axios.get('https://www.resolabindia.com/api/core/list_seekers_people_all_both/', {
          headers: {
              'Authorization': `Token ${cookies.get("token")}`
          }
      })
          .then((response) => {
              var i;
              var f_id;
              for (i = 0; i < response.data.length; i++) {
                  if (response.data[i].user.id.toString() === this.props.match.params.userId
                    && response.data[i].id.toString() === this.props.match.params.cardId) {
                      f_id = i;console.log("here",response.data[i] )
                      break;
                  }
              }
          this.setState({
              loader:false,
              resSeeker: response.data[f_id],
              date_of_birth: response.data[f_id].user.date_of_birth,
              email: response.data[f_id].user.email,
              name: response.data[f_id].user.name,
              phone_number: response.data[f_id].manager_contact_number,
              profile_pic_url: response.data[f_id].user.profile_pic_url,
              registered_region: response.data[f_id].user.registered_region,
          });
      }, (error) => {
          console.log(error);
          this.setState({
              error:true,
              loader:false
          })
      });
  }


openTab=(evt,tabName)=> {
      // Declare all variables
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

hasAccess =()=>{
  //var offer = true;
  console.log("checking access")
  console.log(cookies.get("is_seeker"))
  console.log(cookies.get("is_provider"))

  if (this.props.match.params.userId.toString()===cookies.get("id") && cookies.get("token"))
  {
      return true;
  }
  else if(cookies.get('staff')=='true')
      return true;
  else if (cookies.get("is_provider")==="false")
  {
      return false;
  }
  else if(cookies.get('is_subscribed')==='false')
      return false;
  else if ((Plans.individual.monthly===cookies.get("plan_id")||Plans.individual.yearly===cookies.get("plan_id")) && cookies.get("token")) {
      return true;
  }
  else{
    return false;
  }
}

    render(){
        console.log("rendering....")
        const cookies = new Cookies();
        if(this.state.loader === true)
        return <LoadingElement/>
        if(this.state.error===true)
        return  <div class="main-title"><Container className="login" fluid><Login1/></Container></div>;
        else if(this.hasAccess() === true){
          return(
            <div class="detail-page-1">
            <div className="detail-page">
            <div className="detail-container" id="page" class="row" style={{paddingLeft:'5%' }}>
              <div className="res-detail-pic col-md-2 shadow-box" style={{backgroundColor:'#9AD9EA'}}>
              <br/>
              <LazyLoadImage
              variant="top"
              src={this.state.resSeeker.user.profile_pic_url}
              style={{ width: "150px", height: "150px", borderRadius:'75px',  overflow: "hidden", border:"2px solid grey"}}
              effect="blur"
              alt="Error image can't be loaded"
              />
              <br/><br/>
              <h5>{this.state.resSeeker.pia_tp_name}</h5>

              <br/><br/>
              </div>

              <div className="res-detail-content col-md-10" style={{padding:'5%', paddingBottom:'0', margin:"auto",marginTop:"0px",paddingTop:"0px"}}>
              {this.props.match.params.userId.toString()!==cookies.get("id")?
              null:
              <div><br/><h4>Your Card</h4>
              </div>}<br/>
              <div class="tab">
              <button class="tablinks active" onClick={(e)=>{this.openTab(e,'res-seeker')}}>Resource Seeker</button>
              <button class="tablinks" onClick={(e)=>{this.openTab(e,'contact-person')}}>Contact Person</button>
              <button class="tablinks" onClick={(e)=>{this.openTab(e,'requirement')}}>Requirement</button>
              </div>
                  <div id="res-seeker" class="tabcontent"  style={{height:"auto", "display":"block"}}>
                  <ResourceSeeker resSeeker={this.state.resSeeker}/>
                  </div>

                  <div id="contact-person" class="tabcontent">
                  <ContactPerson resSeeker={this.state.resSeeker}/>
                  </div>

                  <div id="requirement" class="tabcontent">
                  <Requirement resSeeker={this.state.resSeeker}/>
                  </div>
                </div>
                {this.props.match.params.userId.toString()!==cookies.get("id")?
                <div class="col-md-12"><br/><ConnectForm2 email={this.state.resSeeker.user.email} cardId={this.props.match.params.cardId}
                userId={this.props.match.params.userId}
                name={this.state.resSeeker.user.name}/></div>:null}
              </div>
              </div>
                            <Footer/>
            </div>


          )
        }
        else if(cookies.get("is_provider")==="false"){
          return(<><h1>Seekers are not permitted to view details of other seekers.
            You can only see Provider's Detail Page.
            Go to <Link to={"/available/"+cookies.get("industry")}>Provider's </Link> Page</h1>
            </>)
        }
        else{
           return (<>
                          <h1>You are not allowed to view details.<br/>Go to <Link to="/payment">payment</Link> Page.</h1>
                      </>);
                    }
    }

}
export default SeekerDetails;
