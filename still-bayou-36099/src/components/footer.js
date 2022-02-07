import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../style/css/footer.css";
import logo from '../logo568.png'


import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAbout: false
    }
  }
  handleShowAbout = (e) => {
    e.preventDefault();
    if (this.state.showAbout === false) {
      this.setState({
        showAbout: true
      })
    }
    else if (this.state.showAbout === true) {
      this.setState({
        showAbout: false
      })
    }

  }
  render() {


    return (
            
        
            
      <Container fluid className="dark_d1 footer">
        {/* <Row>
          <div id="heading-footer"><br />
            <img src={logo} alt="logo" className="logo" width="160" height="150" overflow="hidden" />
            <br />
          </div>
        </Row> */}
        <Row className=" dark_r1">
          <Col sm={8} className="dark_d1">

            <Row className="r1">
              <Col className="dark_l1">

                <br /><b>
                  <Link to="/">Home</Link><br />
                  <Link to="/people/skilling">People</Link><br />
                  <Link to="/services/skilling">Services</Link><br />
                  <Link to="/emodules">E-learning</Link><br />
                  <Link to="/Payment">Pricing</Link><br />
                  <Link to="/contact">Contact Us</Link>
                </b>
              </Col>
            </Row>
            <br />

          </Col>
          <Col sm={4} className="dark_r1">

            <h5><a href="mailto: support@enliven-solutions.com" style={{ color: "black" }}>support@enliven-solutions.com
            </a></h5>
            <h5>
              <a href="https://www.facebook.com/Resource-LAB-295277393821201" className="social">
                <FaFacebookF size={100} />
              </a>

              <a className="social">
                <FaTwitter />
              </a>

              <a href="https://www.linkedin.com/company/enliven-solutions-pvt-ltd/" className="social">
                <FaLinkedinIn />
              </a>

              <a href="mailto: connect@enliven-solutions.com" className="social">
                <FaEnvelope />
              </a>

              <a href="https://wa.me/+919472464181/" className="social">
                <FaWhatsapp />
              </a>
            </h5>
          </Col>
        </Row>
        <div style={{ textAlign: "center" }}>
          <h6>Copyright &copy; Enliven Solutions Pvt Ltd. <small><b>CIN: U80100GJ2011NPL067351</b></small></h6>
        </div>

      </Container>
        
            
        
    );

  }

}
export default Footer;
