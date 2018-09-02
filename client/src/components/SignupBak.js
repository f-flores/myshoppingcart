// ============================================================
//
// Signup
//
// ============================================================

import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import AUTH from "../utilities/AUTH";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

// import AUTH from "../utilities/AUTH";
// import {ErrorUserName, ErrorPassword, ErrorEmail, ErrorPasswordMatch} from "./ErrorComponents";
import {MinUsernameLength, MaxUsernameLength, MinPasswordLength} from "../constants/Consts";

class Signup extends Component {
  constructor({values, errors, handleChange, touched, isSubmitting}) {
    super();
    this.state = {
      signupSuccess: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  // handle formik's form submission within 'inner' component
  // example: https://github.com/jaredpalmer/formik/issues/312
  componentDidUpdate(prevProps, {...values}) {
    const {success: priorSuccess = false} = prevProps.status || {};
    const {success: isSuccess = false} = this.props.status || {};
    // console.log(`username: ${this.props.touched.username}`);

    if (isSuccess && !priorSuccess) {
      console.log(`username: ${values.username}`);
      this.handleSubmit();
    }
  }

  UNSAFE_componentWillUnmount() {
    this._isMounted = false;
  }

  safeUpdate(obj) {
    if (this._isMounted)
      this.setState(obj);
  }

  handleSubmit() {
    let h1 = "hello";
  }

  render() {
    const touchedUname = this.props.touched.username;
    const touchedEmail = this.props.touched.email;
    const touchedPword = this.props.touched.password;
    const touchedPconf = this.props.touched.pswrdConfirmation;
    const touchedAll = touchedUname && touchedEmail && touchedPword && touchedPconf;

    const isSubmitting = this.props.isSubmitting;

    const errorUname = this.props.errors.username;
    const errorEmail = this.props.errors.email;
    const errorPword = this.props.errors.password;
    const errorPconf = this.props.errors.pswrdConfirmation;
    const errorFree = !(errorUname || errorEmail || errorPword || errorPconf);

    return (
    <div className="container py-5">
    <div className="row justify-content-center text-center">
    
        <h1 className="col-12">Become a Member Of Our Service</h1>
        <Form className="col-12 col-md-6 my-1">
          <div className="row mb-2 form-group">
            <Field type="text" name="username" className="form-control col-sm-8 col-xs-12" placeholder="Enter Username" />
            { touchedUname && errorUname 
              ? <p className="col-sm-4 col-xs-12 pt-1 font-weight-bold text-danger small">{errorUname}</p>
              : touchedUname ? <i className="col-sm-4 col-xs-12 pt-3 fas fa-check-square text-success"></i> : null}
          </div>

          <div className="row mb-2 form-group">
            <Field type="email" name="email" className="form-control col-sm-8 col-xs-12" placeholder="Enter Email" />
            { touchedEmail && errorEmail 
              ? <p className="col-sm-4 col-xs-12 font-weight-bold text-danger small">{errorEmail}</p>
              : touchedEmail ? <i className="col-sm-4 col-xs-12 pt-3 fas fa-check-square text-success"></i> : null}
          </div>

          <div className="row mb-2 form-group">
            <Field type="password" name="password" className="form-control col-sm-8 col-xs-12" placeholder="Enter Password"/>
            { touchedPword && errorPword 
              ? <p className="col-sm-4 col-xs-12 font-weight-bold text-danger small">{errorPword}</p>
              : touchedPword ? <i className="col-sm-4 col-xs-12 pt-3 fas fa-check-square text-success"></i> : null}
          </div>

          <div className="row mb-2 form-group">
            <Field type="password" name="pswrdConfirmation" className="form-control col-sm-8 col-xs-12" placeholder="Confirm Password" />
            { touchedPconf && errorPconf 
              ? <p className="col-sm-4 col-xs-12 font-weight-bold text-danger small">{errorPconf}</p>
              : touchedPconf ? <i className="col-sm-4 col-xs-12 pt-3 fas fa-check-square text-success"></i> : null}
          </div>

          <button type="submit" disabled={ isSubmitting || !errorFree || !touchedAll} className="btn btn-lg btn-primary">Sign Up</button>
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
      .min(MinUsernameLength, `Must be at least ${MinUsernameLength} characters long`)
      .max(MaxUsernameLength, `Can be at most ${MaxUsernameLength} characters long.`)
      .required("Must enter username"),
    email: Yup.string().email("Please enter valid email.").required("Email is required"),
    password: Yup.string()
      .min(MinPasswordLength, `Password must be at least ${MinPasswordLength} characters long`)
      .required("Enter password field"),
    pswrdConfirmation: Yup.string()
      .min(MinPasswordLength, `Password must be at least ${MinPasswordLength} characters long`)
      .oneOf([Yup.ref('password'), null], "Passwords must match")
      .required("Confirm password missing")
  }),
  handleSubmit(values, {resetForm, setErrors, setSubmitting, setStatus}) {
      AUTH
        .signup({ user_name: values.username, email: values.email, user_pw: values.password, confirm_pwd: values.pswrdConfirmation })
        .then(res => {
          console.log("register res.data: ", res.data);
          setStatus({success: true});
          resetForm();
        })
        .catch(err => {
          console.log(err.response.data);
          setErrors({ email: `Error:  ${err.response.data}` })
        });

      setSubmitting(false);
    }
})(Signup);

export default SignupFormik;

/*

          this.safeUpdate({ 
            success: res.data,
            isLoggedIn: res.data.isLoggedIn,
            isAdmin: false, 
            userId: res.data.userId,
            username: res.data.username,
            email: res.data.email         
          })
          // ------------------------------
          // callback function to parent
          // ------------------------------
          this.props.getSignupResult({
            isLoggedIn: this.state.isLoggedIn,
            isAdmin: false, 
            userId: this.state.userId,
            username: this.state.username,
            email: this.state.email
          }, "/");
          // Redirect On Successful Sign Up
          this.safeUpdate({ redirectToReferrer: true });


*/

/* 

after first catch(err):

          let tempObj = {
            errorMsg: err.response.data,
            username: " ",
            password: " ",
            email: "",
            pswrdConfirmation: "",
            isLoggedIn: false
          };
          this.safeUpdate(tempObj);

          */

/*

after catch(err) closes:

      this.safeUpdate({            
        isValidUserName: true,
        isValidPassword: true,
        isValidEmail: true,
        doPasswordsMatch: true
      });

*/