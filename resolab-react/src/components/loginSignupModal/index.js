export const LoginSignupModal = ({visibleStatus}) => {
  debugger
  return (
    <div
      className={`modal fade ${visibleStatus ? "show" : "hide"}`}
      id="loginSignUpModal"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      style={visibleStatus ? {display: "block"} : {display : "none"}}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header border-bottom-0">
            <div className="">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a className="nav-link active">Log In</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">Sign Up</a>
                </li>
              </ul>
            </div>
            <a className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </a>
          </div>
          <div className="modal-body">
            <div className="tab-content pb-3 px-3">
              {/* Log in */}
              <div className="tab-pane active" id="logIn">
                <div className="login-box">
                  <a href="#" className="social-button" id="google-connect">
                    <span>Connect with Google</span>
                  </a>
                  <a href="#" className="social-button" id="linkedin-connect">
                    <span>Connect with LinkedIn</span>
                  </a>
                  <a href="#" className="social-button" id="facebook-connect">
                    <span>Connect with Facebook</span>
                  </a>
                </div>
                <div>
                  <hr className="hr-text" data-content="OR" />
                </div>
                <div className="d-flex flex-column text-left">
                  <form>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email1"
                        placeholder="Your email address"
                      />
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password1"
                        placeholder="Your password"
                      />
                      <div className="p-1">
                        <a href="#">Forgot your password?</a>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-info btn-block btn-round"
                    >
                      Login
                    </button>
                  </form>
                </div>
              </div>
              {/* Sign up */}
              <div className="tab-pane" id="signUp">
                <div>
                  <a href="#" className="select-signup-button">
                    <span className="icon-user mr-2"></span>
                    <span>I'm looking for a job</span>
                  </a>
                  <a href="#" className="select-signup-button">
                    <span className="icon-building mr-2"></span>
                    <span>I want to hire tech talent</span>
                  </a>
                </div>

                <div className="login-box">
                  <a href="#" className="social-button" id="google-connect">
                    <span>Connect with Google</span>
                  </a>
                  <a href="#" className="social-button" id="linkedin-connect">
                    <span>Connect with LinkedIn</span>
                  </a>
                  <a href="#" className="social-button" id="facebook-connect">
                    <span>Connect with Facebook</span>
                  </a>
                </div>
                <div>
                  <hr className="hr-text" data-content="OR" />
                </div>
                <div className="d-flex flex-column text-left">
                  <form>
                    <div className="form-group d-flex">
                      <div className="col-6 pl-0">
                        <label>Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="fullName"
                          name="fullName"
                          placeholder="Full Name"
                        />
                      </div>
                      <div className="col-6 pr-0">
                        <label>Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          name="lastName"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Company Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="companyName"
                        placeholder="Company Name"
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email1"
                        placeholder="Your email address"
                      />
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password1"
                        placeholder="Your password"
                      />
                    </div>
                    <div className="form-group">
                      <label>Where did you hear about ResoLab?</label>
                      <select name="" id="" className="form-control">
                        <option value="">Choose an option</option>
                        <option value="">LinkedIn</option>
                        <option value="">Facebook</option>
                        <option value="">Twitter</option>
                      </select>
                    </div>
                    <button
                      type="button"
                      className="btn btn-info btn-block btn-round"
                    >
                      Sign Up
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
