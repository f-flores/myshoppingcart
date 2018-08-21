// ============================================================
//
// Signup
//
// ============================================================

import React, {Component} from "react";
import {Redirect} from "react-router-dom";

// import AUTH from "../utilities/AUTH";
import {ErrorUserName, ErrorPassword, ErrorEmail, ErrorPasswordMatch} from "./ErrorComponents";
import {MinUsernameLength, MaxUsernameLength, MinPasswordLength} from "../constants/Consts";

class Signup extends Component {
  state = {
    success: false,
    isValidUsername: true,
    isValidEmail: true,
    isValidPassword: true,
    doPasswordsMatch: true,
    username: "",
    password: "",
    pswrdConfirmation: "",
    email: "",
    userId: 0,
    errorMsg: ""
  }

  componentDidMount() {
    this._isMounted = true;
  }

  UNSAFE_componentWillUnmount() {
    this._isMounted = false;
  }

  safeUpdate(obj) {
    if (this._isMounted)
      this.setState(obj);
  }

  handleInputChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  displayErrorMessage() {
    if (this.state.errorMsg !== "") {
      return (
        <span className="form-control bg-danger text-white mb-2">
        {this.state.errorMsg}
        </span>
      );
    }
  }

  render() {
    return (
    <div className="container py-5">
    <div className="row justify-content-center text-center">
    
      <form className="col-12 col-md-6 my-1">
        <h1 className="col-12">Sign Up</h1>
        <div className="col-12 my-1">
          <i class="fas fa-key"></i>
        </div> 
        <div className="form-group">
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleInputChange}
            className="form-control"
            placeholder="Enter Username" />
          
        </div>
        { !this.state.isValidUsername 
          ? <ErrorUserName 
              ErrorInUserName={!this.state.isValidUserName} 
              UnameMinLength={MinUsernameLength}
              UnameMaxLength={MaxUsernameLength}
            />
          : null
        }

        <div className="form-group">
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
            className="form-control"
            placeholder="Enter Email" />
          
        </div>
        { !this.state.isValidEmail 
          ? <ErrorEmail ErrorInEmail={!this.state.isValidEmail} />
          : null
        }

        <div className="form-group">
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
            className="form-control"
            placeholder="Enter Password"
          />
        </div>
        { !this.state.isValidPassword 
          ? <ErrorPassword 
              ErrorInPassword={!this.state.isValidPassword} 
              MinPasswordLength={MinPasswordLength}
            />
          : null
        }
        <div className="form-group">
          <input
            type="password"
            name="pswrdConfirmation"
            value={this.state.pswrdConfirmation}
            onChange={this.handleInputChange}
            className="form-control"
            placeholder="Confirm Password"
          />
        </div>
        { !this.state.doPasswordsMatch
          ? <ErrorPasswordMatch ErrorInPasswordMatch={!this.state.doPasswordsMatch} />
          : null
        }
        {
          this.state.errorMsg !== "" 
          ? this.displayErrorMessage()
          : ""
        }
        <div className="form-group">
          <button type="submit" className="btn btn-block" onClick={this.register}>Sign Up</button>
        </div>
      
        </form>
      </div>
    </div>

    );
  }
}

export default Signup;