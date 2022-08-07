import React from "react";
import CallIcon from '@mui/icons-material/Call';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';

export const Footer = () => {
  return (
    <footer className="ftco-footer ftco-bg-dark ftco-section">
      <div className="container">
        <div className="row mb-5">
          {/* <div className="col-md">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">ResoLab Jobboard</h2>
              <p>
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia, there live the blind texts.
              </p>
              <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-3">
                <li className="ftco-animate">
                  <a href="#">
                    <span className="icon-facebook"></span>
                  </a>
                </li>
                <li className="ftco-animate">
                  <a href="#">
                    <span className="icon-twitter"></span>
                  </a>
                </li>
                <li className="ftco-animate">
                  <a href="#">
                    <span className="icon-linkedin"></span>
                  </a>
                </li>
                <li className="ftco-animate">
                  <a href="#">
                    <span className="icon-envelope"></span>
                  </a>
                </li>
                <li className="ftco-animate">
                  <a href="#">
                    <span className="icon-whatsapp"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div> */}
          <div className="col-md">
            <div className="ftco-footer-widget mb-4 ml-md-4">
              <h2 className="ftco-heading-2">About Us</h2>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="pb-1 d-block">
                    Company
                  </a>
                </li>
                <li>
                  <a href="#" className="pb-1 d-block">
                    Team
                  </a>
                </li>
                <li>
                  <a href="#" className="pb-1 d-block">
                    Career
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md">
            <div className="ftco-footer-widget mb-4 ml-md-4">
              <h2 className="ftco-heading-2">Product</h2>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="pb-1 d-block">
                    Hiring
                  </a>
                </li>
                <li>
                  <a href="#" className="pb-1 d-block">
                    Assesement
                  </a>
                </li>
                <li>
                  <a href="#" className="pb-1 d-block">
                    Verification
                  </a>
                </li>
                <li>
                  <a href="#" className="pb-1 d-block">
                    Consultancy
                  </a>
                </li>
                <li>
                  <a href="#" className="pb-1 d-block">
                    Others
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">Contact</h2>
              <div className="block-23 mb-3">
                <ul>
                  <li>
                  <LocationOnIcon fontSize="small" />
                    <span className="text">
                      D-706 , Titanium City Center 100 ft. Road, Anandnagar ,
                      Satellite , Ahmedabad-380015
                    </span>
                  </li>
                  <li>
                    <a href="#">
                    <CallIcon fontSize="small" />
                      <span className="text">+91 79 4100 5625</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                    <EmailIcon fontSize="small" />
                      <span className="text">
                        support@enliven-solutions.com
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md">
            <div className="ftco-footer-widget mb-4 ml-md-4">
              <h2 className="ftco-heading-2">Follow Us On</h2>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="pb-1 d-block">
                    <LinkedInIcon fontSize="small" />
                    <span className="text">Linkedin</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="pb-1 d-block">
                    <FacebookIcon fontSize="small" />
                    <span className="text">Facebook</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="pb-1 d-block">
                    <TwitterIcon fontSize="small" />
                    <span className="text">Twitter</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="pb-1 d-block">
                    <YouTubeIcon fontSize="small" />
                    <span className="text">Youtube</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <p>
              Copyright &copy; Enliven Solutions Pvt Ltd.CIN: U80100GJ2011NPL067351
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
