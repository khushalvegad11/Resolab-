import React from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import {Row, Col} from 'react-bootstrap';

import '../style/css/CardTemplateForSeeker.min.css';

/*It is required that image folder has the profile pic saved with same name as cUser, i.e., 'cUser.jpg'*/
function CardTemplateForSeeker(props) {
		var card=(
			
			<Card className="seeker-card-template-deck mb-4">
			<Row style={{padding: 0, }}>
			<Col xs={6} className="seeker-card-resetter">
			<Row style={{height: '155px',}}>
			<Col className="seeker-fill seeker-card-resetter">
				<Image src={require(`../images/${props.cImg.toLowerCase()}.jpg`)} className="mx-auto seeker-card-img" />
			</Col>
			</Row>
			<Row style={{height: '155px',}}>
			<Col className="seeker-fill seeker-card-resetter">
				<Image src={require(`../images/${props.cImg.toLowerCase()}.jpg`)} className="mx-auto seeker-card-img" />
			</Col>
			</Row>

			
			
			</Col>
			<Col xs={6} className="seeker-card-resetter">
			<Card.Body as="div" className="seeker-info">
				<Card.Title> {props.cCategory} </Card.Title>
				<Card.Subtitle className="text-muted text-dark"> {props.cSubCategory} </Card.Subtitle>
				<Card.Text> From &#8377;{props.cSalaryLower}<br/>To &#8377;{props.cSalaryUpper}<br/>(per year)<br/>Location: {props.cLoc}</Card.Text>
				<hr/>
				<Button type="button" variant="outline-success" href="#"> View Details </Button>

			</Card.Body>
			</Col>
			</Row>
			</Card>
			
		);
	

	return(
		<div>

			{card}

		</div>
	);
}

export default CardTemplateForSeeker;