import React, { Component } from 'react'
import {Card,ListGroup, Container } from 'react-bootstrap';
import LoadingElement from '../Loader';
import Cookies from "universal-cookie";
import axios from 'axios'

export class ContactPerson extends Component {
    constructor(props){
        super(props);
        this.state={
            edit:false,
            data:this.props.resSeeker,
            loader: false,
            manager_name: this.props.resSeeker.manager_name,
            manager_designation: this.props.resSeeker.manager_designation,
            manager_contact_number: this.props.resSeeker.manager_contact_number,
            manager_email_id: this.props.resSeeker.manager_email_id,
            new_manager_name: this.props.resSeeker.manager_name,
            new_manager_designation: this.props.resSeeker.manager_designation,
            new_manager_contact_number: this.props.resSeeker.manager_contact_number,
            new_manager_email_id: this.props.resSeeker.manager_email_id,
        }
        this.editclick= this.editclick.bind(this);
        this.handleSave= this.handleSave.bind(this);
        this.changeMname= this.changeMname.bind(this);
        this.changeMdesignation= this.changeMdesignation.bind(this);
        this.changeMemail= this.changeMemail.bind(this);
        this.changeMcontactnumber= this.changeMcontactnumber.bind(this);
    }
    changeMname(e){this.setState({new_manager_name: e.target.value})}
    changeMdesignation(e){this.setState({new_manager_designation: e.target.value})}
    changeMemail(e){this.setState({new_manager_email_id: e.target.value})}
    changeMcontactnumber(e){this.setState({new_manager_contact_number: e.target.value})}
    editclick(){
        if(this.state.edit===false)
        this.setState({edit:true})
        else
        this.setState({edit:false})
    }

    handleSave(){
        const cookies= new Cookies();
        this.setState({loader:true})
        var body={
        user: cookies.get("addedparam"),
        job:this.state.data.job,
        manager_name: this.state.new_manager_name,
        manager_designation: this.state.new_manager_designation,
        manager_contact_number: this.state.new_manager_contact_number,
        manager_email_id: this.state.new_manager_email_id,
        }
        var path=`https://www.resolabindia.com/api/core/modify_seeker_people/${this.state.data.id}/`
        console.log(path, body)
        axios.patch(path, body, {
                     headers: {
                         'Authorization': `Token ${cookies.get("token")}`
                     },
                 })
                 .then((response)=>{
                     this.setState({loader:false,
                        manager_name: response.data.manager_name,
                        manager_designation: this.props.resSeeker.manager_designation,
                        manager_contact_number: this.props.resSeeker.manager_contact_number,
                        manager_email_id: this.props.resSeeker.manager_email_id,
                        edit: false
                    })
                    console.log("ghjh")
                     console.log('response', response);

                     })

                .catch((error) => {
                       console.log(error);
                       this.setState({
                           loader: false,
                       })
                        alert(" Please Retry");
                   });
    }



    render() {
        const cookies = new Cookies();
        var edit=this.state.edit;
        if(this.state.loader===true)
        return <LoadingElement/>
        else
        return (
            <Card style={{ width: '100%' }}>
            <Card.Body>
                <Card.Header as="h4">
                {edit===true? <input style={{width:'70%'}} value={this.state.new_manager_name} onChange={this.changeMname }/>:
                this.state.manager_name}
                {this.state.data.user.id.toString()!==cookies.get("id")?
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
                      </m>}</Card.Header>
                <div class="row" variant="flush" style={{padding:'0', alignItems:'flex-start'}}>
                    <div class="col-md" style={{padding:'0'}}>
                <ListGroup.Item>Designation: &nbsp;
                {edit===true? <input value={this.state.new_manager_designation } onChange={this.changeMdesignation }/>:
                this.state.manager_designation} </ListGroup.Item>
                <ListGroup.Item>Phone Number: &nbsp;
                {edit===true? <input value={this.state.new_manager_contact_number} onChange={this.changeMcontactnumber }/>:
                this.state.manager_contact_number}</ListGroup.Item>
                </div><div class="col-md" style={{padding:'0'}}>
                <ListGroup.Item>Email: &nbsp;{edit===true? <input value={this.state.new_manager_email_id} onChange={this.changeMemail }/>:
                this.state.manager_email_id} </ListGroup.Item>
                </div></div>
            </Card.Body>
            </Card>
        )
    }
}

export default ContactPerson
