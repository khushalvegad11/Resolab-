import LoadingElement from './Loader';
import React, { Component } from 'react'
import CardTemplateForSeeker from './CardTemplateForSeeker';
import axios from 'axios';
import Cookies from "universal-cookie";
import '../style/css/CardDeckTemplate.css';


const cookies = new Cookies();

class SeekerAllCards extends Component {
    constructor(props){
        super(props);
        this.state = {
            cards:[],
            loader:true,
        }
    }
    componentDidMount() {
      //console.log(this.props)
      axios.get('https://www.resolabindia.com/api/core/list_seekers_people_all/', {
          headers: {
              'Authorization': `Token ${cookies.get("token")}`
          }
      })
          .then((response) => {
              var i;
              for (i = 0; i < response.data.length; i++) {
                  if (response.data[i].user.id.toString() === this.props.match.params.userId) {
                      this.setState({
                        cards:this.state.cards.concat(response.data[i]),
                        loader:false
                      })
                  }
              }}, (error) => {
          console.log(error);
          this.setState({
              error:true,
              loader:false
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
            {this.state.cards.map((seeker)=>{return (
                <div className="resource-provider-list col-md-3 aligncenter">
            <CardTemplateForSeeker className="seeker-card"
            key ={seeker.id}
            cardId ={seeker.id}
            date_of_birth= {seeker.user.date_of_birth}
            email= {seeker.user.email}
            name= {seeker.user.name}
            phone_number= {seeker.user.phone_number}
            profile_pic_url= {seeker.user.profile_pic_url}
            registered_region= {seeker.user.registered_region}
            company_name= {seeker.pia_tp_name}
            active_index="Contact"
            //cCategory={seeker.job.category.category_name}
            cSubCategory={seeker.job}
            cLoc={seeker.job_district}
            cSalaryUpper={seeker.max_salary}
            cSalaryLower={seeker.min_salary}
            cId={seeker.user.id}
            additional_req={seeker.additional_req}
            designation={seeker.designation}
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
            /><br/><br/></div>)})}
            </div>
            </div>
        )
    }
}

export default SeekerAllCards
