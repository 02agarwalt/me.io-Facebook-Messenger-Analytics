import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import UserFreqStat from '../user_freq_stat'
import { TimeSeries, Index } from "pondjs";
import DailyMsgHistogram from '../daily_msg_histogram'
import Sentiment from '../sentiment'
import Wordle from '../wordle'
import TopFriendsStats from '../top_friends_stats'
import SummaryText from '../summary_text'


import { Jumbotron, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, FormGroup, Label, Input, option, Card, CardBody, CardDeck} from 'reactstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom';

import { getUserFreqStats, getSentimentStats, getChatFreqStats, getWordleStats, getTopFriendsStats } from '../../actions/actions_stats';

class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.onFriendChangeUFS = this.onFriendChangeUFS.bind(this);
		this.onFriendChangeSentiment = this.onFriendChangeSentiment.bind(this);
		this.onFriendChangeDMH = this.onFriendChangeDMH.bind(this);
		this.onFriendChangeWordle = this.onFriendChangeWordle.bind(this);
		console.log('props')
		console.log(this.props)

    	this.state = {
			selectedFriendUFS: this.props.name,
			selectedFriendSentiment: this.props.crudStats.top_friend_messaged,
			selectedFriendDMH: this.props.name,
			selectedFriendWordle: this.props.name,
			friend_list: []
    	};
		// this.props.getCrudStats(this.props.userId)
		this.props.getUserFreqStats(this.props.userId, this.props.name)
		this.props.getSentimentStats(this.props.userId, this.props.crudStats.top_friend_messaged)
		this.props.getChatFreqStats(this.props.userId, this.props.name)
		this.props.getTopFriendsStats(this.props.userId)
		this.props.getWordleStats(this.props.userId, this.props.name)

		// this.setState({ selectedFriendSentiment: this.props.crudStats.top_friend_messaged })
	}

	get_friend_list() {
		var that = this;
		const url_friend_list = `http://127.0.0.1:5000/api/friends/${this.props.userId}`;
		fetch(url_friend_list, {
			method: "GET",
			credentials: "same-origin"
		}).then(function(response) {
			return response.json()
		}, function(error) {
		}).then(function(data) {
			that.setState({
	      		friend_list: data.sort()
	    	});
		});
	}

	componentDidMount() {
		console.log("compdidmount")
		this.get_friend_list()
	}

	renderFriendsList() {
		return this.state.friend_list.map((friend) => {
			return <option key={friend}>{ friend }</option>
			// return <a className="dropdown-item" key={ friend } onClick={ someOnClickMethod }>{ friend }</a>
		});
	}

	onFriendChangeUFS(event) {
		//console.log('onFriendChangeUFS')
		//console.log(event.target.value)
		this.setState({ selectedFriendUFS: event.target.value });
		//console.log('selectedFriendUFS:', this.state.selectedFriendUFS)
		this.props.getUserFreqStats(this.props.userId, event.target.value)
	}

	onFriendChangeSentiment(event) {
		//console.log('onFriendChangeSentiment')
		// //console.log(event.target.text)
		//console.log(event.target.value)
		this.setState({ selectedFriendSentiment: event.target.value });
		//console.log('selectedFriendUFS:', this.state.selectedFriendSentiment)
		this.props.getSentimentStats(this.props.userId, event.target.value)
	}

	onFriendChangeDMH(event) {
		//console.log('onFriendChangeDMH')
		//console.log(event.target.value)
		this.setState({ selectedFriendDMH: event.target.value });
		//console.log('selectedFriendDMH:', this.state.selectedFriendDMH)
		this.props.getChatFreqStats(this.props.userId, event.target.value)
	}

	onFriendChangeWordle(event) {
		this.setState({ selectedFriendWordle: event.target.value });
		this.props.getWordleStats(this.props.userId, event.target.value)
	}

	render() {
		//console.log('userLoggedIn')
		//console.log(this.props.userLoggedIn)
		//console.log(this.props)
		if (!this.props.userLoggedIn) {
			return (
				<div>
					<Jumbotron>
						<h1 className="display-3">User Not Logged In</h1>
						<p className="lead">Please click the following link to the log in page.</p>
						<hr className="my-2" />
						<div>
							<Link className="btn btn-primary" to="/">Log In Page</Link>
						</div>
					</Jumbotron>
				</div>
			)
		}

		return (
			<div>
				<Jumbotron>
					<h1 className="display-3">Welcome to me.io!</h1>
					<p/>
					<CardDeck>
						<div className="card mb-3">
							<div className="card-header5">
								An overview of all of your messages
							</div>
							<CardBody>
								<SummaryText stats={this.props.crudStats}/>
							</CardBody>
						</div>
						<div className="card mb-3">
							<div className="card-header5">
								Your top 10 most messaged people
							</div>
							<CardBody>
								{this.props.topFriendsStats || length(this.props.topFriendsStats.data) == 0 ? (
										<TopFriendsStats data={this.props.topFriendsStats}/>
								): (
										<div>Loading...</div>
								)}
							</CardBody>
						</div>
					</CardDeck>
				</Jumbotron>
				<Jumbotron>
					<h1 className="display-3">User frequency statistics!</h1>
					<p className="lead">This graph shows your messaging frequency with a certain chat over time.</p>
						<div className="row">
							<FormGroup>
								<Label for="exampleSelect">Select a friend to filter by:</Label>
								<Input type="select" name="select" id="exampleSelect" value={this.state.selectedFriendUFS} onChange={this.onFriendChangeUFS}>
									{ this.renderFriendsList() }
								</Input>
							</FormGroup>
						</div>
					<div>
						<UserFreqStat series={ this.props.userFreqStatsSeries }/>
					</div>
				</Jumbotron>

				<Jumbotron>
					<h1 className="display-3">Word cloud!</h1>
					<p className="lead">This visualization shows your most frequently used words.</p>
					<div className="row">
						<FormGroup>
							<Label for="exampleSelect">Select a friend to filter by:</Label>
							<Input type="select" name="select" id="exampleSelect" value={this.state.selectedFriendWordle} onChange={this.onFriendChangeWordle}>
								{ this.renderFriendsList() }
							</Input>
						</FormGroup>
					</div>
					<div>
						<Wordle wordCloudData={ this.props.wordleStats }/>
					</div>
				</Jumbotron>

				<Jumbotron>
					<h1 className="display-3">Sentiment analysis!</h1>
					<p className="lead">This graph shows your sentiment with a certain chat over time.</p>
						<div className="row">
							<FormGroup>
								<Label for="exampleSelect">Select a friend to filter by:</Label>
								<Input type="select" name="select" id="exampleSelect" value={this.state.selectedFriendSentiment} onChange={this.onFriendChangeSentiment}>
									{ this.renderFriendsList() }
								</Input>
					        </FormGroup>
						</div>
					<div>
						<Sentiment series={ this.props.sentimentStatsSeries }/>
					</div>
				</Jumbotron>

				<Jumbotron>
					<h1 className="display-3">Daily messages histogram!</h1>
					<p className="lead">This graph shows your frequency of messages (sent/received) everyday.</p>
						<div className="row">
							<FormGroup>
								<Label for="exampleSelect">Select a friend to filter by:</Label>
								<Input type="select" name="select" id="exampleSelect" value={this.state.selectedFriendDMH} onChange={this.onFriendChangeDMH}>
									{ this.renderFriendsList() }
								</Input>
					        </FormGroup>
						</div>
					<div>
						<DailyMsgHistogram series={ this.props.dailyMsgHistogramSeries }/>
					</div>
				</Jumbotron>
			</div>
		);
	}
}

function formatTimeSeries(arr) {
	console.log('formatTimeSeries')
	if (!arr || arr.length == 0) {
		return null;
	}
	var out = {
		name: "num_messages",
		columns: ["index", "num_in_hour"],
		points: arr.map(([d, value]) => [Index.getIndexString("1h", new Date(d)), value])
	};

	var toProcess = out['points'];
	var processed = [];
	processed.push(toProcess[0]);
	var size = toProcess.length;

	for(var i = 1; i < size; i++) {
		var prevPoint = toProcess[i-1];
		var currPoint = toProcess[i];
		if (currPoint[0] !== prevPoint[0]) {
			processed.push(currPoint);
		}
	}
	out['points'] = processed;
	return new TimeSeries(out);

}

function formatTimeSeriesSent(arr) {
	console.log('formatTimeSeriesSent')
	console.log(arr)
	if (!arr || arr.length == 0 || !arr.sender || ! arr.user) {
		return null;
	}
	var sender = new TimeSeries({
		name: "num_messages",
		columns: ["index", "sender"],
		points: arr.sender.map(([d, value]) => [Index.getIndexString("1h", new Date(d)), value])
	});
	var user = new TimeSeries({
		name: "num_messages",
		columns: ["index", "user"],
		points: arr.user.map(([d, value]) => [Index.getIndexString("1h", new Date(d)), value])
	});
	return {sender: sender, user: user}
}

function formatTimeSeriesDMH(arr) {
	console.log('formatTimeSeriesDMH')
	if (!arr || arr.length == 0) {
		return null;
	}
	return new TimeSeries({
		name: "num_messages",
		columns: ["index", "num_in_hour"],
		points: arr.map(([d, value]) => [
			Index.getIndexString(  "1h", new Date(new Date("2014-09-01 " + d + ":00:00").getTime()-(new Date(0).getTimezoneOffset() * 60000))  ),
			value * 100
		])
	});
}

function formatTopFriends(preData) {
	console.log('formatTopFriends')
	if (!preData || preData.length == 0) {
		return null;
	}
	var data = [];
	var colors = ["#81D4FA","#80CBC4","#C5E1A5","#FFF59D","#FFE082","#FFCC80","#FFAB91","#ef9a9a","#CE93D8","#B39DDB","#9FA8DA"];
	for(var i = 0, size = preData.length; i < size ; i++) {
	   var curDict = preData[i];
	   var temp = {};
	   temp['title'] = curDict['friend'];
	   temp['value'] = curDict['message_percent'] * 100;
	   temp['color'] = colors[i];
	   data.push(temp);
	}

	return {data}

}

function mapStateToProps(state) {
	//console.log('dashboard redux state')
	//console.log(state)

	return {
		userLoggedIn: state.userLoggedIn,
		userId: state.userId,
		name: state.name,
		userFreqStatsSeries: formatTimeSeries(state.userFreqStats),
		sentimentStatsSeries: formatTimeSeriesSent(state.sentimentStats),
		dailyMsgHistogramSeries: formatTimeSeriesDMH(state.chatFreqStats),
		crudStats: state.crudStats,
		topFriendsStats: formatTopFriends(state.topFriendsStats),
		wordleStats: state.wordleStats
	}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getUserFreqStats, getSentimentStats, getChatFreqStats, getWordleStats, getTopFriendsStats}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
