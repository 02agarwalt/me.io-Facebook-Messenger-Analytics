import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';

import { Jumbotron, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Container, Row, Col  } from 'reactstrap';
import { BrowserRouter, Route, Link, Switch, withRouter} from 'react-router-dom';

import Header from './header';
import MyNavBar from './my_nav_bar';
import MeApp from './me_app';
import DataUpload from '../containers/data_upload';
import Splash from '../containers/splash';

export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render () {
		return (
			<div>
				<Header/>
				<p/>
				<BrowserRouter>
					<div>
						<Switch>
							<Route path="/me" component={MeApp} />
							<Route path="/upload" component={DataUpload} />
							<Route path="/" component={Splash} />
						</Switch>
					</div>
				</BrowserRouter>
			</div>

		);
		// <Route path="/me" exact component={MeApp} />

	}
}
