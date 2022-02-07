import React,{Component} from 'react';
import { Container,Card,Row,ListGroup,Image, Button} from 'react-bootstrap';
import Cookies from "universal-cookie";
import Carousel from 'react-bootstrap/Carousel';
import { LazyLoadImage } from "react-lazy-load-image-component";
import {Link} from 'react-router-dom';
import Login1 from '../Login1';
import Plans from '../plans.js';
import Footer from '../footer.js';
import LoadingElement from '../Loader';
import axios from 'axios'
import ClientServed from './ClientServed';
import ServiceOffered from './ServiceOffered';
import ResourceProvider from './ResourceProvider';

const cookies = new Cookies();
class AlliedProviderDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
          active_index:"about",
          details:{},
          error :false,
          loader:true,
          links:[]
        }
    }
    componentDidMount(){
      axios.get("https://www.resolabindia.com/api/core/list_providers_adalserv/", {

        }).then((response)=>{
          var i; var f_id;
                for (i = 0; i < response.data.length; i++) {
                    if (response.data[i].user.id.toString() === this.props.match.params.userId
                    && response.data[i].id.toString() === this.props.match.params.cardId
                    ) {
                        f_id = i;break;
                    }
                }
            this.setState({
                details:response.data[f_id],
                loader:false,
            })
        }).catch((error)=>{
            console.log(error);
            this.setState({
                error:true
            })
        });

    }



  certificates=()=>{
    return(
                    <Row  >
                    <Carousel cycle ride={true} interval="4000">

                        {
                          this.state.details.pic_urls.split(',').map((image)=>

                          <Carousel.Item>
                          <Image className="service_pics"  src={image} thumbnail style={{marginTop:"20px",padding:"auto"}}/>
                          <a href={image} download="image.jpg"><Button>Download</Button></a>
                          </Carousel.Item>
                          )}
                    </Carousel>
                    </Row>
    )
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

    hasAccess=()=>{
      var object = this.state.details;
      if( this.state.details.user.id.toString()===cookies.get("id") && cookies.get("token"))
      {
        return true;
      }
      else if(cookies.get('staff')=='true')
      return true;
      else if (!cookies.get("is_seeker"))
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
        const cookies = new Cookies();
        var object = this.state.details;
        if(this.state.loader===true)
        {
            return <LoadingElement/>
        }
        else if (this.hasAccess()){
            return(
              <div class="detail-page-1">

              {object.user.id.toString()===cookies.get("id")? <h3><br/>Your Card<br/><br/></h3>
            :null}

              <div className="detail-page">
              <div className="detail-container" id="page" class="row" style={{paddingLeft:'5%' }}>
              <div className="res-detail-pic col-md-2 shadow-box" style={{backgroundColor:'#9AD9EA'}}>

                <h5 style={{marginLeft:"auto",color:"green"}}><u>{object.org_name.toUpperCase()}</u></h5>
                <br/>
                <LazyLoadImage
              variant="top"
              src={this.state.details.user.profile_pic_url}
              style={{ width: "150px", height: "150px", borderRadius:'75px',  overflow: "hidden", border:"2px solid grey"}}
              effect="blur"
              alt="Error image can't be loaded"
              />
              <br/><br/>
              <h5>{this.state.details.user.name}</h5>


                <br/>
                </div>

                <div className="res-detail-content col-md-10" style={{margin:"auto",marginTop:"0px",paddingTop:"0px"}}>
                <div class="tab">
                <button class="tablinks active" onClick={(e)=>{this.openTab(e,'res-provider')}}>Resource Provider</button>
                <button class="tablinks" onClick={(e)=>{this.openTab(e,'res-offered')}}>Service Offered</button>
                <button class="tablinks" onClick={(e)=>{this.openTab(e,'client-served')}}>Client Served</button>
              <button class="tablinks" onClick={(e)=>{this.openTab(e,'certificates')}}>Photographs</button>
              </div>

                    <div id="res-provider" class="tabcontent"  style={{height:"auto", display:"block"}}>
                    <ResourceProvider details={this.state.details}/>
                    </div>

                    <div id="res-offered" class="tabcontent" >
                    <ServiceOffered details= {this.state.details}/>
                    </div>

                    <div id="client-served" class="tabcontent">
                    <ClientServed details={this.state.details} cardId= {this.props.match.params.cardId} />
                    </div>

                    <div id="certificates" class="tabcontent">
                    <this.certificates/>
                    </div>
                  </div>
                </div>

              </div>

              <Footer/>
              </div>
        );
            }

        else if(!cookies.get("token"))
        return  <div class="main-title"><Container className="login" fluid><Login1/></Container></div>;
        else if (cookies.get("is_seeker")==='false'){
          return (<>
            <h1>Providers are not permitted to view details of other providers.
            You can only see Seeker's Detail Page.
            Go to <Link to="/">Home</Link> Page</h1>
        </>)
        }
        else{
          return (<div>
                      <h1>You are not allowed to view details.<br/>Go to <Link to="/payment">payment</Link> Page.</h1>
                  </div>);
      }
    }

}
export default AlliedProviderDetails;
