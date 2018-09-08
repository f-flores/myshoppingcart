import React, {Component} from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import {AppName} from "../constants/Consts";

// ---
// functional component that renders Admin nav item if logged in user is an administrator
// ---------------------------------------------------------------------------------------
function AdminBar(props) {
  const isAdmin = props.isAdmin;
  if (isAdmin) {
    return (
      <NavItem className={window.location.pathname === "/admin" ? "nav active nav-active" : "nav"}>
        <NavLink href="/admin">Admin</NavLink>
      </NavItem>
    );
  }
  return null;
}

// ---
// functional component that renders Login, Signup, Logout menu Items depending on 
// login state
// ---------------------------------------------------------------------------------------
function AuthMenu(props) {
  const isLoggedIn = props.isLoggedIn;
  
  if (isLoggedIn) {
    return (
      <Nav navbar> 
        <NavItem className={window.location.pathname === "/logout" ? "nav-item active" : "nav-item"}>
          <NavLink href="/logout">Logout</NavLink>
        </NavItem>
        <NavItem className="">
          <p className="font-weight-bold">{props.user_name}</p>
        </NavItem>
      </Nav>
    );
  }
  return (
   <Nav navbar>
      <NavItem className={window.location.pathname === "/login" ? "nav-item active" : "nav-item"}>
        <NavLink href="/login">Login</NavLink>
      </NavItem>
      <NavItem className={window.location.pathname === "/signup" ? "nav-item active" : "nav-item"}>
        <NavLink href="/signup">Sign Up</NavLink>
      </NavItem>
   </Nav>
  );
}


class NavMenu extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({isOpen: !this.state.isOpen});
  }

  render() {
    return  (
      <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">{AppName}</NavbarBrand>

        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
                
        <Nav className="mr-auto" navbar>  
            <NavItem className={window.location.pathname === "/" ? "nav-item active" : "nav-item"}>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem className={window.location.pathname === "/public" ? "nav-item active" : "nav-item"}>
              <NavLink href="/public">Public</NavLink>
            </NavItem>
            <NavItem className={window.location.pathname === "/private" ? "nav-item active" : "nav-item"}>
                <NavLink href="/protected">Protected</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              More
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                About Us
              </DropdownItem>
              <DropdownItem>
                Contact Us
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                Blog
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
            <AdminBar isAdmin = {this.props.isAdmin} />
            <AuthMenu 
              isLoggedIn = {this.props.isLoggedIn}
              userName = {this.props.username}
            />
        </Nav>
        </Collapse>
      </Navbar>
      </div>
    );
  }
}

export default NavMenu;