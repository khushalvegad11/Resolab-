import React, { Component } from "react";
import firebase from "firebase/app";
import "./App.css";
import "firebase/auth";
import "react-phone-number-input/style.css";
import Countdown from "react-countdown-now";

class InputPhone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendOTP: false,
      phone_number: "",
      currentUser: null,
      otp: "",
      countdown: 20,
      isButtonDisabled: true
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(this.props.firebaseConfig);
    }
  }
  countdown = () => {
    for (let i = 10; i => 0; i--) {
      setTimeout(() => {
        this.setState({ countdown: i });
      }, i * 3000);
    }
  };
  
  

  handlePhoneChange = event => {
    this.setState({ phone_number: event.target.value });
  };
  handleOTPChange = event => {
    this.setState({ otp: event.target.value });
  };
  handleLogin = () => {
    var appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(this.state.phone_number, appVerifier)
      .then(confirmationResult => {
        this.setState({ sendOTP: true });

        window.confirmationResult = confirmationResult;
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleOTPCheck = () => {
    window.confirmationResult
      .confirm(this.state.otp)
      .then(function(result) {
        // User signed in successfully.
        console.log(result);
        // ...
      })
      .catch(function(error) {
        // User couldn't sign in (bad verification code?)
        // ...
      });
  };
  handleSubmit(event) {
    event.preventDefault();
  }
  render() {
    if (this.state.sendOTP === false) {
      return (
        <div className="firebaseui-spa">
          <div id="firebaseui-contianer">
            <div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-phone-sign-in-start">
              <form onSubmit={this.handleSubmit}>
                <div class="firebaseui-card-header">
                  <h1 class="firebaseui-title">Enter your phone number</h1>
                </div>
                <div class="firebaseui-card-content">
                  <div class="firebaseui-relative-wrapper">
                    <div class="firebaseui-phone-number">
                      <button
                        class="firebaseui-id-country-selector firebaseui-country-selector mdl-button mdl-js-button"
                        data-upgraded=",MaterialButton"
                      >
                        <span class="firebaseui-flag firebaseui-country-selector-flag firebaseui-id-country-selector-flag firebaseui-flag-US" />
                        <span class="firebaseui-id-country-selector-code">
                          &lrm;+1
                        </span>
                      </button>
                      <div
                        class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label firebaseui-textfield firebaseui-phone-input-wrapper is-upgraded"
                        data-upgraded=",MaterialTextfield"
                      >
                        <input
                          value={this.state.phone_number}
                          onChange={this.handlePhoneChange}
                          placeholder="Phone Number"
                          type="tel"
                          name="phoneNumber"
                          class="mdl-textfield__input firebaseui-input firebaseui-id-phone-number"
                        />
                      </div>
                    </div>
                    <div class="firebaseui-error-wrapper">
                      <p class="firebaseui-error firebaseui-text-input-error firebaseui-hidden firebaseui-phone-number-error firebaseui-id-phone-number-error" />
                    </div>
                    <div id="recaptcha-container" />
                    <div class="firebaseui-recaptcha-wrapper">
                      <div className="firebaseui-recaptcha-container" />

                      <div class="firebaseui-error-wrapper firebaseui-recaptcha-error-wrapper">
                        <p class="firebaseui-error firebaseui-hidden firebaseui-id-recaptcha-error" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="firebaseui-card-actions">
                  <div class="firebaseui-form-actions">
                    <button
                      onClick={() => this.props.history.goBack()}
                      class="firebaseui-id-secondary-link firebaseui-button mdl-button mdl-js-button mdl-button--primary"
                      data-upgraded=",MaterialButton"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={this.handleLogin.bind(this)}
                      disabled={this.state.isButtonDisabled}
                      type="submit"
                      class="firebaseui-id-submit firebaseui-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                      data-upgraded=",MaterialButton"
                    >
                      Verify
                    </button>
                  </div>
                </div>
                <div class="firebaseui-card-footer">
                  <p class="firebaseui-tos firebaseui-phone-sms-notice">
                    By tapping Verify, an SMS may be sent. Message &amp; data
                    rates may apply.
                  </p>
                  <ul class="firebaseui-tos-list firebaseui-tos">
                    <li class="firebaseui-inline-list-item">
                      <a
                        href="javascript:void(0)"
                        class="firebaseui-link firebaseui-tos-link"
                        target="_blank"
                      >
                        Terms of Service
                      </a>
                    </li>
                    <li class="firebaseui-inline-list-item">
                      <a
                        href="javascript:void(0)"
                        class="firebaseui-link firebaseui-pp-link"
                        target="_blank"
                      >
                        Privacy Policy
                      </a>
                    </li>
                  </ul>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
          // Render a completed state

          return (
            <a
              href="javascript:void(0)"
              onClick={this.handleLogin}
              class="firebaseui-id-resend-link firebaseui-link"
            >
              Resend
            </a>
          );
        } else {
          // Render a countdown
          return (
            <span class="firebaseui-id-resend-countdown">
              <p>Resend code in {seconds} </p>
            </span>
          );
        }
      };
      return (
        <div className="firebaseui-spa">
          <div id="firebaseui-contianer">
            <div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-phone-sign-in-finish">
              <form onSubmit={this.handleSubmit}>
                <div class="firebaseui-card-header">
                  <h1 class="firebaseui-title">Verify your phone number</h1>
                </div>
                <div class="firebaseui-card-content">
                  <p class="firebaseui-text">
                    Enter the 6-digit code we sent to
                  </p>
                  <div
                    class="firebaseui-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded"
                    data-upgraded=",MaterialTextfield"
                  >
                    <input
                      value={this.state.otp}
                      onChange={this.handleOTPChange}
                      type="number"
                      name="phoneConfirmationCode"
                      class="mdl-textfield__input firebaseui-input firebaseui-id-phone-confirmation-code"
                    />
                  </div>
                  <div class="firebaseui-error-wrapper">
                    <p class="firebaseui-error firebaseui-text-input-error firebaseui-hidden firebaseui-id-phone-confirmation-code-error" />
                  </div>
                </div>
                <div class="firebaseui-card-actions">
                  <div class="firebaseui-form-actions">
                    <button
                      onClick={() => this.setState({ sendOTP: false })}
                      class="firebaseui-id-secondary-link firebaseui-button mdl-button mdl-js-button mdl-button--primary"
                      data-upgraded=",MaterialButton"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={this.handleOTPCheck.bind(this)}
                      type="submit"
                      class="firebaseui-id-submit firebaseui-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                      data-upgraded=",MaterialButton"
                    >
                      Continue
                    </button>
                  </div>
                </div>

                <div class="firebaseui-card-footer">
                  <ul class="firebaseui-tos-list firebaseui-tos">
                    <li class="firebaseui-inline-list-item">
                      <a
                        href="javascript:void(0)"
                        class="firebaseui-link firebaseui-tos-link"
                        target="_blank"
                      >
                        Terms of Service
                      </a>
                    </li>
                    <li class="firebaseui-inline-list-item">
                      <a
                        href="javascript:void(0)"
                        class="firebaseui-link firebaseui-pp-link"
                        target="_blank"
                      >
                        Privacy Policy
                      </a>
                    </li>
                  </ul>
                </div>
              </form>
              <div class="firebaseui-resend-container">
                <Countdown date={Date.now() + 20000} renderer={renderer} />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default InputPhone;