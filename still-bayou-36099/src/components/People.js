import React, { Component, useEffect } from 'react';
import axios from 'axios';
import Cookies from "universal-cookie";
import { Container, CardDeck, Form, Button, Row, Col, Card } from 'react-bootstrap';

import LoadingElement from './Loader';
import Footer from './footer'
import '../style/css/People.min.css';
import ProviderMfPagination from './provider_mf_pagination';
import ProviderSkillingPagination from './provider_skilling_pagination';

const cookies = new Cookies();
class People extends Component {

  constructor() {
    const is_user_subscribed_api = "https://www.resolabindia.com/api/verification/is-user-subscribed/"

    axios.get(is_user_subscribed_api, {
      headers: {
        'Authorization': `Token ${cookies.get("token")}`
      }
    })
      .then(res => {
        const is_user_subscribed = res.data;
        cookies.set("is_user_subscribed", res.data.is_user_subscribed, {
          path: "/",
        });
      })
    super();
    this.state = {
      seeker_result: null,
      total_seeker: null,
      // provider_result: null,
      total_provider: null,
      pdata: false,
      sdata: false,
      error: false,
      searchTerm: '',
      select: "All",
      plan_id: "",
      is_user_subscribed: cookies.get("is_user_subscribed"),
    }
    // this.dynamicSearch = this.dynamicSearch.bind(this)
    // this.editSearchTerm = this.editSearchTerm.bind(this)
  }

  componentDidMount() {
    axios
      .get(
        `https://www.resolabindia.com/api/core/get_user_profile/${cookies.get(
          "id"
        )}/`,
        {
          headers: {
            Authorization: `Token ${cookies.get("token")}`
          },
        }
      )
      .then((res) => {
        this.setState({
          // is_user_subscribed: res.data.is_user_subscribed,
          plan_id: res.data.plan_id
        });
      })
      .catch((err) => {
        this.setState({
          loader: false
          //error: true
        });
      });
    
    // var path2;
    // if (this.props.match.params.industry === "Microfinance")
    //   path2 =
    //     "http://localhost:8000/core/list_providers_people_all_mf/?page=1";
    // else
    //   path2 =
    //     "http://localhost:8000/core/list_providers_people_all/?page=1&cards=1";
    // axios.get(path2).then(
    //   (response) => {
    //     console.log(response.data);
    //     this.setState({
    //       provider_result: response.data,
    //       total_provider: response.data,
    //       pdata: true
    //     });
    //   },
    //   (error) => {
    //     // console.log(cookies.get("token"));
    //     console.log(error);
    //     this.setState({
    //       pdata: false,
    //       error: true
    //     });
    //   }
    // );
  }

  // editSearchTerm = (event) => {
  //   this.setState({
  //     searchTerm: event.target.value
  //   })
  // }
  selectOption = (event) => {
    this.setState({
      select: event.target.value
    })
  }
  // dynamicSearch = (event) => {
  //   event.preventDefault();


  //   this.setState({
  //     provider_result: this.state.total_provider.filter(
  //       data => data.current_work_state.toLowerCase().includes(this.state.searchTerm.toLowerCase())
  //         || data.job.toLowerCase().includes(this.state.searchTerm.toLowerCase())
  //         || data.user.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
  //     )
  //   })
  // }

  render() {
    if (this.state.error === true) {
      return (
        <div>
          <br />
          <h1>Something went wrong. Please check your internet connection and try again.</h1>
        </div>
      );
    }
    else {
      return (
        <div><br /><br />
          <div>
            <div>
              {/* <Form onSubmit={this.dynamicSearch}>
                <Row style={{ width: "90%", margin: "auto" }}>
                  <Col xs={10} style={{ paddingRight: "0px" }}>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        placeholder="Search by Name, Role or Location"
                        value={this.state.searchTerm}
                        onChange={this.editSearchTerm}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={2} style={{ paddingLeft: "2px", fontSize: "100%" }}>
                    <Button variant="primary" type="submit">
                      Search
                    </Button>
                  </Col>
                </Row>
              </Form> */}
            </div>
            {(() => {
              switch (this.state.select) {
                case "All":
                  return (
                    <Container>
                      <br />
                      <h3><b>Available Resources</b></h3>
                      <Row style={{ width: "150px", height: "10px", marginBottom: "50px" }}>
                        <div style={{ width: "50%", borderBottom: "5px solid #11999e" }}></div>
                        <div style={{ width: "50%", borderBottom: "5px solid #40514E" }}></div>
                      </Row>
                      <br />
                      {this.props.match.params.industry === "Microfinance" ? <ProviderMfPagination /> : <ProviderSkillingPagination />}
                    </Container>
                  );
                default:
                  return null;
              }
            })()}

          </div>
          <Footer />
        </div>
      );
    }

  }
}

export default People;
