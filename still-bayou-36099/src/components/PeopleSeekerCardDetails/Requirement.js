import React, { Component } from 'react'
import {Card,ListGroup, Container } from 'react-bootstrap';
import Cookies from "universal-cookie";
import LoadingElement from '../Loader';
import axios from 'axios';

export class Requirement extends Component {
    constructor(props){
        super(props);
        this.state = {
            edit:false,
            data:this.props.resSeeker,
            loader: false,
            ssc: this.props.resSeeker.ssc,
            job_district:this.props.resSeeker.job_district,
            min_salary:this.props.resSeeker.min_salary,
            max_salary:this.props.resSeeker.max_salary,
            qualification:this.props.resSeeker.qualification,
            pref_qualification: this.props.resSeeker.pref_qualification,
            additional_req:this.props.resSeeker.additional_req,
            joining_requirement:this.props.resSeeker.joining_requirement,
            experience_details:this.props.resSeeker.experience_details,
            new_ssc: this.props.resSeeker.ssc,
            new_job_district:this.props.resSeeker.job_district,
            new_min_salary:this.props.resSeeker.min_salary,
            new_max_salary:this.props.resSeeker.max_salary,
            new_qualification:this.props.resSeeker.qualification,
            new_pref_qualification: this.props.resSeeker.pref_qualification,
            new_additional_req:this.props.resSeeker.additional_req,
            new_joining_requirement:this.props.resSeeker.joining_requirement,
            new_experience_details:this.props.resSeeker.experience_details,
        }
        this.handleJDistrict=this.handleJDistrict.bind(this);
        this.handleMinSalary=this.handleMinSalary.bind(this);
        this.handleMaxSalary=this.handleMaxSalary.bind(this);
        this.handleSSC=this.handleSSC.bind(this);
        this.handleRegisteredYear=this.handleRegisteredYear.bind(this);
        this.handleQualification=this.handleQualification.bind(this);
        this.handlePrefQualification=this.handlePrefQualification.bind(this);
        this.handleAddRequirement=this.handleAddRequirement.bind(this);
        this.handleJoinRequirement=this.handleJoinRequirement.bind(this);
        this.handleExp=this.handleExp.bind(this);
        this.editclick=this.editclick.bind(this);
        this.handleSave= this.handleSave.bind(this);
    }
    handleJDistrict(e){this.setState({new_job_district:e.target.value})}
    handleMinSalary(e){this.setState({new_min_salary:e.target.value})}
    handleSSC(e){this.setState({new_ssc:e.target.value})}
    handleMaxSalary(e){this.setState({new_max_salary:e.target.value})}
    handleRegisteredYear(e){this.setState({new_job_district:e.target.value})}
    handleQualification(e){this.setState({new_qualification:e.target.value})}
    handlePrefQualification(e){this.setState({new_pref_qualification:e.target.value})}
    handleAddRequirement(e){this.setState({new_additional_req:e.target.value})}
    handleJoinRequirement(e){this.setState({new_joining_requirement:e.target.value})}
    handleExp(e){this.setState({new_experience_details:e.target.value})}
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
        job_district:this.state.new_job_district,
        min_salary:this.state.new_min_salary,
        max_salary:this.state.new_max_salary,
        qualification:this.state.new_qualification,
        pref_qualification: this.state.new_pref_qualification,
        additional_req:this.state.new_additional_req,
        joining_requirement:this.state.new_joining_requirement,
        experience_details:this.state.new_experience_details,
        ssc:this.state.new_ssc
        }
        var path=`https://www.resolabindia.com/api/core/modify_seeker_people/${this.state.data.id}/`
        console.log(body, path)
        axios.patch(path, body, {
                     headers: {
                         'Authorization': `Token ${cookies.get("token")}`
                     },
                 })
                 .then((response)=>{
                     console.log(response)
                     this.setState({loader:false,
                        job_district:response.data.job_district,
                        min_salary:response.data.min_salary,
                        max_salary:response.data.max_salary,
                        qualification:response.data.qualification,
                        pref_qualification: response.data.pref_qualification,
                        additional_req: response.data.additional_req,
                        joining_requirement: response.data.joining_requirement,
                        ssc: response.data.ssc,
                        experience_details: response.data.experience_details,
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
        var resSeeker= this.props.resSeeker
        const cookies = new Cookies();
        var edit=this.state.edit;
        if(this.state.loader===true)
        return <LoadingElement/>
        else

        return (
            <Card style={{ width: '100%' }}>
                <Card.Body>
                    <Card.Header as="h4">Job Role: {resSeeker.job}

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
                        <ListGroup.Item>Job Location: &nbsp;
                        {edit===true?
                            <input style={{width:'70%'}} value={this.state.new_job_district} onChange={this.handleJDistrict}/>:
                            this.state.job_district}&nbsp;  </ListGroup.Item>
                        <ListGroup.Item>Salary Offered :&nbsp; &#8377;
                        {edit===true?
                            <input  value={this.state.new_min_salary} onChange={this.handleMinSalary}/>:
                            this.state.min_salary} to &#8377;
                            {edit===true?
                                <input value={this.state.new_max_salary} onChange={this.handleMaxSalary}/>:
                                resSeeker.max_salary}</ListGroup.Item>
                        <ListGroup.Item>Qualification Required: &nbsp;
                        {edit===true?
                            <input style={{width:'70%'}} value={this.state.new_qualification} onChange={this.handleQualification}/>:
                            this.state.qualification}</ListGroup.Item>
                        <ListGroup.Item>Preferred Qualification: &nbsp;
                        {edit===true?
                            <input style={{width:'70%'}} value={this.state.new_pref_qualification} onChange={this.handlePrefQualification}/>:
                            this.state.pref_qualification}</ListGroup.Item>
                        </div> <div class="col-md" style={{padding:'0'}}>
                        {resSeeker.job==='Domain Trainer'?
                        <ListGroup.Item>Sector Skill Council : &nbsp;
                        {edit===true?
                            <select style={{width:'70%'}} value={this.state.new_ssc } onChange={this.handleSSC }>
                              <option>Aeorospace and Aviation Sector Skill Council</option>
                              <option>Agriculture Skill council of india</option>
                              <option>Apparel Made Ups and Home Furnishing Sector skill council</option>
                              <option>Automotive Skill development council</option>
                              <option>Beauty and Welness sector Skill Council</option>
                              <option>BFSI Sector Skill Council</option>
                            <option>Capital Goods Skill council</option>
                            <option>Construction Skill development council of india</option>
                            <option>Domestic Workers Sector Skill Council</option>
                            <option>Electronics Sector skill Council of India</option>
                            <option>Food industry Capacity & Skill Initiative</option>
                            <option>Funiture and Fitting Skill council</option>
                            <option>Gems & Jewlellery Skill Council of India</option>
                            <option>Handicraft and Carpet Sector Skill Council</option>
                            <option>Healthcare Sector Skill Council </option>
                            <option>Hydrocarbon Sector Skill Council</option>
                            <option>Indian Iron and Still Sector Skill Council</option>
                            <option>Indian Plumbing Skill Council</option>
                            <option>Infrastructure Equipment Skill Sctor Council</option>
                            <option>Instrumentation Automation Survelliance & Communication Sector Skill Council</option>
                            <option>IT ITS Sector Skill Council</option>
                            <option>Leather Sector Skill Council</option>
                            <option>Life Science Sector Skill Development Council</option>
                            <option>Logistics Sector Skill Council</option>
                            <option>Management & Entreprenurship And Proffesional Skills Council</option>
                            <option>Media & Entertainment Skill Council</option>
                            <option>Paints & Coatings Skill Council</option>
                            <option>Power Sector Skill Council</option>
                            <option>Retailers Associations Skill Council of India</option>
                            <option>Rubber Skill Development Council</option>
                            <option>Skill Council For Green Jobs</option>
                            <option>Skill Council For Persons With Didability </option>
                            <option>Sports ,Physical education ,Fitness & Leisure Skill Council</option>
                            <option>Strategic Manufacturer Sector Skill</option>
                            <option>Telcom Sector Skill Council</option>
                            <option>Textile Sector Skill Council</option>
                            <option> Tourism & Hospitality Sector Skill Council </option>
                            </select> :
                            this.state.ssc}
                        </ListGroup.Item>:null}
                        <ListGroup.Item>Additional Requirements: &nbsp;
                        {edit===true?
                            <input style={{width:'70%'}} value={this.state.new_additional_req } onChange={this.handleAddRequirement }/>:
                            this.state.additional_req} </ListGroup.Item>
                        <ListGroup.Item>Experience Required: &nbsp;
                        {edit===true?
                            <input style={{width:'70%'}} value={this.state.new_experience_details } onChange={this.handleExp }/>:
                            this.state.experience_details} Years</ListGroup.Item>
                        <ListGroup.Item>Joining Requirements: &nbsp;
                        {edit===true?
                            <select
                            value={this.state.new_joining_requirement}
                            onChange={this.handleJoinRequirement}
                          >
                          <option>Immediate</option>
                          <option>Mutual Consent</option>
                          </select> :
                            this.state.joining_requirement} </ListGroup.Item>

                    </div></div>
                </Card.Body>
                </Card>
        )
    }
}

export default Requirement
