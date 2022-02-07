import React, { Component } from 'react'
import { Container,Card,Row,ListGroup,Image, Button} from 'react-bootstrap';
import Cookies from "universal-cookie";
import axios from 'axios';

export class ServiceOffered extends Component {
    constructor(props){
        super(props);
        this.state={
          details:this.props.details,
          edit: false,
          //category_name: this.props.details.job.category.category_name,
          job_name: this.props.details.job,
          geo_presence:this.props.details.geo_presence,
          new_geo_presence:this.props.details.geo_presence
        }
        this.editclick=this.editclick.bind(this);
        this.handleGeoPresence = this.handleGeoPresence.bind(this);
        this.handleSave = this.handleSave.bind(this);

    }
    handleGeoPresence(e){this.setState({new_geo_presence:e.target.value})}
    editclick(){
        if(this.state.edit===false)this.setState({edit:true})
        else  this.setState({edit:false})}

        handleSave(){
            const cookies= new Cookies();
            this.setState({loader:true})
            var body={
            user: cookies.get("addedparam"),
            job:this.props.details.job,
            geo_presence:this.state.new_geo_presence
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
                            geo_presence:response.data.geo_presence,
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
            <Card.Header as="h4">
            {/*object.job.category.category_name*/}
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
                    <ListGroup.Item>Service Category: &nbsp;
                    { /*this.state.category_name*/}
                    </ListGroup.Item>
                    <ListGroup.Item>Service Offered:  &nbsp;

                            {this.state.job_name}
                    </ListGroup.Item>
                    <ListGroup.Item>Geo-presence: &nbsp;
                    {edit===true?
                        <input style={{width:'70%'}} value={this.state.new_geo_presence} onChange={this.handleGeoPresence}/>:
                            this.state.geo_presence}
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
            </Card>
          )
        }
    }

export default ServiceOffered
