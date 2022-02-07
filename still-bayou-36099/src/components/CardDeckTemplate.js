import React, { Component } from 'react';
//import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import CardTemplateForProvider from './CardTemplateForProvider.js';
import CardTemplateForSeeker from './CardTemplateForSeeker.js';
//import CardTemplateForHighlights from './CardTemplateForHighlights.js';
import '../style/css/CardDeckTemplate.css';
//import Cookies from "universal-cookie";
import axios from 'axios';
import LoadingElement from './Loader';


class CardDeckTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardsForProvider: {},
            cardsForSeeker: {},
            loader: true,
            error: false,
        }
    }
    componentDidMount() {
        //console.log(this.props.location.state.cId);
        //const cookies = new Cookies();
        if (this.props.cdType === "available") {
            axios.get('https://www.resolabindia.com/api/core/list_providers_people/')


                .then((response) => {
                    this.setState({
                        cardsForProvider: response.data,
                        loader: false
                    });
                }, (error) => {
                    console.log(error);
                    this.setState({
                        loader: false,
                        error: true
                    })
                });
        }
        if (this.props.cdType === "required") {
            axios.get('https://www.resolabindia.com/api/core/list_seekers_people/')
                .then((response) => {
                    this.setState({
                        cardsForSeeker: response.data,
                        loader: false
                    });
                }, (error) => {
                    console.log(error);
                    this.setState({
                        loader: false,
                        error: true
                    })
                });
        }
    }
    render() {
        //const cookies = new Cookies();

        if (this.state.loader === true)
            if (this.props.cdType === "highlights")
            this.setState({loader:false})
                //this.state.loader = false;
            else
                return <LoadingElement />
        if (this.state.error === true)
            return (
                <div>
                    <br />
                    <h1>There is an error</h1>
                </div>
            )

        else if (this.props.cdType === "available") {
  //      {/*Show 12 cards from available-resources data*/}
        var icount = 1;

        var deck123 = this.state.cardsForProvider.map((provider)=>
        {if(icount<5)return (
        <div className="resource-provider-list col-lg aligncenter">
        {console.log(icount++)}

            <CardTemplateForProvider className="provider-card"
            key ={provider.id}
            cardId={provider.id}
            cDob= {provider.user.date_of_birth}
			cPhone= {provider.user.phone_number}
			cEmail= {provider.user.email}
            cName={provider.user.name}
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
            />
            </div>)
            else return null;}
        );
            /* var deck = Object.keys(this.state.cardsForProvider).map((pkey) => {
                if (pkey < 8) {
                    return (<div className="owlitem">
                      <CardTemplateForProvider cUser={this.state.cardsForProvider[pkey].user.name}
                        cName={this.state.cardsForProvider[pkey].user.name}
                        cPosition={this.state.cardsForProvider[pkey].job}
                        cMoney={this.state.cardsForProvider[pkey].current_salary}
                        cLoc={this.state.cardsForProvider[pkey].user.registered_region}
                        cImg={this.state.cardsForProvider[pkey].user.profile_pic_url}
                        key={this.state.cardsForProvider[pkey].user.plan_id}
                        cExp={this.state.cardsForProvider[pkey].exp_skill_industry}
                        cId={this.state.cardsForProvider[pkey].user.id}
                    />
                  </div>)
                }
                 });*/
         }


        else if (this.props.cdType === "required") {
            icount = 1;

            deck123 = this.state.cardsForSeeker.map((seeker)=>
            {if(icount<5)return (
        <div className="resource-seeker-list col-lg aligncenter">
        {console.log(icount++, seeker)}
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
           // cCategory={seeker.job.category.category_name}
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
            />
            </div>)
        else return null;}
        );
           /* var deck = Object.keys(this.state.cardsForSeeker).map((skey) => {
                if (skey < 8) {
                    return (<div className="owlitem">
                      <CardTemplateForSeeker
                        cCategory={this.state.cardsForSeeker[skey].job.category.category_name}
                        cSubCategory={this.state.cardsForSeeker[skey].job}
                        cSalaryLower={this.state.cardsForSeeker[skey].max_salary}
                        cSalaryUpper={this.state.cardsForSeeker[skey].min_salary}
                        cPostedByVal={0}
                        cImg={this.state.cardsForSeeker[skey].user.profile_pic_url}
                        cLoc={this.state.cardsForSeeker[skey].user.registered_region}
                        key={this.state.cardsForSeeker[skey].user.plan_id}
                        cId={this.state.cardsForSeeker[skey].user.id}
                        pia_tp_name={this.state.cardsForSeeker[skey].pia_tp_name}
                    />
                  </div>)
                }
            })*/

        }
        //else if (this.props.cdType === "highlights") {
            // var deck = ['image1', 'image2', 'image3', 'image4',].map((card) => {
            //     return (
            //         <div className="item" style={{ width: "200px" }}>
            //             <CardTemplateForHighlights cStat={card} />
            //         </div>
            //     )
            // })

            //var icount = 1;
        //}
        return (
            <div class="row">

                {deck123}

            </div>
        );


    }
}


export default CardDeckTemplate;
