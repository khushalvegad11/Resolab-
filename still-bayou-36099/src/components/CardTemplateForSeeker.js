import React from 'react';
import Cookies from "universal-cookie";
// import Card from 'react-bootstrap/Card';
import { Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle } from 'reactstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { Col, Row, Container, Image } from 'react-bootstrap';
import "../style/css/required_card.css"

import '../style/css/CardTemplateForSeeker.min.css';
let trainer = false;
let operation = false;
/*It is required that image folder has the profile pic saved with same name as cUser, i.e., 'cUser.jpg'*/
function CardTemplateForSeeker(props) {
	if (props.plan_id === "plan_FK1EvsUuXJNP6b" || props.plan_id === "plan_FK1Hb4cr5lnHZF" || props.plan_id === "plan_FLqgRHzdEefDzo") trainer = true;
	if (props.plan_id === "plan_FK1JHVbtKSmjov" || props.plan_id === "plan_FK1KG7CxaFA0iO") operation = true;
	
	const cookies = new Cookies();

	if (cookies.get("token") === undefined) {
		var path = "/login"
	} else {
		if (cookies.get("staff") == "true"){
			var path = "/seekerdetails/" + props.cId + "/" + props.cardId;
		}
		else if(cookies.get("is_user_subscribed") == "false"){
			var path = "/Payment"
		}
		else {
			var path = "/seekerdetails/" + props.cId + "/" + props.cardId;
		}
	} 
	// if (cookies.get('is_seeker') == 'true'){
	// 	var path = '/'
	// }
	
	var card = (
		//	<Card style={{width: '230px', height: '230px'}} className="seeker-card-template-deck mb-4">
		<Container >
			
			<div className="card mb-3 maincard" >
				<div className="row no-gutters row1">
					<div className="col-md-4">
						<img src={props.cImg} className="card-img rounded-circle" alt="..." height="100" width="" />
					</div>
					<div className="col-md-8">
						<div className="card-body">
							<h6 className="card-title">{props.cSubCategory}</h6>

							<hr />
							<p className="card-text"><b className="text-muted mr-0">{props.pia_tp_name}</b><br />{props.cLoc}</p>

						</div>
					</div>
				</div>
				<br />
				<p className="card-text">Salary(P.A.): &#8377;{props.cSalaryLower} - &#8377;{props.cSalaryUpper}</p>

				<button type="button" variant="outline-success" className="m-2 btn btn-info">
					<Link target={"_blank"} style={{ color: "black" }} to={{
						pathname: path,
					}}>Details</Link>
				</button>
			</div>
		</Container>
	);


	return (
		<div>

			{card}

		</div>
	);
}

export default CardTemplateForSeeker;
