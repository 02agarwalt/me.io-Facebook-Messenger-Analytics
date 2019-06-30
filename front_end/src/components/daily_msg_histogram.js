import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Charts, ChartContainer, ChartRow, YAxis, LineChart,  BarChart, Resizable, styler} from "react-timeseries-charts";
import { TimeSeries, Index } from "pondjs";
import Fetch from "whatwg-fetch";
import ApiButton from './api_button';
import BarChartComp from './bar_chart_comp';

import { connect } from 'react-redux';

class DailyMsgHistogram extends Component {
	constructor(props) {
		super(props);

	}

	render() {
		var that = this;
		return (
			<div>
				<div className="card mb-3">
					<div className="card-header2">
						Your Messaging Activity Over One Day
					</div>
					{(function(show) {
			        	if (show) {
			            	return (<BarChartComp series={that.props.series} yaxis = {"Percentage of messages"} color = {"#f55481"} scrollable = {false}/>);
			          	} else {
							return (<div>Loading...</div>);
						}
			        })(that.props.series)}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		userId: state.userId,
		name: state.name
	}
}

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({ signUp, logIn }, dispatch);
// }

export default connect(mapStateToProps)(DailyMsgHistogram);
