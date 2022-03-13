import React, { Component } from 'react';
import axios from 'axios';
import Cookies from "universal-cookie";
import { Container, CardDeck, Form, Button, Row, Col, Card, Pagination } from 'react-bootstrap';

import CardTemplateForProvider from './CardTemplateForProvider';
import CardTemplateForSeeker from './CardTemplateForSeeker';
import LoadingElement from './Loader';
import Footer from './footer'
import '../style/css/People.min.css';
import SeekerMfPagination from './seekerMfPagination';
import SeekerSkillingPagination from './seekerSkillingPagination'

import "../style/css/cardflip.css"

const cookies = new Cookies();

class DemoPeople extends Component {
    constructor() {
        const is_user_subscribed_api = "https://www.resolabindia.com/api/verification/is-user-subscribed/"
        axios.get(is_user_subscribed_api, {
            headers: {
                'Authorization': `Token ${cookies.get("token")}`
            }
        })
        .then(res => {
            const is_user_subscribed = res.data;
            cookies.set("is_user_subscribed", res.data.is_user_subscribed, {
            path: "/",
            });
        })
        super();
        this.state = {
            seeker_result: null,
            total_seeker: null,
            provider_result: null,
            total_provider: null,
            // pdata: false,
            // sdata: false,
            error: false,
            searchTerm: '',
            select: "All",
            plan_id: "",
            is_user_subscribed: cookies.get("is_user_subscribed"),

        }
        // this.dynamicSearch = this.dynamicSearch.bind(this)
        // this.editSearchTerm = this.editSearchTerm.bind(this)
    }

    componentDidMount() {
        axios.get(`https://www.resolabindia.com/api/core/get_user_profile/${cookies.get('id')}/`, {
            headers: {
                'Authorization': `Token ${cookies.get("token")}`
            }
        }).then((res) => {
            this.setState({
                is_subscribed: res.data.is_subscribed,
                plan_id: res.data.plan_id
            })
        }).catch((err) => {
            this.setState({
                loader: false,
                //error: true
            })
        })
        // var path;
        // if (this.props.match.params.industry === "Microfinance")
        //     path = "https://www.resolabindia.com/api/core/list_seekers_people_all_mf/"
        // else
        //     path = "https://www.resolabindia.com/api/core/list_seekers_people_all/"
        // axios.get(path)
        //     .then((response) => {
        //         // console.log(cookies.get("token"));
        //         this.setState({
        //             seeker_result: response.data,
        //             total_seeker: response.data,
        //             sdata: true
        //         })
        //     }, (error) => {
        //         // console.log(cookies.get("token"));
        //         console.log(error);
        //         this.setState({
        //             sdata: false,
        //             error: true
        //         })
        //     });

        // var path2;
        // if (this.props.match.params.industry === "Microfinance")
        //     path2 = "https://www.resolabindia.com/api/core/list_seekers_people_all_mf/"
        // else
        //     path2 = "https://www.resolabindia.com/api/core/list_seekers_people_all/"
        // axios.get(path2)
        //     .then((response) => {
        //         // console.log(cookies.get("token"));
        //         this.setState({
        //             provider_result: response.data,
        //             total_provider: response.data,
        //             pdata: true
        //         })
        //     }, (error) => {
        //         // console.log(cookies.get("token"));
        //         console.log(error);
        //         this.setState({
        //             pdata: false,
        //             error: true
        //         })
        //     });
    }
    // editSearchTerm = (event) => {
    //     this.setState({
    //         searchTerm: event.target.value
    //     })
    // }
    selectOption = (event) => {
        this.setState({
            select: event.target.value
        })
    }
    // dynamicSearch = (event) => {
    //     event.preventDefault();


    //     this.setState({
    //         provider_result: this.state.total_provider.filter(
    //             data => data.current_work_state.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    //                 || data.job.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    //                 || data.user.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    //         )
    //     })
    // }
    render() {
        if (this.state.error === true) {
            return (
                <div>
                    <br />
                    <h1>Something went wrong. Please check your internet connection and try again.</h1>
                </div>
            );
        }

        // if (cookies.get("token") === undefined) {
        //     return (<>
        //         <div className="container">
        //             <div>
        //                 <br />
        //                 <h2>Please login to see this page.</h2>
        //             </div>
        //             <div className="m-4">
        //                 <a href={"/login/"} className="btn btn-primary mx-auto mb-2">Login</a>
        //             </div>
        //         </div>
        //     </>
        //     );
        // }
        // if (this.state.is_user_subscribed === "false") {
        //     return (<>
        //         <div className="container">
        //             <div>
        //                 <br />
        //                 <h2>Opps ! You Don't have subscription plan.<br /> Please buy a subscription for more access.</h2>
        //             </div>

        //             <div className="m-4">
        //                 <a href={"/payment/"} className="btn btn-primary mx-auto mb-2">Show subscription plans</a>
        //             </div>
        //         </div>
        //     </>
        //     );
        // }


        else {
            // const seeker_list = this.state.seeker_result.map((seeker) =>
            //     <div className="resource-seeker-list">

            //         <CardTemplateForSeeker  className="seeker-card"
            //             key={seeker.id}
            //             cardId={seeker.id}
            //             date_of_birth={seeker.user.date_of_birth}
            //             email={seeker.user.email}
            //             name={seeker.user.name}
            //             phone_number={seeker.user.phone_number}
            //             profile_pic_url={seeker.user.profile_pic_url}
            //             registered_region={seeker.user.registered_region}
            //             company_name={seeker.pia_tp_name}
            //             active_index="Contact"
            //             designation={seeker.designation}
            //             //cCategory={seeker.job.category.category_name}
            //             cSubCategory={seeker.job}
            //             cLoc={seeker.job_district}
            //             cSalaryUpper={seeker.max_salary}
            //             cSalaryLower={seeker.min_salary}
            //             cId={seeker.user.id}
            //             additional_req={seeker.additional_req}
            //             employee_id={seeker.employee_id}
            //             experience_details={seeker.experience_details}
            //             job_district={seeker.job_district}
            //             joining_requirement={seeker.joining_requirement}
            //             legal_status={seeker.legal_status}
            //             manager_contact_number={seeker.manager_contact_number}
            //             manager_designation={seeker.manager_designation}
            //             manager_email_id={seeker.manager_email_id}
            //             max_salary={seeker.max_salary}
            //             min_salary={seeker.min_salary}
            //             pia_tp_name={seeker.pia_tp_name}
            //             pref_qualification={seeker.pref_qualification}
            //             qualification={seeker.qualification}
            //             reporting_manager_name={seeker.reporting_manager_name}
            //             cImg={seeker.user.profile_pic_url}
            //             plan_id={this.state.plan_id}
            //         /><br /><br />
            //     </div>
            // );
            // const provider_list = this.state.provider_result.map((provider) =>
            //     <div className="resource-provider-list" >

            //         <CardTemplateForProvider className="provider-card"
            //             key={provider.id}
            //             cardId={provider.id}
            //             cName={provider.user.name}
            //             cDob={provider.user.date_of_birth}
            //             cPhone={provider.user.phone_number}
            //             cEmail={provider.user.email}
            //             cPosition={provider.job}
            //             cLoc={provider.current_work_state}
            //             cExp={provider.exp_skill_industry}
            //             cId={provider.user.id}
            //             cSalary={provider.current_salary}
            //             eSalary={provider.expected_salary}
            //             aadhar_no={provider.aadhar_no}
            //             achievement={provider.achievement}
            //             current_work_district={provider.current_work_district}
            //             current_work_state={provider.current_work_state}
            //             educational_qualification={provider.educational_qualification}
            //             exp_skill_industry={provider.exp_skill_industry}
            //             exp_non_skill={provider.exp_non_skill}
            //             project_name={provider.project_name}
            //             designation_1={provider.designation_1}
            //             organization_1_name={provider.organization_1_name}
            //             total_tenure_1={provider.total_tenure_1}
            //             designation_2={provider.designation_2}
            //             organization_2_name={provider.organization_2_name}
            //             total_tenure_2={provider.total_tenure_2}
            //             designation_3={provider.designation_3}
            //             organization_3_name={provider.organization_3_name}
            //             total_tenure_3={provider.total_tenure_3}
            //             cImg={provider.user.profile_pic_url}
            //             plan_id={this.state.plan_id}
            //         /><br /><br />
            //     </div>
            // );
            return (
                <div><br /><br />
                    <div>
                        <div>
                            {/* <Form onSubmit={this.dynamicSearch}>
                                <Row style={{ width: "90%", margin: "auto" }}>
                                    <Col xs={10} style={{ paddingRight: "0px" }}>
                                        <Form.Group>
                                            <Form.Control
                                                type="text"
                                                placeholder="Search by Name, Role or Location"
                                                value={this.state.searchTerm}
                                                onChange={this.editSearchTerm}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={2} style={{ paddingLeft: "2px", fontSize: "100%" }}>
                                        <Button variant="primary" type="submit">
                                            Search
                                        </Button>
                                    </Col>
                                </Row>
                            </Form> */}
                        </div>
                        {(() => {
                            switch (this.state.select) {
                                case "All":
                                    return (
                                        <Container>
                                            <br />
                                            <h3><b>Required Resources</b></h3>
                                            <Row style={{ width: "150px", height: "10px", marginBottom: "50px" }}>
                                                <div style={{ width: "50%", borderBottom: "5px solid #11999e" }}></div>
                                                <div style={{ width: "50%", borderBottom: "5px solid #40514E" }}></div>
                                            </Row>
                                            <br />
                                            {this.props.match.params.industry === "Microfinance" ? <SeekerMfPagination /> : <SeekerSkillingPagination/>}
                                        </Container>
                                    );
                                default:
                                    return null;
                            }
                        })()}

                    </div>
                    <Footer />
                </div>
            );
        }
    }
}

export default DemoPeople;
