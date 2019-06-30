import React, { Component } from 'react';
import { connect } from 'react-redux';
import PieChart from "react-svg-piechart"

class TopFriendsStats extends Component {

	constructor(props) {
		super(props);
		console.log('TopFriendsStats constructor')
		console.log(this.props)
		this.state = {
			hoveree: this.props.data.data[10].title,
			percentage: this.props.data.data[10].value
		}
	}

	render() {
		console.log("jonny boi")
		console.log(this.props)
		return (
			<div className="goodOne">
				<p className="summary_text">Friend: <b>{this.state.hoveree}</b> </p>
				<p className="summary_text">Percentage: <b>{parseFloat(this.state.percentage).toFixed(1)}%</b></p>
				<PieChart
				  data = {this.props.data.data}
				  expandOnHover={true}
				  expandSize={2}
				  onSectorHover={(data, index, event) => {
					  	// console.log(data)
						if (data) {
							this.setState({hoveree:data.title,percentage:data.value})
						}
					}
				  }
				  shrinkOnTouchEnd={false}
				  strokeColor="#fff"
				  strokeLinejoin="round"
				  strokeWidth={1}
				  viewBoxSize={200}
				/>
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

export default connect(mapStateToProps)(TopFriendsStats);
