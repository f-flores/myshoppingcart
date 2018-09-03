// ============================================================
//
// Signup
//
// ============================================================

import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import AUTH from "../utilities/AUTH";
import { Formik, Field } from "formik";
import * as Yup from "yup";

// import AUTH from "../utilities/AUTH";
// import {ErrorUserName, ErrorPassword, ErrorEmail, ErrorPasswordMatch} from "./ErrorComponents";
import {MinUsernameLength, MaxUsernameLength, MinPasswordLength} from "../constants/Consts";


class Signup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      signupSuccess: false,
      username: "",
      password: "",
      email: "",
      pswrdConfirmation: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }


  handleSubmit() {
    console.log(`in handleSubmit()`)
    console.log(`signupSuccess: ${this.state.signupSuccess}`)
  }

  render() {
    return(
    <div className="container py-5">
      <div className="row justify-content-center text-center">

      <h1 className="col-12">Become a Member Of Our Service</h1>
      <div className="col-12 col-md-6 my-1">
          <Formik
            initialValues={{...this.state}}

            onSubmit={(
              values,
              {setSubmitting, setErrors, setStatus, resetForm}
            ) => {
              AUTH
                .signup({ 
                  user_name: values.username,
                  email: values.email,
                  user_pw: values.password,
                  confirm_pwd: values.pswrdConfirmation 
                })
                .then(res => {
                  console.log("register res.data: ", res.data)
                  if (res.data.user_id !== undefined) {
                    setStatus({success: true})
                    resetForm()
                    this.handleSubmit()
                  } else {
                    setStatus({success: false})
                    console.log(`res.data: ${res.data}`)
                    console.log(JSON.stringify(res.data))
                    if (typeof res.status === "number") {
                      setErrors({signupSuccess: `${res.statusMessage}`})
                    } else if (res.data.errors.length > 0) {
                      const errorArray = res.data.errors;
                      for (let error of errorArray) {
                        if (error.path === "user_name")
                          setErrors({ username: `Username exists, choose another one.` })
                        else if (error.path === "email")
                          setErrors({email: `Email already registered. Choose another`})
                      }
                    }
                  }
                  setSubmitting(false); 
                })
                .catch(err => {
                  setStatus({success: false})
                  setErrors(err.response.data)
                  setSubmitting(false); 
                });             
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
                <Field type="text" name="username" placeholder="Enter User Name"
                       className="form-control col-sm-7 col-xs-12" />
                { touched.username && errors.username 
                ? <p className="col-sm-5 col-xs-12 pt-1 font-weight-bold text-danger small">{errors.username}</p>
                : touched.username ? <i className="col-sm-5 col-xs-12 pt-3 fas fa-check-square text-success"></i> : null}
              </div>

              {/* Enter email field */}
              <div className="row mb-2 form-group">
                <Field type="email" name="email" placeholder="Enter email"
                  className="form-control col-sm-7 col-xs-12" />
                { touched.email && errors.email 
                  ? <p className="col-sm-5 col-xs-12 font-weight-bold text-danger small">{errors.email}</p>
                  : touched.email ? <i className="col-sm-5 col-xs-12 pt-3 fas fa-check-square text-success"></i> : null}
              </div>

              {/* Enter password field */}
              <div className="row mb-2 form-group">
                <Field type="password" name="password" placeholder="Enter Password"
                  className="form-control col-sm-7 col-xs-12" />
                { touched.password && errors.password 
                  ? <p className="col-sm-5 col-xs-12 font-weight-bold text-danger small">{errors.password}</p>
                  : touched.password ? <i className="col-sm-5 col-xs-12 pt-3 fas fa-check-square text-success"></i> : null}
              </div>

              {/* Enter confirmation password field */}
              <div className="row mb-2 form-group">
                <Field type="password" name="pswrdConfirmation" placeholder="Confirm Password"
                  className="form-control col-sm-7 col-xs-12" />
                { touched.pswrdConfirmation && errors.pswrdConfirmation 
                  ? <p className="col-sm-5 col-xs-12 font-weight-bold text-danger small">{errors.pswrdConfirmation}</p>
                  : touched.pswrdConfirmation ? <i className="col-sm-5 col-xs-12 pt-3 fas fa-check-square text-success"></i> : null}
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
              <br />
              {/* backend validation */}
              {errors.signupSuccess ? <p className="col-sm-7 col-xs-12 font-weight-bold text-danger small">{errors.signupSuccess}</p> : null}       
            </form>
          )}
        />

      </div>
      </div>
    </div>
  )}
}


/*
            validationSchema={
              Yup.object().shape({
                username: Yup.string()
                  .min(MinUsernameLength, `Must be at least ${MinUsernameLength} characters long`)
                  .max(MaxUsernameLength, `Can be at most ${MaxUsernameLength} characters long.`)
                  .required("Must enter username"),
                email: Yup.string().email("Please enter valid email.").required("Email is required"),
                password: Yup.string()
                  .matches(/[a-z]/i,{message: `Include at least one character`})
                  .matches(/\d+/, {message: `Include at least one digit.`})
                  .min(MinPasswordLength, `Must be at least ${MinPasswordLength} characters long`)
                  .required("Enter password field"),
                pswrdConfirmation: Yup.string()
                  .min(MinPasswordLength, `Must be at least ${MinPasswordLength} characters long`)
                  .oneOf([Yup.ref('password'), null], "Passwords must match")
                  .required("Confirm password missing")
              })
            }

*/


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

 /*

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

 */