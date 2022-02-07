import React, { Component } from 'react'
import { Container,Card,Row,ListGroup,Image, Button} from 'react-bootstrap';
import Cookies from "universal-cookie";
import axios from 'axios';

export class ResourceProvider extends Component {
    constructor(props){
        super(props);
        this.state={
          details:this.props.details,
          edit:false,
          org_name:this.props.details.org_name,
          contact_person:this.props.details.contact_name,
          contact_phone_no:this.props.details.contact_phone_no,
          address:this.props.details.address,
          legal_status:this.props.details.legal_status,
          new_org_name:this.props.details.org_name,
          new_contact_person:this.props.details.contact_name,
          new_contact_phone_no:this.props.details.contact_phone_no,
          new_address:this.props.details.address,
          new_legal_status:this.props.details.legal_status,

        }
        this.editclick=this.editclick.bind(this);
        this.handleOrgName= this.handleOrgName.bind(this);
        this.handleContactPerson = this.handleContactPerson.bind(this);
        this.handleContactNumber = this.handleContactNumber.bind(this);
        this.handleLegalStatus = this.handleLegalStatus.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
        this.handleSave = this.handleSave.bind(this);

    }
    handleOrgName(e){this.setState({new_org_name:e.target.value})}
    handleContactPerson(e){this.setState({new_contact_person:e.target.value})}
    handleContactNumber(e){this.setState({new_contact_phone_no:e.target.value})}
    handleLegalStatus(e){this.setState({new_legal_status:e.target.value})}
    handleAddress(e){this.setState({new_address:e.target.value})}
    editclick(){
        if(this.state.edit===false)this.setState({edit:true})
        else  this.setState({edit:false})}

        handleSave(){
            const cookies= new Cookies();
            this.setState({loader:true})
            var body={
            user: cookies.get("addedparam"),
            job:this.props.details.job,
            org_name:this.state.new_org_name,
            contact_name:this.state.new_contact_person,
            contact_phone_no:this.state.new_contact_phone_no,
            address:this.state.new_address,
            legal_status:this.state.new_legal_status,
            }
            var path=`https://www.resolabindia.com/api/core/modify_provider_adalserv/${this.state.details.id}/`
            console.log(body, path)
            axios.patch(path, body, {
                         headers: {
                             'Authorization': `Token ${cookies.get("token")}`
                         },
                     })
                     .then((response)=>{
                         this.setState({loader:false,
                            org_name:response.data.org_name,
                            contact_person:response.data.contact_name,
                            contact_phone_no:response.data.contact_phone_no,
                            address:response.data.address,
                            legal_status:response.data.legal_status,
                            edit: false
                        })
                         console.log('response', response);
                         })

                    .catch((error) => {
                           console.log(error);
                           this.setState({
                               loader: false,
                           })
                            alert("Error Occured");
                       });
        }
    render() {

    var object = this.state.details;
    var edit=this.state.edit;
    const cookies = new Cookies();

        return(
        <Card style={{ width: '100%' }}>
        <Card.Body>
        <Card.Header as="h4">{edit===true?
            <input style={{width:'70%'}} value={this.state.new_org_name}
            onChange={this.handleOrgName}/>:
            this.state.org_name}
            {object.user.id.toString()!==cookies.get("id")?null:
    edit===false?
    <m type="button" class="float-right" onClick={this.editclick} >

    <m style={{fontSize:"15px"}}>Edit</m>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>
    </m>:
    <m  class="float-right" >

    <m type="button" style={{fontSize:"15px"}} onClick={this.editclick} >Back</m>
    &nbsp;&nbsp; &nbsp;&nbsp;
    <m type="button" style={{fontSize:"15px"}} onClick={this.handleSave} >Save</m>
    </m>}
           </Card.Header>
            <ListGroup variant="flush">
                <ListGroup.Item>Contact Person: &nbsp;
                {edit===true?
                <input style={{width:'70%'}} value={this.state.new_contact_person} onChange={this.handleContactPerson}/>:
                    this.state.contact_person}</ListGroup.Item>
                <ListGroup.Item>Phone Number: &nbsp;
                {edit===true?
                    <input style={{width:'70%'}} value={this.state.new_contact_phone_no} onChange={this.handleContactNumber}/>:
                        this.state.contact_phone_no}
                </ListGroup.Item>
                <ListGroup.Item>Location: &nbsp;
                {edit===true?
                    <input style={{width:'70%'}} value={this.state.new_address} onChange={this.handleAddress}/>:
                        this.state.address}
                </ListGroup.Item>
                <ListGroup.Item>Email: {object.user.email} </ListGroup.Item>
                <ListGroup.Item>Legal Status:
                &nbsp;
                {edit===true?
                    <select style={{width:'70%'}} value={this.state.new_legal_status} onChange={this.handleLegalStatus}>
                    <option selected value="">Select :</option>
                                <option>Propritorship</option>
                                <option>Partnership</option>
                                <option>LLP</option>
                                <option>Company</option>
                                <option>Trust</option>
                                <option>Society</option>
                                <option>Others</option></select>:
                        this.state.legal_status}
                </ListGroup.Item>
            </ListGroup>
        </Card.Body>
        </Card>
      )


    }
}

export default ResourceProvider
