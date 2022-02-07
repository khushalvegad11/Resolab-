import React, { Component } from 'react'
import { Container,Card,Row,ListGroup,Image, Button} from 'react-bootstrap';
import Client_Form from '../Client_Form'
import Cookies from "universal-cookie";

const cookies = new Cookies();
class ClientServed extends Component {
    constructor(props){
        super(props);
        this.state={
          details:this.props.details,       
        }
    }

    render() {
    var object = this.state.details;
        return (
              <Card style={{ width: '100%' }}>
              <Card.Body>
                  <Card.Header as="h4">Client served</Card.Header>
                  {object.user.id.toString()===cookies.get("id")?
                  object.docs_urls_5?<h5><br/>Your documents are being verified.
                  Once verified they will be visible on your card</h5>:
                  this.state.details.docs_urls_4?
                  <Client_Form link={"modify_provider_adalserv"} no={"5"} job={object.job} cardId={this.props.cardId}/>:
                  this.state.details.docs_urls_3?
                  <Client_Form link={"modify_provider_adalserv"} no={"4"}  job={object.job} cardId={this.props.cardId}/>:
                  this.state.details.docs_urls_2?
                  <Client_Form link={"modify_provider_adalserv"} no={"3"}  job={object.job} cardId={this.props.cardId}/>:
                  this.state.details.docs_urls_1?
                  <Client_Form link={"modify_provider_adalserv"} no={"2"}  job={object.job} cardId={this.props.cardId}/>:
           <Client_Form link={"modify_provider_adalserv"} no={"1"}  job={object.job} cardId={this.props.cardId}/>:null}
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
}

export default ClientServed
