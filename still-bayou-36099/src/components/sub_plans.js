import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Row, Card, Button, Table, Tab } from 'react-bootstrap';
import { Redirect } from 'react-router';
import Cookies from "universal-cookie";

const cookies = new Cookies();

const individual_api = "https://www.resolabindia.com/api/verification/retrieve-individual-subscription/ "
const institution_api = "https://www.resolabindia.com/api/verification/retrieve-institutional-subscription/"
const checkout_sub_data_api = "https://www.resolabindia.com/api/verification/checkout-subscription-data/"

const Sub_Plan = () => {

    const HandleMenu = () => {
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


    const HandleSubmit = (data, e) => {
        if (cookies.get('token') === undefined) {
            alert("Please login to buy this plan")
        }
        else if (cookies.get('token') && cookies.get('is_user_subscribed')=="false") {
            const body = {
                "subscription_plan_id": data.id
            }
            axios.post(checkout_sub_data_api, body, {
                headers:{
                    'Authorization': `Token ${cookies.get("token")}`
                },
            })
                .then((res) => {
                    if (res) {
                        let rzp = new window.Razorpay(res.data);
                        rzp.open();
                    }
                }, (error) => {
                    console.log(error);
                });
        }
        else if (cookies.get('token') && cookies.get('is_user_subscribed')=="true") {
            alert("Sorry , your can not buy new plan if you have already active plan. After expire of your plan you can buy new plan.")
        }

    }

    const [indi_plans, setIndiPlans] = useState([])
    const [insti_plans, setInstiPlans] = useState([])

    const getPlans = async () => {
        const indi_response = await fetch(individual_api)
        const insti_response = await fetch(institution_api)
        setIndiPlans(await indi_response.json())
        setInstiPlans(await insti_response.json())
    }


    useEffect(() => {
        getPlans()
    }, [])

    return (<>
        <div className="col-md-7 offset-md-2 border m-2 solid shadow mx-auto">
            <h3>Subscription Plans</h3>

            <br />
            <div className="container mt-0">
                <Table className="mt-0">
                    <tr className="nav nav-tabs" style={{ display: "flex", justifyContent: "right" }}>
                        <th className="border solid shadow col" style={{ background: "#778899" }}><a data-toggle="tab" onClick={HandleMenu} href="#menu1" style={{ color: "black", fontSize: "20px" }}>Individual</a></th>
                        <th className="border solid shadow col" style={{ background: "#778899" }}><a data-toggle="tab" href="#menu2" onClick={HandleMenu} style={{ color: "black", fontSize: "20px" }}>Institution</a></th>
                    </tr>
                </Table>

                <div id="menu1" className="col mb-2 pl-0 pr-0">
                    <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th>Frequency</th>
                                <th>Amount<span style={{ color: 'red' }}>*</span></th>
                                <th>Buy</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                indi_plans.map((curEle) => {
                                    return (
                                        <tr>
                                            <td>{curEle.plan_name}</td>
                                            <td>{curEle.plan_amount}</td>
                                            <td value={curEle.id} className="btn btn-primary mx-auto m-2 pr-4 pl-4 pt-1 pb-1" onClick={HandleSubmit.bind(this, curEle)} style={{ background: "#003171" }} >Pay</td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </Table>
                </div>
                <div id="menu2" className="col mb-2 mb-2 pl-0 pr-0" style={{ display: "none" }}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Frequency</th>
                                <th>Amount</th>
                                <th>Buy</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                insti_plans.map((content) => {
                                    return (
                                        <tr>
                                            <td>{content.plan_name}</td>
                                            <td>{content.plan_amount}</td>
                                            <td value={content.id} className="btn btn-secondary mx-auto m-2 pt-1 pb-1 pr-4 pl-4" onClick={HandleSubmit.bind(this, content)} style={{ background: "#003171" }}>Pay</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
            <h6><span style={{ color: "red" }}>*</span>GST not included</h6>
        </div>


    </>)
}
export default Sub_Plan

