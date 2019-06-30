import React from 'react';
import { Button, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logOut, deleteUser} from '../actions/actions_auth';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    // this.logOut = this.logOut.bind(this);

    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  // logOut() {
  //     //console.log('logging out');
  //     this.props.logOut()
  // }

  render() {
    return (
      <div>
        <Navbar className="navbar-fixed-top" color="primary" light expand="sm" fixed="top">
          <NavbarBrand href="/"> me.io</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
			<NavItem>
			  <NavLink href="/me">Me</NavLink>
			</NavItem>
			<UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Account
                </DropdownToggle>
                <DropdownMenu >
                  <DropdownItem>
				  <NavItem>
					<NavLink href="/upload">Upload Data</NavLink>
				  </NavItem>
                  </DropdownItem>
                  <DropdownItem>
				  <NavItem>
					  {this.props.userLoggedIn ? (
						  <NavLink onClick={() => { this.props.logOut(this.props.userId) }}>Log Out</NavLink>
					  ): (
						  <NavLink href="/">Log In</NavLink>
					  )}
				  </NavItem>
                  </DropdownItem>
				  <DropdownItem>
				  <NavItem>
					{this.props.userLoggedIn ? (
						<NavLink onClick={() => { this.props.deleteUser(this.props.userId) }}>Delete Account</NavLink>
					): (
						<br/>
					)}
				</NavItem>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

function mapStateToProps(state) {
	return {
        userId: state.userId,
		userLoggedIn: state.userLoggedIn,
		userDataUploaded: state.userDataUploaded,
		userDataProcessed: state.userDataProcessed
	}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ logOut, deleteUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
