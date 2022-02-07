import React, { Component } from 'react'
import {Card,ListGroup,Container, Button, Carousel, Image} from 'react-bootstrap';
import Cookies from "universal-cookie";
import axios from 'axios';
import LoadingElement from '../Loader';
class WorkEx extends Component {

    constructor(props){
        super(props);
        this.state={
            edit:false,
            data:this.props.state,
            loader: false,
            achievement: this.props.state.achievement,
            ssc: this.props.state.ssc,
            exp_skill_industry: this.props.state.exp_skill_industry,
            project_name: this.props.state.project_name,
            exp_non_skill: this.props.state.exp_non_skill,
            designation_1:this.props.state.designation_1,
            organization_1_name: this.props.state.organization_1_name,
            total_tenure_1: this.props.state.total_tenure_1,
            designation_2:this.props.state.designation_2,
            organization_2_name: this.props.state.organization_2_name,
            total_tenure_2: this.props.state.total_tenure_2,
            designation_3:this.props.state.designation_3,
            organization_3_name: this.props.state.organization_3_name,
            total_tenure_3: this.props.state.total_tenure_3,
            new_achievement: this.props.state.achievement,
            new_ssc: this.props.state.ssc,
            new_exp_skill_industry: this.props.state.exp_skill_industry,
            new_project_name: this.props.state.project_name,
            new_exp_non_skill: this.props.state.exp_non_skill,
            new_designation_1:this.props.state.designation_1,
            new_organization_1_name: this.props.state.organization_1_name,
            new_total_tenure_1: this.props.state.total_tenure_1,
            new_designation_2:this.props.state.designation_2,
            new_organization_2_name: this.props.state.organization_2_name,
            new_total_tenure_2: this.props.state.total_tenure_2,
            new_designation_3:this.props.state.designation_3,
            new_organization_3_name: this.props.state.organization_3_name,
            new_total_tenure_3: this.props.state.total_tenure_3,

        }
        this.editclick= this.editclick.bind(this);
        this.handleSave= this.handleSave.bind(this);
        this.changeAchievements = this.changeAchievements.bind(this);
        this.changeProjectName= this.changeProjectName.bind(this);
        this.changeExp1= this.changeExp1.bind(this);
        this.changeExp2= this.changeExp2.bind(this);
        this.changeT1= this.changeT1.bind(this);
        this.changeT2= this.changeT2.bind(this);
        this.changeT3= this.changeT3.bind(this);
        this.changeO1= this.changeO1.bind(this);
        this.changeO2= this.changeO2.bind(this);
        this.changeO3= this.changeO3.bind(this);
        this.changeD1= this.changeD1.bind(this);
        this.changeD2= this.changeD2.bind(this);
        this.changeD3= this.changeD3.bind(this);
        this.handleSSC=this.handleSSC.bind(this);

    }

    editclick(){
        if(this.state.edit===false)
        this.setState({edit:true})
        else
        this.setState({edit:false})
    }

    changeAchievements(e){
        this.setState({new_achievement:e.target.value})
    }

    changeProjectName(e){
        this.setState({new_project_name:e.target.value})
    }
    changeExp1(e){
        this.setState({new_exp_skill_industry:e.target.value})
    }
    changeExp2(e){
        this.setState({new_exp_non_skill:e.target.value})
    }
    changeD1(e){
        this.setState({new_designation_1:e.target.value})
    }
    changeO1(e){
        this.setState({new_organization_1_name:e.target.value})
    }
    changeT1(e){
        this.setState({new_total_tenure_1:e.target.value})
    }
    changeD2(e){
        this.setState({new_designation_2:e.target.value})
    }
    changeO2(e){
        this.setState({new_organization_2_name:e.target.value})
    }
    changeT2(e){
        this.setState({new_total_tenure_2:e.target.value})
    }
    changeD3(e){
        this.setState({new_designation_3:e.target.value})
    }
    changeO3(e){
        this.setState({new_organization_3_name:e.target.value})
    }
    changeT3(e){
        this.setState({new_total_tenure_3:e.target.value})
    }
    handleSSC(e){this.setState({new_ssc:e.target.value})}

    handleSave(){
        const cookies= new Cookies();
        this.setState({loader:true})
        var body={
        user: cookies.get("addedparam"),
        job:this.state.data.job,
        achievement: this.state.new_achievement,
        exp_skill_industry: this.state.new_exp_skill_industry,
        project_name: this.state.new_project_name,
        exp_non_skill: this.state.new_exp_non_skill,
        designation_1:this.state.new_designation_1,
        organization_1_name: this.state.new_organization_1_name,
        total_tenure_1: this.state.new_total_tenure_1,
        designation_2:this.state.new_designation_2,
        organization_2_name: this.state.new_organization_2_name,
        total_tenure_2: this.state.new_total_tenure_2,
        designation_3:this.state.new_designation_3,
        organization_3_name: this.state.new_organization_3_name,
        total_tenure_3: this.state.new_total_tenure_3,
        ssc:this.state.new_ssc,
        }
        axios.patch(`https://www.resolabindia.com/api/core/modify_provider_people/${this.state.data.id}/`, body, {
                     headers: {
                         'Authorization': `Token ${cookies.get("token")}`
                     },
                 })
                 .then((response)=>{
                     this.setState({loader:false,
                        achievement: response.data.achievement,
                        exp_skill_industry: response.data.exp_skill_industry,
                        project_name: response.data.project_name,
                        exp_non_skill: response.data.exp_non_skill,
                        designation_1:response.data.designation_1,
                        organization_1_name: response.data.organization_1_name,
                        total_tenure_1: response.data.total_tenure_1,
                        designation_2:response.data.designation_2,
                        organization_2_name: response.data.organization_2_name,
                        total_tenure_2: response.data.total_tenure_2,
                        designation_3:response.data.designation_3,
                        organization_3_name: response.data.organization_3_name,
                        total_tenure_3: response.data.total_tenure_3,
                        ssc: response.data.ssc,
                        edit: false
                    })

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
return(
    <Card style={{ width: '100%' }}>
    <Card.Body>
        <Card.Header as="h5">Achievements and Experiences
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
            <ListGroup.Item>Achievements:&nbsp;
            {edit===true?
            <textarea style={{width:"100%"}} value={this.state.new_achievement} onChange={this.changeAchievements}/>:
            this.state.achievement}</ListGroup.Item>
            <ListGroup.Item>Previous Experience: &nbsp;
            {edit===true?

                <input type="number" value={this.state.new_exp_skill_industry } onChange={this.changeExp1}/>: this.state.exp_skill_industry} Years</ListGroup.Item>
            <ListGroup.Item>Project Name: &nbsp;
            {edit===true?
                <select value={this.state.new_project_name} onChange={this.changeProjectName}>
                                    <option>DDUGKY</option>
                                    <option>PMKVY</option>
                                    <option>PMKK</option>
                                    <option>Others</option></select>

                :this.state.project_name}</ListGroup.Item>
                {this.state.data.job==='Domain Trainer'?
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
            <ListGroup.Item>Non-Skill Experience: &nbsp;
            {edit===true?
                <input type="number" value={this.state.new_exp_non_skill } onChange={this.changeExp2}/>:this.state.exp_non_skill} Years</ListGroup.Item>
            </div><div class="col-md" style={{margin:'0', padding:'0'}}>
            <ListGroup.Item>
                Designation 1: &nbsp; {edit===true?
                    <input value={this.state.new_designation_1 } onChange={this.changeD1}/>:this.state.designation_1}
            <br/>
            <br/>
                Organization 1: &nbsp; {edit===true?
                    <input value={this.state.new_organization_1_name} onChange={this.changeO1}/>:this.state.organization_1_name}
            <br/>
            <br/>
                Total Tenure 1: &nbsp; {edit===true?
                    <input type="number" value={this.state.new_total_tenure_1} onChange={this.changeT1}/>:this.state.total_tenure_1} Years
            </ListGroup.Item>
            <ListGroup.Item>
                Designation 2: &nbsp; {edit===true?
                    <input value={this.state.new_designation_2} onChange={this.changeD2}/>:this.state.designation_2}
            <br/>
            <br/>
                Organization 2: &nbsp; {edit===true?
                    <input value={this.state.new_organization_2_name} onChange={this.changeO2}/>:this.state.organization_2_name}
            <br/>
            <br/>
                Total Tenure 2: &nbsp; {edit===true?
                    <input type="number" value={this.state.new_total_tenure_2} onChange={this.changeT2}/>:this.state.total_tenure_2} Years
            </ListGroup.Item>
            <ListGroup.Item>
                Designation 3: &nbsp; {edit===true?
                    <input value={this.state.new_designation_3} onChange={this.changeD3}/>:this.state.designation_3}
            <br/>
            <br/>
                Organization 3: &nbsp; {edit===true?
                    <input value={this.state.new_organization_3_name} onChange={this.changeO3}/>:this.state.organization_3_name}
            <br/>
            <br/>
                Total Tenure 3: &nbsp;  {edit===true?
                    <input type="number" value={this.state.new_total_tenure_3} onChange={this.changeT3}/>:this.state.total_tenure_3} Years
            </ListGroup.Item>
            </div></div>
    </Card.Body>
    </Card>
  )
}
}
export default WorkEx
