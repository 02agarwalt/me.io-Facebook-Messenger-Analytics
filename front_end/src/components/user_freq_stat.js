import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Charts, ChartContainer, ChartRow, YAxis, LineChart,  BarChart, Resizable, styler} from "react-timeseries-charts";
import { TimeSeries, Index } from "pondjs";
import Fetch from "whatwg-fetch";
import ApiButton from './api_button';
import BarChartComp from './bar_chart_comp';

import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

class UserFreqStat extends Component {
	constructor(props) {
		super(props);

	}

	render() {
		//console.log('rendering UserFreqStat')
		var that = this;
		if (!this.props.series) {
			//console.log('series not defined')
			return <div>Loading...</div>
		}
		//console.log('series defined')
		return (
			<div>
				<div className="card mb-3">
					<div className="card-header1">
						<i className="fa fa-bar-chart"></i>
						Your Messaging Activity Over Time
					</div>
					{(function(show) {
			        	if (show) {
			            	return (<BarChartComp series={that.props.series} yaxis={"Messages"} color={"#2196f3"} scrollable={true}/>);
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

export default connect(mapStateToProps)(UserFreqStat);
