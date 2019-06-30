import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Jumbotron, Button, Progress, Input, Form  } from 'reactstrap';
// import { FileUpload } from 'redux-file-upload';
import axios, { post } from 'axios';
import { withRouter, Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { uploadData, removeData } from '../actions/actions_user_data';

class DataUpload extends Component {
	constructor(props) {
		super(props);
		this.state = {
      		file: null,
			uploading: false,
			fileStaged: false
    	}
	    this.onFormSubmit = this.onFormSubmit.bind(this)
	    this.onChange = this.onChange.bind(this)
		//this.reupload = this.reupload.bind(this)
	    // this.fileUpload = this.fileUpload.bind(this)
	}

	// reupload() {
	// 	removeData(this.props.userId);
	// }

	onFormSubmit(e){
		e.preventDefault() // Stop form submit
		//console.log('userId:', this.props.userId)
		// this.props.uploadData(this.props.userId, this.state.file);
		this.setState({ uploading: true });
		this.props.uploadData(this.props.userId, this.state.file);
		// this.fileUpload(this.state.file).then((response)=>{
		//   //console.log(response.data);
		// })
	}
	onChange(e) {
		this.setState({file: e.target.files[0], fileStaged: true})
	}

	render () {
		if (!this.props.userDataProcessed) {
			return (
			    <div>
				  	<Jumbotron>
				    	<h1 className="display-3">Data Upload</h1>
				    	<hr className="my-2" />
						<p>After clicking Upload, you may have to wait 5 minutes or so. </p>
						<Form onSubmit={this.onFormSubmit}>
					        <h1>File Upload</h1>
					        <input type="file" onChange={this.onChange} />
							{this.state.uploading ? (
								<Button disabled="true" type="submit">Processing...</Button>
							): (
								<Button disabled={!this.state.fileStaged} type="submit">Upload</Button>
							)}
							<p/>
							{this.state.uploading ? (

								<Progress animated color="#2196f3" value="100" />
							): (
								<p/>

							)}

					    </Form>
				  	</Jumbotron>
			    </div>
		  	);
		} else {
			return (
			    <div>
				  	<Jumbotron>
				    	<h1 className="display-3">Data Upload</h1>
						<h3>User Data uploaded and processed! Proceed to analytics.</h3>
						<Link className="btn btn-primary" to="/me">Proceed to your analytics</Link>
						<hr/>
						<h3>Click the button below to re-upload your data.</h3>
						<Button color="primary" onClick={ () => {this.props.removeData(this.props.userId)} }>Re-upload data</Button>
				  	</Jumbotron>
			    </div>
		  	);
		}

	}
	// <button type="submit">Upload</button>
}

function mapStateToProps({ userId, userDataProcessed }) {
	//console.log('redux userId:', userId)
	//console.log('redux userDataProcessed:', userDataProcessed)
	return { userId, userDataProcessed };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ uploadData, removeData }, dispatch);
}

// first argument is null because this container doesn't need anything from the redux state for testing
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DataUpload))
