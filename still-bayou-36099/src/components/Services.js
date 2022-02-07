import React, { Component } from 'react';
import { Container, Card, CardDeck, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Cookies from "universal-cookie";
import LoadingElement from "./Loader";
import InfraProviderCard from './ServiceCard/InfraProvider';
import AlliedProvider from './ServiceCard/AlliedProvider';
import InfraSeekerCard from './ServiceCard/InfraSeeker';
import AlliedSeekerCard from './ServiceCard/AlliedSeeker';

import CardTemplateForSeeker from './CardTemplateForSeeker';

//import ErrorPage from '../components/ErrorPage';
import Footer from './footer';
import '../style/css/services.css';

class ServicesPage extends Component {
    constructor() {
        super();
        this.state = {
            seeker_result: null,
            total_seeker: null,
            sdata: false,
            tipdata: null,
            tapdata: null,
            tisdata: null,
            tasdata: null,
            error: false,
            loader: true,
            check_data1: false,
            check_data2: false,
            check_data3: false,
            check_data4: false,
            select: "All",
            searchTerm: "",
            ipdata: null,
            apdata: null,
            isdata: null,
            asdata: null,
            plan_id: "",
            offer: true
        }
        this.dynamicSearch = this.dynamicSearch.bind(this);
    }
    componentDidMount() {
        const cookies = new Cookies();
        console.log(cookies)
        axios.get(`https://www.resolabindia.com/api/core/get_user_profile/${cookies.get('id')}/`, {
            headers: {
                'Authorization': `Token ${cookies.get("token")}`
            }
        }).then((res) => {
            this.setState({
                plan_id: res.data.plan_id
            })
        }).catch((err) => {
            this.setState({
                loader: false,
                //error: true
            })
        })
        axios.get("https://www.resolabindia.com/api/core/list_providers_adalserv/", {

        }).then((response) => {
            console.log(cookies.get("token"));
            this.setState({
                tapdata: response.data,
                apdata: response.data,
                check_data1: true
            })
        }).catch((error) => {
            console.log(cookies.get("token"));
            console.log(error);
            this.setState({
                error: true
            })
        });
        axios.get("https://www.resolabindia.com/api/core/list_seekers_infraserv/", {

        }).then((response) => {
            console.log(cookies.get("token"));
            this.setState({
                tipdata: response.data,
                ipdata: response.data,
                check_data2: true
            })
        }).catch((error) => {
            console.log(cookies.get("token"));
            console.log(error);
            this.setState({
                error: true
            })
        });
        axios.get("https://www.resolabindia.com/api/core/list_seekers_adalserv/", {

        }).then((response) => {
            console.log(cookies.get("token"));
            this.setState({
                tasdata: response.data,
                asdata: response.data,
                check_data3: true
            })
        }).catch((error) => {
            console.log(cookies.get("token"));
            console.log(error);

            this.setState({
                error: true
            })
        });
        axios.get("https://www.resolabindia.com/api/core/list_seekers_people_all_both/", {

        }).then((response) => {
            console.log(cookies.get("token"));
            this.setState({
                tisdata: response.data,
                isdata: response.data,
                seeker_result: response.data,
                total_seeker: response.data,
                sdata: true,
                check_data4: true
            })
        }).catch((error) => {
            console.log(cookies.get("token"));
            console.log(error);
            this.setState({
                sdata: false,
                error: true
            })

        });
    }

    selectOption = (event) => {
        this.setState({
            select: event.target.value
        })
    }

    editSearchTerm = (event) => {
        this.setState({
            searchTerm: event.target.value
        })
    }

    dynamicSearch = (event) => {
        event.preventDefault();

        console.log(this.state.tapdata);
        console.log(this.state.tipdata);
        this.setState({
            apdata: this.state.tapdata.filter(
                data => {
                    console.log(data);
                    return (
                        //data.job.category.category_name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
                        //||
                        data.job.toLowerCase().includes(this.state.searchTerm.toLowerCase())
                        || data.user.registered_region.toLowerCase().includes(this.state.searchTerm.toLowerCase()));
                }
            )
        })
        this.setState({
            ipdata: this.state.tipdata.filter(
                data =>
                    //data.job.category.category_name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
                    //  ||
                    data.location_state.toLowerCase().includes(this.state.searchTerm.toLowerCase())
            )
        })
        this.setState({
            asdata: this.state.tasdata.filter(
                data => {
                    console.log("as");
                    console.log(data);
                    return (
                        //data.job.category.category_name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                        data.job.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                        data.project_location.toLowerCase().includes(this.state.searchTerm.toLowerCase()));
                }
            )
        })
        this.setState({
            isdata: this.state.tisdata.filter(
                data => {
                    return
                    // data.job.category.category_name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                    data.job.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                        data.address.toLowerCase().includes(this.state.searchTerm.toLowerCase())
                })
        })
    }

    activateoffer = () => {
        if (this.state.offer === true) {
            this.setState(
                {
                    error: false
                }
            )
        }
        return "";
    }

    render() {

        if (this.state.error === true) {
            return (
                <div>
                    <br />
                    <h3>Something went wrong. Please check your internet connection and try again.</h3>
                </div>
            );
        }
        else if (this.state.check_data1 === true && this.state.check_data2 === true && this.state.check_data3 === true && this.state.check_data4 === true) {
            const tpi = this.state.ipdata.map((ip) =>
                <div class="col-lg-6">
                    <InfraProviderCard className="resource-provider-list"
                        key={ip.id}
                        //cCategory={ip.job.category.category_name}
                        cArea={ip.total_area}
                        cCapacity={ip.no_halls}
                        cLocation={ip.location_state}
                        cFacility={ip.basic_facility}
                        cImg={ip.pic_urls}
                        cObject={ip}
                        plan_id={this.state.plan_id}
                    />
                    <br /><br />
                </div>
            )
            // const api = this.state.apdata.map((ap) =>
            //     <div class="col-lg-6">
            //         <AlliedProvider className="resource-provider-list"
            //             key={ap.id}
            //             //cCategory={ap.job.category.category_name}
            //             cLocation={ap.user.registered_region}
            //             userId={ap.user.id}
            //             cardId={ap.id}
            //             cName={ap.contact_name}
            //             cPresence={ap.geo_presence}
            //             cOrgName={ap.org_name}
            //             cJob={ap.job}
            //             cImg={ap.pic_urls}
            //             cObject={ap}
            //             plan_id={this.state.plan_id}
            //         /><br /><br /></div>
            // )
            const seeker_list = this.state.seeker_result.map((seeker) =>
                <div className="resource-seeker-list">

                    <CardTemplateForSeeker className="seeker-card"
                        key={seeker.id}
                        cardId={seeker.id}
                        date_of_birth={seeker.user.date_of_birth}
                        email={seeker.user.email}
                        name={seeker.user.name}
                        phone_number={seeker.user.phone_number}
                        profile_pic_url={seeker.user.profile_pic_url}
                        registered_region={seeker.user.registered_region}
                        company_name={seeker.pia_tp_name}
                        active_index="Contact"
                        designation={seeker.designation}
                        //cCategory={seeker.job.category.category_name}
                        cSubCategory={seeker.job}
                        cLoc={seeker.job_district}
                        cSalaryUpper={seeker.max_salary}
                        cSalaryLower={seeker.min_salary}
                        cId={seeker.user.id}
                        additional_req={seeker.additional_req}
                        employee_id={seeker.employee_id}
                        experience_details={seeker.experience_details}
                        job_district={seeker.job_district}
                        joining_requirement={seeker.joining_requirement}
                        legal_status={seeker.legal_status}
                        manager_contact_number={seeker.manager_contact_number}
                        manager_designation={seeker.manager_designation}
                        manager_email_id={seeker.manager_email_id}
                        max_salary={seeker.max_salary}
                        min_salary={seeker.min_salary}
                        pia_tp_name={seeker.pia_tp_name}
                        pref_qualification={seeker.pref_qualification}
                        qualification={seeker.qualification}
                        reporting_manager_name={seeker.reporting_manager_name}
                        cImg={seeker.user.profile_pic_url}
                        plan_id={this.state.plan_id}
                    /><br /><br />
                </div>
            );
            const tsi = this.state.isdata.map((is) =>

                <CardTemplateForSeeker style={{ margin: "auto" }}
                    key={is.id}
                    //cCategory={is.job.category.category_name}
                    cSubCategory={is.job}
                    cLoc={is.project_location_state}
                    cArea={is.total_area}
                    cObject={is}
                    plan_id={this.state.plan_id}
                />
            )
            const tsa = this.state.asdata.map((as) =>
                <CardTemplateForSeeker style={{ margin: "auto" }}
                    key={as.id}
                    //cCategory={as.job.category.category_name}
                    cSubCategory={as.job}
                    cLoc={as.project_location}
                    cName={as.contact_name}
                    cObject={as}
                    plan_id={this.state.plan_id}
                />
            )
            return (
                <div>
                    <Container>
                        <br />
                        <div>
                            <Form onSubmit={this.dynamicSearch}>
                                <Row >
                                    {/* <Col xs={11} style={{ paddingRight: "0px" }}>
                                        <Form.Group><br />
                                            <input name="option" type="radio" value="Available Resources" onChange={this.selectOption} />Available
                                            &nbsp;  <input name="option" type="radio" value="Required Resources" onChange={this.selectOption} />Required
                                            &nbsp;  <input name="option" type="radio" value="All" onChange={this.selectOption} />All
                                        </Form.Group>
                                    </Col> */}
                                    <Col xs={10} style={{ paddingRight: "0px" }}>
                                        <Form.Group>
                                            <Form.Control
                                                type="text"
                                                placeholder="Search by Category or Location"
                                                value={this.state.searchTerm}
                                                onChange={this.editSearchTerm}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={2} style={{ paddingLeft: "5px", fontSize: "100%" }}>
                                        <Button variant="primary" type="submit">
                                            Search
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                        <br />
                        <div>
                            {(() => {
                                switch (this.state.select) {
                                    case "All":
                                        return (
                                            <div>
                                                <h3><b>Required Resources</b></h3>
                                                <Row style={{ width: "150px", height: "10px", marginBottom: "50px" }}>
                                                    <div style={{ width: "50%", borderBottom: "5px solid #11999e" }}></div>
                                                    <div style={{ width: "50%", borderBottom: "5px solid #40514E" }}></div>
                                                </Row>
                                                <br />
                                                <br />
                                                <div className="resource-seeker-list" >
                                                    <CardDeck >
                                                        <br />
                                                        {tsi}

                                                        {tsa}



                                                        {seeker_list}

                                                    </CardDeck>
                                                </div>
                                            </div>);
                                        {/* case "All":
                                        return (
                                            <div>
                                                <h3><b>Available Resources</b></h3>
                                                <Row style={{ width: "150px", height: "10px", marginBottom: "50px" }}>
                                                    <div style={{ width: "50%", borderBottom: "5px solid #11999e" }}></div>
                                                    <div style={{ width: "50%", borderBottom: "5px solid #40514E" }}></div>
                                                </Row>
                                                <CardDeck>
                                                    {tpi}
                                                </CardDeck>

                                                <CardDeck>
                                                    <br />
                                                    {api}
                                                    <br />
                                                </CardDeck>
                                                <br />
                                                <h3><b>Required Resources</b></h3>
                                                <Row style={{ width: "150px", height: "10px", marginBottom: "50px" }}>
                                                    <div style={{ width: "50%", borderBottom: "5px solid #11999e" }}></div>
                                                    <div style={{ width: "50%", borderBottom: "5px solid #40514E" }}></div>
                                                </Row>

                                                <CardDeck className="resource-provider-list" >
                                                    <br />
                                                    {tsi}
                                                    {tsa}
                                                    <br />
                                                </CardDeck>
                                            </div>);
                                    case "Available Resources":
                                        return (
                                            <div>
                                                <h3><b>Available Resources</b></h3>
                                                <Row style={{ width: "150px", height: "10px", marginBottom: "50px" }}>
                                                    <div style={{ width: "50%", borderBottom: "5px solid #11999e" }}></div>
                                                    <div style={{ width: "50%", borderBottom: "5px solid #40514E" }}></div>
                                                </Row>
                                                <br />
                                                <CardDeck>
                                                    <br />
                                                    {tpi}
                                                    <br />
                                                </CardDeck>
                                                <CardDeck>
                                                    <br />
                                                    {api}
                                                    <br />
                                                </CardDeck>
                                            </div>);
                                    case "Infrastructure Resources":
                                        return (
                                            <div>
                                                <h3><b>Infrastructure Available</b></h3>
                                                <Row style={{ width: "150px", height: "10px", marginBottom: "50px" }}>
                                                    <div style={{ width: "50%", borderBottom: "5px solid #11999e" }}></div>
                                                    <div style={{ width: "50%", borderBottom: "5px solid #40514E" }}></div>
                                                </Row>
                                                <CardDeck>
                                                    <br />
                                                    {this.state.ipdata.length ? tpi :
                                                        <Container>
                                                            <br />
                                                            <Card style={{ width: '18rem', margin: 'auto' }}>
                                                                <h3>No data available</h3>
                                                            </Card>
                                                        </Container>}
                                                    <br />
                                                </CardDeck>
                                            </div>
                                        );
                                    case "Allied and Advisory Resources":
                                        return (
                                            <div>
                                                <h3><b>Advisory and Allied Services Available</b></h3>
                                                <Row style={{ width: "150px", height: "10px", marginBottom: "50px" }}>
                                                    <div style={{ width: "50%", borderBottom: "5px solid #11999e" }}></div>
                                                    <div style={{ width: "50%", borderBottom: "5px solid #40514E" }}></div>
                                                </Row>
                                                <CardDeck>
                                                    <br />
                                                    {this.state.apdata.length ? api :
                                                        <Container>
                                                            <br />
                                                            <Card style={{ width: '18rem', margin: 'auto' }}>
                                                                <h3>No data available</h3>
                                                            </Card>
                                                        </Container>}
                                                    <br />
                                                </CardDeck>
                                            </div>
                                        ); */}
                                        {/* case "Infrastructure Required":
                                        return (
                                            <div>
                                                <h3><b>Infrastructure Resources</b></h3>
                                                <Row style={{ width: "150px", height: "10px", marginBottom: "50px" }}>
                                                    <div style={{ width: "50%", borderBottom: "5px solid #11999e" }}></div>
                                                    <div style={{ width: "50%", borderBottom: "5px solid #40514E" }}></div>
                                                </Row>
                                                <div className="resource-provider-list">
                                                    <CardDeck>
                                                        <br />
                                                        {this.state.isdata.length ? tsi :
                                                            <Container>
                                                                <Card style={{ width: '18rem', margin: 'auto' }}>
                                                                    <h3>No data available</h3>
                                                                </Card>
                                                            </Container>}
                                                    </CardDeck>
                                                </div>
                                            </div>
                                        );
                                    case "Allied and Advisory Required":
                                        return (
                                            <div>
                                                <h3><b>Advisory and Allied Services Required</b></h3>
                                                <Row style={{ width: "150px", height: "10px", marginBottom: "50px" }}>
                                                    <div style={{ width: "50%", borderBottom: "5px solid #11999e" }}></div>
                                                    <div style={{ width: "50%", borderBottom: "5px solid #40514E" }}></div>
                                                </Row>
                                                <div className="resource-provider-list">
                                                    <CardDeck >
                                                        <br />
                                                        {this.state.asdata.length ? tsa :
                                                            <Container>
                                                                <Card style={{ width: '18rem', margin: 'auto' }}>
                                                                    <h3>No data available</h3>
                                                                </Card>
                                                            </Container>}
                                                        <br />
                                                    </CardDeck>
                                                </div>
                                            </div>
                                        ); */}
                                    default:
                                        return null;
                                }
                            })()}
                        </div>

                    </Container>
                    <Footer />
                </div>
            );
        }
        else {
            return <LoadingElement />;
        }
    }
}

export default ServicesPage;
