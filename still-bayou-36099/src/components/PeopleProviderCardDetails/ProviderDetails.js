import React, { Component } from 'react';
import Form from '../People_doc_form'
import {Card,ListGroup,Container, Button, Carousel, Image} from 'react-bootstrap';
import axios from 'axios';
import Cookies from "universal-cookie";
import LoadingElement from '../Loader';
import ConnectForm from '../ConnectForm'
import { Link} from 'react-router-dom'
import { LazyLoadImage } from "react-lazy-load-image-component";
import Login1 from '../Login1';

import Footer from '../footer.js';
import Plans from '../plans.js';

import '../../style/css/ResourceDetails.css';
import ResourcePovider from './ResourcePovider';
import WorkEx from './WorkEx';
import Skills from './Skills';
import Documents from './Documents';

const cookies = new Cookies();


class ProviderDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            seeker_cards:[],
            date_of_birth: "",
            email:"",
            name:"",
            phone_number:"",
            profile_pic_url:"",
            registered_region:"",
            loader:true,
            error:false,
            active_index:"about",
            provider_result: {},
            total_provider: {},
            pdata:true
        }
    }
    componentDidMount() {
      axios.get(`https://www.resolabindia.com/api/core/get_provider_people/${this.props.match.params.cardId}`, {
        headers: {
            'Authorization': `Token ${cookies.get("token")}`
        }
    })
    .then((response) => {
            this.setState({
              provider_result: response.data,
              total_provider: response.data,
              pdata:true,
              loader:false
            })

      }, (error) => {
          console.log(error);
          this.setState({
              pdata: false,
              error:true,
              loader:false
          })
      });
      axios.get("https://www.resolabindia.com/api/core/list_seekers_people_all_both/", {
        headers: {
            'Authorization': `Token ${cookies.get("token")}`
        }
    })
          .then((response) => {
            var i;
                for (i = 0; i < response.data.length; i++) {
                    if (response.data[i].user.id.toString() === cookies.get('id')) {
                        this.setState({
                          seeker_cards:this.state.seeker_cards.concat(response.data[i])
                        })
                    }
                }
      }, (error) => {
          console.log(error);
          this.setState({
              pdata: false,
              error:true
          })
      });
  }

    hasAccess=()=>{
      if(this.state.provider_result.user.id.toString()===cookies.get("id") && cookies.get("token")){
        return true;
      }
      else if(cookies.get('staff')=='true')
      return true;
      else if (cookies.get("is_seeker")==="false")
      {
          return false;
      }
      else if(cookies.get('is_subscribed')==='false')
      return false;
      else if ((Plans.institution.monthly===cookies.get("plan_id")||Plans.institution.yearly===cookies.get("plan_id")) && cookies.get("token")) {
          return true;
      }
      else{
        return false;
      }
    }

    openTab=(evt,tabName)=> {
        console.log("openTab "+tabName);
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

        console.log("evt target "+evt.currentTarget.className)
        evt.currentTarget.className += " active";
    }

    render(){
        const cookies = new Cookies();
        if(this.state.loader === true)
        return <LoadingElement/>
        if (this.state.error === true)
        return  <div class="main-title"><Container className="login" fluid><Login1/></Container></div>;

        else if (this.hasAccess()){
          return(
            <div class="detail-page-1" onLoad={this.resProvider}>
            <div className="detail-page" id="page">
            {this.state.provider_result.user.id.toString()!==cookies.get("id")?
      null:
      <h4><br/>YOUR CARD</h4>}
      <div className="detail-container" class="row" style={{paddingLeft:'5%' }}>
      <div className="res-detail-pic col-md-3 col-lg-2 shadow-box" style={{backgroundColor:'#9AD9EA'}}>
      <LazyLoadImage
      variant="top"
      src={this.state.provider_result.user.profile_pic_url}
      style={{ width: "120px", height: "120px", borderRadius:'60px',  overflow: "hidden", border:"2px solid grey"}}
      effect="blur"
      alt="Error image can't be loaded"
      /><br/><br/>
      <h6><b>{this.state.provider_result.user.name.toUpperCase()}</b></h6>
      <p>{this.state.provider_result.job} || {this.state.provider_result.educational_qualification} </p>

      </div>

      <div className="res-detail-content col-md-9 col-lg-10" style={{margin:"auto",marginTop:"0px",paddingTop:"0px"}}>
      <br/>

      <div class="tab">
    <button class="tablinks active" onClick={(e)=>{this.openTab(e,'res-provider')}}>Resource Provider</button>
    <button class="tablinks" onClick={(e)=>{this.openTab(e,'work-exp')}}>Work-Experience</button>
    <button class="tablinks" onClick={(e)=>{this.openTab(e,'skills')}}>Skill Set</button>
    <button class="tablinks" onClick={(e)=>{this.openTab(e,'Certificates')}}>Documents</button>
  </div>
        <div id="res-provider" class="tabcontent"  style={{height:"auto" , display:"block"}}>
        <ResourcePovider state={this.state.provider_result}/>
        </div>

        <div id="work-exp" class="tabcontent">
          <WorkEx state={this.state.provider_result}/>
        </div>

        <div id="skills" class="tabcontent">
          <Skills  details={this.state.provider_result}/>
        </div>

        <div id="Certificates" class="tabcontent">
        <Documents    object = {this.state.provider_result}/>
        </div>
      </div>

      {this.state.seeker_cards.length && this.state.provider_result.user.id.toString()!==cookies.get("id")?
      <div class="col-md-12"><br/><ConnectForm seeker_cards={this.state.seeker_cards} email={this.state.provider_result.user.email}
      name={this.state.provider_result.user.name}/></div>:null}

    </div>

    </div>
                  <Footer/>
            </div>
          )
        }

        else if (!cookies.get("token")){
          return  <div class="main-title"><Container className="login" fluid><Login1/></Container></div>;
        }
        else if (cookies.get("is_seeker")==="false"){
          return (<>
            <h1>Providers are not permitted to view details of other providers.
            You can only see Seeker's Detail Page.
            Go to <Link to={"/required/"+cookies.get("industry")}>Seeker's</Link> Page</h1>
        </>)
        }
        else
        {
            return (<>{console.log(cookies)}
                        <h1>You are not allowed to view details.<br/>Go to <Link to="/payment">payment</Link> Page.</h1>
                    </>);
        }
    }

}
export default ProviderDetails;
