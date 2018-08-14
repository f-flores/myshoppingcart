import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";

// import VerticalNav from "./components/VerticalNav";
// import Footer from "./components/Footer";
// import EntryMessage from "./components/EntryMessage";
// import Home from "./containers/Home";
// import About from "./containers/About";
// import Videos from "./containers/Videos";
// import Chat from "./containers/Chat";
// import Glossary from "./containers/Glossary";
// import Admin from "./containers/Admin";
// import Post from "./containers/Post";
// import Login from "./containers/Login";
// import Signup from "./containers/Signup";
// import Logout from "./containers/Logout";
// import AUTH from "./utilities/AUTH";
// import ScrollToTop from "./components/ScrollToTop";


import logo from "./logo.svg";
import "./App.css";

class App extends Component {
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
      username: "",
      email: "",
      userId: "",
      usertestvalue: "hello",
      returnStatus: 0,
      errorMsg: "",
      redirectReferrer: false
    };
  }

  render() {
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
}

export default App;
