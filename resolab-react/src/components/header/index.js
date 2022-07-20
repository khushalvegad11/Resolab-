import React from "react";

export const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
            <div className="container-fluid px-md-4	">
                <div className="site-logo">
                    <a href="index.html">
                        <img src="images/logo.png" alt="" />
                    </a>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav"
                    aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="oi oi-menu"></span> Menu
                </button>

                <div className="collapse navbar-collapse" id="ftco-nav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active"><a href="index.html" className="nav-link">Home</a></li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Available
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="#">Skilling</a></li>
                                <li><a className="dropdown-item" href="#">MicroFinance</a></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Require
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="#">Skilling</a></li>
                                <li><a className="dropdown-item" href="#">MicroFinance</a></li>
                            </ul>
                        </li>
                        <li className="nav-item"><a href="#" className="nav-link">E-learning</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">Contact</a></li>
                        <li className="nav-item cta mr-md-1">
                            <a href="#" className="nav-link" role='button' data-toggle="modal" data-target="#loginSignUpModal">Login</a>

                        </li>
                        <li className="nav-item cta cta-colored"><a href="#" className="nav-link">Sign up</a></li>

                    </ul>
                </div>
            </div>
        </nav>
    )
}