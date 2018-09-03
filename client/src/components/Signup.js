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
    super(props);

    this.state = {
      signupSuccess: false,
      username: "",
      password: "",
      email: "",
      pswrdConfirmation: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.signupHandle = null;
  }


  handleSubmit(obj) {
    console.log(`in handleSubmit()`);
    let isAdmin = false;
    switch (obj.user_type) {
      case "user":
        isAdmin = false;
        break;
      case "admin":
        isAdmin = true;
        break;
      default:
        break;
    }
    // ------------------------------
    // callback function to parent
    // ------------------------------
    /*
    this.props.getSignupResult({
      isLoggedIn: true,
      isAdmin: isAdmin, 
      user_id: obj.user_id,
      user_name: obj.user_name,
      email: obj.email
    }, "/");
    */
    let tmpObj = {
      isLoggedIn: true,
      isAdmin: isAdmin, 
      user_id: obj.user_id,
      user_name: obj.user_name,
      email: obj.email
    };
    // Redirect On Successful Sign Up
    this.setState({ signupSuccess: true });
    console.log("tmpObj: ", JSON.stringify(tmpObj));
  }

  handleUnsuccessfulSubmit() {
    let tmpObj = {
      isLoggedIn: false,
      isAdmin: false
    };
    // Redirect On Successful Sign Up
    this.setState({ signupSuccess: false });
    console.log("tmpObj: ", JSON.stringify(tmpObj));
  }

  componentWillUnmount() {
    console.log('from componentWillUnmount');
    this.signupHandle.cancelToken.cancel();
  }

  render() {
    // If Signup was a success, take them to the Home page
    if (this.state.signupSuccess) {
      return <Redirect to="/" />;
    } 

    return(

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
            onSubmit={(
              values,
              {setSubmitting, setErrors, setStatus, resetForm}
            ) => {
              this.signupHandle =
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
                    this.handleSubmit(res.data)
                  } else {
                    setStatus({success: false})
                    setErrors({signupSuccess: `${res.statusMessage}`})
                  }
                  setSubmitting(false); 
                })
                .catch(err => {
                  setStatus({success: false})
                  setErrors(err.response.data)
                  this.handleUnsuccessfulSubmit()
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


  )}
}

export default Signup;


/*

<div className="container py-5">
<div className="row justify-content-center text-center">

<h1 className="col-12">Become a Member Of Our Service</h1>
<div className="col-12 col-md-6 my-1">

      </div>
      </div>
    </div>

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