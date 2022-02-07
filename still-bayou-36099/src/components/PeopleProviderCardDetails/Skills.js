import React, { Component } from 'react'
import {Card,ListGroup,Container, Button, Carousel, Image} from 'react-bootstrap';
import Cookies from "universal-cookie";
import axios from 'axios';

export class Skills extends Component {
    constructor(props){
        super(props);
        this.state={
          details:this.props.details,
          edit:false,
          skill_1:this.props.details.skill_1,
          skill_2:this.props.details.skill_2,
          skill_3:this.props.details.skill_3,
          skill_4:this.props.details.skill_4,
          skill_5:this.props.details.skill_5,
          incidence_1:this.props.details.incidence_1,
          incidence_2:this.props.details.incidence_2,
          incidence_3:this.props.details.incidence_3,
          incidence_4:this.props.details.incidence_4,
          incidence_5:this.props.details.incidence_5,
          new_skill_1:this.props.details.skill_1,
          new_skill_2:this.props.details.skill_2,
          new_skill_3:this.props.details.skill_3,
          new_skill_4:this.props.details.skill_4,
          new_skill_5:this.props.details.skill_5,
          new_incidence_1:this.props.details.incidence_1,
          new_incidence_2:this.props.details.incidence_2,
          new_incidence_3:this.props.details.incidence_3,
          new_incidence_4:this.props.details.incidence_4,
          new_incidence_5:this.props.details.incidence_5,
        }
        this.editclick=this.editclick.bind(this);
        this.handleS1=this.handleS1.bind(this);
        this.handleS2=this.handleS2.bind(this);
        this.handleS3=this.handleS3.bind(this);
        this.handleS4=this.handleS4.bind(this);
        this.handleS5=this.handleS5.bind(this);
        this.handleI1=this.handleI1.bind(this);
        this.handleI2=this.handleI2.bind(this);
        this.handleI3=this.handleI3.bind(this);
        this.handleI4=this.handleI4.bind(this);
        this.handleI5=this.handleI5.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleSave(){
        const cookies= new Cookies();
        this.setState({loader:true})
        var body={
        user: cookies.get("addedparam"),
        job:this.props.details.job,
        skill_1:this.state.new_skill_1,
        skill_2:this.state.new_skill_2,
        skill_3:this.state.new_skill_3,
        skill_4:this.state.new_skill_4,
        skill_5:this.state.new_skill_5,
        incidence_1: this.state.new_incidence_1,
        incidence_2: this.state.new_incidence_2,
        incidence_3: this.state.new_incidence_3,
        incidence_4: this.state.new_incidence_4,
        incidence_5: this.state.new_incidence_5,

        }
        var path=`https://www.resolabindia.com/api/core/modify_provider_people/${this.state.details.id}/`
        axios.patch(path, body, {
                     headers: {
                         'Authorization': `Token ${cookies.get("token")}`
                     },
                 })
                 .then((response)=>{
                     this.setState({loader:false,
                        skill_1:response.data.skill_1,
                        skill_2:response.data.skill_2,
                        skill_3:response.data.skill_3,
                        skill_4:response.data.skill_4,
                        skill_5:response.data.skill_5,
                        incidence_1: response.data.incidence_1,
                        incidence_2: response.data.incidence_2,
                        incidence_3: response.data.incidence_3,
                        incidence_4: response.data.incidence_4,
                        incidence_5: response.data.incidence_5,
                        edit: false
                    })
                     })

                .catch((error) => {
                       console.log(error);
                       this.setState({
                           loader: false,
                       })
                        alert("Error Occured");
                   });
    }
    handleS1(e){this.setState({new_skill_1:e.target.value})}
    handleS2(e){this.setState({new_skill_2:e.target.value})}
    handleS3(e){this.setState({new_skill_3:e.target.value})}
    handleS4(e){this.setState({new_skill_4:e.target.value})}
    handleS5(e){this.setState({new_skill_5:e.target.value})}
    handleI1(e){this.setState({new_incidence_1:e.target.value})}
    handleI2(e){this.setState({new_incidence_2:e.target.value})}
    handleI3(e){this.setState({new_incidence_3:e.target.value})}
    handleI4(e){this.setState({new_incidence_4:e.target.value})}
    handleI5(e){this.setState({new_incidence_5:e.target.value})}
    editclick(){
        if(this.state.edit===false)this.setState({edit:true})
        else  this.setState({edit:false})}
    render() {
        var object = this.state.details;
        var edit=this.state.edit;
        const cookies = new Cookies();
        return (
            <Card style={{ width: '100%' }}>

        <Card.Body>
        <Card.Header as="h4">Skills

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
    </m>}</Card.Header>
            <ListGroup variant="flush">
            <ListGroup.Item>Skill 1: &nbsp;
                    {edit===true?
                        <input style={{width:'70%'}} value={this.state.new_skill_1} onChange={this.handleS1}/>:
                            this.state.skill_1}
                    </ListGroup.Item>
            <ListGroup.Item>Incidence : &nbsp;
                    {edit===true?
                        <textarea style={{width:'70%'}} value={this.state.new_incidence_1} onChange={this.handleI1}/>:
                            this.state.incidence_1}
                    </ListGroup.Item>

            <ListGroup.Item>Skill 2: &nbsp;
                    {edit===true?
                        <input style={{width:'70%'}} value={this.state.new_skill_2} onChange={this.handleS2}/>:
                            this.state.skill_2}
                    </ListGroup.Item>

            <ListGroup.Item>Incidence : &nbsp;
                    {edit===true?
                        <textarea style={{width:'70%'}} value={this.state.new_incidence_2} onChange={this.handleI2}/>:
                            this.state.incidence_2}
                    </ListGroup.Item>
            <ListGroup.Item>Skill 3: &nbsp;
                    {edit===true?
                        <input style={{width:'70%'}} value={this.state.new_skill_3} onChange={this.handleS3}/>:
                            this.state.skill_3}
                    </ListGroup.Item>
            <ListGroup.Item>Incidence : &nbsp;
                    {edit===true?
                        <textarea style={{width:'70%'}} value={this.state.new_incidence_3} onChange={this.handleI3}/>:
                            this.state.incidence_3}
                    </ListGroup.Item>
            <ListGroup.Item>Skill 4: &nbsp;
                    {edit===true?
                        <input style={{width:'70%'}} value={this.state.new_skill_4} onChange={this.handleS4}/>:
                            this.state.skill_4}
                    </ListGroup.Item>
            <ListGroup.Item>Incidence : &nbsp;
                    {edit===true?
                        <textarea style={{width:'70%'}} value={this.state.new_incidence_4} onChange={this.handleI4}/>:
                            this.state.incidence_4}
                    </ListGroup.Item>
            <ListGroup.Item>Skill 5: &nbsp;
                    {edit===true?
                        <input style={{width:'70%'}} value={this.state.new_skill_5} onChange={this.handleS5}/>:
                            this.state.skill_5}
                    </ListGroup.Item>
            <ListGroup.Item>Incidence : &nbsp;
                    {edit===true?
                        <textarea style={{width:'70%'}} value={this.state.new_incidence_5} onChange={this.handleI5}/>:
                            this.state.incidence_5}
                    </ListGroup.Item>

            </ListGroup>
        </Card.Body>
        </Card>
        )
    }
}

export default Skills
