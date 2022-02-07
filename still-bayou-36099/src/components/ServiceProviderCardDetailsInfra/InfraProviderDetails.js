import React,{Component} from 'react';
import {Card,Container,Row,ListGroup,Image, Button} from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import Cookies from "universal-cookie";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Login1 from '../Login1';
import {Link} from 'react-router-dom';
import Client_Form from '../Client_Form'
import Plans from '../plans.js';
import axios from 'axios'
import Footer from '../footer.js';
import LoadingElement from '../Loader.js';

const cookies = new Cookies();
class InfraProviderDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            active_index:"about",
            details:{},
            loader:true,
        }
    }
    componentDidMount(){
      axios.get("https://www.resolabindia.com/api/core/list_providers_infraserv/", {

        }).then((response)=>{
          var i; var f_id;console.log(response)
                for (i = 0; i < response.data.length; i++) {
                  console.log(response.data[i].user.id.toString(),this.props.match.params.userId)
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


    clientServed=()=>{
      var object = this.state.details;
      return(
        <Card style={{ width: '100%' }}>
        <Card.Body>
            <Card.Header as="h4">Client served</Card.Header>
            {this.state.details.user.id.toString()===cookies.get("id")?
            this.state.details.docs_urls_5?<h5>{console.log(this.state.details.docs_urls)}<br/>Your documents are being verified.
            Once verified they will be visible on your card</h5>:
            this.state.details.docs_urls_4?
            <Client_Form link={"modify_provider_infraserv"} no={"5"} job={object.job} cardId={this.props.match.params.cardId}/>:
            this.state.details.docs_urls_3?
            <Client_Form link={"modify_provider_infraserv"} no={"4"}  job={object.job} cardId={this.props.match.params.cardId}/>:
            this.state.details.docs_urls_2?
            <Client_Form link={"modify_provider_infraserv"} no={"3"}  job={object.job} cardId={this.props.match.params.cardId}/>:
            this.state.details.docs_urls_1?
            <Client_Form link={"modify_provider_infraserv"} no={"2"}  job={object.job} cardId={this.props.match.params.cardId}/>:
     <Client_Form link={"modify_provider_infraserv"} no={"1"}  job={object.job} cardId={this.props.match.params.cardId}/>:null}
     <div class="table-responsive">

     <table class="table table-bordered table-hover" ><tr>
      <th>S.No</th>
      <th>Client Name</th>
      <th>Proof</th>
      <th>Status</th>
    </tr>
    <tbody>
     {this.state.details.client_name_1?
            this.state.details.docs_urls_1.split(',').map((image)=>
              <tr>
              <td>1</td>
              <td>{this.state.details.client_name_1}</td>
              <td><a href={image} download="image.jpg">View</a></td>
              {this.state.details.verified_1?<td>Verified ✓</td>:<td>Submitted</td>}
              </tr>
              ):null}
        {this.state.details.client_name_2?
            this.state.details.docs_urls_2.split(',').map((image)=>
            <tr>
            <td>2</td>
            <td>{this.state.details.client_name_2}</td>
            <td><a href={image} download="image.jpg">View</a></td>
            {this.state.details.verified_2?<td>Verified ✓</td>:<td>Submitted</td>}
            </tr>
            ):null}
        {this.state.details.client_name_3?
            this.state.details.docs_urls_3.split(',').map((image)=>
            <tr>
            <td>3</td>
            <td>{this.state.details.client_name_3}</td>
            <td><Image className="service_pics"  src={image} thumbnail style={{marginTop:"20px",padding:"auto", maxHeight:'400px', width:'auto'}}/></td>
            <td><a href={image} download="image.jpg"><Button>Download</Button></a></td>
            {this.state.details.verified_3?<td>Verified ✓</td>:<td>Submitted</td>}
            </tr>
            ):null}
        {this.state.details.client_name_4?
            this.state.details.docs_urls_4.split(',').map((image)=>
            <tr>
            <td>4</td>
            <td>{this.state.details.client_name_4}</td>
            <td><Image className="service_pics"  src={image} thumbnail style={{marginTop:"20px",padding:"auto", maxHeight:'400px', width:'auto'}}/></td>
            <td><a href={image} download="image.jpg"><Button>Download</Button></a></td>
            {this.state.details.verified_4?<td>Verified ✓</td>:<td>Submitted</td>}
            </tr>
            ):null}
        {this.state.details.client_name_5?
            this.state.details.docs_urls_5.split(',').map((image)=>
            <tr>
            <td>5</td>
            <td>{this.state.details.client_name_5}</td>
            <td><Image className="service_pics"  src={image} thumbnail style={{marginTop:"20px",padding:"auto", maxHeight:'400px', width:'auto'}}/></td>
            <td><a href={image} download="image.jpg"><Button>Download</Button></a></td>
            {this.state.details.verified_5?<td>Verified ✓</td>:<td>Submitted</td>}
            </tr>
            ):null}
</tbody></table></div>



        </Card.Body>
        </Card>
      )
    }

    certificates=()=>{
      return(
        <Row  >
        <Carousel cycle ride={true} interval="4000">

            {
              this.state.details.pic_urls.split(',').map((image)=>

              <Carousel.Item>
              <Image className="service_pics"  src={image} thumbnail style={{marginTop:"20px",padding:"auto", maxHeight:'400px', width:'auto'}}/>
              <a href={image} download="image.jpg"><Button>Download</Button></a>
              </Carousel.Item>
              )}
        </Carousel>
        </Row>
)}

    infraDetails=()=>{

      var object = this.state.details;
      return(
        <Card style={{ width: '100%' }}>
        <Card.Body>
            <Card.Header as="h4">{object.job}</Card.Header>
            <ListGroup variant="flush">
                <ListGroup.Item>Number of Halls/Rooms: {object.no_halls}</ListGroup.Item>
                <ListGroup.Item>Number of Toilets: {object.no_toilets}</ListGroup.Item>
                <ListGroup.Item>Number of Bathrooms: {object.no_bathrooms}</ListGroup.Item>
                <ListGroup.Item>Facilities Available:<br/><pre style={{fontSize:"16px"}}>{object.basic_facility==="All"?("\nElectricity,Water and Power Backup"):object.basic_facility}</pre></ListGroup.Item>
                <ListGroup.Item>Details: {object.detail}</ListGroup.Item>
                <ListGroup.Item>Total Area: {object.total_area}</ListGroup.Item>
                <ListGroup.Item>Total Open Area: {object.total_open_area}</ListGroup.Item>
                <ListGroup.Item>Address: {object.location_district}, {object.location_state}</ListGroup.Item>
            </ListGroup>
        </Card.Body>
        </Card>
      )
    }
    resProvider=()=>{

      var object = this.state.details;
      return(
        <Card style={{ width: '100%' }}>
        <Card.Body>
            <Card.Header as="h4">{object.org_name}</Card.Header>
            <ListGroup variant="flush">
                <ListGroup.Item>Contact Person Name: {object.contact_name}</ListGroup.Item>
                <ListGroup.Item>Phone Number: {object.contact_phone_no}</ListGroup.Item>
                <ListGroup.Item>Email: {object.user.email}</ListGroup.Item>
                <ListGroup.Item>Address: {object.address}</ListGroup.Item>
                <ListGroup.Item>Legal Status: {object.legal_status}</ListGroup.Item>
                <ListGroup.Item>GST number: {object.gst_no}</ListGroup.Item>
                <ListGroup.Item>PAN card number: {object.pan_card_no}</ListGroup.Item>
            </ListGroup>
        </Card.Body>
        </Card>
      )
    }



    openTab=(evt,tabName)=> {
        // Declare all variables
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

    hasAccess=()=>{
      var object = this.state.details;
      if( cookies.get("token")&& object.user.id.toString()===cookies.get("id")){
        return true;
      }
      else if(cookies.get('staff')=='true')
      return true;
      else if (cookies.get("is_seeker")==="false")
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
        var isoffer=true;
        var object = this.state.details;
        if(this.state.loader===true)
        return(<LoadingElement/>)

        if (this.hasAccess()) {
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
                <button class="tablinks active" onClick={(e)=>{this.openTab(e,'res_provider')}}>Resource Provider</button>
                <button class="tablinks" onClick={(e)=>{this.openTab(e,'infra')}}>Service Offered</button>
                <button class="tablinks" onClick={(e)=>{this.openTab(e,'client-served')}}>Client Served</button>
                <button class="tablinks" onClick={(e)=>{this.openTab(e,'certificates')}}>Photographs</button>
                </div>

          <div id="client-served" class="tabcontent"  style={{height:"auto"}}>
          <this.clientServed/>
          </div>

          <div id="infra" class="tabcontent" style={{height:"auto"}}>
            <this.infraDetails/>
          </div>

          <div id="res_provider" class="tabcontent" style={{display:'block'}}>
            <this.resProvider/>
          </div>

          <div id="certificates" class="tabcontent">
            <this.certificates/>
          </div>


        </div>
      </div>

</div>
                    <Footer/>

              </div>)
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
export default InfraProviderDetails;
