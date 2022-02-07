import React, { Component } from 'react'
import Cookies from "universal-cookie";
import axios from 'axios';
import {Card,Form, ListGroup,Container, Button, Carousel, Image} from 'react-bootstrap';
import LoadingElement from '../Loader';

class ResourcePovider extends Component{

    constructor(props){
        super(props);
        this.state={
            edit:false,
            data:this.props.state,
            loader: false,
            current_work_district: this.props.state.current_work_district,
            current_work_state: this.props.state.current_work_state,
            educational_qualification: this.props.state.educational_qualification,
            current_salary: this.props.state.current_salary,
            expected_salary: this.props.state.expected_salary,
            new_current_work_district: this.props.state.current_work_district,
            new_current_work_state: this.props.state.current_work_state,
            new_educational_qualification: this.props.state.educational_qualification,
            new_current_salary: this.props.state.current_salary,
            new_expected_salary: this.props.state.expected_salary
        }
        this.editclick= this.editclick.bind(this);
        this.handleSave= this.handleSave.bind(this);
        this.changeCsalary= this.changeCsalary.bind(this);
        this.changeEdu= this.changeEdu.bind(this);
        this.changeEsalary= this.changeEsalary.bind(this);
        this.changeLoc= this.changeLoc.bind(this);
        this.changeState= this.changeState.bind(this);
    }

    editclick(){
        if(this.state.edit===false)
        this.setState({edit:true})
        else
        this.setState({edit:false})
    }

    changeLoc(e){
        this.setState({new_current_work_district:e.target.value})
    }
    changeState(e){
        this.setState({new_current_work_state :e.target.value})
    }
    changeEdu(e){
        this.setState({new_educational_qualification:e.target.value})
    }
    changeCsalary(e){
        this.setState({new_current_salary:e.target.value})
    }
    changeEsalary(e){
        this.setState({new_expected_salary:e.target.value})
    }

    handleSave(){
        const cookies= new Cookies();
        this.setState({loader:true})
        var body={
        user: cookies.get("addedparam"),
        job:this.state.data.job,
        current_work_district:this.state.new_current_work_district,
        current_work_state: this.state.new_current_work_state,
        educational_qualification: this.state.new_educational_qualification,
        current_salary: this.state.new_current_salary,
        expected_salary: this.state.new_expected_salary
        }
        console.log(body)
        axios.patch(`https://www.resolabindia.com/api/core/modify_provider_people/${this.state.data.id}/`, body, {
                     headers: {
                         'Authorization': `Token ${cookies.get("token")}`
                     },
                 })
                 .then((response)=>{
                     this.setState({loader:false,
                        current_work_district:response.data.current_work_district,
                        current_work_state: response.data.current_work_state,
                        educational_qualification: response.data.educational_qualification,
                        current_salary: response.data.current_salary,
                        expected_salary: response.data.expected_salary,
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

    render(){

        const cookies = new Cookies();
        var edit=this.state.edit;
        if(this.state.loader===true)
        return <LoadingElement />
        else
    return (
        <div>
        <Card style={{ width: '100%' }}>
        <Card.Body>
            <Card.Header as="h5">{this.state.data.user.name.toUpperCase()}
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
            </m>}

            </Card.Header>
            <div class="row" variant="flush" style={{padding:'0', alignItems:'flex-start'}}>
            <div class="col-md" style={{padding:'0'}}>

                <ListGroup.Item>Phone Number:    &nbsp;
                {this.state.data.user.phone_number}</ListGroup.Item>
                <ListGroup.Item>Email: &nbsp;
                {this.state.data.user.email} </ListGroup.Item>
                <ListGroup.Item>Date of Birth: &nbsp;
                {this.state.data.user.date_of_birth} </ListGroup.Item>
                <ListGroup.Item>Current Work Location: &nbsp;
                {edit===true? <input value={this.state.new_current_work_district} onChange={this.changeLoc}/>:this.state.current_work_district}</ListGroup.Item>
                </div><div class="col-md" style={{margin:'0', padding:'0'}}>
                <ListGroup.Item>State:&nbsp;
                {edit===true? <input value={this.state.new_current_work_state} onChange={this.changeState}/>:this.state.current_work_state} </ListGroup.Item>
                <ListGroup.Item>Educational Qualification: &nbsp;
                {edit===true? <input value={this.state.new_educational_qualification} onChange={this.changeEdu}/>:this.state.educational_qualification}</ListGroup.Item>
                <ListGroup.Item>Current Salary:&nbsp;     Rs.
                {edit===true? <input type="number" value= {this.state.new_current_salary} onChange={this.changeCsalary}/>: this.state.current_salary}</ListGroup.Item>
                <ListGroup.Item>Expected Salary:&nbsp;     Rs.
                {edit===true? <input type="number" value= {this.state.new_expected_salary} onChange={this.changeEsalary}/>:this.state.expected_salary}</ListGroup.Item>
</div>
            </div>
        </Card.Body>
        </Card>
        </div>
    )}
}

export default ResourcePovider
