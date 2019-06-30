import React, { Component } from 'react';
import { Jumbotron, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Container, Row, Col, NavLink  } from 'reactstrap';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, Redirect, withRouter, Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signUp, logIn } from '../actions/actions_auth';
// TODO: uninstall fetch

class Splash extends Component {
	constructor(props) {
		super(props);
		this.responseFacebook = this.responseFacebook.bind(this);

		this.state = {
			firstName: "",
			userId: ""
		}
	}

	responseFacebook(response) {
		// //console.log('inside responseFacebook()')
      	// //console.log(response);
		var fullName = response.name;
		this.setState({ firstName: fullName.split(" ")[0] });

		var stuff = this.props.logIn(response.id, response.name);
		// var stuff = this.props.logIn(333333, response.name);
		// var stuff = this.props.logIn(1099, response.name);
		// TODO: create routing for if user logs in and data uploaded and/or processed
		//console.log('stuff')
		//console.log(stuff)
  	}

	render() {
		if (!this.props.userLoggedIn) {
			return (
				<div>
					<Jumbotron>
						<h1 className="display-3">Welcome to me.io!</h1>
						<p className="lead">me.io lets you analyze a facebook chat data file.</p>
						<hr className="my-2" />
						<p>Log in with facebook to begin!</p>
						<FacebookLogin
							appId="1449504285144285"
							autoLoad={false}
							callback={this.responseFacebook}
							icon="fa-facebook"
						/>
					</Jumbotron>
	      		</div>
	    	);
	  	} else {
			if (!this.props.userDataUploaded) {
				return (
					<div>
						<Jumbotron>
							<h1 className="display-3">Welcome to me.io, { this.props.name.split(" ")[0] }!</h1>
							<h3>User sign up successful</h3>
							<p className="lead">Please request and download your facebook data file from <a href="http://www.facebook.com/settings">here</a>. Click the 'Download a copy of your data' and proceed from there.</p>

							<hr className="my-2" />

							<p>Upload your data when you are ready.</p>
							<Link className="btn btn-primary" to="/upload">Proceed to data upload</Link>

						</Jumbotron>
					</div>
				);
			} else if (!this.props.userDataProcessed) {
				return (
					<div>
						<Jumbotron>
							<h1 className="display-3">Welcome to me.io, { this.props.name.split(" ")[0] }!</h1>
							<h3>Your data has been successfully uploaded and is now being processed, please check back later.</h3>
							<hr className="my-2" />
						</Jumbotron>
					</div>
				);
			} else {
				return (
					<div>
						<Jumbotron>
							<h1 className="display-3">Welcome to me.io, { this.props.name.split(" ")[0] }!</h1>
							<h3>User sign in successful.</h3>

							<hr className="my-2" />

							<p>Your data has been successfully uploaded and processed.</p>
							<Link className="btn btn-primary" to="/me">Proceed to your analytics</Link>

						</Jumbotron>
					</div>
				)
			}

		}
	}
}

function mapStateToProps(state) {
	return {
		debug: state.debug,
		name: state.name,
		userLoggedIn: state.userLoggedIn,
		userDataUploaded: state.userDataUploaded,
		userDataProcessed: state.userDataProcessed
	}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ signUp, logIn }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Splash));
