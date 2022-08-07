import React, { useState } from "react";
import { LoginSignupModal } from "../../loginSignupModal";
import { useDispatch, useSelector } from "react-redux";
import { setShowLoginSignupModal } from "../../../redux/header/headerSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const [activeTabIndex, setActiveTabIndex] = useState("1");

  const handleLoginClick = (status, tabIndex) => {
    setActiveTabIndex(tabIndex);
    dispatch(setShowLoginSignupModal(status));
  };

  const loginModalStatus = useSelector(
    (state) => state.headerReducer.showLoginSignupModal
  );

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark ftco_navbar ftco-navbar-light"
        id="ftco-navbar"
      >
        <div className="container-fluid px-md-4	">
          <div className="site-logo">
            <a href="index.html">
              <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="" />
            </a>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            aria-controls="ftco-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="oi oi-menu"></span> Menu
          </button>

          <div className="collapse navbar-collapse" id="ftco-nav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <a href="index.html" className="nav-link">
                  Home
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Resource Available
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      Skilling
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      MicroFinance
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Resource Require
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      Skilling
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      MicroFinance
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  Assesement
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  Pricing
                </a>
              </li>
              <li className="nav-item cta mr-md-1">
                <a
                  href="#"
                  className="nav-link"
                  onClick={() => {handleLoginClick(true, "1")}}
                >
                  Login
                </a>
              </li>
              <li className="nav-item cta cta-colored">
                <a href="#" className="nav-link" onClick={() => {handleLoginClick(true, "2")}}>
                  Sign up
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <LoginSignupModal visibleStatus={loginModalStatus} handleModalClick={handleLoginClick} activeIndex={activeTabIndex}/>
    </>
  );
};
