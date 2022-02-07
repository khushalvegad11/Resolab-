import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import '../../style/css/CardTemplate.min.css';
let service = false;
/*It is required that image folder has the profile pic saved with same name as cUser, i.e., 'cUser.jpg'*/
function AlliedSeekerCard(props) {
	console.log(props.plan_id);
	if (props.plan_id === "plan_FK1LpTeMzTBOWv" || props.plan_id === "plan_FK1N2JDcWTBHaC") service=true
		var card=(
			<Card style={{ height:'300px',width: '230px',margin:'20px',marginBottom:'40px'}} className= "ui card shadow-box expand-on-hover">
			<Card.Body className="aligncenter" style={{backgroundColor:"#ccf2ff"}}>
				<Card.Title> {props.cCategory} </Card.Title>
				<Card.Subtitle className="text-muted text-dark"> {props.cSubCategory} </Card.Subtitle><br/>
				<Card.Text> Contact Name: {props.cName}<br/>Location: {props.cLoc}</Card.Text>
				<hr/>
				<Button type="button" variant="outline-success">
				<Link to={{pathname:'/asd',state:{cObject:props.cObject,service:service}}}>
					Details
				</Link>
				</Button>
			</Card.Body>
			</Card>
		);


	return(
		<div>

			{card}

		</div>
	);
}

export default AlliedSeekerCard;
