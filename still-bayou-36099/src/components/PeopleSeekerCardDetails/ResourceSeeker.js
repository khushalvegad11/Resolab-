import React, { Component } from 'react'
import {Card,ListGroup, Container } from 'react-bootstrap';
import Cookies from "universal-cookie";
import LoadingElement from '../Loader';
import axios from 'axios';

class ResourceSeeker extends Component {
    constructor(props){
        super(props);
        this.state = {
            edit:false,
            data:this.props.resSeeker,
            loader: false,
            pia_tp_name:this.props.resSeeker.pia_tp_name,
            org_head:this.props.resSeeker.org_head,
            org_location:this.props.resSeeker.org_location,
            registered_year:this.props.resSeeker.registered_year,
            legal_status: this.props.resSeeker.legal_status,
            core_business:this.props.resSeeker.core_business,
            new_pia_tp_name:this.props.resSeeker.pia_tp_name,
            new_org_head:this.props.resSeeker.org_head,
            new_org_location:this.props.resSeeker.org_location,
            new_registered_year:this.props.resSeeker.registered_year,
            new_legal_status: this.props.resSeeker.legal_status,
            new_core_business:this.props.resSeeker.core_business
        }
        this.handlepia_tp_change=this.handlepia_tp_change.bind(this);
        this.handleOrg_head_change=this.handleOrg_head_change.bind(this);
        this.handleOrg_location=this.handleOrg_location.bind(this);
        this.handleRegisteredYear=this.handleRegisteredYear.bind(this);
        this.handleLegalStatus=this.handleLegalStatus.bind(this);
        this.handleCoreBusiness=this.handleCoreBusiness.bind(this);
        this.editclick=this.editclick.bind(this);
        this.handleSave= this.handleSave.bind(this);
    }
    editclick(){
        if(this.state.edit===false)this.setState({edit:true})
        else  this.setState({edit:false})}
    handlepia_tp_change(e){this.setState({new_pia_tp_name:e.target.value})}
    handleOrg_head_change(e){this.setState({new_org_head:e.target.value})}
    handleOrg_location(e){this.setState({new_org_location:e.target.value})}
    handleRegisteredYear(e){this.setState({new_registered_year:e.target.value})}
    handleLegalStatus(e){this.setState({new_legal_status:e.target.value})}
    handleCoreBusiness(e){this.setState({new_core_business:e.target.value})}

    handleSave(){
        const cookies= new Cookies();
        this.setState({loader:true})
        var body={
        user: cookies.get("addedparam"),
        job:this.props.resSeeker.job,
        pia_tp_name:this.state.new_pia_tp_name,
        org_head:this.state.new_org_head,
        org_location:this.state.new_org_location,
        registered_year:this.state.new_registered_year,
        legal_status: this.state.new_legal_status,
        core_business:this.state.new_core_business,
        }
        var path=`https://www.resolabindia.com/api/core/modify_seeker_people/${this.state.data.id}/`
        console.log(body, path)
        axios.patch(path, body, {
                     headers: {
                         'Authorization': `Token ${cookies.get("token")}`
                     },
                 })
                 .then((response)=>{
                     this.setState({loader:false,
                        pia_tp_name: response.data.pia_tp_name,
                        org_head:response.data.org_head,
                        org_location:response.data.org_location,
                        registered_year:response.data.registered_year,
                        legal_status: response.data.legal_status,
                        core_business:response.data.core_business,
                        edit: false
                    })
                     console.log('response', response);
                     })

                .catch((error) => {
                       console.log(error);
                       this.setState({
                           loader: false,
                       })
                        alert("All fields are required");
                   });
    }
    render() {
        console.log(this.props.resSeeker)
        const cookies = new Cookies();
        var edit=this.state.edit;
        if(this.state.loader===true)
        return <LoadingElement/>
        else
        return (
            <Card style={{ width: '100%' }}>
            <Card.Body>
                <Card.Header as="h4">
                {edit===true?
                    <input style={{width:'70%'}} value={this.state.new_pia_tp_name} onChange={this.handlepia_tp_change}/>:
                    this.state.pia_tp_name}
                    {this.props.resSeeker.user.id.toString()!==cookies.get("id")?
      null:
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
                <div class="row" variant="flush" style={{padding:'0', alignItems:'flex-start'}}>
                      <div class="col-md" style={{padding:'0'}}>
                    <ListGroup.Item>Office Address: &nbsp;
                    {edit===true?
                    <input value={this.state.new_org_location} onChange={this.handleOrg_location}/>:
                    this.state.org_location}</ListGroup.Item>
                    <ListGroup.Item>CEO: &nbsp;
                    {edit===true?
                        <input value={this.state.new_org_head} onChange={this.handleOrg_head_change} />:
                        this.state.org_head}</ListGroup.Item>
                    <ListGroup.Item>Registration Year: &nbsp;
                    {edit===true?
                        <input value={this.state.new_registered_year } onChange={this.handleRegisteredYear}/>:
                        this.state.registered_year}</ListGroup.Item>
                    </div><div class="col-md" style={{margin:'0', padding:'0'}}>
                    <ListGroup.Item>Legal Status: &nbsp;
                    {edit===true?
                        <select
                        required
                        value={this.state.new_legal_status}
                        onChange={this.handleLegalStatus }
                      >
                      {cookies.get("industry")==="Skilling" ?
                      <option>Propritorship</option>:<option>NBFC-MFI</option>}
                      {cookies.get("industry")==="Skilling" ?
                      <option>Partnership</option>:<option>Section 8 Company</option>}
                      {cookies.get("industry")==="Skilling" ?
                      <option>LLP</option>:null}
                      {cookies.get("industry")==="Skilling" ?
                      <option>Company</option>:null}
                      <option>Trust</option>
                      <option>Society</option>
                      <option>Others</option>
                      </select>
                        :
                        this.state.legal_status} </ListGroup.Item>
                    <ListGroup.Item>Core Business: &nbsp;
                    {edit===true?
                        <input value={this.state.new_core_business} onChange={this.handleCoreBusiness}/>:
                        this.state.core_business}</ListGroup.Item>
                </div></div>
            </Card.Body>
            </Card>
        )
    }
}

export default ResourceSeeker
