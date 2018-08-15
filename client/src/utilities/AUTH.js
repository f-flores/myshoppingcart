import axios from "axios";

export default {
    // signup new user 
    //  userInfo = {
    //    email: "alex@example.com" 
    //    username: "alex",
    //    password: 12345Password!,
    //    pswrdConfirmation: 12345Password!
    // }
    //
    signup: function(userInfo) {
      return true;
      // return axios.post("/auth/signup", userInfo)
    },
    // credentials: {username: "uname", password: "12345"}
    login: function(credentials) {
      return true;
      // return axios.post("/auth/login", credentials)
    },
    // checks on session existence on backend
    loginCheck: function() {
      return true;
      // return axios.get("/auth/login")
    },
    // checks on session existence on backend
    adminCheck: function() {
      return true;
      // return axios.get("/auth/isadmin")
    },
    // path to logout
    logout: function() {
      return true;
      // return axios.get("/auth/logout")
    }
}