import React, { useState, useEffect } from 'react';
import { Col, Row, Card, Button, Table, Tab } from 'react-bootstrap';
import Cookies from "universal-cookie";
import axios from 'axios';
import "../style/css/Pricing.css";
import Footer from './footer';
import Plans from './plans.js';
import LoadingElement from './Loader';
import plans from './plans.js';
import Sub_Plan from './sub_plans';
import PostForm from './custom_price';
const cookies = new Cookies();

const individual_api = "https://www.resolabindia.com/api/verification/retrieve-individual-subscription/ "
const institution_api = "https://www.resolabindia.com/api/verification/retrieve-institutional-subscription/"



const PricingDetails = [
  {
    type: 'Individual',
    MonthlyPrice: '199',
    YearlyPrice: '1900'
  },
  {
    type: 'Institution',
    MonthlyPrice: '1000',
    YearlyPrice: '10000'
  },
]
class PricingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: "",
      loader: true,
      plan_GRu3HxLxYBPb87: 'Monthly Individual'
    }
  }
  componentDidMount() {
    const cookies = new Cookies();
    if (cookies.get('sub_id') !== "") {
      // console.log(cookies.get('sub_id'), cookies.get('sub_id'))
      axios.get(`https://www.resolabindia.com/api/core/get_sub_tnx_status/?sub_id=${cookies.get('sub_id')}/`, {
        headers: {
          'Authorization': `Token ${cookies.get("token")}`
        }
      }).then((res) => {
        // console.log(res.data.response);
        this.setState({
          status: res.data.response.status,
          detail: res.data.response,
          loader: false
        })
      }).catch((err) => {
        this.setState({ loader: false })
        console.log(err);
      })
    }
    else { this.setState({ loader: false }) }

  }







  paymentmonthlyindividual = (event, start_date) => {

    event.preventDefault();
    const plan_id = Plans.individual.monthly;
    console.log("paymentmonthlyindividual")
    axios.post('https://www.resolabindia.com/api/core/create_subscription/', {
      plan_id: plan_id,
      start_date: start_date
    },
      {
        headers: {
          'Authorization': `Token ${cookies.get("token")}`
        }
      }).then((response) => {
        const result = this.openCheckout("19900", response.data.response.id, plan_id);
        // console.log(result)
        //console.log(response.data.response.short_url);
        //window.open(response.data.response.short_url,'_blank')
      }).catch((error) => {
        console.log(error)
        alert("Login and then retry after some time.")
      })
  }
  paymentmonthlyinstitution = (event, start_date) => {
    const plan_id = Plans.institution.monthly
    event.preventDefault();
    axios.post('https://www.resolabindia.com/api/core/create_subscription/', {
      plan_id: plan_id,
      start_date: start_date
    }, {
      headers: {
        'Authorization': `Token ${cookies.get("token")}`
      }
    }).then((response) => {
      const result = this.openCheckout("100000", response.data.response.id, plan_id);
      // console.log(result)
      //console.log(response.data.response.short_url);
      //window.open(response.data.response.short_url, '_blank')
    }).catch((error) => {
      alert("Login and then retry after some time.")
    })
  }

  paymentyearlyindividual = (event, start_date) => {
    const plan_id = Plans.individual.yearly
    event.preventDefault();
    axios.post('https://www.resolabindia.com/api/core/create_subscription/', {
      plan_id: Plans.individual.yearly,
      start_date: start_date

    }, {
      headers: {
        'Authorization': `Token ${cookies.get("token")}`
      }
    }).then((response) => {

      const result = this.openCheckout("190000", response.data.response.id, plan_id);
      console.log(result)
      //console.log(response.data.response.short_url);
      //window.open(response.data.response.short_url, '_blank')
    }).catch((error) => {
      alert("Login and then retry after some time.")
    })
  }
  paymentyearlyinstitution = (event, start_date) => {
    const plan_id = Plans.institution.yearly
    event.preventDefault();
    axios.post('https://www.resolabindia.com/api/core/create_subscription/', {
      plan_id: Plans.institution.yearly,
      start_date: start_date
    }, {
      headers: {
        'Authorization': `Token ${cookies.get("token")}`
      }
    }).then((response) => {
      const result = this.openCheckout("1000000", response.data.response.id, plan_id);
      console.log(result)
      //console.log(response.data.response.short_url);
      //window.open(response.data.response.short_url, '_blank')
    }).catch((error) => {
      alert("Login and then retry after some time.")
    })
  }
  timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = date + ' ' + month + ' ' + year;
    return time;
  }


  HandleCancel = () => {
    var body = {
      sub_id: cookies.get('sub_id')
    }
    if (window.confirm("Are you sure you want to cancel your subscription?")) {
      axios.post(`https://www.resolabindia.com/api/core/cancel_subscription/`, body, {
        headers: {
          'Authorization': `Token ${cookies.get("token")}`
        }
      })
        .then((res) => {
          alert("Subscription Ended")
          axios.patch(`https://www.resolabindia.com/api/core/modify_user_profile/${cookies.get('id')}/`,
            {
              user: cookies.get('user'),
              is_subscribed: false
            }
            , {
              headers: { 'Authorization': `Token ${cookies.get("token")}` },
            })
            .then(response => {
              cookies.set("is_subscribed", false, { path: "/", });
              console.log("Sucess", response);
              //this.setState({loader:false})
              window.location.reload()
            })
            .catch((error) => {
              console.log(error)
            })
        })
        .catch((err) => { console.log(err) })
    }
  }

  HandleMenu = () => {
    if (document.getElementById('menu1')) {

      if (document.getElementById('menu1').style.display == 'none') {
        document.getElementById('menu1').style.display = 'block';
        document.getElementById('menu2').style.display = 'none';
      }
      else {
        document.getElementById('menu1').style.display = 'none';
        document.getElementById('menu2').style.display = 'block';
      }
    }
  }

  HandleSubmit = (event, category, plan, start_date) => {
    event.preventDefault();
    console.log("event " + event);
    console.log("category " + category);
    console.log("plan " + plan);

    if (category === "Individual" && plan === "monthly") {
      console.log("calling monthly trainer payment method");
      this.paymentmonthlyindividual(event, start_date);
    }
    else if (category === "Institution" && plan === "monthly") {
      this.paymentmonthlyinstitution(event, start_date);
    }

    if (category === "Individual" && plan === "yearly") {
      this.paymentyearlyindividual(event, start_date);
    }
    else if (category === "Institution" && plan === "yearly") {
      this.paymentyearlyinstitution(event, start_date);
    }
  }

  render() {
    var date = Date.now()
    var k = date % 1000
    date = date - k
    date = date / 1000
    var start_date
    if (cookies.get('sub_id') === "")
      start_date = date + 7 * 24 * 60 * 60
    else start_date = date;

    console.log(start_date, this.timeConverter(start_date), cookies.get('sub_id'));

    const Prices = PricingDetails.map((content) => {
      return (<>

        <div class="col-sm-4" style={{ margin: "auto", marginBottom: "50px" }}>
          <Card style={{ height: '230px', fontWeight: "bold", width: '320px', margin: "auto", marginBottom: '0px', fontFamily: "monospace", border: "1px solid grey", borderRadius: "25px", backgroundColor: "white" }} rounded className="shadow-card">
            <Card.Body className="aligncenter">
              <Card.Title className="cardTitle" style={{ borderBottom: "2px solid black", color: "green" }}>{content.type.toUpperCase()}</Card.Title>
              <Row style={{ width: "100%", height: "40%", borderBottom: "2px solid black", margin: "0", padding: "0" }}>
                <Col className="col-sm-3" style={{ fontSize: "16px", margin: "0px", padding: "0px", textAlign: "left" }}> Monthly</Col>
                <Col className="col-sm-3" style={{ fontSize: "16px", margin: "0px", padding: "0px", textAlign: "center" }}>&#8377; {content.MonthlyPrice}</Col>
                <Col className="col-sm-6" style={{ fontSize: "14px", margin: "0px", padding: "0px", textAlign: "right" }}>
                  {cookies.get('sub_id') === "" ?
                    <Button onClick={(event) => this.HandleSubmit(event, content.type, "monthly", start_date)}>Start Free Trial</Button>
                    :
                    this.state.status !== 'active' && this.state.status !== 'authenticated' ?
                      <Button onClick={(event) => this.HandleSubmit(event, content.type, "monthly", start_date)}>Select</Button>
                      : null}</Col>
              </Row>
              <Row style={{ width: "100%", margin: "auto", padding: "0" }}>
                <Col className="col-sm-3" style={{ fontSize: "16px", margin: "0px", padding: "0px", textAlign: "left" }}> Yearly</Col>

                <Col className="col-sm-3" style={{ fontSize: "16px", margin: "0px", padding: "0px", textAlign: "center" }}>&#8377; {content.YearlyPrice}</Col>

                <Col className="col-sm-6" style={{ fontSize: "14px", margin: "0px", padding: "0px", textAlign: "right" }}>
                  {
                    cookies.get('sub_id') === "" ?
                      <Button onClick={(event) => this.HandleSubmit(event, content.type, "yearly", start_date)}>Start Free Trial</Button>
                      : this.state.status !== 'active' && this.state.status !== 'authenticated' ?
                        <Button onClick={(event) => this.HandleSubmit(event, content.type, "yearly", start_date)}>Select</Button>
                        : null}</Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
      </>);
    });

    if (this.state.loader === false)

      return (
        <div className="row m-2">


          <br />
          {/* {this.state.status === 'active' || this.state.status === 'authenticated'
            ? <div><br />
              <h3>YOUR CURRENT PLAN</h3>
              <Row style={{ width: "150px", height: "10px", marginBottom: "10px" }}>
                <div style={{ width: "50%", borderBottom: "5px solid green" }}></div>
                <div style={{ width: "50%", borderBottom: "5px solid blue" }}></div>
              </Row>
              <div className="row" style={{ width: "100%", margin: "auto", marginBottom: "100px" }} highlightColor='#1976D2'>
                <Card style={{ height: '230px', textAlign: "left", fontWeight: "bold", width: '500px', margin: "auto", fontFamily: "monospace", border: "1px solid grey", borderRadius: "25px", backgroundColor: "white" }} rounded className="shadow-card">
                  <Card.Body>
                    {this.state.detail.plan_id === "plan_GRu3HxLxYBPb87" ? <h5 className="cardTitle" style={{ color: "green" }}>Monthly Individual Plan</h5> :
                      this.state.detail.plan_id === "plan_GRu9d1yyjhgaJf" ? <h5 className="cardTitle" style={{ color: "green" }}>Monthly Institution Plan</h5> :
                        this.state.detail.plan_id === "plan_GRu7PE529xK9lb" ? <h5 className="cardTitle" style={{ color: "green" }}>Yearly Individual Plan</h5> :
                          this.state.detail.plan_id === "plan_GRuAWcUIVrqRyo" ? <h5 className="cardTitle" style={{ color: "green" }}>Yearly Institution Plan</h5> : null

                    }
                    <br />
                    <b >Plan ID: {this.state.detail.plan_id}</b><br />
                    <b >Subscription ID: {this.state.detail.id}</b><br />
                    {console.log(this.timeConverter(this.state.detail.charge_at))}

                    <b >Next Billing Date: {this.timeConverter(this.state.detail.charge_at)}</b><br />

                    <div style={{ textAlign: "right", margin: "auto", fontFamily: "monospace", backgroundColor: "white" }}>
                      <br /><Button onClick={this.HandleCancel}>Cancel Subscription</Button>
                    </div>

                  </Card.Body>
                </Card>
              </div></div> : null}
          <h3>PRICING PLANS</h3>
          <Row style={{ width: "150px", height: "10px", marginBottom: "20px" }}>
            <div style={{ width: "50%", borderBottom: "5px solid green" }}></div>
            <div style={{ width: "50%", borderBottom: "5px solid blue" }}></div>
          </Row>
          <div className="row" style={{ width: "100%", margin: "auto", marginBottom: "100px" }} highlightColor='#1976D2'>
            {Prices}
          </div> */}

          {/* table */}
          <Sub_Plan/>

          <PostForm/>
          <Footer />
        </div>
      ); else return <LoadingElement />;
  }
};
export default PricingPage;

