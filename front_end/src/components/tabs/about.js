import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Jumbotron, Button, Card, CardColumns, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle } from 'reactstrap';


class About extends Component {
	constructor(props) {
		super(props);
	}
	render () {
		return (
		    <div>
			  	<Jumbotron>
			    	<h1 className="display-3">About Us</h1>

			    	<hr className="my-2" />
					<p className="lead">We developed Me.io as a part of OOSE at Johns Hopkins University. We wanted to make a visualization engine and analytics suite for facebook messenger data, so we made me.io. Our visualizations live in the dashboard tab, and a messenger bot that mimics the way you talk can be found in the mebot tab. To reupload data, please use the settings tab. </p>
					<CardColumns>

							<Card>
								<CardImg top width="100%" src="https://raw.githubusercontent.com/jhu-oose/2017-group-1/master/img/profile/tanay.png?token=AJ6aIb2g0hFYZjpekNg3S1jiUBeoc1xUks5aPeulwA%3D%3D" alt="Card image cap" />
								<CardBody>
									<CardTitle>Tanay Agarwal</CardTitle>
									<CardSubtitle>Back-end</CardSubtitle>
									<hr className="my-2 myRed" />
									<CardText>Senior at Johns Hopkins University studying computer science and applied math.</CardText>
									<a href="https://github.com/02agarwalt">Github</a>
								</CardBody>
							</Card>

							<Card>
								<CardImg top width="100%" src="https://raw.githubusercontent.com/jhu-oose/2017-group-1/master/img/profile/emily.jpg?token=AJ6aIX3P8IcyAyf_PMe6RmE5RstFguw7ks5aPesrwA%3D%3D" alt="Card image cap" />
								<CardBody>
									<CardTitle>Emily Brahma</CardTitle>
									<CardSubtitle>Back-end</CardSubtitle>
									<hr className="my-2 myOrange" />
									<CardText>Senior at Johns Hopkins University studying computer science.</CardText>
									<a href="https://github.com/ebrahma">Github</a>
								</CardBody>
							</Card>

							<Card>
								<CardImg top width="100%" src="https://raw.githubusercontent.com/jhu-oose/2017-group-1/master/img/profile/nirmal.png?token=AJ6aIYfzTmEba5UlYcZTze3l1LjIuq0zks5aPeuDwA%3D%3D" alt="Card image cap" />
								<CardBody>
									<CardTitle>Nirmal Krishnan</CardTitle>
									<CardSubtitle>Front-end</CardSubtitle>
									<hr className="my-2 myBlue" />
									<CardText>Senior at Johns Hopkins University studying computer science.</CardText>
									<a href="https://github.com/nkrishn9">Github</a>
								</CardBody>
							</Card>

							<Card>
								<CardImg top width="100%" src="https://raw.githubusercontent.com/jhu-oose/2017-group-1/master/img/profile/jon.png?token=AJ6aIR9j9hwW2pq_Sjlb7PaeGD52FRKcks5aPetOwA%3D%3D" alt="Card image cap" />
								<CardBody>
									<CardTitle>Jon Liu</CardTitle>
									<CardSubtitle>Front-end</CardSubtitle>
									<hr className="my-2 myYel" />
									<CardText>Senior at Johns Hopkins University studying computer science and applied math.</CardText>
									<a href="https://github.com/jonl1096">Github</a>
								</CardBody>
							</Card>

							<Card>
								<CardImg top width="100%" src="https://raw.githubusercontent.com/jhu-oose/2017-group-1/master/img/profile/manyu.png?token=AJ6aIXoEebcTSoMs6f0gT7XWIKnWNZ_Iks5aPetkwA%3D%3D" alt="Card image cap" />
								<CardBody>
									<CardTitle>Manyu Sharma</CardTitle>
									<CardSubtitle>Front-end</CardSubtitle>
									<hr className="my-2 myGreen" />
									<CardText>Senior at Johns Hopkins University studying computer science and biomedical engineering.</CardText>
									<a href="https://github.com/ms3001">Github</a>
								</CardBody>
							</Card>

					</CardColumns>
				</Jumbotron>
		    </div>
	  	);
	}
}

// Take this components generated html and put in on the page (the DOM) in a certain place.
// ReactDOM.render(<App />, document.querySelector('.app-container'));

export default About;
