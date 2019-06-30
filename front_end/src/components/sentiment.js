import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Charts, ChartContainer, ChartRow, YAxis, LineChart,  BarChart, Resizable, styler} from "react-timeseries-charts";
import { TimeSeries, Index } from "pondjs";
import Fetch from "whatwg-fetch";
import ApiButton from './api_button';
import LineChartComp from './line_chart_comp';
import SentChartComp from './sent_chart_comp';
import CardBody from 'reactstrap'


import { connect } from 'react-redux';

class Sentiment extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		//console.log('rendering sentiment')
		var that = this;
		if (!this.props.series) {
			//console.log('series not defined')
			return <div>Loading...</div>
		}
		return (
			<div>
				<div className="card mb-3">
					<div className="card-header3">
						Your Sentiment Score with a Chat Over Time
					</div>
					{(function(show) {
			        	if (show) {
			            	return (
								<SentChartComp series={that.props.series} color={"#5fd56e"} />
							);
			          	} else {
							return (<div>Loading...</div>);
						}
					})(that.props.series.user)}
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

export default connect(mapStateToProps)(Sentiment);
