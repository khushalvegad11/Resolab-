import React,{Component} from 'react';
import axios from 'axios';
import Cookies from "universal-cookie";
import {Container,CardDeck,Form,Button,Row,Col,Card} from 'react-bootstrap';

import CardTemplateForProvider from './CardTemplateForProvider';
import LoadingElement from './Loader';
import Footer from './footer'
import '../style/css/People.min.css';

class Available extends Component{
    constructor(){
        super();
        this.state={
            provider_result:null,
            total_provider:null,
            pdata:false,
            error:false,
            searchTerm:'',
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
        path="https://www.resolabindia.com/api/core/list_providers_people_all_mf/"
        else
        path= "https://www.resolabindia.com/api/core/list_providers_people_all/"
        axios.get(path)
            .then((response) => {
            this.setState({
                provider_result: response.data,
                total_provider: response.data,
                pdata:true
            })
        }, (error) => {
            console.log(error);
            this.setState({
                pdata: false,
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
            provider_result : this.state.total_provider.filter(
            data => data.current_work_state.toLowerCase().includes(this.state.searchTerm.toLowerCase())
            || data.job.toLowerCase().includes(this.state.searchTerm.toLowerCase())
            || data.user.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
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
        else if(this.state.pdata===true){
        const provider_list = this.state.provider_result.map((provider)=>
        <div className="resource-provider-list" >
            <CardTemplateForProvider className="provider-card"
            key ={provider.id}
            cardId={provider.id}
            cName={provider.user.name}
            cEmail={provider.user.email}
            cDob={provider.user.date_of_birth}
            cPhone={provider.user.phone_number}
            cPosition={provider.job}
            cLoc={provider.current_work_state}
            cExp = {provider.exp_skill_industry}
            cId={provider.user.id}
            cSalary={provider.current_salary}
            eSalary={provider.expected_salary}
            aadhar_no={provider.aadhar_no}
            achievement={provider.achievement}
            current_work_district={provider.current_work_district}
            current_work_state={provider.current_work_state}
            educational_qualification={provider.educational_qualification}
            exp_skill_industry={provider.exp_skill_industry}
            exp_non_skill={provider.exp_non_skill}
            project_name={provider.project_name}
            designation_1={provider.designation_1}
            organization_1_name={provider.organization_1_name}
            total_tenure_1={provider.total_tenure_1}
            designation_2={provider.designation_2}
            organization_2_name={provider.organization_2_name}
            total_tenure_2={provider.total_tenure_2}
            designation_3={provider.designation_3}
            organization_3_name={provider.organization_3_name}
            total_tenure_3={provider.total_tenure_3}
            cImg={provider.user.profile_pic_url}
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
                <Col xs={9} style={{paddingRight:"0px"}}>
                <Form.Group><br/>
                    <Form.Control
                    type="text"
                    placeholder="Search by Name, Role or Location"
                    value={this.state.searchTerm}
                    onChange={this.editSearchTerm}
                    />
                </Form.Group>
                </Col>
                <Col xs={2} style={{paddingLeft:"2px",fontSize:"100%"}}>
                <Button variant="primary" type="submit">
                    Search
                </Button>
                </Col>
                </Row>
            </Form>
            </div>

                    <Container>
                    <br/>
                    <h3><b>Available Resources</b></h3>
                    <Row style={{width:"150px",height:"10px",marginBottom:"50px"}}>
                      <div style={{width:"50%",borderBottom:"5px solid #11999e"}}></div>
                      <div style={{width:"50%",borderBottom:"5px solid #40514E"}}></div>
                    </Row>
                        <CardDeck style={{margin:"auto"}}>{this.state.provider_result.length?provider_list:
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

export default Available;
