// ============================================================
//
// Signup
//
// ============================================================

import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

// import AUTH from "../utilities/AUTH";
import {ErrorUserName, ErrorPassword, ErrorEmail, ErrorPasswordMatch} from "./ErrorComponents";
import {MinUsernameLength, MaxUsernameLength, MinPasswordLength} from "../constants/Consts";

class Signup extends Component {
  constructor({values, handleChange}) {
    super();
    this.state = {
      success: false,
      username: "",
      password: "",
      pswrdConfirmation: "",
      email: "",
      userId: 0,
      errorMsg: ""
    }
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

  render() {
    return (
    <div className="container py-5">
    <div className="row justify-content-center text-center">
    
        <h1 className="col-12">Sign Up</h1>
        <Form className="col-12 col-md-6 my-1">
          <Field type="text" name="username" className="form-control" placeholder="Enter Username" />

          <Field type="email" name="email" className="form-control" placeholder="Enter Email" />
          
          <Field type="password" name="password" className="form-control" placeholder="Enter Password"/>

          <Field type="password" name="pswrdConfirmation" className="form-control" placeholder="Confirm Password" />

          <button type="submit" className="btn btn-block">Sign Up</button>
        </Form>
      </div>
    </div>

    );
  }
}

const SignupFormik = withFormik({
  mapPropsToValues({email, password}) {
    return {
      email: email || "",
      password: password || ""
    }
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().
      min(MinPasswordLength, `Password must be at least ${MinPasswordLength} characters long`).
      required("Must Enter password field")
  }),
  handleSubmit(values) {
    console.log(values);
  }
})(Signup);

export default SignupFormik;