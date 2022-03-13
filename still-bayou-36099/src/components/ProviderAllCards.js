import LoadingElement from './Loader';
import React, { Component } from 'react'
import CardTemplateForProvider from "./CardTemplateForProvider"
import axios from 'axios';
import Cookies from "universal-cookie";
import '../style/css/CardDeckTemplate.css';


const cookies = new Cookies();

class ProviderAllCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            loader: true,
        }
    }
    componentDidMount() {
        //console.log(this.props)
        axios.get('https://www.resolabindia.com/api/core/list_providers_people_all_both/', {
            headers: {
                'Authorization': `Token ${cookies.get("token")}`
            }
        })
            .then((response) => {
                var i;
                for (i = 0; i < response.data.length; i++) {
                    if (response.data[i].user.id.toString() === this.props.match.params.userId) {
                        this.setState({
                            cards: this.state.cards.concat(response.data[i]),
                            loader: false
                        })
                    }
                }
            }, (error) => {
                console.log(error);
                this.setState({
                    error: true,
                    loader: false
                })
            });
    }
    render() {
        if (this.state.loader === true) {
            return (
                <LoadingElement />
            );
        }
        else
            return (
                <div>
                    <div className="row">
                        {this.state.cards.map((provider) => {
                            return (
                                <div className="resource-provider-list col-md-3 aligncenter">
                                    <CardTemplateForProvider className="provider-card"
                                        key={provider.id}
                                        cardId={provider.id}
                                        cName={provider.user.name}
                                        cEmail={provider.user.email}
                                        cDob={provider.user.date_of_birth}
                                        cPhone={provider.user.phone_number}
                                        cPosition={provider.job}
                                        cLoc={provider.current_work_state}
                                        cExp={provider.exp_skill_industry}
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
                                    /><br /><br /></div>)
                        })}
                    </div>
                </div>
            )
    }
}

export default ProviderAllCards
