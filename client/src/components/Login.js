import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import AUTH from "../utilities/AUTH";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import {AppName} from "../constants/Consts";
import {Row, Container, FormGroup, Col, Button} from "reactstrap";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer: false,
      isLoggedIn: false,
      email: "",
      password: "",
      loginSuccess: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(obj)  {  
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
  // getLoginResult is callback function to parent
  // ------------------------------
  this.props.getLoginResult({
    isLoggedIn: true,
    isAdmin: isAdmin, 
    user_id: obj.user_id,
    user_name: obj.user_name,
    email: obj.email,
    user_type: obj.user_type
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
    this.setState({loginSuccess: true});
  })
  .catch((reason) => {
    // Log the rejection reason
      console.log(`Handle rejected promise ${reason} here.`);
  });
  
}


  render() {
    // Redirect to home page On Successful Login
    if (this.state.loginSuccess) {
      return <Redirect to="/" />;
    }

    return(
    <Formik
      initialValues={{...this.state}}
      validationSchema={
        Yup.object().shape({
          email: Yup.string().email("Please enter valid email.").required("Email is required"),

          password: Yup.string().required("Password is required")
        })
      }
      onSubmit={(
        values,
        {setSubmitting, setErrors, setStatus, resetForm}
      ) => {
        AUTH
        .login({ 
          email: values.email,
          password: values.password,
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
          setErrors({loginSuccess: err});
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
          <Col sm={8}><h1>Login To {AppName}</h1></Col>
        </Row>
        <form onSubmit={handleSubmit}>
        <Row className="justify-content-center my-5">
          <Col sm={8}>

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


          <FormGroup row>
            <Col sm={7}>
              <Button block color="success" size="lg" type="submit"
                disabled={ isSubmitting || (errors.email || errors.password) || !(touched.email || touched.password)}
              >
              Login
              </Button>
            </Col>
          </FormGroup>

            <br />
            {/* backend validation */}
            {errors.loginSuccess ? <p className="col-sm-7 col-xs-12 font-weight-bold text-danger small">{errors.loginSuccess}</p> : null}       

          </Col>
          </Row>
          </form>
        </Container>
        )}
        />
  )}
}

export default Login;