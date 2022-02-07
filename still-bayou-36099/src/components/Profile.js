import React,{Component} from 'react';
import {Col,Row,Card,Badge} from 'react-bootstrap';
import {FaSuitcase} from 'react-icons/fa';
import two from './two.jpg'
import {FcSearch} from 'react-icons/fc';
import {Link,Redirect } from 'react-router-dom';
import Cookies from "universal-cookie";
import {BsPeopleFill} from 'react-icons/bs';
import {FcServices} from 'react-icons/fc';
import Footer from './footer';
import axios from 'axios';
import Update_DP from './Update_DP'
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";


import LoadingElement from './Loader';
import UpdateProfile from './UpdateProfile';
import Homepage from './Homepage';
import { Button } from 'react-bootstrap';
const cookies = new Cookies();


class Profile extends Component{
    constructor(props){
        super(props);
        this.state={
          name: cookies.get("name"),
          img: cookies.get("picture"),
          email: cookies.get("email"),
          phone: cookies.get("phone_number"),
          is_verified: cookies.get("is_verified"),
          is_subscribed: cookies.get("is_subscribed"),
          industry:cookies.get('industry'),
          is_seeker:cookies.get("is_seeker"),
          is_provider: cookies.get('is_provider'),
          staff: cookies.get('staff'),
          loader:false,
          error:false,
          plan_id:"",
          error_in_profile_update:false,

        }
    }
    componentDidMount(){

      const cookies = new Cookies();
      axios.get(`https://www.resolabindia.com/api/core/get_user_profile/${cookies.get('id')}/`, {
          headers: {
              'Authorization': `Token ${cookies.get("token")}`
          }
      }).then((res) => {
          this.setState({
              img: res.data.profile_pic_url,
              name: res.data.name,
              email: res.data.email,
              phone: res.data.phone_number,
              is_verified: res.data.is_verified,
              is_subscribed: res.data.is_subscribed,
              industry:res.data.industry,
          })
      }).catch((err) => {
          this.setState({
              loader: false,
              //error: true
          })
      })
  }


    //cancel subscription
    cancelSubs = event =>{
      this.setState({
        loader:true
      })
      axios.post('https://www.resolabindia.com/api/core/unsubscribe/',{},{
          headers: {
            'Authorization': `Token ${cookies.get("token")}`
          }
      }).then((res)=>{
        this.setState({
          loader:false
        })
        window.location.replace('/Profile');
      }).catch((err)=>{
          alert("Cancelling Failed!");
          this.setState({
            loader: false
          })
      })
    };

    showCategory=()=>{
      console.log("provider "+this.state.is_provider)
      console.log("seeker "+this.state.is_seeker)
      if(this.state.is_seeker==='true' &&this.state.is_provider==='true'){
        return(
          <h5>refresh to load</h5>
        )
      }
      else if(this.state.staff ==='true')
      {
        return(<h5><Badge variant="primary">Staff Profile</Badge></h5>)
      }
      else if(this.state.is_seeker==='true')
      {
        return(<h5><Badge variant="primary">Resource Seeker</Badge></h5>)
      }
      else if(this.state.is_provider==='true')
      {
        return(<h5><Badge variant="primary">Resource Provider</Badge></h5>)
      }
      else{
        return(
          <h5>Refresh to load</h5>)
      }
    }

    createCard=()=>{
      console.log("provider "+this.state.is_provider)
      console.log("seeker "+this.state.is_seeker)
      if(this.state.is_seeker==='true' && this.state.is_provider==='true'){
        return(
          <h5>refresh to load</h5>
        )
      }
      else if(this.state.is_seeker==='true'){
        return(
          <Row style={{ width: "100%" }}>
            <Col sm style={{ padding: "0px" }}>
              <Card
              style={{width:"300px",border:"1px solid grey",backgroundColor:"white"}}
              className="mx-auto shadow-card">
                <h1>
                  <FaSuitcase />
                </h1>
                Resource Seeker

                <b>Select the type of resource you want</b>
            <Row style={{width:"100%"}}>
            <Col>
                <Link to={{pathname:"/PeopleSeekerForm",state:{category:"people",provider:false,seeker:true, industry:this.state.industry}}}>
                <h1><BsPeopleFill/></h1>
                People
                </Link></Col><Col>
                <Link to={{pathname:"/ServiceSeekerForm",state:{category:"services",provider:false,seeker:true, industry:this.state.industry}}}>
                <h1><FcServices/></h1>
                Services
                </Link></Col>
            </Row>
              </Card>
              <br />
            </Col>
            </Row>
        )
      }
      else if(this.state.is_provider==='true'){
        return(
          <Row>
          <Col sm style={{ padding: "0px",paddingBottom:"20px" }}>
            <Card
            style={{width:"fit-content",border:"1px solid grey",backgroundColor:"white"}}
            className="mx-auto shadow-card">
              <h1>
                <FcSearch />
              </h1>
              Resource Provider

              <b className="m-2">Click on People to create card
             </b>
              <Row style={{width:"100%"}}>
              <Col >
                  <Link to={{pathname:"/PeopleProviderForm",state:{category:"people",provider:true,seeker:false, industry:this.state.industry}}}>
                  <h1><BsPeopleFill/></h1>
                  People
                  </Link></Col>
                  {/* <Link to={{pathname:"/ServiceProviderForm",state:{category:"services",provider:true,seeker:false, industry:this.state.industry}}}>
                  <h1><FcServices/></h1>
                  Services
                  </Link> */}

              </Row>
            </Card>
          </Col>
        </Row>
        )

      }
      else{
        return(
          <h5>Refresh to load..........

          {console.log(this.state.is_provider, this.state.is_seeker)}</h5>
        )
      }

    }

    handleEdit=()=>{
      if(document.getElementById("edit").style.display==="none")
      {(document.getElementById("edit2").style.display="inline");
      (document.getElementById("edit").style.display="block");
      (document.getElementById("back").style.display="none");
      (document.getElementById("back2").style.display="none");
    }
      else
      {(document.getElementById("edit2").style.display="none");
      (document.getElementById("edit").style.display="none");
      (document.getElementById("back").style.display="block");
      (document.getElementById("back2").style.display="block");
    }
    }

    handleUpdateProfile =(response) =>{
      if(response==="success"){
        console.log("success")
        this.setState({
          industry:cookies.get('industry'),
          is_seeker:cookies.get('is_seeker'),
          is_provider:cookies.get('is_provider')
        })
      }
      else {
          return <Redirect to="/Homepage" />;
      }

    }
    render(){
    if(this.state.error_in_profile_update)
      {
        return <Homepage/>
      }
      else if(this.state.error===true)
      {
        return(<h1>Error!! Please make sure you are logged in.</h1>)
      }
      else if(this.state.industry==="NA"||(!this.state.is_seeker&&!this.state.is_provider)){
        console.log(this.state.industry+" ")
        return <UpdateProfile industry={this.state.industry} is_seeker={this.state.is_seeker} is_provider={this.state.is_provider} handleUpdateProfile = {this.handleUpdateProfile}/>
      }
      else{
        var l;
        if(this.state.is_seeker==="true")l="seekerdetails";
        else l="providerdetails";
           return (
          <div class="detail-page-1"><br/>
          <div class="row">

            <div style={{ width: "100%"}} class="col-lg">
            {cookies.get('staff')==='true'?<h4><b>Staff Profile</b></h4>:
            <h4><b>Profile</b>
            </h4>}


              <Card
                  style={{ width: "90%",maxWidth:"350px",border:"solid 1px grey",backgroundColor:"white"}}
                  className="mx-auto shadow-card"
                >

                <Button id="back" onClick={this.handleEdit} style={{display:'none',width:"50px", paddingLeft:'0', paddingRight:'0'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                           </svg></Button>
                           <div id="back2" style={{display:'none'}}><Update_DP /> {console.log(cookies)} </div>



<Button id="edit" onClick={this.handleEdit} style={{width:"50px", paddingLeft:'0', paddingRight:'0'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg></Button>

                  <LazyLoadImage id="edit2"
                    variant="top"
                    src={this.state.img}
                    style={{ width: "200px", height: "auto", marginTop:"20px",padding:"auto" }}
                    effect="blur"
                    alt="Error image can't be loaded"
                  />


                  <Card.Body>
                    <Card.Title>{this.state.name}</Card.Title>
                    <Card.Text>
                    {this.state.industry} Industry<br/>

                      <strong>Email:</strong> {this.state.email}
                      <br />
                      <strong>Phone Number:</strong>{" "}
                      {this.state.phone}<br/>
                      <Row>
                        <Col><h5>{this.state.is_verified?<Badge variant="primary">Verified</Badge>:<Badge variant="danger">Not Verified</Badge>}</h5></Col>
                      </Row>
                      <Row>
                      <Col><h5>{this.state.is_subscribed?<Badge variant="primary">Subscribed</Badge>:<Badge variant="danger">Not Subscribed</Badge>}</h5></Col>
                      </Row>
                      <Row>
                      <Col><this.showCategory/></Col>
                      </Row>
                    </Card.Text>
                  </Card.Body>
                </Card><br/>
            </div>
                <div class="col-lg">
                {this.state.loader===true ? <LoadingElement/>:null}
                {console.log(cookies)}
                {this.state.loader===false && cookies.get("card_made")==="false"?
                <div>
                <h5 style={{color:'red'}}><b>Your registration is incomplete.</b></h5>
                <h5><b>Complete it by creating Your Resource Card</b></h5>
                <img alt="two" src={two} height="40" width="80"/></div>:
                <h5><a href={"/"+l+ "/"+cookies.get("id")}>Visit your card(s)</a><br/><b>Create Your Resource Card</b></h5>}

                <br/>
                {
                    <this.createCard/>
                }


                <br/>

                <br/></div>
                </div>
                <div>

                </div>
                <Footer/>
          </div>
        );
      }
    }
}

export default Profile;
