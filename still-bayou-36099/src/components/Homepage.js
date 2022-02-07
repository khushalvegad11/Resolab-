import React from 'react';
import image from '../image.jpg'
import image2 from '../image2.jpg'
import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Cookies from "universal-cookie";
import Howitworks1 from './howitworks1'
import CardDeckTemplate from './CardDeckTemplate';
import Footer from './footer';
import '../style/css/Homepage.min.css';
import SandClock from '../images/resource-type/sand-clock.svg';
import Work from '../images/resource-type/work.jpg';
import Convenient from '../images/Convenient11.png';
import Affordable from '../images/affordable.png';
import Verified from '../images/Verified.jpg';
import Carousel from 'react-bootstrap/Carousel'
import Login1 from './Login1'

function cross() {
  document.getElementById("logid").style.display = "none";
}

function Homepage() {
  const cookies = new Cookies();


  return (
    <div >

      <div class="main-title row abcd">
        {cookies.get("token") ? null :
          <div class="col-lg-3 " id="logid">
            <button class="btn btn-success float-right" onClick={cross}>X</button>
            <Login1 /></div>}
        <div class="col-lg" >
          <Carousel>
            <Carousel.Item interval={3000} >
              <div class="d-none d-lg-block">
                <img src={image} alt="slider" class="sliderimage" height="375" /><br /><br />
              </div>
              <div class="d-lg-none">
                <img src={image2} alt="slider" class="sliderimage" height="375" /><br /><br />
              </div>
            </Carousel.Item>
            <Carousel.Item interval={3000}><h4 class="text-light">Get started with three easy steps.</h4>
              <Howitworks1 />
              <br />
            </Carousel.Item>

            <Carousel.Item interval={3000}>
              <Link to='/available/skilling'><h4 class="text-light">Available Resources</h4></Link>
              <CardDeckTemplate cdType="available" />
              <b><a href="/available/skilling" class="text-light">Explore More</a></b>
            </Carousel.Item>
            <Carousel.Item interval={3000}>
              <Link to='/required/skilling'><h4 class="text-light">Required Resources</h4></Link>
              <CardDeckTemplate cdType="required" />
              <b><a href="/required/skilling" class="text-light">Explore More</a></b>
            </Carousel.Item>
          </Carousel>
        </div></div>


      {/* <div id="resource-type-id">

        <div className="marginer"></div>
        <div>
          <h3 style={{ "color": "black" }}><b> WHOM</b></h3>
        </div>
        <br />
        <Row className="shadow p-3" style={{ width: "100%", height: "200px", marginBottom: "50px", backgroundColor: "#0aeb93" }}>
          <div className="">
            <div className="mb-0" style={{ width: "100%", textAlign: "center" }}><h1>SUPPORT COMPANY IN HIRING RESOURCE</h1></div>
            
          </div>
        </Row>
        <br />
        <Row className="shadow" style={{ width: "100%", height: "200px", marginBottom: "50px", backgroundColor: "#d3d70a" }}>

          <div className="mb-4 mt-4" style={{ width: "100%", textAlign: "left", color: "white", textAlign: "center" }}><h1>PLATFORM FOR WORKING PROFESSIONAL</h1></div>

         

        </Row>

      </div> */}
    <div className="page_section">
        <Container>
            <div className="section-title">
                <h3>WHY Resolab?</h3>
            </div>
            <div className="row" >
                <div className="col-sm-4">
                  <div className="card why_card border-0">
                      <div className="card-body">
                          <h4 className="why_title mb-4">Convenient</h4>
                          <img src={Convenient} className="why_img"  alt="Convenient"/>
                          <p className="why_desc mt-3">Easy to access without downloading application</p>
                      </div>
                  </div>
                </div>

                <div className="col-sm-4">
                    <div className="card why_card border-0">
                        <div className="card-body">
                            <h4 className="why_title mb-4">Affordable</h4>
                            <img src={Affordable} className="why_img"  alt="Affordable"/>
                            <p className="why_desc mt-3">No fees for creating/posting your requirement. Available & Require resource can be access by paying less than Rs 50 per day.</p>
                        </div>
                    </div>
                </div>

                <div className="col-sm-4">
                    <div className="card why_card border-0">
                        <div className="card-body">
                            <h4 className="why_title mb-4">Verified</h4>
                            <img src={Verified} className="why_img"  alt="Verified"/>
                            <p className="why_desc mt-3">Resource on the portal primarily verified by our team and same will be reflected on card as "Verified"</p>
                        </div>
                    </div>

                </div>
              </div>
        </Container>
    </div>
    
    <div className="page_section howit_section">
        <Container>
            <div className="section-title">
                <h3>How it Works</h3>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="howitBox">
                        <div className="icon-box">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M 48.921875 3 A 12.72036 12.72036 0 0 0 46.548828 3.2382812 L 46.548828 4.3359375 A 1.22735 1.22735 0 0 1 45.664062 5.4941406 A 10.92573 10.92573 0 0 0 43.933594 6.2128906 A 1.22824 1.22824 0 0 1 42.486328 6.0195312 L 41.705078 5.2402344 A 13.06974 13.06974 0 0 0 38.240234 8.7050781 L 39.019531 9.4863281 A 1.22816 1.22816 0 0 1 39.212891 10.933594 A 10.93 10.93 0 0 0 38.494141 12.664062 A 1.22736 1.22736 0 0 1 37.335938 13.548828 L 36.238281 13.548828 A 12.72036 12.72036 0 0 0 36.238281 18.451172 L 37.335938 18.451172 A 1.22741 1.22741 0 0 1 38.494141 19.335938 A 10.93567 10.93567 0 0 0 39.212891 21.066406 A 1.22807 1.22807 0 0 1 39.019531 22.513672 L 38.240234 23.294922 A 13.07011 13.07011 0 0 0 41.705078 26.759766 L 42.486328 25.980469 A 1.22813 1.22813 0 0 1 43.933594 25.787109 A 10.94354 10.94354 0 0 0 45.664062 26.505859 A 1.22721 1.22721 0 0 1 46.548828 27.664062 L 46.548828 28.761719 A 12.72036 12.72036 0 0 0 51.451172 28.761719 L 51.451172 27.664062 A 1.22721 1.22721 0 0 1 52.335938 26.505859 A 10.94354 10.94354 0 0 0 54.066406 25.787109 A 1.22813 1.22813 0 0 1 55.513672 25.980469 L 56.294922 26.759766 A 13.07011 13.07011 0 0 0 59.759766 23.294922 L 58.980469 22.513672 A 1.22807 1.22807 0 0 1 58.787109 21.066406 A 10.93567 10.93567 0 0 0 59.505859 19.335938 A 1.22741 1.22741 0 0 1 60.664062 18.451172 L 61.761719 18.451172 A 12.72036 12.72036 0 0 0 61.761719 13.548828 L 60.664062 13.548828 A 1.22736 1.22736 0 0 1 59.505859 12.664062 A 10.93 10.93 0 0 0 58.787109 10.933594 A 1.22816 1.22816 0 0 1 58.980469 9.4863281 L 59.759766 8.7050781 A 13.06974 13.06974 0 0 0 56.294922 5.2402344 L 55.513672 6.0195312 A 1.22824 1.22824 0 0 1 54.066406 6.2128906 A 10.92573 10.92573 0 0 0 52.335938 5.4941406 A 1.22735 1.22735 0 0 1 51.451172 4.3359375 L 51.451172 3.2382812 A 12.72036 12.72036 0 0 0 48.921875 3 z M 48.679688 8.3027344 A 7.70371 7.70371 0 0 1 56.703125 16 A 7.70364 7.70364 0 0 1 49 23.703125 A 7.70371 7.70371 0 0 1 48.679688 8.3027344 z M 52.292969 12.292969 L 48 16.585938 L 46.707031 15.292969 L 45.292969 16.707031 L 47.292969 18.707031 A 0.99963 0.99963 0 0 0 48.707031 18.707031 L 53.707031 13.707031 L 52.292969 12.292969 z M 12 15 A 3.00328 3.00328 0 0 0 9 18 L 9 50 L 2.1230469 59.521484 A 1 1 0 0 0 3.0019531 61 L 55.998047 61 A 1 1 0 0 0 56.876953 59.521484 L 50 50 L 50 31 L 48 31 L 48 49 L 11 49 L 11 18 A 1.00067 1.00067 0 0 1 12 17 L 34 17 L 34 15 L 12 15 z M 30.029297 21.976562 A 5.00005 5.00005 0 0 0 27.03125 31 L 27 31 A 4 4 0 0 0 23 35 L 23 47 L 37 47 L 37 35 A 4 4 0 0 0 33 31 L 32.96875 31 A 5.00005 5.00005 0 0 0 30.029297 21.976562 z M 30.232422 26.003906 A 8.14279 8.14279 0 0 1 32.955078 26.554688 A 2.96307 2.96307 0 0 1 33 27 A 3 3 0 0 1 27 27 A 2.96307 2.96307 0 0 1 27.044922 26.554688 A 8.14279 8.14279 0 0 1 30.232422 26.003906 z M 29.722656 31.972656 C 29.816466 31.977906 29.90491 32 30 32 C 30.09509 32 30.183534 31.977906 30.277344 31.972656 L 32 39 L 30 43 L 28 39 L 29.722656 31.972656 z"></path></svg>
                        </div>
                        <h4 className="hiw_title my-3">Register</h4>
                        <p className="hiw_desc">Registration: Just by using Phone Number & Email.</p>
                        <p className="hiw_desc">Individual: Get registered as Provider.</p>
                        <p className="hiw_desc">Company: Get registered as Seeker.</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="howitBox">
                        <div className="icon-box">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path d="M 44.25 1 C 43.039063 1 41.859375 1.496094 40.9375 2.40625 L 40.90625 2.40625 L 39.5 3.78125 L 33.25 10.03125 L 2.96875 10.03125 C 2.414063 10.03125 1.96875 10.480469 1.96875 11.03125 L 1.96875 47.03125 C 1.96875 47.582031 2.414063 48.03125 2.96875 48.03125 L 38.96875 48.03125 C 39.523438 48.03125 39.96875 47.582031 39.96875 47.03125 L 39.96875 16.75 L 46.28125 10.4375 C 46.320313 10.398438 46.371094 10.347656 46.4375 10.28125 C 46.566406 10.152344 46.730469 9.988281 46.90625 9.8125 C 47.253906 9.464844 47.59375 9.09375 47.59375 9.09375 C 49.441406 7.246094 49.46875 4.25 47.625 2.40625 L 47.625 2.375 C 46.699219 1.453125 45.46875 1 44.25 1 Z M 44.25 3 C 44.949219 3 45.644531 3.269531 46.1875 3.8125 C 47.261719 4.886719 47.25 6.574219 46.1875 7.65625 L 42.34375 3.8125 C 42.882813 3.285156 43.558594 3 44.25 3 Z M 40.90625 5.1875 L 44.8125 9.09375 L 22.21875 31.65625 L 18.34375 27.78125 Z M 16.9375 29.21875 L 20.78125 33.0625 L 15.96875 34.03125 Z"></path></svg>
                        </div>
                        <h4 className="hiw_title my-3">Create</h4>
                        <p className="hiw_desc">Individual can create card and available as resource for the industry. Company can create card to post their resource requirement.</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="howitBox">
                        <div className="icon-box">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M 265.87695 52.052734 A 225.773 225.773 0 0 0 101.18164 118.11523 A 8.001974 8.001974 0 0 0 112.5 129.43164 A 209.771 209.771 0 0 1 381.90039 106.4668 A 49.275 49.275 0 1 0 423.87109 82.980469 A 49.06 49.06 0 0 0 392.44336 94.332031 A 225.773 225.773 0 0 0 265.87695 52.052734 z M 256 144.09961 C 206.251 144.09961 162.26691 173.00972 134.12891 197.26172 A 337.082 337.082 0 0 0 97.900391 233.76953 C 83.027391 251.27653 83.027344 253.9 83.027344 256 C 83.027344 258.214 83.026344 260.4998 97.902344 277.9668 A 344.306 344.306 0 0 0 134.11719 314.48438 C 162.29919 338.85237 206.323 367.90039 256 367.90039 C 305.75 367.90039 349.73309 338.99123 377.87109 314.74023 A 337.082 337.082 0 0 0 414.10547 278.23438 C 428.97347 260.72537 428.97266 258.1 428.97266 256 C 428.97266 253.786 428.97366 251.5002 414.09766 234.0332 A 344.306 344.306 0 0 0 377.88281 197.51562 C 349.70081 173.14763 305.677 144.09961 256 144.09961 z M 252.71289 177.03711 A 79.032 79.032 0 0 1 335.03125 256 A 79.121 79.121 0 0 1 256 335.03125 A 79.032 79.032 0 0 1 252.71289 177.03711 z M 256 192.96875 A 63.032 63.032 0 1 0 256 319.03125 A 63.032 63.032 0 0 0 256 192.96875 z M 89.179688 330.28516 A 49.374 49.374 0 1 0 119.55469 417.66797 A 225.414 225.414 0 0 0 251.19922 460 C 255.93255 460 260.67888 459.85202 265.43555 459.55469 A 225.5 225.5 0 0 0 410.82227 393.88477 A 8.0033885 8.0033885 0 1 0 399.5 382.56836 A 209.771 209.771 0 0 1 130.09961 405.5332 A 49.374 49.374 0 0 0 89.179688 330.28516 z"></path></svg>
                        </div>
                        <h4 className="hiw_title my-3">View</h4>
                        <p className="hiw_desc">Card is live. Resource Seeker/Provider can view card.</p>
                    </div>
                </div>
            </div>
        </Container>
    </div>
      



      <Footer />

    </div>
  );
}

export default Homepage;

/*
Next things to do:
make how-info section responsive
solution for better response of the hhighlights
decide who works on footer
Also add different fonts
Get images for how-info section
*/
