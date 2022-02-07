import React,{Component} from 'react';
import axios from 'axios';
import Cookies from "universal-cookie";
import {Container,CardDeck,Form,Button,Row,Col,Card} from 'react-bootstrap';

import CardTemplateForSeeker from './CardTemplateForSeeker';
import LoadingElement from './Loader';
import Footer from './footer'
import '../style/css/People.min.css';

class Required extends Component{
    constructor(){
        super();
        this.state={
            seeker_result:null,
            total_seeker:null,
            provider_result:null,
            total_provider:null,
            pdata:false,
            sdata:false,
            error:false,
            searchTerm:'',
            select:"All",
            plan_id:""
        }
        this.dynamicSearch = this.dynamicSearch.bind(this)
        this.editSearchTerm = this.editSearchTerm.bind(this)
    }

    componentDidMount() {
        const cookies = new Cookies();
        axios.get(`https://www.resolabindia.com/api/core/get_user_profile/${cookies.get('id')}/`, {
            headers: {
                'Authorization': `Token ${cookies.get("token")}`
            }
        }).then((res) => {
            this.setState({
                is_subscribed: res.data.is_subscribed,
                plan_id:res.data.plan_id
            })
        }).catch((err) => {
            this.setState({
                loader: false,
                //error: true
            })
        })
        var path;
        if(this.props.match.params.industry==="Microfinance")
        path="https://www.resolabindia.com/api/core/list_seekers_people_all_mf/"
        else
        path= "https://www.resolabindia.com/api/core/list_seekers_people_all/"
        axios.get(path)
            .then((response) => {
            console.log(cookies.get("token"));
            this.setState({
                seeker_result:response.data,
                total_seeker:response.data,
                sdata:true
            })
        }, (error) => {
            console.log(cookies.get("token"));
            console.log(error);
            this.setState({
                sdata: false,
                error:true
            })
        });


    }
    editSearchTerm = (event) =>{
        this.setState({
            searchTerm:event.target.value
        })
    }

    dynamicSearch = (event)=>{
        event.preventDefault();

        this.setState({
            seeker_result : this.state.total_seeker.filter(
            data =>
           // data.job.category.category_name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
            //||
            data.job.toLowerCase().includes(this.state.searchTerm.toLowerCase())
            || data.job_district.toLowerCase().includes(this.state.searchTerm.toLowerCase())
            || data.pia_tp_name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
        )
        })
    }
    render(){
        if(this.state.error===true){
            return(
            <div>
            <br />
            <h1>Something went wrong. Please check your internet connection and try again.</h1>
            </div>
            );
        }
        else if(this.state.sdata===true){
        const seeker_list = this.state.seeker_result.map((seeker)=>
        <div className="resource-seeker-list">
            <CardTemplateForSeeker className="seeker-card"
            date_of_birth= {seeker.user.date_of_birth}
            email= {seeker.user.email}
            name= {seeker.user.name}
            phone_number= {seeker.user.phone_number}
            profile_pic_url= {seeker.user.profile_pic_url}
            registered_region= {seeker.user.registered_region}
            company_name= {seeker.pia_tp_name}
            active_index="Contact"
            designation= {seeker.designation}
            key ={seeker.id}
            cardId ={seeker.id}
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
            /><br/><br/>
            </div>
        );

            return (
            <div><br/><br/>
          <div fluid >
            <div>
            <Form onSubmit={this.dynamicSearch}>
            <Row style={{width:"100%",margin:"0px"}}>
            <Col xs={1} style={{paddingRight:"0px"}}>

            </Col>
            <Col xs={9} style={{paddingRight:"0px"}}><br/>
            <Form.Group>
                <Form.Control
                type="text"
                placeholder="Search by Name, Role or Location"
                value={this.state.searchTerm}
                onChange={this.editSearchTerm}
                />
            </Form.Group>
            </Col>
            <Col xs={2} style={{fontSize:"100%"}}>
            <Button variant="primary" type="submit">
                Search
            </Button>
            </Col>
            </Row>
            </Form>
            </div>

                    <Container>
                    <h3><br/><b>Required Resources</b></h3>
                    <Row style={{width:"150px",height:"10px",marginBottom:"50px"}}>
                      <div style={{width:"50%",borderBottom:"5px solid #11999e"}}></div>
                      <div style={{width:"50%",borderBottom:"5px solid #40514E"}}></div>
                    </Row>

                        <CardDeck>{this.state.seeker_result.length?seeker_list:
                        <Container>
                            <Card style={{ width: '18rem',margin:'auto' }}>
                                <h3>No data available</h3>
                            </Card>
                        </Container>
                        }</CardDeck>
                    </Container>


            </div>
            <Footer />
            </div>
        );
        }

        else{
            return(<LoadingElement />);
        }
    }
}

export default Required;
