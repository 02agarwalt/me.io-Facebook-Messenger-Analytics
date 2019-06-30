import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Charts, ChartContainer, ChartRow, YAxis, LineChart,  BarChart, Resizable, styler} from "react-timeseries-charts";
import { TimeSeries, Index } from "pondjs";
import Fetch from "whatwg-fetch";
import ApiButton from './api_button';
import LineChartComp from './line_chart_comp';
import WordCloud from 'react-d3-cloud';

import { connect } from 'react-redux';
const fontSizeMapper = word => (word.value) * (275) + 20;
const rotate = word => {
	if (Math.floor(Math.random() * 100) + 1 > 50) {
		return (Math.floor(Math.random() * 60));
	}
	return (Math.floor(Math.random() * 60) + 300);

}

class Wordle extends Component {
	constructor(props) {
		super(props);
		this.state = { word_cloud_data: [
				{ text: 'Hey', value: 1000 },
				{ text: 'lol', value: 200 },
				{ text: 'first impression', value: 800 },
				{ text: 'very cool', value: 1000000 },
				{ text: 'duck', value: 10 },
			],
			width: 1200
		};
		// this.onFetchClick = this.onFetchClick.bind(this);
		// this.onFetchClick();
	}

	componentDidMount() {
	    this.updateDimensions();
	    window.addEventListener("resize", this.updateDimensions.bind(this));
  	}

	componentWillUnmount() {
    	window.removeEventListener("resize", this.updateDimensions.bind(this));
  	}

	// onFetchClick() {
	// 	console.log('in onFetchClick inside Wordle');
	// 	var that = this;
	// 	const urlFetch = `http://localhost:5000/api/wordle/${this.props.userId}/?sender=James Chen`;
	// 	fetch(urlFetch, {
	// 		method: "GET",
	// 		credentials: "same-origin"
	// 	}).then(function(response) {
	// 		//console.log('response status')
	// 		//console.log(response.status);
	// 		return response.json()
	// 	}, function(error) {
	// 		//console.log('Error:')
	// 		//console.log(error.message); //=> String
	// 	}).then(function(data) {
	// 		//console.log('wordle')
	// 		//console.log(data);
	// 		that.setState({  word_cloud_data: data});
	// 	});
	// }

	updateDimensions() {
		this.setState({width: window.innerWidth})
	}

	render() {
		if (!this.props.wordCloudData) {
			//console.log('series not defined')
			return <div>Loading...</div>
		}
		return (
			<div>
				<div className="card mb-3">
					<div className="card-header4">
						A visualization of frequently used words
					</div>
					<WordCloud
					    data={this.props.wordCloudData}
							fontSizeMapper={fontSizeMapper}
							width={this.state.width - 300}
							height={400}
							rotate={rotate}
					  />
				</div>
			</div>
		  )
	}
}

function mapStateToProps(state) {
	return {
		userId: state.userId,
		name: state.name
	}
}


export default connect(mapStateToProps)(Wordle);
