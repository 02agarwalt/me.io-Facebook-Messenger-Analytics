import React, { Component } from 'react';
import {Nav, NavItem, NavLink, Button} from 'reactstrap';

import Dashboard from './tabs/dashboard';
import Mebot from './tabs/mebot';
import About from './tabs/about';


export default class MyNavBar extends React.Component {

    constructor(props) {
		super(props);

  	}

    onTabClick(tab) {
        this.props.onTabChange(tab);
    }


    render() {
        return (
            <div>
                <Nav vertical>
                    <NavItem>
						<p/>
                        <Button color="link" onClick={() => this.onTabClick( <Dashboard /> )}>Dashboard</Button>
                        <hr color="grey" />
                    </NavItem>
                    <NavItem>
						<p/>
                        <Button color="link" onClick={() => this.onTabClick( <Mebot /> )}>meBot</Button>
                        <hr color="grey"/>
                    </NavItem>
                    <NavItem>
						<p/>
                        <Button color="link" onClick={() => this.onTabClick( <About /> )}>About</Button>
                    </NavItem>
                </Nav>
            </div>
        );
    }
}
