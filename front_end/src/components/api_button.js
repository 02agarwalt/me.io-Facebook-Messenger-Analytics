import React, {Component} from 'react';
import Fetch from "whatwg-fetch";

class ApiButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            disabled: this.props.disabled,
            requestUrl: this.props.requestUrl,
            method: this.props.method,
            sendData: this.props.sendData,
            buttonText: this.props.buttonText
        };
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    // shouldComponentUpdate(nextProps) {
    //     return (this.props.disabled !== nextProps.disabled);
    // }

    componentWillReceiveProps(nextProps) {
        this.setState({ disabled: nextProps.disabled });
    }

    onButtonClick() {
        //console.log('in onButtonClick');
        //console.log(this.state.requestUrl);
        var that = this;
        fetch(this.state.requestUrl, {
            method: this.state.method,
            credentials: "same-origin"
            // credentials: "no-cors"
        }).then(function(response) {
            //console.log('response status:')
            //console.log(response.status);
            // //console.log('response json');
            // //console.log(response.json());
            return response.json();
        }).then(function(data) {
            //console.log('data');
            //console.log(data);
            that.state.sendData(data);
        }).catch(function(error) {
            //console.log('error');
            //console.log(error);
        });
    }

    render() {
        return <button disabled={this.state.disabled} type="button" className="btn btn-primary" onClick={this.onButtonClick}>{this.state.buttonText}</button>;
    }

}

// // functional component
// const ApiButton = (props) => {
//   return <input />
// };

export default ApiButton;
