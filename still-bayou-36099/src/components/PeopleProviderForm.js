import React,{Component} from 'react';
import {Form,Col,Button,Container} from 'react-bootstrap';
import axios from 'axios';
import {Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import Footer from './footer';
import "../style/css/Provider.css";

const cookies = new Cookies();
class ProviderForm extends Component{
    constructor(props){
        super(props);
        this.state={
            aadharnumber: "NA",
            category:"",
            work_state: "",
            district: "",
            education:"",
            educational_qualification: "",
            current_salary:0,
            expected_salary:0,
            skilledexp: "",
            project_name: "",
            nonskillexp: "",
            organisation1:"",
            designation1:"",
            tenure1:0,
            organisation2:"",
            designation2:"",
            tenure2:0,
            organisation3:"",
            designation3:"",
            tenure3:0,
            userno: cookies.get("phone_number"),
            job: "",
            ssc:"none",
            userID: cookies.get("token"),
            validated: false,
            expno:0,
            achievement:"none"

        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSSCChange = event=>{
        this.setState({ssc:event.target.value})
    }

    handleexpchange = event=>{
        if(this.state.expno===0)
        {this.setState({expno:1})
        document.getElementById(2).style.display="block";}
        else if(this.state.expno===1)
        {this.setState({expno:2})
        document.getElementById(3).style.display="block";}
        else if(this.state.expno===2)
        {
        document.getElementById(4).style.display="block";
        document.getElementById(1).style.display="none";
        }
    }

    handleCategoryChange = event=>{
        this.setState({
            category:event.target.value,
        });
    }


    handleWorkStateChange = event => {
        this.setState({
            work_state: event.target.value
        });
    }
    handleDistrictChange = event =>{
        this.setState({
            district: event.target.value,
        })
    }
    handleEducationalQualification = event => {
        this.setState({
            educational_qualification: event.target.value,
        })
    }
    handleEducation = event => {
        this.setState({
            education: event.target.value,
        })
    }
    handleCsalaryChange = event =>{
        this.setState({
            current_salary:event.target.value
        })
    }
    handleEsalaryChange = event => {
        this.setState({
            expected_salary: event.target.value
        })
    }
    handleSkillExpChange = event => {
        this.setState({
            skilledexp: event.target.value
        });
    }
    handleProjectNameChange = event => {
        this.setState({
            project_name: event.target.value
        });
    }
    handleNonSkillExp = event => {
        this.setState({
            nonskillexp: event.target.value
        })
    }
    handleOrganisation1Change = event => {
        this.setState({
            organisation1: event.target.value
        })
    }
    handleDesignation1Change = event => {
        this.setState({
            designation1: event.target.value
        })
    }
    handleTenure1Change = event => {
        this.setState({
            tenure1: event.target.value
        })
    }
    handleOrganisation2Change = event => {
        this.setState({
            organisation2: event.target.value
        })
    }
    handleDesignation2Change = event => {
        this.setState({
            designation2: event.target.value
        })
    }
    handleTenure2Change = event => {
        this.setState({
            tenure2: event.target.value
        })
    }
    handleOrganisation3Change = event => {
        this.setState({
            organisation3: event.target.value
        })
    }
    handleDesignation3Change = event => {
        this.setState({
            designation3: event.target.value
        })
    }
    handleTenure3Change = event => {
        this.setState({
            tenure3: event.target.value
        })
    }
    handleAchievementChange = event =>{
        this.setState({
            achievement:event.target.value
        })
    }
    handleUserNoChange = event => {
        this.setState({
            userno: event.target.value
        })
    }
    handleJobChange = event => {
        this.setState({
            job: event.target.value
        })
    }
    handleSubmit(event){
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
                const body = {
                    user: cookies.get("addedparam"),
                    industry: cookies.get("industry"),
                    job: this.state.job,
                    aadhar_no: "NA",
                    current_work_state: this.state.work_state,
                    current_work_district: this.state.district,
                    educational_qualification: this.state.educational_qualification,
                    education: this.state.education,
                    current_salary:this.state.current_salary,
                    expected_salary:this.state.expected_salary,
                    exp_skill_industry: this.state.skilledexp,
                    project_name: this.state.project_name,
                    exp_non_skill: this.state.nonskillexp,
                    organization_1_name: this.state.organisation1,
                    designation_1: this.state.designation1,
                    total_tenure_1: this.state.tenure1,
                    organization_2_name: this.state.organisation2,
                    designation_2: this.state.designation2,
                    total_tenure_2: this.state.tenure2,
                    organization_3_name: this.state.organisation3,
                    designation_3: this.state.designation3,
                    total_tenure_3: this.state.tenure3,
                    achievement: this.state.achievement,
                    ssc: this.state.ssc,
                    is_verifed:false,
                };

                axios.post('https://www.resolabindia.com/api/core/create_provider_people/', body, {
                    headers:{
                        'Authorization': `Token ${cookies.get("token")}`
                    },
                })
                .then((response) => {
                  //  console.log(response);
                    this.setState({
                        user:true,
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
                    alert(error+". Something is fishy. Try again.");
                    console.log(Response);
                    console.log(body);
                    console.log(cookies.get("token"));

                });
            }
    }
    render(){
        if(this.state.user===true)
        {
          return(
            <Redirect to="/" />
          );
        }
        else{
            return (
                <div class="main-title">

                <Container fluid className="provider"  style={{"backgroundColor":"aliceblue"}}>
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                <br /><br/>
                <h3 style={{"color":"#11999e"}}><b>RESOURCE CARD</b></h3>
                <h6>Enter your details.</h6><br/>

                    <Form.Group>



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
                                  </Form.Control>
                                  <Form.Control.Feedback type="invalid">
                            Select Correct Category
                          </Form.Control.Feedback></Col>
                                </Form.Row>

                      <Form.Row>
                        <Form.Label className="required Label" column="lg" lg={4}>
                          Job Role:
                        </Form.Label>
                        <Col>
                        <Form.Control
                            required
                            type="text"
                            value={this.state.job}
                            onChange={this.handleJobChange}
                            placeholder="Job Role"
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
                                    <option>State Program Manager</option>:null}
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
                <option>Others</option>



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
                                    <option>Others</option>
                                    <option>Executive -Internal Audit</option>
                                    <option>Manager -Internal Audit</option>
                                    <option>Regional Audit Head</option>
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
                                    <option>Account  Executive</option>
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
                                      <option selected value="">Select Role:</option>
                                      <option>Fresher</option>
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
                                  placeholder="Job Role"
                                ></Form.Control> );
                            }
                          })()*/}
                          <Form.Control.Feedback type="invalid">
                            Select Correct Job
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Row>


                      {this.state.job==="Domain Trainer"?

                      <Form.Row>
                      <Form.Label className="Label required" column="lg" lg={4}>
                          Sector Skill Council:
                      </Form.Label>
                      <Col>
                          <Form.Control
                          required
                          as="Select"
                          placeholder="Sector Skill Council"
                          value={this.state.ssc}
                          onChange={this.handleSSCChange}
                          >
                              <option selected value="">Select SSC:</option>
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

                          </Form.Control>
                          <Form.Control.Feedback type="invalid">
                              Select Correct SSC Name
                          </Form.Control.Feedback>
                      </Col>
                  </Form.Row>:null}


                        {(this.props.location.state.industry==="Skilling")
                           ? ( <div>


                        <Form.Row>
                            <Form.Label className="Label required" column="lg" lg={4}>
                                Project Name:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                required
                                as="Select"
                                placeholder="Project Name"
                                value={this.state.project_name}
                                onChange={this.handleProjectNameChange}
                                >
                                    <option selected value="">Select Project:</option>
                                    <option>DDUGKY</option>
                                    <option>PMKVY</option>
                                    <option>PMKK</option>
                                    <option>Others</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Select Correct Project Name
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row></div>): null

                    }
                    <Form.Row>
                            <Form.Label className="Label required" column="lg" lg={4}>
                                Educational Qualification:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                required
                                as="select"
                                placeholder="Education"
                                value={this.state.education}
                                onChange={this.handleEducation}
                                >
                                <option selected value="">Select Education:</option>
                                <option>10+2</option>
                                <option>Diploma</option>
                                <option>ITI</option>
                                <option>Graduate</option>
                                <option>PostGraduate</option>
                                <option>Others</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Select Correct Qualification
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Form.Label className="Label required" column="lg" lg={4}>
                                Please Mention Degree:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                required
                                type="text"
                                placeholder="Educational Qualification"
                                value={this.state.educational_qualification}
                                onChange={this.handleEducationalQualification}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Degree
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>

                        <Form.Row>
                            <Form.Label className="Label" column="lg" lg={4}>
                                Achievements :
                            </Form.Label>
                            <Col>
                                <Form.Control
                                as="textarea" rows={4}
                                type="text"
                                placeholder="Achievemnets"
                                onChange={this.handleAchievementChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Degree
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>

                        <br/>
                    <h5>Current Work Location</h5><br/>
                        <Form.Row>
                            <Form.Label className="Label required" column="lg" lg={4}>
                              State:
                            </Form.Label>
                            <Col>
                            <Form.Control
                            required
                            as="Select"
                            placeholder="Current Work State"
                            value={this.state.work_state}
                            onChange={this.handleWorkStateChange}
                            >
                                <option selected value="">Select State:</option>
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
                                Please Select correct state
                            </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Form.Label className="Label required" column="lg" lg={4}>
                              District:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                required
                                type="text"
                                placeholder="Current Work District"
                                value={this.state.district}
                                onChange={this.handleDistrictChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct District
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />

                    <h5>Salary (Annual)</h5>
                    <br/>
                        <Form.Row>
                            <Form.Label className="Label required" column="lg" lg={4}>
                                Current Salary (in Rs):
                            </Form.Label>
                            <Col>
                                <Form.Control
                                required
                                type="number" min='0'
                                placeholder="Current Salary"
                                onChange={this.handleCsalaryChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Salary
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Form.Label className="Label required" column="lg" lg={4}>
                                Expected Salary (in Rs):
                            </Form.Label>
                            <Col>
                                <Form.Control
                                required
                                type="number" step="100" min='0'
                                placeholder="Expected Salary"
                                onChange={this.handleEsalaryChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Salary
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                          <br/>


                        <h5>Work Experience</h5>

                          <br />
                          <Form.Row>
                              <Form.Label className="Label required" column="lg" lg={4}>
                                {this.props.location.state.industry} Industry:
                              </Form.Label>
                                  <Col>
                                  <Form.Control
                                  required
                                  type="number"
                                  placeholder="Mention Years"
                                  value={this.state.skilledexp}
                                  onChange={this.handleSkillExpChange}
                                  min='0'
                                  />
                                  <Form.Control.Feedback type="invalid">
                                      Write Correct Experience
                                  </Form.Control.Feedback>
                              </Col>
                              <Col>
                                <Form.Control
                                required
                                type="number"
                                placeholder="Mention Months"
                                min='0' max='12'
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Experience
                                </Form.Control.Feedback>
                            </Col>
                          </Form.Row>
                          <Form.Row>
                              <Form.Label className="Label required" column="lg" lg={4}>
                                  Other Industry:
                              </Form.Label>
                                  <Col>
                                  <Form.Control
                                  required
                                  type="number"
                                  placeholder="Mention Years"
                                  value={this.state.nonskillexp}
                                  onChange={this.handleNonSkillExp}
                                  min='0' />
                                  <Form.Control.Feedback type="invalid">
                                      Write Correct Experience
                                  </Form.Control.Feedback>
                              </Col>
                              <Col>
                                <Form.Control
                                required
                                type="number"
                                placeholder="Mention Months"
                                min='0' max='12'
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Experience
                                </Form.Control.Feedback>
                            </Col>
                          </Form.Row>
                          <br />
                        <div id={2} style={{display: "none"}}>
                        <Form.Row >
                            <Form.Label className="Label" column="lg" lg={4}>
                                Organisation 1:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                optional
                                type="text"
                                placeholder="Organisation"
                                value={this.state.organisation1}
                                onChange={this.handleOrganisation1Change}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct organisation
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Form.Label className="Label" column="lg" lg={4}>
                                Designation:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                optional
                                type="text"
                                placeholder="Deisgnation"
                                value={this.state.designation1}
                                onChange={this.handleDesignation1Change}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Designation
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Form.Label className="Label" column="lg" lg={4}>
                                Work Duration:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                optional
                                type="number"
                                placeholder="Mention Years"
                                onChange={this.handleTenure1Change}
                                min='0'
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Tenure Period
                                </Form.Control.Feedback>
                            </Col>
                            <Col>
                                <Form.Control
                                optional
                                type="number"
                                placeholder="Mention Months"
                                min='0' max='12'
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Tenure Period
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row></div>
                        <div id={3} style={{display: "none"}}>
                        <Form.Row>
                            <Form.Label className="Label" column="lg" lg={4}>
                                Organisation 2:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                optional
                                type="text"
                                placeholder = "Organisation"
                                value={this.state.organisation2}
                                onChange={this.handleOrganisation2Change}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Organisation
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Form.Label className="Label" column="lg" lg={4}>
                                Designation:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                optional
                                type="text"
                                placeholder="Designation"
                                value={this.state.designation2}
                                onChange={this.handleDesignation2Change}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Designation
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Form.Label className="Label" column="lg" lg={4}>
                            Work Duration:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                optional
                                type="number"
                                placeholder="Mention Years"
                                onChange={this.handleTenure2Change}
                                min='0'
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Tenure Period
                                </Form.Control.Feedback>
                            </Col>
                            <Col>
                                <Form.Control
                                optional
                                type="number"
                                placeholder="Mention Months"
                                min='0' max='12'
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Tenure Period
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row></div>
                        <div id={4} style={{display: "none"}}>
                        <Form.Row>
                            <Form.Label className="Label" column="lg" lg={4}>
                                Organisation 3:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                optional
                                type="text"
                                placeholder = "Organisation"
                                value={this.state.organisation3}
                                onChange={this.handleOrganisation3Change}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Organisation
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Form.Label className="Label" column="lg" lg={4}>
                                Designation:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                optional
                                type="text"
                                placeholder="Designation"
                                value={this.state.designation3}
                                onChange={this.handleDesignation3Change}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Designation
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Form.Label className="Label" column="lg" lg={4}>
                            Work Duration:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                optional
                                type="number"
                                placeholder="Mention Years"
                                onChange={this.handleTenure3Change}
                                min='0'
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Tenure Period
                                </Form.Control.Feedback>
                            </Col>
                            <Col>
                                <Form.Control
                                optional
                                type="number"
                                placeholder="Mention Months"
                                min='0' max='12'
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Tenure Period
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row></div>
                        <div id={1}>
                        <h5 class="Label float-left">Write previous experiences.
                        <br/>(starting from current Organization)</h5>
                        <button type="button" class="btn btn-success " onClick={this.handleexpchange}>+ Experience</button>
                        </div>
                    </Form.Group><br/>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button><br/><br/>
                </Form>
                </Container>
                <Footer />
                 </div>


            );
        }
    }
}
export default ProviderForm;
