import React from 'react';
import {Route,Switch} from "react-router-dom";
//import Cookies from "universal-cookie";
import Available from './components/Available';
import ServiceSeekerForm from './components/ServiceSeekerForm'
import ServiceProviderForm from './components/ServiceProviderForm';
import DetailForm from './components/Details';
import Homepage from './components/Homepage';
import TNC from './components/TNC';
import PrivacyPolicy from './components/PrivacyPolicy';
import ErrorPage from './components/ErrorPage';
import LogOut from './components/Logout';
import SignUpForm from './components/SignUp'
import LoginForm from './components/Login';
import HowItWorks from './components/HowItWorks';
import People from './components/People';
import Navbar from './components/Navbar'
import ServicesPage from './components/Services';
import ContactPage from './components/Contact';
import PeopleSeekerForm from './components/PeopleSeekerForm';
import PeopleProviderForm from './components/PeopleProviderForm';
import LoadingElement from './components/Loader';
import SeekerDetails from './components/PeopleSeekerCardDetails/SeekerDetails';
import ProviderDetails from './components/PeopleProviderCardDetails/ProviderDetails';
import ResetPassword from './components/ResetPassword';
import PricingPage from './components/pricing';
import Profile from './components/Profile';
import Form2 from './components/InnerForm2';
import Form3 from './components/InnerForm3';

import AdvisoryProviderForm from './components/ServicesForm/AdvisoryProvider';
import AdvisorySeekerForm from './components/ServicesForm/AdvisorySeeker';
import AllProviderForm from './components/ServicesForm/AlliedProvider';
import AlliedSeekerForm from './components/ServicesForm/AlliedSeeker';
import InfraProviderForm from './components/ServicesForm/InfraProvider';
import InfraSeekerForm from './components/ServicesForm/InfraSeeker';

import AlliedProviderDetails from './components/ServiceProviderCardDetailsAllied/AlliedProviderDetails';
import InfraProviderDetails from './components/ServiceProviderCardDetailsInfra/InfraProviderDetails';
import AlliedSeekerDetails from './components/ServiceSeekerCardDetailsAllied/AlliedSeekerDetails';
import InfraSeekerDetails from './components/ServiceSeekerCradDetailsInfra/InfraSeekerDetails';

import './style/css/App.css';
import Required from './components/Required';
import SeekerAllCards from './components/SeekerAllCards';
import ProviderAllCards from './components/ProviderAllCards';
import TestServerReq from './components/TestServerReq';

import DemoPeople from './components/demo_seeker';

function App() {
  //const cookies = new Cookies();
  return (
    <div className="App">
    <Navbar/>
      <Switch>
        <Route exact path="/details" component={DetailForm} />
        <Route exact path="/" component={Homepage}/>
        <Route path="/signup" component={SignUpForm}/>
        <Route path="/login" component={LoginForm}/>
        <Route path="/availability/:industry" component={People}/>
        <Route path="/available/:industry" component={Available}/>
        <Route path="/required/:industry" component={Required}/>
        <Route path="/requirement/:industry" component={DemoPeople}/>
        <Route path="/contact" component={ContactPage} />
        <Route path="/PeopleProviderForm" component={PeopleProviderForm} />
        <Route path="/PeopleSeekerForm" component={PeopleSeekerForm} />
        <Route path="/ServiceSeekerForm" component={ServiceSeekerForm} />
        <Route path="/ServiceProviderForm" component={ServiceProviderForm}/>
        <Route path="/loader" component={LoadingElement}/>
        <Route path="/seekerdetails/:userId/:cardId" component={SeekerDetails}/>
        <Route path="/seekerdetails/:userId/" component={SeekerAllCards}/>
        <Route path="/providerdetails/:userId/:cardId" component={ProviderDetails}/>
        <Route path="/providerdetails/:userId/" component={ProviderAllCards}/>
        <Route path="/rpassword" component={ResetPassword}/>
        <Route path="/logout" component={LogOut}/>
        <Route path="/payment" component={PricingPage}/>
        <Route path="/howItWorks" component={HowItWorks}/>
        <Route path="/TNC" component={TNC}/>
        <Route path="/PrivacyPolicy" component={PrivacyPolicy}/>
        <Route path="/Profile" component={Profile}/>
        <Route path="/form2" component={Form2}/>
        <Route path="/form3" component={Form3}/>


        <Route path="/adpf" component={AdvisoryProviderForm}/>
        <Route path="/adsf" component={AdvisorySeekerForm}/>

        <Route path="/alpf" component={AllProviderForm}/>
        <Route path="/alsf" component={AlliedSeekerForm}/>

        <Route path="/ipf" component={InfraProviderForm}/>
        <Route path="/isf" component={InfraSeekerForm}/>
        <Route path="/apd/:userId/:cardId" component={AlliedProviderDetails}/>
        <Route path="/ipd/:userId/:cardId" component={InfraProviderDetails}/>
        <Route path="/ipd" component={InfraProviderDetails}/>
        <Route path="/asd" component={AlliedSeekerDetails}/>
        <Route path="/isd" component={InfraSeekerDetails}/>
        <Route path="/test" component={TestServerReq}/>

        <Route component={ErrorPage} />
      </Switch>
    </div>
  );
}

export default App;
