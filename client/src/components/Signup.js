// ============================================================
//
// Signup
//
// ============================================================

import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import AUTH from "../utilities/AUTH";
import { Formik } from "formik";
import * as Yup from "yup";

// import AUTH from "../utilities/AUTH";
// import {ErrorUserName, ErrorPassword, ErrorEmail, ErrorPasswordMatch} from "./ErrorComponents";
import {MinUsernameLength, MaxUsernameLength, MinPasswordLength} from "../constants/Consts";


class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      email: "",
      pswrdConfirmation: ""
    }
  }

  render() {
    return(
    <div className="container py-5">
      <div className="row justify-content-center text-center">

      <h1 className="col-12">Become a Member Of Our Service</h1>
      <div className="col-12 col-md-6 my-1">
          <Formik
            initialValues={{...this.state}}
            validationSchema={
              Yup.object().shape({
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
              })
            }
            onSubmit={(
              values,
              {setSubmitting, setErrors, setStatus, resetForm}
            ) => {
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
            }}
            render={({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
            }) => (
            <form onSubmit={handleSubmit}>
              {/* Enter username field */}
              <div className="row mb-2 form-group">
                <input 
                  type="text"
                  name="username"
                  className="form-control col-sm-8 col-xs-12"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  placeholder="Enter Username" 
                />
              { touched.username && errors.username 
              ? <p className="col-sm-4 col-xs-12 pt-1 font-weight-bold text-danger small">{errors.username}</p>
              : touched.username ? <i className="col-sm-4 col-xs-12 pt-3 fas fa-check-square text-success"></i> : null}
            </div>

              {/* Enter email field */}
              <div className="row mb-2 form-group">
                <input 
                  type="email"
                  name="email"
                  className="form-control col-sm-8 col-xs-12"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Enter Email" 
                />
                { touched.email && errors.email 
                  ? <p className="col-sm-4 col-xs-12 font-weight-bold text-danger small">{errors.email}</p>
                  : touched.email ? <i className="col-sm-4 col-xs-12 pt-3 fas fa-check-square text-success"></i> : null}
              </div>

              {/* Enter password field */}
              <div className="row mb-2 form-group">
                <input 
                  type="password"
                  name="password"
                  className="form-control col-sm-8 col-xs-12"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Enter Password" 
                />
                { touched.password && errors.password 
                  ? <p className="col-sm-4 col-xs-12 font-weight-bold text-danger small">{errors.password}</p>
                  : touched.password ? <i className="col-sm-4 col-xs-12 pt-3 fas fa-check-square text-success"></i> : null}
              </div>

              {/* Enter confirmation password field */}
              <div className="row mb-2 form-group">
                <input 
                  type="password"
                  name="pswrdConfirmation"
                  className="form-control col-sm-8 col-xs-12"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.pswrdConfirmation}
                  placeholder="Confirm Password" 
                />
                { touched.pswrdConfirmation && errors.pswrdConfirmation 
                  ? <p className="col-sm-4 col-xs-12 font-weight-bold text-danger small">{errors.pswrdConfirmation}</p>
                  : touched.pswrdConfirmation ? <i className="col-sm-4 col-xs-12 pt-3 fas fa-check-square text-success"></i> : null}
              </div>

              <button 
                type="submit"
                disabled={ isSubmitting ||
                  (errors.username || errors.email || errors.password || errors.pswrdConfirmation) ||
                  !(touched.username || touched.email || touched.password || touched.pswrdConfirmation)
                }
                className="btn btn-lg btn-primary">
                Sign Up
              </button>       
            </form>
          )}
        />

      </div>
      </div>
    </div>
  )}
}

/*
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
*/

export default Signup;

/*

  validationSchema() {
    Yup.object().shape({
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
    })
  }

  // avoid render callback, see Formik documentation
  renderSignUp = ({...props}) => {
    const touchedUname = props.touched.username;
    const touchedEmail = props.touched.email;
    const touchedPword = props.touched.password;
    const touchedPconf = props.touched.pswrdConfirmation;
    const touchedAll = touchedUname && touchedEmail && touchedPword && touchedPconf;
     ||
                  !(touched.username && touched.email && touched.password && touched.pswrdConfirmation)

    const isSubmitting = props.isSubmitting;

    const errorUname = props.errors.username;
    const errorEmail = props.errors.email;
    const errorPword = props.errors.password;
    const errorPconf = props.errors.pswrdConfirmation;
    const errorFree = !(errorUname || errorEmail || errorPword || errorPconf);
    return(
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
        </div>
      </div>
    </div>
    );
  }

  render() {

    return (

        <Formik 
          initialValues={{...this.state}}
          validationSchema={this.validationSchema}

          render={this.renderSignUp(
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          )}
        />


    );
  }

*/

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

/*

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

*/

/*

  constructor({values, errors, handleChange, touched, isSubmitting}) {
    super();
    this.state = {
      signupSuccess: false,
      username: "",
      email: "",
      password: "",
      pswrdConfirmation: ""
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


 */