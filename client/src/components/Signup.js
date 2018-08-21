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
// import {ErrorUserName, ErrorPassword, ErrorEmail, ErrorPasswordMatch} from "./ErrorComponents";
import {MinUsernameLength, MaxUsernameLength, MinPasswordLength} from "../constants/Consts";

class Signup extends Component {
  constructor({values, errors, handleChange, touched}) {
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
          <div className="inline-flex mb-2">
            <Field type="text" name="username" className="form-control" placeholder="Enter Username" />
            { this.props.touched.username && this.props.errors.username && <p className="bg-danger text-white">{this.props.errors.username}</p>}
          </div>

          <div className="inline-flex mb-2">
            <Field type="email" name="email" className="inline form-control" placeholder="Enter Email" />
            { this.props.touched.email && this.props.errors.email && <p className="bg-danger text-white">{this.props.errors.email}</p>}
          </div>

          <div className="inline-flex mb-2">
            <Field type="password" name="password" className="form-control" placeholder="Enter Password"/>
            { this.props.touched.password && this.props.errors.password && <p className="bg-danger text-white">{this.props.errors.password}</p>}
          </div>

          <div className="inline-flex mb-2">
            <Field type="password" name="pswrdConfirmation" className="form-control" placeholder="Confirm Password" />
            { this.props.touched.pswrdConfirmation && this.props.errors.pswrdConfirmation && <p className="bg-danger text-white">{this.props.errors.pswrdConfirmation}</p>}
          </div>

          <button type="submit" className="btn btn-block">Sign Up</button>
        </Form>
      </div>
    </div>

    );
  }
}

const SignupFormik = withFormik({
  mapPropsToValues({username, email, password, pswrdConfirmation}) {
    return {
      username: username || "",
      email: email || "",
      password: password || "",
      pswrdConfirmation: pswrdConfirmation || ""
    }
  },
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .min(MinUsernameLength, `Username must be at least ${MinUsernameLength} characters long`)
      .max(MaxUsernameLength, `Username can be at most ${MaxUsernameLength} characters long.`)
      .required("Must enter username"),
    email: Yup.string().email("Please enter valid email.").required("Email is required."),
    password: Yup.string()
      .min(MinPasswordLength, `Password must be at least ${MinPasswordLength} characters long`)
      .required("Must Enter password field"),
    pswrdConfirmation: Yup.string()
      .min(MinPasswordLength, `Password must be at least ${MinPasswordLength} characters long`)
      .oneOf([Yup.ref('password'), null], "Passwords must match")
      .required("Must Enter password confirmation")
  }),
  handleSubmit(values) {
    console.log(values);
  }
})(Signup);

export default SignupFormik;