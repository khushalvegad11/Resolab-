import React,{Component} from 'react';
import {Form,Button,Container,Alert} from 'react-bootstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';
import LoadingElement from './Loader';
import firebase from './firebase/firebase';
import "../style/css/details.css";
import Footer from './footer'
import one from './one.jpg'


class DetailForm extends Component{
    constructor(props){
        super(props);
        this.state={
            name:"",
            email_id:"",
            password:"",
            picture_url:"",
            pictures:null,
            dob:"",
            region: "",
            industry:"",
            other_industry:"",
            is_seeker:false,
            is_provider:false,
            phone_number:props.phone_number,
            userID:"",
            isuser:false,
            loader:false,
            validated:false,
            alert:false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handled1=e=>{
        if(document.getElementById("d1").style.display==="none")
        document.getElementById("d1").style.display="block";
        else
        document.getElementById("d1").style.display="none";
    }

    handled2=e=>{
        if(document.getElementById("d2").style.display==="none")
        document.getElementById("d2").style.display="block";
        else
        document.getElementById("d2").style.display="none";
    }

    handleNameChange=event=>{
        this.setState({
            name: event.target.value,
            phone_number: this.props.phone_number
        });
    }
    handlefileChange = event => {
        console.log(event);
        if (event.target.files[0].size > 4194304) {
            alert("File Size is too big!!");
            this.setState({
                pictures: null
            });
        } else {
            this.setState({
                pictures: event.target.files[0]
            });
        }
    }
    handleDobChange = event => {
        this.setState({
            dob: event.target.value
        });
    }
    handleRegionChange = event =>{
        console.log(this.state.region);
        this.setState({
            region: event.target.value
        });
        console.log(event.target.value);
    }
    handleEmailChange = event =>{
        this.setState({
            email_id:event.target.value
        })
    }
    handlePasswordChange = event =>{
        this.setState({
            password: event.target.value
        })

        console.log(this.state.password);
    }
    handleIndustryChange = event =>
    {
      this.setState(
        {
          industry:event.target.value
        }
      )
    }
    handleOtherIndurstryChange = event =>
    {
      this.setState(
        {
          other_industry:event.target.value
        }
      )
    }

    handleCategoryChange = event =>{
        console.log(event.target.value)
      if(event.target.value==="Resource Seeker"){
      this.setState(
        {
          is_seeker:true,
          is_provider:false
        }
      )
    }

    else{
      this.setState(
        {
          is_provider:true,
          is_seeker:false
        }
      )
    }
    }


    setShow=event=>{
        this.setState({
            alert:false
        })
    }
    handleSubmit(event){
        const form = event.currentTarget;
        const fd = new FormData();
        console.log(fd);
        if (this.state.pictures===null)
        {
           event.preventDefault();
           event.stopPropagation();
           this.setState({
              alert:true
           });
        }
        //console.log(this.state.pictures[0]);
        if (form.checkValidity() === false) {
            console.log(this.state.pictures);
            event.preventDefault();
            event.stopPropagation();
            this.setState({
                validated:true
            })
        }
        else{
            event.preventDefault();
            this.setState({
                loader: true
            })

            firebase.auth().createUserWithEmailAndPassword(this.state.email_id,this.state.password)
            .then(user=>{
                this.setState({
                    userID: user.user.uid,
                });
                // axios.get('https://www.resolabindia.com/api/core/get_presigned_url',
                axios.get(
                  `https://www.resolabindia.com/api/core/get_presigned_url/?file_name=${this.state.phone_number}${this.state.pictures.name}`
                )
                  .then((response) => {
                    console.log("responsedata > ", response.data);

                    const awsurl = response.data.url;
                    const awskey = response.data.fields.key;
                    fd.append("key", response.data.fields.key);
                    fd.append(
                      "file",
                      this.state.pictures,
                      this.state.pictures.name
                    );
                    fd.append(
                      "AWSAccessKeyId",
                      response.data.fields.AWSAccessKeyId
                    );
                    fd.append("policy", response.data.fields.policy);
                    fd.append("signature", response.data.fields.signature);
                    axios
                      .post(response.data.url, fd, {
                        headers: {
                          "Content-Type": undefined
                        }
                      })
                      .then((response) => {
                        var body = {
                          uid: this.state.userID,
                          name: this.state.name,
                          email: this.state.email_id,
                          profile_pic_url: awsurl + awskey,
                          registered_region: this.state.region,
                          phone_number: "+91" + this.state.phone_number,
                          addedparam:
                            this.state.name +
                            " " +
                            "+91" +
                            this.state.phone_number,
                          date_of_birth: this.state.dob,
                          is_verified: false,
                          is_subscribed: false,
                          is_seeker: this.state.is_seeker,
                          is_provider: this.state.is_provider,
                          industry:
                            this.state.industry === "Other"
                              ? this.state.other_industry
                              : this.state.industry
                        };
                        // console.log("posthere")
                        // console.log(body)
                        axios
                          .post(
                            "https://www.resolabindia.com/api/core/register/",
                            body
                          )
                          .then(
                            (response) => {
                              // console.log("console response of register api post" + response);
                              this.setState({
                                loader: false,
                                isuser: true
                              });
                              alert("Sign up Successful!!");

                              var message = {
                                service_id: "service_fpn7em3",
                                template_id: "template_z8ce1cw",
                                user_id: "user_MyObHSimpGBoC5C1m6J7J",
                                template_params: {
                                  name: this.state.name,
                                  email: this.state.email_id
                                }
                              };
                              console.log(message);
                              axios
                                .post(
                                  "https://api.emailjs.com/api/v1.0/email/send",
                                  message
                                )
                                .then(
                                  (result) => {
                                    console.log(result.data);
                                  },
                                  (error) => {
                                    console.log(error);
                                  }
                                );
                            },
                            (error) => {
                              this.setState({
                                loader: false
                              });
                              console.log(this.state.userID);
                              console.log(this.state.name);
                              console.log(this.state.email_id);
                              console.log("+91" + this.props.phone_number);
                              console.log(awsurl + awskey);
                              console.log(this.state.dob);
                              console.log(this.state.region);
                              console.log(error.response);
                              alert(
                                error +
                                  ". Please Retry With different EmailID or Contact Team"
                              );
                            }
                          );
                      })
                      .catch((error) => {
                        this.setState({
                          loader: false
                        });
                        alert(error);
                      });
                  })
                  .catch((error) => {
                    console.log(error);

                    this.setState({
                      loader: false
                    });
                    alert(error);
                  });
            })
            .catch((error)=>{

                this.setState({
                    loader: false
                });
                alert(error);
            });
        }

    }
    render(){
        if(this.state.loader===true)
        {
            return <LoadingElement/>
        }
        else if(this.state.isuser===true)
        {
            return(
                <h2>Please Click on <Link to='/login'>Login</Link> to continue</h2>
            );
        }
        else{
            return (
                <div>
                <div class="main-title row"><br/>
                <Container fluid className="col-xs-10 col-md-6 signup2 shadow-box"  style={{height:"auto"}} >
                <Form style={{textAlign:'left'}} className="signUp-form" noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>

                <h3>Hello {this.props.phone_number}!</h3>
                <img alt="one" src={one} height="40" width="80"/>

                    <Form.Group>
                        <br />
                        <Form.Row>

                            <Form.Label class="required" >
                                Full Name:
                            </Form.Label>


                            <Form.Control
                            required
                            type="text"
                            placeholder="Full Name"
                            value={this.state.name}
                            onChange={this.handleNameChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please write correct name
                            </Form.Control.Feedback>

                        </Form.Row>
                        <br />
                        <Form.Row>

                            <Form.Label class="required" >
                                Email:
                            </Form.Label>

                            <Form.Control
                            required
                            type="email"
                            placeholder="Email ID"
                            value={this.state.email_id}
                            onChange={this.handleEmailChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please write correct Email address
                            </Form.Control.Feedback>

                        </Form.Row>
                        <br />
                        <Form.Row>

                            <Form.Label class="required" >
                                Password:
                            </Form.Label>

                                <Form.Control
                                required
                                type="password"
                                placeholder="*********"
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Password
                                </Form.Control.Feedback>

                        </Form.Row>
                        <br />
                            <Form.Row>

                                <Form.Label class="required" >
                                    Upload Your Profile Picture:
                                </Form.Label>

                                <Form.File>
                                <Form.File.Input
                                required
                                onChange={this.handlefileChange}
                                />
                                    </Form.File>

                            </Form.Row>
                        <br/>
                        {this.state.alert?
                        <Alert variant="danger" onClose={() => this.setShow()} dismissible>
                            <Alert.Heading>Please add your profile picture</Alert.Heading>
                        </Alert>
                        :null}

                        <Form.Row>

                            <Form.Label class="required" >
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
                      <br/>

                      {
                        this.state.industry==="Other"?
                        <Form.Row>
                        <Form.Label class="required" >
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
                      <Form.Row>


                      <Form.Label class="required" >
                          Category:
                      </Form.Label>
                      &nbsp; &nbsp;&nbsp;&nbsp;
                      <Form.Row>
                      <input onMouseEnter={this.handled1}
                      onMouseLeave={this.handled1}
                      required
                      type="radio" name="category"
                      value="Resource Seeker"
                      onChange={this.handleCategoryChange}
                      />Resource Seeker
                      &nbsp; &nbsp;
                       <input
                      required
                      type="radio" name="category"
                      value="Resource Provider"
                      onMouseEnter={this.handled2}
                      onMouseLeave={this.handled2}
                      onChange={this.handleCategoryChange}
                      />Resource Provider
                      <Form.Control.Feedback type="invalid">
                                    Select Category
                                </Form.Control.Feedback>
                                </Form.Row>
                      </Form.Row>
                      <div id="d1" style={{border:"1px solid black", backgroundColor:"yellow", display:"none", padding:"1%", maxWidth:"80%"}}>SignUp as Resource Seeker if you are looking for verified and reliable resources</div>
<div id="d2" style={{backgroundColor:"yellow", display:"none" ,border:"1px solid black",  padding:"1%", maxWidth:"80%"}}>SignUp as Resource Provider if you are a resource with professional set of skills or can provide services as resource to market</div>
                    <br />

                        <Form.Row>

                            <Form.Label class="required" >
                                Date of Birth:
                            </Form.Label>

                                <Form.Control
                                required
                                type="date"
                                placeholder="DD/MM/YYYY"
                                value={this.state.dob}
                                onChange={this.handleDobChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Date of Birth
                                </Form.Control.Feedback>

                        </Form.Row>
                        <br />
                        <Form.Row>

                            <Form.Label class="required" >
                                State:
                            </Form.Label>

                                <Form.Control
                                required
                                as="Select"
                                placeholder="Region"
                                value={this.state.region}
                                onChange={this.handleRegionChange}
                                >
                                <option selected value="">Select :</option>
                                <option>Andaman and Nicobar Islands</option>
                                <option>Andhra Pradesh</option>
                                <option>Arunachal Pradesh</option>
                                <option>Assam</option>
                                <option>Bihar</option>
                                <option>Chandigarh</option>
                                <option>Chhattisgarh</option>
                                <option>Dadra and Nagar Haveli</option>
                                <option>Daman and Diu</option>
                                <option>Delhi</option>
                                <option>Goa</option>
                                <option>Gujarat</option>
                                <option>Haryana</option>
                                <option>Himachal Pradesh</option>
                                <option>Jammu and Kashmir</option>
                                <option>Jharkhand</option>
                                <option>Karnataka</option>
                                <option>Kerala</option>
                                <option>Ladakh</option>
                                <option>Lakshadweep</option>
                                <option>Madhya Pradesh</option>
                                <option>Maharashtra</option>
                                <option>Manipur</option>
                                <option>Meghalaya</option>
                                <option>Mizoram</option>
                                <option>Nagaland</option>
                                <option>Odisha</option>
                                <option>Puducherry</option>
                                <option>Punjab</option>
                                <option>Rajasthan</option>
                                <option>Sikkim</option>
                                <option>Tamil Nadu</option>
                                <option>Telangana</option>
                                <option>Tripura</option>
                                <option>Uttar Pradesh</option>
                                <option>Uttarakhand</option>
                                <option>West Bengal</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Choose Correct State
                                </Form.Control.Feedback>

                        </Form.Row>

                        </Form.Group>
                        <Button className="details_b1" variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <br />
                <div class="jss56">By logging in you agree to our <a href="/PrivacyPolicy" target="_blank">Privacy Policy</a> and <a href="/TNC" target="_blank">T&amp;C</a></div>
                    </Container></div>
                    <Footer/>
                </div>
    );
        }

    }
}
export default DetailForm;
