import React, { Component } from 'react';
import { connect } from 'react-redux';

class SummaryText extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		console.log(this.props)
		var firstName = this.props.name.split(" ")[0]
		return (
				<p className="summary_text"> Hi, <b>{firstName}</b>!<br/><br/>
					You sent your first facebook message on <b>{this.props.stats.first_message_date}</b>.<br/><br/>
					Since then, you have sent a total of <b>{this.props.stats.total_messaged_sent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</b> messages.<br/><br/>
					You have received a total of <b>{this.props.stats.total_messages_received.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</b> messages.<br/><br/>
					You send on average <b>{this.props.stats.average_messages_per_day.toFixed(0)}</b> messages per active day.<br/><br/>
					You have sent the most direct messages to <b>{this.props.stats.top_friend_messaged}</b>, with a total of <b>{this.props.stats.num_messaged_to_top_friend.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</b> messages.<br/><br/>
					You have received the most direct messages from <b>{this.props.stats.top_friend_messages_received}</b>, with a total of <b>{this.props.stats.num_messages_received_by_top_friend.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</b> messages.<br/><br/>
				</p>
		)
	}
}

// INSERTNAME has sent the most messages to you, with a total of INSERTNUMBER messages.
// Your ratio of sent to received messages is INSERTNUMBER.
// You have the highest average sentiment messages with INSERTNAME, and the lowest average sentiment with INSERTNAME.

function mapStateToProps(state) {
	return {
		userId: state.userId,
		name: state.name
	}
}

export default connect(mapStateToProps)(SummaryText);
