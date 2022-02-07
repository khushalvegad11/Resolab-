import { Form, Navbar, Nav, Container } from "react-bootstrap";
import React from 'react'
import { Link } from "react-router-dom";
import logo from "../images/logo_trim.png";
import Cookies from "universal-cookie";
import "../style/css/Navbar.min.css";



function Navbar1() {
  var redirect = false;
  const cookies = new Cookies();
  function handleLogout(event) {
    if (window.confirm("Do you really want to leave?")) {
      event.preventDefault();
      cookies.remove('token'); cookies.remove('name');
      cookies.remove('card_made'); cookies.remove('user');
      cookies.remove('name'); cookies.remove('phone_number');
      cookies.remove('picture'); cookies.remove('email');
      cookies.remove('is_subscribed'); cookies.remove('is_verified');
      cookies.remove("id"); cookies.remove("addedparam");
      cookies.remove("industry"); cookies.remove("is_seeker");
      cookies.remove("staff"); cookies.remove("is_provider");
      cookies.remove("plan_id"); cookies.remove("sub_id");
      redirect = true;
      renderRedirect();
    }

  }
  function renderRedirect() {
    if (redirect) {
      // console.log(cookies)
      window.location.replace('/');
    }
  }

  return (
          <div className="nav_container sticky-top">
      <Container>
          <Navbar collapseOnSelect expand="lg" bg="light" variant="light" sticky="top" className="py-0">
      <Navbar className="hidden-xs hidden-sm" expand="lg" bg="light" variant="light" sticky="top" id="notification">
      <Navbar.Brand className="App-header p-0">
        <a className ="navbar-brand" href="/">
        <img src={logo} className="" width="150" height="60" overflow="hidden" alt="logo"></img>
        </a>
      </Navbar.Brand>

      </Navbar>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />

      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ml-auto menu-items">
      <Nav.Link className="App-link" eventKey="1" as={Link} to="/">Home</Nav.Link>
      <div className ="dropdown">
      <Nav.Link className="App-link">Available <i className="fas fa-chevron-down"></i></Nav.Link>
      <div className ="dropdown-content">
      <a href="/availability/Skilling">Skilling</a>
      <a href="/availability/Microfinance">MicroFinance</a>
      </div>
      </div>
      <div className ="dropdown">
      <Nav.Link className="App-link">Require <i className="fas fa-chevron-down"></i></Nav.Link>
      <div className ="dropdown-content">
      <a href="/requirement/Skilling">Skilling</a>
      <a href="/requirement/Microfinance">MicroFinance</a>
      </div>
      </div>
      <Nav.Link className="App-link" eventKey="3" as={Link} to="/emodules">E-learning</Nav.Link>

      <Nav.Link className="App-link" eventKey="5" as={Link} to="/contact">Contact</Nav.Link>
      </Nav>

    {cookies.get ("token")?
      <Nav.Link className="App-link" eventKey="8" as={Link} to="/Profile">{cookies.get ('name')}
      <img alt="dp" width="50" height="50" style={{ borderRadius: '50%' }} src={cookies.get ("picture")} />
      </Nav.Link>
      : <Nav.Link className="btn btn-outline-primary headerBtn" eventKey="7" as={Link} to="/login">Login</Nav.Link>}
    {cookies.get ("token")?
      <Nav.Link className="App-link" eventKey="9" as={Link} onClick={handleLogout.bind(this)}>
      Logout</Nav.Link>
      : <Nav.Link className="btn btn-outline-primary headerBtn ml-3" eventKey="6" as={Link} to="/signup">Sign Up</Nav.Link>}

      </Navbar.Collapse>
       </Navbar>
</Container>
</div>


  )
}

export default Navbar1
