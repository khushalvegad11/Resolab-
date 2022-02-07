import React from 'react';
import Cookies from "universal-cookie";
import { Button, Card, Col, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../style/css/CardTemplate.min.css';


var tp;
/*It is required that image folder has the profile pic saved with same name as cUser, i.e., 'cUser.jpg'*/
function CardTemplateForProvider(props) {

	const cookies = new Cookies();
	if (cookies.get("token") === undefined) {
		var path = "/login"
	} else {
		if (cookies.get("staff") == "true") {
			var path = "/providerdetails/" + props.cId + "/" + props.cardId;
		}
		else if (cookies.get("is_user_subscribed") == "false"){
			var path = "/Payment"
		} else {
			var path = "/providerdetails/" + props.cId + "/" + props.cardId;
		}
	} 
	// if (cookies.get('is_provider') == 'true'){
	// 	var path = '/'
	// }
		
	if (props.plan_id === "plan_FK1O3yI0IkPiIf" || props.plan_id === "plan_FK1PUBR5JunPde") tp = true
	var card = (
		//<Card style={{ height:'350x',width: '230px'}} className={classNames("card-template-deck mb-4 ui", "ui card")}>
		 
		<Card style={{ height: '300px', width: '230px', backgroundColor: "#ccf2ff" }} className="ui card shadow-box expand-on-hover">
			<Card.Body style={{ backgroundColor: "#ccf2ff" }}>
				<Image src={props.cImg}  roundedCircle style={{ width: "100px", height: "100px" }} />

				<h6> {props.cName}</h6>
				<m style={{ size: '8px' }} className="text-muted text-dark"> {props.cPosition}
					<br />Experience: {props.cExp} Year<br />Location: {props.cLoc}</m>
				<br /><br />


			</Card.Body>
			<Button className="m-2 btn btn-info" type="button" variant="outline-success">
				<Link target={"_blank"} style={{ color: "black" }} to={{
					pathname: path
					//,
					// state:{
					// 	cId:props.cId,
					// 	key:props.key,
					// 	cardId:props.cardId,
					// 	cDob: props.cDob,
					// 	cPhone: props.cPhone,
					// 	cLoc:props.cLoc,
					// 	cEmail: props.cEmail,
					// 	cName: props.cName,
					// 	cPosition:props.cPosition,
					// 	aadhar_no: props.aadhar_no,
					// 	achievement: props.achievement,
					// 	current_work_district: props.current_work_district,
					// 	current_work_state: props.current_work_state,
					// 	educational_qualification: props.educational_qualification,
					// 	exp_skill_industry: props.exp_skill_industry,
					// 	exp_non_skill: props.exp_non_skill,
					// 	project_name: props.project_name,
					// 	designation_1: props.designation_1,
					// 	organization_1_name: props.organization_1_name,
					// 	total_tenure_1: props.total_tenure_1,
					// 	designation_2: props.designation_2,
					// 	organization_2_name: props.organization_2_name,
					// 	total_tenure_2: props.total_tenure_2,
					// 	designation_3: props.designation_3,
					// 	organization_3_name: props.organization_3_name,
					// 	total_tenure_3: props.total_tenure_3,
					// 	cImg:props.cImg,
					// 	cSalary:props.cSalary,
					// 	eSalary:props.eSalary,
					// 	tp:tp
					//} 
				}}>Details</Link></Button>
		</Card>
	);


	return (
		<div>
			{card}
		</div>
	);
}

export default CardTemplateForProvider;
