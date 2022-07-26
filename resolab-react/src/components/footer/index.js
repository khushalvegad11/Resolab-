import React from "react";

export const Footer = () => {
    return (
        <footer className="ftco-footer ftco-white ftco-section">
            <div className="container">
                <div className="row mb-5">
                    <div className="col-md">
                        <div className="ftco-footer-widget mb-4">
                            <h2 className="ftco-heading-2">ResoLab Jobboard</h2>
                            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
                                there live the blind texts.</p>
                            <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-3">
                                <li className="ftco-animate"><a href="#"><span className="icon-facebook"></span></a></li>
                                <li className="ftco-animate"><a href="#"><span className="icon-twitter"></span></a></li>
                                <li className="ftco-animate"><a href="#"><span className="icon-linkedin"></span></a></li>
                                <li className="ftco-animate"><a href="#"><span className="icon-envelope"></span></a></li>
                                <li className="ftco-animate"><a href="#"><span className="icon-whatsapp"></span></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="ftco-footer-widget mb-4 ml-md-4">
                            <h2 className="ftco-heading-2">Useful Links</h2>
                            <ul className="list-unstyled">
                                <li><a href="#" className="pb-1 d-block">Home</a></li>
                                <li><a href="#" className="pb-1 d-block">People</a></li>
                                <li><a href="#" className="pb-1 d-block">Services</a></li>
                                <li><a href="#" className="pb-1 d-block">E-learning</a></li>
                                <li><a href="#" className="pb-1 d-block">Pricing</a></li>
                                <li><a href="#" className="pb-1 d-block">Contact Us</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="ftco-footer-widget mb-4">
                            <h2 className="ftco-heading-2">Have a Questions?</h2>
                            <div className="block-23 mb-3">
                                <ul>
                                    <li>
                                        <span className="icon icon-map-marker"></span>
                                        <span className="text">
                                            D-706 , Titanium City Center 100 ft. Road,
                                            Anandnagar , Satellite , Ahmedabad-380015
                                        </span>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span className="icon icon-phone"></span>
                                            <span className="text">+91 79 4100 5625</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <span className="icon icon-envelope"></span>
                                            <span className="text">support@enliven-solutions.com</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 text-center">

                        <p>
                            Copyright &copy; <script>document.write(new Date().getFullYear());</script>
                            <a href="https://colorlib.com" target="_blank">Enliven Solutions Pvt Ltd.</a>
                            CIN: U80100GJ2011NPL067351
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}