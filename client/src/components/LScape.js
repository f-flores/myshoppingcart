import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch, Redirect, Link, withRouter} from "react-router-dom";
import {AppName} from "../constants/Consts";

import NavMenu from "./NavMenu";
// import Footer from "./components/Footer";
// import EntryMessage from "./components/EntryMessage";
// import Home from "./containers/Home";
// import About from "./containers/About";
// import Videos from "./containers/Videos";
// import Chat from "./containers/Chat";
// import Glossary from "./containers/Glossary";
// import Admin from "./containers/Admin";
// import Post from "./containers/Post";
import Login from "./Login";
import Signup from "./Signup";
// import Logout from "./containers/Logout";
import AUTH from "../utilities/AUTH";
// import ScrollToTop from "./components/ScrollToTop";


import logo from "../logo.svg";
import "../App.css";


  // Setting State For Login
/*   LoginResult = (authObj, redirPath) => {
    this.safeUpdate(authObj);
    this.redirPath = redirPath;
  } */

  // Setting State For Login
/*   SignupResult = (authObj, redirPath) => {
      this.safeUpdate(authObj);
      this.redirPath = redirPath;
  } */

/*   LogoutResult = (authObj) => this.setState(authObj); */

/*   componentDidMount() {
    this._isMounted = true;
    this.redirPath = "";

    // check login status if page is reloaded
    this.isAuthenticated = this.checkAuthStatus();
  }

  UNSAFE_componentWillUnmount() {
    this._isMounted = false;
  }

  safeUpdate(stateObj) {
    if (this._isMounted) this.setState(stateObj);
  }

  checkAuthStatus() {
    return true;
  }

  renderLogin = () => {
    console.log("in renderLogin()");
    this.safeUpdate({redirectReferrer: true});
  } */




/*   render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
} */

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const AuthButton = withRouter(
  ({ history }) =>
    fakeAuth.isAuthenticated ? (
      <p>
        Welcome!{" "}
        <button
          onClick={() => {
            fakeAuth.signout(() => history.push("/"));
          }}
        >
          Sign out
        </button>
      </p>
    ) : (
      <p>You are not logged in.</p>
    )
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const Home = () => (
  <div className="justify-content-center">
    <h2 className="text-center">{AppName}</h2>
  </div>
);

const Public = () => <h3>Public</h3>;
const Protected = () => <h3>Protected</h3>;

class LScape extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // --
      // 'session' variables
      // ---------------------------
      isLoggedIn: false,
      isAdmin: false,
      isCustomer: false,
      isEmployee: false,
      isManager: false,
      user_name: "",
      email: "",
      user_id: "",
      errorMsg: "",
      redirectReferrer: false
    }
  }

  // receiving login result from Login component
  loginResult = (authObj, redirPath) => {
    this.setState(authObj);
    this.redirPath = redirPath;
  }

  // Receiving signup result from Signup Component
  signupResult = (authObj, redirPath) => {
      this.setState(authObj);
      this.redirPath = redirPath;
  }
  
  render() {

    return (
      <Router>
        <Switch>
        <div>
          <AuthButton />
          <NavMenu
            isLoggedIn = {this.state.isLoggedIn}
            isAdmin = {this.state.isAdmin}
            userId = {this.state.userId}
            username = {this.state.username}
            email = {this.state.email}
          />

          <Route exact path="/" component={Home} />

          <Route exact path="/public" component={Public} />

          <Route exact path="/login" 
            render={(props) =>
              <Login
                {...props}
                getLoginResult = {this.loginResult}
              />
            }
          />

          <Route exact path="/signup"
            render={(props) =>
              <Signup
                {...props}
                getSignupResult = {this.signupResult}
              />
            }
          />

          <PrivateRoute path="/protected" component={Protected} />
        </div>
        </Switch>
      </Router>
    );
  }
}

export default LScape;
