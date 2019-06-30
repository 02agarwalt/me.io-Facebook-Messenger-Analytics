import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Jumbotron, Button, InputGroup, InputGroupButton, Input, Container, Row} from 'reactstrap';
import { ChatFeed, Message} from 'react-chat-ui'

import { connect } from 'react-redux';

class Mebot extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userInput: "",
			messages : [
				(new Message({ id: 1, message: "Hi, I'm meBot! I'm a robot designed to talk just like you! Type in the box to talk to me! Fair warning--the first response will take a while since I need to get loaded, so hang tight once you send in your first chat ;)"})), // Blue bubble
				// (new Message({ id: 0, message: "Hey meBot! How's it going?"})) // Gray bubble
		  ]
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
	}

	sendMessage() {
		var newMessages = this.state.messages
		var newMessage = new Message({ id: 0, message: this.state.userInput})
		newMessages.push(newMessage)
		this.setState({
			userInput: '',
			messages: newMessages
		});
    // add typing dots here
		//console.log('meBot EndPoint');
		var that = this;
		var urlSendMessage = `http://127.0.0.1:5000/api/chatbot/${this.props.userId}`
		fetch(urlSendMessage, {
				headers: {
					'Content-Type': 'application/json'
				},
				method: "POST",
				credentials: "same-origin",
				body: JSON.stringify({
					"message": newMessage.message
				})
		}).then(function(response) {
				return response.json();
		}).then(function(data) {
				var meBotResponse = new Message({id: 1, message: data.message})
				newMessages.push(meBotResponse)
				that.setState({
					messages: newMessages
				});
		}).catch(function(error) {
				//console.log(error)
		});
	}

	handleClick(event) {
		this.sendMessage()
  }

	handleKeyPress = (e) => {
    if (e.key === 'Enter') {
			this.sendMessage()
    }
  }

	handleChange(event) {
    this.setState({userInput: event.target.value});
  }

	render() {
	  return (
        <Container>
				<Jumbotron>
					<Row className="chat-history">
				    <ChatFeed
				      messages={this.state.messages} // Boolean: list of message objects
				    />
					</Row>
				<Row>
          <InputGroup className="chat-input">
                  <Input placeholder="Type here..." value={this.state.userInput} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
                  <InputGroupButton color="secondary" onClick={this.handleClick}>Send</InputGroupButton>
           </InputGroup>
				</Row>
				</Jumbotron>
				</Container>
	  )
	}
}

function mapStateToProps(state) {
	return {
		userId: state.userId
	}
}

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({ signUp, logIn }, dispatch);
// }

export default connect(mapStateToProps)(Mebot);
