import React, { Component } from 'react'
import {Form,Col,Button,Container} from 'react-bootstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Cookies from "universal-cookie";
import Switch from "react-switch";
import Footer from './footer';


const cookies = new Cookies();
class SeekerServiceForm extends Component {
    constructor(props){
        super(props);
        this.state={
            category:"",
            is_authorized:false,
            user:"",
            pia_tp_name: "",
            job:"Others",
            area:0,
            other_requirements:"",
            projectname:"none",
            city: "npne",
            state:"none",
            location: "none",
            reporting_manager_name:"",
            manager_designation:"",
            manager_contact_number:"0000000000",
            manager_email_id:"",
            contact_person_name:"",
            contact_person_designation:"",
            contact_person_number:"0000000000",
            contact_person_email_id:"",
            specific_facility:"",
            isuser:false,
            validated:false,
            checked:false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleIsAuthorizedChange = this.handleIsAuthorizedChange.bind(this)
    }
    handleIsAuthorizedChange = checked =>{
        this.setState({
            checked
        });
        console.log(checked);
    }
    handleCategoryChange = event =>{
        this.setState({
            category: event.target.value
        });
    }

    handleLocationChange = event =>{
      this.setState({
          location: event.target.value
      });
  }

  handleReportingManagerNameChange = event =>{
    this.setState({reporting_manager_name:event.target.value})
  }

  handleManagerDesignationChange = event =>{
    this.setState({manager_designation:event.target.value})
  }

  handleManagerEmailIdChange =event=>{
    this.setState({manager_email_id:event.target.value})
  }

    handleUserNo = event => {
      this.setState({
        user: event.target.value,
      });
    }
    handlePiaTpName=event=>{
        this.setState({
            pia_tp_name: event.target.value,
        });
    }
    handleJobChange = event => {
        this.setState({
            job: event.target.value
        })
    }
    handleAreaChange=event=>{
      this.setState({
          area: event.target.value
      })
    }
    handleOtherRequirementsChange=event=>{
      this.setState({
          other_requirements:event.target.value
      })
    }
    handleProjectNameChange = event =>{
        this.setState({
            projectname:event.target.value
        })
    }
    handleStateChange = event =>{
      this.setState({
          state:event.target.value
      })
    }
    handleCityChange = event => {
        this.setState({
            city: event.target.value
        });
    }
    handleContactPersonNameChange = event =>{
        this.setState({
            contact_person_name: event.target.value
        });
    }
    handleContactPersonDesignationChange = event =>{
        this.setState({
            contact_person_designation: event.target.value
        });
    }
    handleContactPersonNumberChange= event=>{
        this.setState({
            contact_person_number: event.target.value
        });
    }
    handleContactPersonEmailChange= event=>{
        this.setState({
            contact_person_email_id: event.target.value
        });
    }
    handleSpecificFacilityChange=event=>{
      this.setState({
          specific_facility:event.target.value
      })
    }
    handleSubmit(event){
        console.log(event);
        const form = event.currentTarget;
        console.log(form.checkValidity());
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            this.setState({
                validated: true
            })
        }
        else{
          var url, body
            event.preventDefault();
            if(this.state.category==="Infrastructure Services"){
                 url="https://www.resolabindia.com/api/core/create_seeker_infraserv/";
                 body=
                {
                    user: cookies.get("addedparam"),
                    industry: cookies.get("industry"),
                    job: this.state.job,
                    pia_tp_name: this.state.pia_tp_name,
                    total_area:this.state.area,
                    oth_requirements:this.state.other_requirements,
                    project: this.state.projectname,
                    project_location_state: this.state.state,
                    project_location_district:this.state.city,
                    contact_name: this.state.contact_person_name,
                    contact_phone_no: "+91"+this.state.contact_person_number,
                    contact_designation: this.state.contact_person_designation,
                    contact_email: this.state.contact_person_email_id,
                    specific_facility:this.state.specific_facility
                };
            }
            else if(this.state.category==="Allied Services" || this.state.category==="Advisory Services")
            {
                 url= 'https://www.resolabindia.com/api/core/create_seeker_adalserv/'
                 body=
                {
                    user: cookies.get("addedparam"),
                    industry: cookies.get("industry"),
                    job:"Others",
                    job1: this.state.job,
                    pia_tp_name: this.state.pia_tp_name,
                    project: this.state.projectname,
                    project_location: this.state.location,
                    contact_name: this.state.contact_person_name,
                    contact_phone_no: "+91"+this.state.contact_person_number,
                    contact_designation: this.state.contact_person_designation,
                    contact_email: this.state.contact_person_email_id,
                    reporting_manager_name: this.state.reporting_manager_name,
                    manager_designation: this.state.manager_designation,
                    manager_contact_number:"+91"+this.state.manager_contact_number,
                    manager_email_id: this.state.manager_email_id
                }
            }
            axios.post(url, body,{
                headers:{
                    'Authorization': `Token ${cookies.get("token")}`
                }
            })
            .then((response) => {
                console.log(body);
                this.setState({
                    isuser:true,
                })
                axios.patch(`https://www.resolabindia.com/api/core/modify_user_profile/${cookies.get('id')}/`,
                {
                    user: cookies.get('user'),
                    card_made: true
                }
                , {headers:{'Authorization': `Token ${cookies.get("token")}`},
                })
                .then(response=>{
                    cookies.set("card_made", response.data.card_made, {
                        path: "/",
                    });
                    console.log("Sucess");
                    alert("Successful!!");
                  })
                .catch((error)=>{
                    console.log(error)
                  })
            }, (error) => {
              console.log(body, url);
                console.log(`Token ${cookies.get("token")}`);
                console.log(error)
                alert(error+". Please Retry");
            });
        }
    }
    render() {
        if(this.state.isuser===true)
        {
            return(
                <Container className="block">
                <h2>Go to <Link to='/'>Home Page</Link></h2>
                </Container>
            );
        }
        else{
            return (
            <div fluid className="main-title" style={{"backgroundColor":"aliceblue"}}>

                <div className="Resource Card seeker">
                <h3>Resource Card</h3>
                <div>
                  <label>
                    <span><h6>Are you authorized ?{" "}</h6></span>
                    <Switch
                      onChange={this.handleIsAuthorizedChange}
                      checked={this.state.checked}
                      uncheckedIcon={false}
                      checkedIcon={false}
                    />
                  </label>
                </div>
              { this.state.checked &&
                <div>

                <Form
                  noValidate
                  validated={this.state.validated}
                  onSubmit={this.handleSubmit}
                  checkedIcon={false}
                  uncheckedIcon={false}

                >
                  <Form.Group>
                  <br />
                  <h4 style={{"text-align":"middle"}}>About the Organization</h4>
                  <br/>
                    <Form.Row>
                    <Form.Label className="required Label" column="lg" lg={4}>
                     Organisation Name:
                  </Form.Label>
                      <Col>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Organisation name"
                          value={this.state.pia_tp_name}
                          onChange={this.handlePiaTpName}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please write correct PIA/TP name
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <Form.Row>
                      <Form.Label className="required Label " column="lg" lg={4}>
                        Legal Status:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          required
                          as="select"
                          placeholder="Legal Status"
                          value={this.state.legal_status}
                          onChange={this.handleLegalStatusChange}
                        >
                        <option selected value="">Select :</option>
                        {this.props.location.state.industry==="Skilling" ?
                        <option>Propritorship</option>:<option>NBFC-MFI</option>}
                        {this.props.location.state.industry==="Skilling" ?
                        <option>Partnership</option>:<option>Section 8 Company</option>}
                        {this.props.location.state.industry==="Skilling" ?
                        <option>LLP</option>:null}
                        {this.props.location.state.industry==="Skilling" ?
                        <option>Company</option>:null}
                        <option>Trust</option>
                        <option>Society</option>
                        <option>Others</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Please write correct legal status
                        </Form.Control.Feedback>
                      </Col>

                    </Form.Row>
                    <Form.Row>
                      <Form.Label className=" Label required" column="lg" lg={4}>
                        Location:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Location"
                          //value={this.state.projectname}
                          //onChange={this.handleProjectNameChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Write Correct Location
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>

                    <Form.Row>
                      <Form.Label className="Label required" column="lg" lg={4}>
                        Service Category:
                      </Form.Label>
                      <Col>
                        <Form.Control
                            required
                            as="Select"
                            placeholder="Job"
                            value={this.state.job}
                            onChange={this.handleCategoryChange}
                        >
                            <option selected value="">Select :</option>
                            <option>Infrastructure Services</option>
                            <option>Allied Services</option>
                            <option>Advisory Services</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Choose correct Service
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <Form.Row>
                      <Form.Label className=" Label required" column="lg" lg={4}>
                        Service Required:
                      </Form.Label>
                      <Col>
                      {(() => {
                        switch (this.state.category) {
                          case "Infrastructure Services":
                            return (
                        <Form.Control
                            required
                            as="Select"
                            placeholder="Job"
                            value={this.state.job}
                            onChange={this.handleJobChange}
                        >
                        <option selected value="">Select:</option>
                        <option>Training Centre</option>
                        {this.props.location.state.industry==="Microfinance" ?
                        <option>Office Space</option>:<option>Hostel</option>}

                        <option value="Others in Infra">Others</option>
                        </Form.Control>)
                        case "Allied Services":
                            return (
                                <Form.Control
                                    required
                                    as="Select"
                                    placeholder="Job"
                                    value={this.state.job}
                                    onChange={this.handleJobChange}
                                >
                                    <option selected value="">Select :</option>
                                    <option>Catering Services</option>
                                    <option>Furniture</option>
                                    <option>IT services</option>
                                    <option>Printing & Branding</option>
                                    <option value="Others in Allied Services">Others</option>
                                </Form.Control>)
                        case "Advisory Services":
                            return (
                                <Form.Control
                                    required
                                    as="Select"
                                    placeholder="Job"
                                    value={this.state.job}
                                    onChange={this.handleJobChange}
                                >
                                    <option selected value="">Select :</option>
                                    <option>Catering Services</option>
                                    <option>Classroom & Hostel Furniture</option>
                                    <option>IT services</option>
                                    <option>Printing & Branding</option>
                                    <option value="Others in Allied Services">Others</option>
                                </Form.Control>);
                            default:
                            return (<Form.Control
                              required
                              type="text"
                              placeholder="Job"
                          >
                          </Form.Control>);
                        }
                    })()}

                        <Form.Control.Feedback type="invalid">
                          Choose correct Service
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>

                    {(() => {
                      switch (this.state.category) {
                        case "Infrastructure Services":
                      return (<div>
                          <h5 style={{"text-align":"middle"}}>Infrastructure Specification</h5>
                      <br/>


                                          <Form.Row>
                                            <Form.Label className="Label required" column="lg" lg={4}>
                                              Total Area:
                                            </Form.Label>
                                            <Col>
                                              <Form.Control
                                                required
                                                type="number"
                                                placeholder="Total Area"
                                                value={this.state.area}
                                                onChange={this.handleAreaChange}
                                              />
                                              <Form.Control.Feedback type="invalid">
                                                Write Correct Area
                                              </Form.Control.Feedback>
                                            </Col>
                                          </Form.Row>
                                          <Form.Row>
                                            <Form.Label className="Label required" column="lg" lg={4}>
                                              Other Requirements:
                                            </Form.Label>
                                            <Col>
                                              <Form.Control
                                                required
                                                type="text"
                                                placeholder="Other Requirements"
                                                value={this.state.other_requirements}
                                                onChange={this.handleOtherRequirementsChange}
                                              />
                                              <Form.Control.Feedback type="invalid">
                                                Write Other Requirements
                                              </Form.Control.Feedback>
                                            </Col>
                                          </Form.Row>


                      <Form.Row>
                        <Form.Label className="Label required" column="lg" lg={4}>
                          Any specific facility required:
                        </Form.Label>
                        <Col>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Any Specific Facility Required"
                            value={this.state.specific_facility}
                            onChange={this.handleSpecificFacilityChange}
                          />
                          <Form.Control.Feedback type="invalid">
                            Write Specific Facility required or write none
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Row>
                      </div>)
                      default:
                                return null
                            }
                          })()}
                          <Form.Row>
                          <Form.Label className="Label required" column="lg" lg={4}>
                                Service Location (state)
                              </Form.Label>
                              <Col>
                                <Form.Control
                                  required
                                  type="text"
                                  placeholder="Service Location"
                                  //value={this.state.specific_facility}
                                  //onChange={this.handleSpecificFacilityChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                  Write Correct Location State
                                </Form.Control.Feedback>
                              </Col>
                          </Form.Row>
                          <Form.Row>
                          <Form.Label className="Label required" column="lg" lg={4}>
                                Service Location (district)
                              </Form.Label>
                              <Col>
                                <Form.Control
                                  required
                                  type="text"
                                  placeholder="Service Location District"
                                  //value={this.state.specific_facility}
                                  //onChange={this.handleSpecificFacilityChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                  Write Correct Location District
                                </Form.Control.Feedback>
                              </Col>
                          </Form.Row><br/>
                    <h5 style={{"text-align":"middle"}}>
                    Single Point of Contact (SPOC) </h5> <br/>
                    <Form.Row>
                      <Form.Label className="Label required" column="lg" lg={4}>
                        Name:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Contact Person Name"
                          value={this.state.contact_person_name}
                          onChange={this.handleContactPersonNameChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Write Correct Name
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <Form.Row>
                      <Form.Label className="Label required" column="lg" lg={4}>
                        Designation:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Contact Person Designation"
                          value={this.state.contact_person_designation}
                          onChange={this.handleContactPersonDesignationChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Write Correct Designation
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <Form.Row>
                      <Form.Label className="Label required" column="lg" lg={4}>
                        Phone Number:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          required
                          type="tel"
                          placeholder="Contact Person Phone Number"
                          onChange={this.handleContactPersonNumberChange}
                          pattern="[0-9]{10}"
                        />
                        <Form.Control.Feedback type="invalid">
                          Write Correct Phone Number
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <Form.Row>
                    <Form.Label className="Label" column="lg" lg={4} class="Label">
                       Email id:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          optional
                          type="email"
                          placeholder="Contact Person Email ID"
                          value={this.state.contact_person_email_id}
                          onChange={this.handleContactPersonEmailChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Write Correct Email ID
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <br />
                      <h5 style={{"text-align":"middle"}}>
                      Alternate Person Contact Details </h5>
                      (Preferbally  Reporting Manager or First Contact Person)
          <br/><br/>
          <Form.Row>
          <Form.Label className="Label" column="lg" lg={4} class="Label">
               Name:
            </Form.Label>
            <Col>

              <Form.Control
                optional
                type="text"
                placeholder="Reporting Manager Name"
                value={this.state.reporting_manager_name}
                onChange={this.handleReportingManagerNameChange}
              />
              <Form.Control.Feedback type="invalid">
                Write Correct Name
              </Form.Control.Feedback>
            </Col>
          </Form.Row>
          <Form.Row>
          <Form.Label className="Label" column="lg" lg={4} class="Label">
            Designation:
            </Form.Label>
            <Col>
              <Form.Control
                optional
                type="text"
                placeholder="Manager Designation"
                value={this.state.manager_designation}
                onChange={this.handleManagerDesignationChange}
              />
              <Form.Control.Feedback type="invalid">
                Write Correct Designation
              </Form.Control.Feedback>
            </Col>
          </Form.Row>
          <Form.Row>
          <Form.Label className="Label" column="lg" lg={4} class="Label">
              Contact Number:
            </Form.Label>
            <Col>
              <Form.Control
                optional
                type="tel"
                placeholder="Manager Contact Number"
                onChange={this.handleManagerContactNumberChange}
                pattern="[0-9]{10}"
              />
              <Form.Control.Feedback type="invalid">
                Write Correct Contact Number
              </Form.Control.Feedback>
            </Col>
          </Form.Row>
          <Form.Row>
          <Form.Label className="Label" column="lg" lg={4} class="Label">
             Email ID:
            </Form.Label>
            <Col>
              <Form.Control
                optional
                type="email"
                placeholder="Manager Email ID"
                value={this.state.manager_email_id}
                onChange={this.handleManagerEmailIdChange}
              />
              <Form.Control.Feedback type="invalid">
                Write Correct Email ID
              </Form.Control.Feedback>
            </Col>
          </Form.Row>


                  </Form.Group>
                  <Button className="alf_b1" variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>



                </div>}
                </div>
                <br/><br/><br/>
              <Footer/>
                </div>
            );
        }

    }
}

export default SeekerServiceForm
