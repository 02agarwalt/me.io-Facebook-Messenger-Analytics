import React, { Component } from 'react';
import { Jumbotron, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Container, Row, Col  } from 'reactstrap';

import { withRouter, Link } from 'react-router-dom';

import { connect } from 'react-redux';

import MyNavBar from './my_nav_bar';
import Dashboard from './tabs/dashboard';
import Mebot from './tabs/mebot';
import About from './tabs/about';


class MeApp extends Component {

	constructor(props) {
		super(props);
  	this.state = {
		currentTab: <Dashboard />
  	};
	}

	render () {
		return (
			<Container fluid>
			<Row>
				<Col xl = "1" md="2">
						<MyNavBar onTabChange={tab => this.setState({currentTab: tab})}/>
				</Col>
				<Col xl = "11" md="10">
					{ this.state.currentTab }
				</Col>
			</Row>
			</Container>
		);
	}
}

export default MeApp;
