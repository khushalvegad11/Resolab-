import React, { useState } from "react";
import { LoginSignupModal } from "../loginSignupModal";
import { useDispatch, useSelector } from "react-redux";
import { setShowLoginSignupModal } from "../../redux/header/headerSlice";

export const Header = () => {
  const dispatch = useDispatch();

  const handleLoginClick = () => {
    dispatch(setShowLoginSignupModal(true));
  };

  const loginModalStatus = useSelector(
    (state) => state.headerReducer.showLoginSignupModal
  );

  return (
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
                Available
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
                Require
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
                E-learning
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                Contact
              </a>
            </li>
            <li className="nav-item cta mr-md-1">
              <a className="nav-link" onClick={handleLoginClick}>
                Login
              </a>
            </li>
            <li className="nav-item cta cta-colored">
              <a href="#" className="nav-link">
                Sign up
              </a>
            </li>
          </ul>
        </div>
      </div>
      <LoginSignupModal visibleStatus={loginModalStatus} />
    </nav>
  );
};
