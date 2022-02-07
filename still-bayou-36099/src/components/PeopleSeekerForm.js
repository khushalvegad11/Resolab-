import React,{Component} from 'react';
import {Form,Col,Button,Container} from 'react-bootstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Cookies from "universal-cookie";
import Switch from "react-switch";
import Footer from './footer';
import "../style/css/Seeker.css";
const cookies = new Cookies();
class PeopleSeekerForm extends Component{
    constructor(props){
        super(props);
        this.state={
            category:"",
            startdate:"",
            pia_tp_name: "",
            legal_status: "",
            is_authorized:false,
            manager_employee_id:"",
            state: "",
            job_state:"",
            org_location:"",
            distict: "",
            manager_name:"",
            manager_designation:"",
            manager_contact_number:"",
            manager_email_id:"",
            qualification: "",
            pref_qualification: "",
            additional_req: "",
            is_exp_required: false,
            experience_details: "0",
            min_salary:0,
            max_salary:0,
            joining_requirements:"",
            userno:cookies.get("phone_number"),
            job:"",
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

    handleStateChange = event =>{
      this.setState({
          state:event.target.value
      })
  }

  handleJobStateChange = event =>{
    this.setState({
        job_state:event.target.value
    })
}
  handleOrgLocationChange = event =>{
      this.setState({
          org_location:event.target.value
      })
  }
    handlePiaTpName=event=>{
        this.setState({
            pia_tp_name: event.target.value,
        });
    }
    handleLegalStatusChange = event => {
        this.setState({
            legal_status: event.target.value
        });
    }
    handleManagerDesignationChange = event => {
        this.setState({
            manager_designation: event.target.value
        });
    }
    handleEmployeeIdChange = event =>{
        this.setState({
            manager_employee_id:event.target.value
        })
    }

    handleManagerNameChange = event => {
        this.setState({
            manager_name: event.target.value
        });
    }
    handleManagerName2Change = event => {
        this.setState({
            manager_name_2: event.target.value
        });
    }
    handleManagerDesignation2Change = event => {
        this.setState({
            manager_designation_2: event.target.value
        });
    }
    handleManagerContactNumberChange = event => {
        this.setState({
            manager_contact_number: event.target.value
        });
    }
    handleManagerContactNumber2Change = event => {
      this.setState({
          manager_contact_number_2: event.target.value
      });
  }
    handleManagerEmailIdChange = event => {
        this.setState({
            manager_email_id: event.target.value
        });
    }
    handleManagerEmailId2Change = event => {
      this.setState({
          manager_email_id_2: event.target.value
      });
  }
    handleQualificationChange = event => {
        this.setState({
            qualification: event.target.value
        })
    }
    handlePrefQuaificationChange = event => {
        this.setState({
            pref_qualification: event.target.value
        })
    }
    handleAdditionalReqChange = event => {
        this.setState({
            additional_req: event.target.value
        })
    }
    handleIsExperienceReqChange = event => {
      if(event.target.value==="Yes")
        this.setState({
            is_exp_required: true
        })
        else this.setState({is_exp_required:false})
    }
    handleExperienceDetailsChange = event => {
        this.setState({
            experience_details: event.target.value
        })
    }
    handleMinSalaryChange = event => {
        this.setState({
            min_salary: event.target.value
        })
    }
    handleMaxSalaryChange = event => {
        this.setState({
            max_salary: event.target.value
        })
    }
    handleJoiningRequirementChange = event => {
        this.setState({
            joining_requirements: event.target.value
        })
    }
    handleAdditionalReqChange = event => {
        this.setState({
            additional_req: event.target.value
        })
    }
    handleJobDisChange = event => {
        this.setState({
            job_district: event.target.value
        })
    }

    handleJobChange = event => {
        this.setState({
            job: event.target.value
        })
    }
    handleSubmit1(){
      var body={
        user: cookies.get("addedparam"),
              job: this.state.job,
              industry: cookies.get("industry"),
                pia_tp_name: this.state.pia_tp_name,
                legal_status: this.state.legal_status,
                org_location : this.state.org_location,
                is_authorized:true,
                //1
                manager_name:this.state.manager_name,
                manager_employee_id: this.state.manager_employee_id,
                manager_contact_number:"+91"+this.state.manager_contact_number,
                manager_email_id:this.state.manager_email_id,
                manager_designation: this.state.manager_designation,

                //2
                manager_designation_2:this.state.manager_designation_2,
                manager_name_2: this.state.manager_name_2,
                manager_contact_number_2:this.state.manager_contact_number_2,
                manager_email_id_2: this.state.manager_email_id_2,



                qualification: this.state.qualification,
                pref_qualification: this.state.pref_qualification,
                additional_req: this.state.additional_req,
                is_exp_required:this.state.is_exp_required,
                experience_details: this.state.experience_details,
                min_salary: Number(this.state.min_salary),
                max_salary: Number(this.state.max_salary),
                joining_requirement: this.state.joining_requirements,
                job_state: this.state.job_state,
                job_district: this.state.job_district,
                is_verified:false
      }
      console.log(body);
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
            event.preventDefault();
            console.log(`Token ${cookies.get("token")}`)
            axios.post('https://www.resolabindia.com/api/core/create_seeker_people/', {


              user: cookies.get("addedparam"),
              job: this.state.job,
              industry: cookies.get("industry"),
                pia_tp_name: this.state.pia_tp_name,
                legal_status: this.state.legal_status,
                org_location : this.state.org_location,
                is_authorized:true,
                //1
                manager_name:this.state.manager_name,
                manager_employee_id: this.state.manager_employee_id,
                manager_contact_number:"+91"+this.state.manager_contact_number,
                manager_email_id:this.state.manager_email_id,
                manager_designation: this.state.manager_designation,

                //2
                manager_designation_2:this.state.manager_designation_2,
                manager_name_2: this.state.manager_name_2,
                manager_contact_number_2:this.state.manager_contact_number_2,
                manager_email_id_2: this.state.manager_email_id_2,



                qualification: this.state.qualification,
                pref_qualification: this.state.pref_qualification,
                additional_req: this.state.additional_req,
                is_exp_required:this.state.is_exp_required,
                experience_details: this.state.experience_details,
                min_salary: Number(this.state.min_salary),
                max_salary: Number(this.state.max_salary),
                joining_requirement: this.state.joining_requirements,
                job_state: this.state.job_state,
                job_district: this.state.job_district,
                is_verified:false,
                registered_year:'NA', org_head:'NA',core_business:'NA'
            },{
                headers:{
                    'Authorization': `Token ${cookies.get("token")}`
                }
            })
            .then((response) => {
                console.log(response);
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
                this.setState({
                    isuser:true,
                });
            }, (error) => {

                alert(error+". Phone number already in use. Please Retry with another number.");
            });
        }
    }
    render(){
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
                <br />

                <h3>Resource Card</h3>
                <div>
                  <label>
                    <span><h5>Are you authorized ?{" "}</h5></span>
                    <Switch
                      onChange={this.handleIsAuthorizedChange}
                      checked={this.state.checked}
                      uncheckedIcon={false}
                      checkedIcon={false}
                    />
                  </label>
                </div>

                    {this.state.checked &&
                <div>
                <Form
                  noValidate
                  validated={this.state.validated}
                  onSubmit={this.handleSubmit}
                  checkedIcon={false}
                  uncheckedIcon={false}
                  backgroundColor="blue"
                >
                  <Form.Group>
                    <br />
                    <h5 style={{"text-align":"middle"}}>About the Organisation</h5>
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
                <Form.Label className="required Label" column="lg" lg={4}>
                    Location:
                </Form.Label>
                <Col>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Address"
                        value={this.state.org_location}
                        onChange={this.handleOrgLocationChange}
                        />
                    <Form.Control.Feedback type="invalid">
                        Write correct Location
                    </Form.Control.Feedback>
                </Col>
            </Form.Row>


          <br />



                    <h5 style={{"text-align":"middle"}}>
                    Contact Details of Person posting Requirement
                    </h5>
                    <br/>
                    <Form.Row>
                    <Form.Label className="Label required" column="lg" lg={4} class="Label">
                      Name:
                    </Form.Label>
                    <Col>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Name"
                        value={this.state.manager_name}
                        onChange={this.handleManagerNameChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Write Correct Name
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Row>
                    <Form.Row>
                      <Form.Label className="required Label" column="lg" lg={4}>
                        Designation:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Designation"
                          value={this.state.designation}
                          onChange={this.handleManagerDesignationChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Write Correct Designation
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>


                    <Form.Row>
                      <Form.Label className="Label" column="lg" lg={4}>
                        Employee Id:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          optional
                          type="text"
                          placeholder="Employee ID"
                          value={this.state.manager_employee_id}
                          onChange={this.handleEmployeeIdChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Write Correct Employee ID
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>


                  <Form.Row>
                    <Form.Label className="Label required" column="lg" lg={4} class="Label">
                      Contact No:
                    </Form.Label>
                    <Col>
                      <Form.Control
                        required
                        type="tel"
                        placeholder="Contact Number"
                        value={this.state.manager_contact_number}
                        onChange={this.handleManagerContactNumberChange}
                        pattern="[0-9]{10}"
                      />
                      <Form.Control.Feedback type="invalid">
                        Write Correct Contact Number
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <Form.Label className="Label required" column="lg" lg={4} class="Label">
                      Email ID:
                    </Form.Label>
                    <Col>
                      <Form.Control
                        required
                        type="email"
                        placeholder="Email ID"
                        value={this.state.manager_email_id}
                        onChange={this.handleManagerEmailIdChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Write Correct Email ID
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Row>
                  <br />

                    <h5 style={{"text-align":"middle"}}>
                    Alternate Person Contact Details
                    </h5>
                    (Preferbally  Reporting Manager)
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
                          value={this.state.manager_name_2}
                          onChange={this.handleManagerName2Change}
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
                          value={this.state.manager_designation_2}
                          onChange={this.handleManagerDesignation2Change}
                        />
                        <Form.Control.Feedback type="invalid">
                          Write Correct Designation
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <Form.Row>
                      <Form.Label className="Label" column="lg" lg={4} class="Label">
                        Contact No:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          optional
                          type="tel"
                          placeholder="Manager Contact Number"
                          value={this.state.manager_contact_number_2}
                          onChange={this.handleManagerContactNumber2Change}
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
                          value={this.state.manager_email_id_2}
                          onChange={this.handleManagerEmailId2Change}
                        />
                        <Form.Control.Feedback type="invalid">
                          Write Correct Email ID
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <br />
                    <h5 style={{"text-align":"middle"}}> Resource Required Summary</h5>
                    <br/>

                    <Form.Row>
                      <Form.Label className="required Label" column="lg" lg={4}>
                        Select Category:</Form.Label>
                        <Col>
                    <Form.Control
                                  required
                                  as="Select"
                                  placeholder="Resource Category"
                                  value={this.state.category}
                                  onChange={this.handleCategoryChange}
                                >
                                  <option selected value="">Select Role:</option>
                                  <option>Audit</option>
                                  <option>Finance</option>
                                  <option>Human Resource</option>
                                  <option>Training</option>
                                  <option>Operation</option>
                                  <option>Administration</option>
                                  <option>Others</option>
                                </Form.Control></Col>
                              </Form.Row>


                    <Form.Row>
                      <Form.Label className="required Label" column="lg" lg={4}>
                        Job Role:
                      </Form.Label>
                      <Col>
                      <Form.Control
                                required
                                type="text"
                                placeholder="Job"
                                value={this.state.job}
                                onChange={this.handleJobChange}
                              ></Form.Control>
                        {/*(() => {
                          switch (this.state.category) {
                            case "Operation":
                              return (

                                <Form.Control
                                  required
                                  as="Select"
                                  placeholder="Job"
                                  value={this.state.job}
                                  onChange={this.handleJobChange}
                                >
                                  <option selected value="">Select Role:</option>
                                  <option>Fresher</option>
                                  {this.props.location.state.industry==="Skilling" ?
                                  <option>Executive- Mobilization</option>:null}
                                  {this.props.location.state.industry==="Skilling" ?
                                  <option>Executive- MIS</option>:null}
                                  {this.props.location.state.industry==="Skilling" ?
                                  <option>Manager Placement</option>:null}
                                  {this.props.location.state.industry==="Skilling" ?
                                  <option>Counsellor</option>:null}
                                  {this.props.location.state.industry==="Skilling" ?
                                  <option>Mobilization Head</option>:null}
                                  {this.props.location.state.industry==="Skilling" ?
                                  <option>District Skill Manager</option>:null}
                                  {this.props.location.state.industry==="Skilling" ?
                                  <option>State MIS Head</option>:null}
                                  {this.props.location.state.industry==="Skilling" ?
                                  <option>National MIS Head</option>:null}
                                  {this.props.location.state.industry==="Skilling" ?
                                  <option>Centre Manager</option>:null}
                                  {this.props.location.state.industry==="Skilling" ?
                                  <option>State Head</option>:null}
                                  {this.props.location.state.industry==="Skilling" ?
                                  <option>Project Manager</option>:null}
                                  {this.props.location.state.industry==="Skilling" ?
                                  <option>National Head</option>:null}
                                  {this.props.location.state.industry==="Skilling" ?
                                  <option>Regional Manager</option>:null}
                                  {this.props.location.state.industry==="Skilling" ?
                                  <option>Business Head</option>:null}
                                  <option>Others</option>
                                  {this.props.location.state.industry==="Microfinance" ?
              <option>Field Officer</option>:null}
              {this.props.location.state.industry==="Microfinance" ?
              <option>Customer Service Executive</option>:null}
              {this.props.location.state.industry==="Microfinance" ?
              <option>Field Sales Executive</option>:null}
              {this.props.location.state.industry==="Microfinance" ?
              <option>Branch Manager</option>:null}
              {this.props.location.state.industry==="Microfinance" ?
              <option>Senior Branch Manager</option>:null}
              {this.props.location.state.industry==="Microfinance" ?
              <option>Area Manager</option>:null}
              {this.props.location.state.industry==="Microfinance" ?
              <option>Cluster Manager</option>:null}
              {this.props.location.state.industry==="Microfinance" ?
              <option>Divisional Manager</option>:null}
              {this.props.location.state.industry==="Microfinance" ?
              <option>Regional Manager</option>:null}
              {this.props.location.state.industry==="Microfinance" ?
              <option>Zonal Manager</option>:null}


                                </Form.Control>
                              );
                            case "Audit":
                              return (
                                <Form.Control
                                  required
                                  as="Select"
                                  placeholder="Job"
                                  value={this.state.job}
                                  onChange={this.handleJobChange}
                                >
                                  <option selected value="">Select Role:</option>
                                  <option>Fresher</option>
                                  <option>Quality executive</option>
                                  <option>State Quality Head</option>
                                  <option>National Quality Head</option>
                                  <option>Executive -Internal Audit</option>
                                  <option>Manager -Internal Audit</option>
                                  <option>Regional Audit Head</option>
                                  <option>Others</option>
                                </Form.Control>
                              );
                            case "Finance":
                              return (
                                <Form.Control
                                  required
                                  as="Select"
                                  placeholder="Job"
                                  value={this.state.job}
                                  onChange={this.handleJobChange}
                                >
                                  <option selected value="">Select Role:</option>
                                  <option>Fresher</option>
                                  <option>Account Executive</option>
                                  <option>Finance Executive</option>
                                  <option>Finance Manager</option>
                                  <option>Others</option>
                                </Form.Control>
                              );
                              case "Human Resource":
                              return (
                                <Form.Control
                                  required
                                  as="Select"
                                  placeholder="Job"
                                  value={this.state.job}
                                  onChange={this.handleJobChange}
                                >
                                  <option selected value="">Select Role:</option>
                                  <option>Fresher</option>
                                  <option>Executive HR</option>
                                  <option>HR Manager</option>
                                  <option>Others</option>
                                </Form.Control>
                              );

                              case "Training":
                                return (
                                  <Form.Control
                                    required
                                    as="Select"
                                    placeholder="Job"
                                    value={this.state.job}
                                    onChange={this.handleJobChange}
                                  >
                                  <option>Fresher</option>
                                  <option selected value="">Select Role:</option>
                                    {this.props.location.state.industry==="Skilling" ?
                                    <option>English & Soft Skill Trainer</option>:
                                    <option>Manager-Training</option>}
                                {this.props.location.state.industry==="Skilling" ?
                                    <option>IT Trainer</option>:
                                    <option>Assistant Manager -Training</option>}
                                    {this.props.location.state.industry==="Skilling" ?
                                    <option>Domain Trainer</option>:null}
                                    <option>Others</option>


                                  </Form.Control>
                                );
                                case "Administration":
                                  return (
                                    <Form.Control
                                      required
                                      as="Select"
                                      placeholder="Job"
                                      value={this.state.job}
                                      onChange={this.handleJobChange}
                                    >
                                      <option selected value="">Select Role:</option>
                                      <option>Fresher</option>

                                      <option>Executive - Travel Desk</option>
                                      <option>Purchase Officer</option>
                                      <option>Executive Admin</option>
                                      <option>Admin Manager</option>
                                      <option>Others</option>


                                    </Form.Control>
                                  );


                            default:
                              return (<Form.Control
                                required
                                type="text"
                                placeholder="Job"
                                value="Others"
                              ></Form.Control> );
                          }
                        })()*/}
                        <Form.Control.Feedback type="invalid">
                          Write Correct Job
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <Form.Row>
                            <Form.Label className="required Label" column="lg" lg={4}>
                                Job Location (State):
                            </Form.Label>
                            <Col>
                                <Form.Control
                                required
                                as="Select"
                                placeholder="State"
                                value={this.state.job_state}
                                onChange={this.handleJobStateChange}
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
                            </Col>

                    </Form.Row>
                    <Form.Row>
                      <Form.Label className="required Label" column="lg" lg={4}>
                        Job Location (Distict):
                      </Form.Label>
                      <Col>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Job Location"
                          value={this.state.job_district}
                          onChange={this.handleJobDisChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Write Correct Job Location
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>

                    <Form.Row>
                      <Form.Label className="required Label" column="lg" lg={4}>
                        Minimum Qualification:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Qualification"
                          value={this.state.qualification}
                          onChange={this.handleQualificationChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Write Correct Qualification
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <Form.Row>
                    <Form.Label className="required Label" column="lg" lg={4}>
                      Preferred Qualification if any:
                    </Form.Label>
                    <Col>
                      <br />
                      <Form.Control
                        required
                        type="text"
                        placeholder="Preffered Qualification"
                        value={this.state.pref_qualification}
                        onChange={this.handlePrefQuaificationChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Write Correct Qualification
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Row>
                    <Form.Row>
                    <Form.Label className="required Label" column="lg" lg={4}>
                      Is Experience Required:
                    </Form.Label>
                    <Col style={{textAlign:'left'}}>
                    <input required
                    type="radio"
                    value="Yes" name="exp_req"
                    onChange={this.handleIsExperienceReqChange}/>Yes
                    <input required
                    type="radio"
                    value="No" name="exp_req"
                    onChange={this.handleIsExperienceReqChange}/>No


                      <Form.Control.Feedback type="invalid">
                        Write Correct Value
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Row>

                  {this.state.is_exp_required===true ?
                    <Form.Row id="exp">
                      <Form.Label className="required Label" column="lg" lg={4} >

                        Required Experience:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          required
                          type="number"
                          placeholder="Mention Years"
                          onChange={this.handleExperienceDetailsChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Write Correct Requirements
                        </Form.Control.Feedback>
                      </Col>
                      <Col>
                        <Form.Control
                          required
                          type="number"
                          placeholder="Mention Months"
                        />
                        <Form.Control.Feedback type="invalid">
                          Write Correct Requirements
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>:null}
                    <Form.Row>
                      <Form.Label className="required Label" column="lg" lg={4}>
                        Additional Requirement:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Additional Qualification"
                          value={this.state.additional_req}
                          onChange={this.handleAdditionalReqChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Write Correct Requirements
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>

                    <Form.Row>
                      <Form.Label className="required Label" column="lg" lg={4}>
                        Minimum Salary (in Rupees):
                      </Form.Label>
                      <Col>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Minnimum Salary"
                          onChange={this.handleMinSalaryChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Write Correct Salary
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <Form.Row>
                      <Form.Label className="required Label" column="lg" lg={4}>
                        Maximum Salary (in Rupees):
                      </Form.Label>
                      <Col>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Maximum Salary"
                          onChange={this.handleMaxSalaryChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Write Correct Salary
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>
                    <Form.Row>
                      <Form.Label className="required Label" column="lg" lg={4}>
                        Joining Requirements:
                      </Form.Label>
                      <Col>
                      <Form.Control
                      required
                      as= "select"
                      placeholder="Start Date "
                      value={this.state.joining_requirements}
                      onChange={this.handleJoiningRequirementChange}
                    >
                    <option selected value="">Select :</option>
                    <option>Immediate</option>
                    <option>Mutual Consent</option>
                    </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          Write Correct Requirements
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Row>



                  </Form.Group>
                  <Button className="seeker_b1"  variant="primary" type="submit">
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
export default PeopleSeekerForm;
