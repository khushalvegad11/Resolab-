 import React,{Component} from 'react';
import {Col,Row,Card,Button} from 'react-bootstrap';
import Cookies from "universal-cookie";
import axios from 'axios';

const cookies = new Cookies();
class PricingPage extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    openCheckout(amount,subid,plan) {
      console.log("Sub ID: "+subid);
      let options = {
        "key": "rzp_live_vbqjXwqbRQivlb",
        "amount": amount, // 2000 paise = INR 20, amount in paisa
        "name": "ENLIVEN SOLUTIONS",
        "payment_capture":"1",
        "description": "Purchase Description",
        "image": "",
        "period": "hourly",
        "interval": 1,
        "handler": function (response) {
          //alert(response.razorpay_payment_id);
          console.log(response);
          console.log(true);
            axios.post('https://www.resolabindia.com/api/core/subscribe/',{
              plan_id:plan
            },{
              headers: {
                'Authorization': `Token ${cookies.get("token")}`
              }
            })
        },
        "prefill": {
          "name": "",
          "email": ""
        },
        "theme": {
          "color": "#F37254"
        }
      };

      let rzp = new window.Razorpay(options);
      rzp.open();
    }

    paymentmonthlytrainer = event =>{
      event.preventDefault();
      axios.post('https://www.resolabindia.com/api/core/create_subscription/', {
        plan_id: "plan_FK1EvsUuXJNP6b"
      },
      {
        headers:{
          'Authorization': `Token ${cookies.get("token")}`
        }
      }).then((response)=>{
        console.log(response);
        console.log(response.data.response.id)
        const result = this.openCheckout("19900", response.data.response.id, "plan_FLqgRHzdEefDzo");
        console.log(result); //undefined
        //console.log(response.data.response.short_url);
        //window.open(response.data.response.short_url,'_blank')
      }).catch((error)=>{
        alert("Login and then retry after some time.")
      })
    }
    paymentmonthlyoperation = event => {
      event.preventDefault();
      axios.post('https://www.resolabindia.com/api/core/create_subscription/', {
        plan_id: "plan_FK1JHVbtKSmjov"
      }, {
        headers: {
          'Authorization': `Token ${cookies.get("token")}`
        }
      }).then((response) => {
        console.log(response);
        const result = this.openCheckout("29900", response.data.response.id, "plan_FK1JHVbtKSmjov")
        console.log(result);
        //console.log(response.data.response.short_url);
        //window.open(response.data.response.short_url, '_blank')
      }).catch((error) => {
        alert("Login and then retry after some time.")
      })
    }
    paymentmonthlyservice = event => {
      event.preventDefault();
      axios.post('https://www.resolabindia.com/api/core/create_subscription/', {
        plan_id: "plan_FK1LpTeMzTBOWv"
      }, {
        headers: {
          'Authorization': `Token ${cookies.get("token")}`
        }
      }).then((response) => {
        console.log(response);
        const result = this.openCheckout("50000", response.data.response.id, "plan_FK1LpTeMzTBOWv");
        console.log(result);
        //console.log(response.data.response.short_url);
        //window.open(response.data.response.short_url, '_blank')
      }).catch((error) => {
        alert("Login and then retry after some time.")
      })
    }
    paymentmonthlypartner = event => {
      event.preventDefault();
      axios.post('https://www.resolabindia.com/api/core/create_subscription/', {
        plan_id: "plan_FK1O3yI0IkPiIf"
      }, {
        headers: {
          'Authorization': `Token ${cookies.get("token")}`
        }
      }).then((response) => {
        console.log(response);
        const result = this.openCheckout("100000", response.data.response.id, "plan_FK1O3yI0IkPiIf");
        console.log(result);
        //console.log(response.data.response.short_url);
        //window.open(response.data.response.short_url, '_blank')
      }).catch((error) => {
        alert("Login and then retry after some time.")
      })
    }
    paymentmonthlyother = event => {
      event.preventDefault();
      axios.post('https://www.resolabindia.com/api/core/create_subscription/', {
        plan_id: "plan_FK1QvhZavksusl"
      }, {
        headers: {
          'Authorization': `Token ${cookies.get("token")}`
        }
      }).then((response) => {
        console.log(response);
        const result = this.openCheckout("75000", response.data.response.id, "plan_FK1QvhZavksusl");
        console.log(result);
        //console.log(response.data.response.short_url);
        //window.open(response.data.response.short_url, '_blank')
      }).catch((error) => {
        alert("Login and then retry after some time.")
      })
    }

    paymentyearlytrainer = event => {
      event.preventDefault();
      axios.post('https://www.resolabindia.com/api/core/create_subscription/', {
        plan_id: "plan_FK1Hb4cr5lnHZF"
      }, {
        headers: {
          'Authorization': `Token ${cookies.get("token")}`
        }
      }).then((response) => {
        console.log(response);

        const result = this.openCheckout("75000", response.data.response.id, "plan_FK1Hb4cr5lnHZF");
        console.log(result);
        //console.log(response.data.response.short_url);
        //window.open(response.data.response.short_url, '_blank')
      }).catch((error) => {
        alert("Login and then retry after some time.")
      })
    }
    paymentyearlyoperation = event => {
      event.preventDefault();
      axios.post('https://www.resolabindia.com/api/core/create_subscription/', {
        plan_id: "plan_FK1KG7CxaFA0iO"
      }, {
        headers: {
          'Authorization': `Token ${cookies.get("token")}`
        }
      }).then((response) => {
        console.log(response);
        const result = this.openCheckout("250000", response.data.response.id, "plan_FK1KG7CxaFA0iO");
        console.log(result);
        //console.log(response.data.response.short_url);
        //window.open(response.data.response.short_url, '_blank')
      }).catch((error) => {
        alert("Login and then retry after some time.")
      })
    }
    paymentyearlyservice = event => {
      event.preventDefault();
      axios.post('https://www.resolabindia.com/api/core/create_subscription/', {
        plan_id: "plan_FK1N2JDcWTBHaC"
      }, {
        headers: {
          'Authorization': `Token ${cookies.get("token")}`
        }
      }).then((response) => {
        console.log(response);
        const result = this.openCheckout("500000", response.data.response.id, "plan_FK1N2JDcWTBHaC");
        console.log(result);
        //console.log(response.data.response.short_url);
        //window.open(response.data.response.short_url, '_blank')
      }).catch((error) => {
        alert("Login and then retry after some time.")
      })
    }
    paymentyearlypartner = event => {
      event.preventDefault();
      axios.post('https://www.resolabindia.com/api/core/create_subscription/', {
        plan_id: "plan_FK1PUBR5JunPde"
      }, {
        headers: {
          'Authorization': `Token ${cookies.get("token")}`
        }
      }).then((response) => {
        console.log(response);
        const result = this.openCheckout("1000000", response.data.response.id, "plan_FK1PUBR5JunPde");
        console.log(result);
        //console.log(response.data.response.short_url);
        //window.open(response.data.response.short_url, '_blank')
      }).catch((error) => {
        alert("Login and then retry after some time.")
      })
    }
    paymentyearlyother = event => {
      event.preventDefault();
      axios.post('https://www.resolabindia.com/api/core/create_subscription/', {
        plan_id: "plan_FK1RalVSlq0Ee7"
      }, {
        headers: {
          'Authorization': `Token ${cookies.get("token")}`
        }
      }).then((response) => {
        console.log(response);
        const result = this.openCheckout("750000", response.data.response.id, "plan_FK1RalVSlq0Ee7");
        console.log(result);
        //console.log(response.data.response.short_url);
        //window.open(response.data.response.short_url, '_blank')
      }).catch((error) => {
        alert("Login and then retry after some time.")
      })
    }

    render(){
        return (
          <>
          <h1>Pricing</h1>
          <hr/>
          <br/>
            <div>
                <h4>Payment Plans (Monthly)</h4>
                <br/>
                <Row style={{width:"100%"}}>
                <Col lg={1}></Col>
                <Col lg={2}>
                    <Card
                    style={{maxWidth:"200px",width:"90%",border:"2px solid #d9c9a0",backgroundColor:"#fff2cf",marginBottom:"10px",paddingBottom:"10px"}}
                    className="ui card">
                        Trainer<br/>
                        <h1><sup style={{fontSize:"50%"}}>Rs</sup>199</h1>
                        <Button style={{width:"50%",margin:"auto"}} onClick={this.paymentmonthlytrainer}>Select</Button>
                    </Card>
                </Col>
                <Col lg={2}>
                    <Card
                    style={{maxWidth:"200px",width:"90%",border:"2px solid #d9c9a0",backgroundColor:"#fff2cf",marginBottom:"10px",paddingBottom:"10px"}}
                    className="ui card">
                        Operation Team<br/>
                        <h1><sup style={{fontSize:"50%"}}>Rs</sup>299</h1>
                        <Button style={{width:"50%",margin:"auto"}} onClick={this.paymentmonthlyoperation}>Select</Button>
                    </Card>
                </Col>
                <Col lg={2}>
                    <Card
                    style={{maxWidth:"200px",width:"90%",border:"2px solid #d9c9a0",backgroundColor:"#fff2cf",marginBottom:"10px",paddingBottom:"10px"}}
                    className="ui card">
                        Service Provider<br/>
                        <h1><sup style={{fontSize:"50%"}}>Rs</sup>500</h1>
                        <Button style={{width:"50%",margin:"auto"}} onClick={this.paymentmonthlyservice}>Select</Button>
                    </Card>
                </Col>
                <Col lg={2}>
                    <Card
                    style={{maxWidth:"200px",width:"90%",border:"2px solid #d9c9a0",backgroundColor:"#fff2cf",marginBottom:"10px",paddingBottom:"10px"}}
                    className="ui card">
                        Training Partner/PIA<br/>
                        <h1><sup style={{fontSize:"50%"}}>Rs</sup>1000</h1>
                        <Button style={{width:"50%",margin:"auto"}} onClick={this.paymentmonthlypartner}>Select</Button>
                    </Card>
                </Col>
                <Col lg={2}>
                    <Card
                    style={{maxWidth:"200px",width:"90%",border:"2px solid #d9c9a0",backgroundColor:"#fff2cf",marginBottom:"10px",paddingBottom:"10px"}}
                    className="ui card">
                        Others<br/>
                        <h1><sup style={{fontSize:"50%"}}>Rs</sup>750</h1>
                        <Button style={{width:"50%",margin:"auto"}} onClick={this.paymentmonthlyother}>Select</Button>
                    </Card>
                </Col>
                <Col lg={1}></Col>
                </Row>
                <br/>
            </div>
            <br/>
            <div>
                <h4>Payment Plans (Yearly)</h4>
                <br/>
                <Row style={{width:"100%"}}>
                <Col lg={1}></Col>
                <Col lg={2}>
                    <Card
                    style={{maxWidth:"200px",width:"90%",border:"2px solid #d9c9a0",backgroundColor:"#fff2cf",marginBottom:"10px",paddingBottom:"10px"}}
                    className="ui card">
                        Trainer<br/>
                        <h1><sup style={{fontSize:"50%"}}>Rs</sup>750</h1>
                        <Button style={{width:"50%",margin:"auto"}} onClick={this.paymentyearlytrainer}>Select</Button>
                    </Card>
                </Col>
                <Col lg={2}>
                    <Card
                    style={{maxWidth:"200px",width:"90%",border:"2px solid #d9c9a0",backgroundColor:"#fff2cf",marginBottom:"10px",paddingBottom:"10px"}}
                    className="ui card">
                        Operation Team<br/>
                        <h1><sup style={{fontSize:"50%"}}>Rs</sup>2500</h1>
                        <Button style={{width:"50%",margin:"auto"}} onClick={this.paymentyearlyoperation}>Select</Button>
                    </Card>
                </Col>
                <Col lg={2}>
                    <Card
                    style={{maxWidth:"200px",width:"90%",border:"2px solid #d9c9a0",backgroundColor:"#fff2cf",marginBottom:"10px",paddingBottom:"10px"}}
                    className="ui card">
                        Service Provider<br/>
                        <h1><sup style={{fontSize:"50%"}}>Rs</sup>5000</h1>
                        <Button style={{width:"50%",margin:"auto"}} onClick={this.paymentyearlyservice}>Select</Button>
                    </Card>
                </Col>
                <Col lg={2}>
                    <Card
                    style={{maxWidth:"200px",width:"90%",border:"2px solid #d9c9a0",backgroundColor:"#fff2cf",marginBottom:"10px",paddingBottom:"10px"}}
                    className="ui card">
                        Training Partner/PIA<br/>
                        <h1><sup style={{fontSize:"50%"}}>Rs</sup>10000</h1>
                        <Button style={{width:"50%",margin:"auto"}} onClick={this.paymentyearlypartner}>Select</Button>
                    </Card>
                </Col>
                <Col lg={2}>
                    <Card
                    style={{maxWidth:"200px",width:"90%",border:"2px solid #d9c9a0",backgroundColor:"#fff2cf",marginBottom:"10px",paddingBottom:"10px"}}
                    className="ui card">
                        Others<br/>
                        <h1><sup style={{fontSize:"50%"}}>Rs</sup>7500</h1>
                        <Button style={{width:"50%",margin:"auto"}} onClick={this.paymentyearlyother}>Select</Button>
                    </Card>
                </Col>
                <Col lg={1}></Col>
                </Row>
                <br/>
                <hr/>
                <h4>Note: Business subscription will be activated after verifcation/validation of Resource Card.</h4>
            </div>
          </>
        );
    }
}

//export default PricingPage;
