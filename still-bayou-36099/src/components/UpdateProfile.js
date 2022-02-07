import React,{Component}  from 'react';
import {Form,Button,Card} from 'react-bootstrap';

import Cookies from "universal-cookie";
import axios from 'axios';

const cookies = new Cookies();
class UpdateProfile extends Component{

  constructor(props){
    super(props);
    this.state={
      i_industry : props.industry,
      i_is_seeker: props.is_seeker,
      i_is_provider:props.is_provider,
      i_other_industry:"",
      userID: cookies.get("token"),
      alert:false,
      loader: false
    }
  }


    handleIndustryChange = event =>
    {
      this.setState(
        {
          i_industry:event.target.value
        }
      )
    }
    handleOtherIndurstryChange = event =>
    {
      this.setState(
        {
          i_other_industry:event.target.value
        }
      )
    }

    handleCategoryChange = event =>{
      if(event.target.value==="Resource Seeker"){
      this.setState(
        {
          i_is_seeker:true,
          i_is_provider:false
        }
      )
    }

    else if(event.target.value==="Resource Provider"){
      this.setState(
        {
          i_is_provider:true,
          i_is_seeker:false
        }
      )
    }
    }

    handleUpdateProfile = event =>{
      event.preventDefault();
      const body = {
        industry : this.state.i_industry,
        is_seeker : this.state.i_is_seeker,
        is_provider : this.state.i_is_provider
      }

      axios.post('https://www.resolabindia.com/api/core/update_user_profile/', body, {
          headers:{
              'Authorization': `Token ${cookies.get("token")}`
          },
      })
      .then((response) => {
        console.log("successful");
        cookies.set("industry", this.state.i_industry, {
            path: "/",
        });
        cookies.set("is_seeker", this.state.i_is_seeker, {
            path: "/",
        });
        cookies.set("is_provider", this.state.i_is_provider, {
            path: "/",
        });
        this.props.handleUpdateProfile("success");

      }, (error) => {
          this.props.handleUpdateProfile("error")

      });
    }

  render(){
    console.log(this.props)
    console.log(this.state.i_is_seeker+" "+this.state.i_is_provider+" "+(this.state.i_is_seeker||this.state.i_is_provider))
    console.log(this.state.i_industry)
    return(
      <div style={{marginTop:"20px"}}>
      <h5>We need you to update some informations</h5>
    <Card style={{ height:'100%',width: '300px', margin:'auto',marginTop:'20px',align:"Centre",padding:"auto"}} className= "ui card shadow-card">

    <Form noValidate validated={this.state.validated} onSubmit={this.handleUpdateProfile}>
    <Form.Group style = {{padding:"10px"}}>
    {this.props.industry==="NA"?
    <Form.Row>

        <Form.Label>
            Industry:
        </Form.Label>

        <Form.Control
        required
        as="select"
        placeholder="Industry"
        value={this.state.industry}
        onChange={this.handleIndustryChange}
        >
        <option selected value="">Select :</option>
        <option>Skilling</option>
        <option>Microfinance</option>
        <option>Other</option>
        </Form.Control>
    </Form.Row>

      :null
  }

  {

      this.state.i_industry==="Other"?
      <Form.Row>
      <Form.Label >
          Enter Industry Name:
      </Form.Label>
      <Form.Control
      required
      type="text"
      placeholder=""
      value={this.state.others_industry}
      onChange={this.handleOtherIndurstryChange}
      />
      </Form.Row>
      :null
    }



  {
    (this.props.is_seeker||this.props.is_provider)?null:
    <Form.Row>
    <Form.Label >
        Category:
    </Form.Label>


    <Form.Control
    required
    as="select"
    placeholder=""
    value={this.state.category}
    onChange={this.handleCategoryChange}
    >
    <option selected value="">Select :</option>
    <option>Resource Seeker</option>
    <option>Resource Provider</option>
    </Form.Control>
    </Form.Row>

  }
  <br />
  <Button className="inf_b1" variant="primary" type="submit" >
      Submit
  </Button>
  </Form.Group>

  </Form>

    </Card>
    </div>
  )
  }

};

export default UpdateProfile;
