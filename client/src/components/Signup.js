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
import {MinUsernameLength, MaxUsernameLength, MinPasswordLength} from "../constants/Consts";
import {Row, Container, FormGroup, Col, Button} from "reactstrap";


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
  }


  handleSubmit(obj) {
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
    // getSignupResult is callback function to parent
    // ------------------------------
    this.props.getSignupResult({
      isLoggedIn: true,
      isAdmin: isAdmin, 
      user_id: obj.user_id,
      user_name: obj.user_name,
      email: obj.email
    }, "/");


    // The promise calls the cancel request API to avoid memory leaks
    let cancelPromise = new Promise((resolve, reject) => {
      let result = AUTH.cancelRequest();
      if (result) {
        resolve("Successful cancel request.");
      } else {
        reject("Unsuccessful cancel request.");
      }
    });

    cancelPromise
    .then((msg) => {
      console.log(`${msg}`);
      this.setState({signupSuccess: true});
    })
    .catch((reason) => {
      // Log the rejection reason
        console.log(`Handle rejected promise ${reason} here.`);
    });
    
  }

  handleUnsuccessfulSubmit() {
    let tmpObj = {
      isLoggedIn: false,
      isAdmin: false
    };

    console.log("in handleUnsuccessfulSubmit() tmpObj: ", JSON.stringify(tmpObj));
  }


  render() {
    // Redirect to home page On Successful Sign Up
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
        AUTH
        .signup({ 
          user_name: values.username,
          email: values.email,
          user_pw: values.password,
          confirm_pwd: values.pswrdConfirmation 
        })
        .then(res => {
          console.log(JSON.stringify(res.data));
          setStatus({success: true});
          resetForm();
          this.handleSubmit(res.data);
          setSubmitting(false); 
        })
        .catch(err => {
          setStatus({success: false});
          setErrors(err.response.data);
          setSubmitting(false); 
        });     
      }}
      render={({
        errors,
        touched,
        handleSubmit,
        isSubmitting
      }) => (
      <Container className="py-5">
        <Row className="justify-content-center text-center">
          <Col sm={8}><h1>Become a Member Of Our Service</h1></Col>
        </Row>
        <form onSubmit={handleSubmit}>
        <Row className="justify-content-center my-5">
          <Col sm={8}>

          {/* Enter username field */}
          <FormGroup row className="mb-4">
            <Field type="text" name="username" placeholder="Enter User Name" className="form-control col-sm-7 col-xs-12"/>
            <Col sm={5}>
              { touched.username && errors.username 
              ? <p className="pt-1 font-weight-bold text-danger small">{errors.username}</p>
              : touched.username ? <i className="pt-3 fas fa-check-square text-success"></i> : null}
            </Col>
          </FormGroup>

          {/* Enter email field */}
          <FormGroup className="row mb-4">
            <Field type="email" name="email" placeholder="Enter email" className="form-control col-sm-7 col-xs-12" />
            <Col sm={5}>
              { touched.email && errors.email 
                ? <p className="font-weight-bold text-danger small">{errors.email}</p>
                : touched.email ? <i className="pt-3 fas fa-check-square text-success"></i> : null}
            </Col>
          </FormGroup>

          {/* Enter password field */}
          <FormGroup className="row mb-4">
            <Field type="password" name="password" placeholder="Enter Password" className="form-control col-sm-7 col-xs-12" />
            <Col sm={5}>
              { touched.password && errors.password 
                ? <p className="font-weight-bold text-danger small">{errors.password}</p>
                : touched.password ? <i className="pt-3 fas fa-check-square text-success"></i> : null}
            </Col>
          </FormGroup>

          {/* Enter confirmation password field */}
          <FormGroup row className="mb-4">
            <Field type="password" name="pswrdConfirmation" placeholder="Confirm Password" className="form-control col-sm-7 col-xs-12" />
            <Col sm={5}>
            { touched.pswrdConfirmation && errors.pswrdConfirmation 
              ? <p className="font-weight-bold text-danger small">{errors.pswrdConfirmation}</p>
              : touched.pswrdConfirmation ? <i className="pt-3 fas fa-check-square text-success"></i> : null}
            </Col>
          </FormGroup>

          <FormGroup row>
            <Col sm={7}>
              <Button block color="primary" size="lg" type="submit"
                disabled={ isSubmitting || 
                  (errors.username || errors.email || errors.password  || errors.pswrdConfirmation ) ||
                  !(touched.username || touched.email || touched.password || touched.pswrdConfirmation)
                }
                >
                Sign Up
              </Button>
            </Col>
          </FormGroup>

            <br />
            {/* backend validation */}
            {errors.signupSuccess ? <p className="col-sm-7 col-xs-12 font-weight-bold text-danger small">{errors.signupSuccess}</p> : null}       

          </Col>
          </Row>
          </form>
        </Container>
        )}
        />
  )}
}

export default Signup;