import React from 'react';
//import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import {Row, Col} from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import {Link} from 'react-router-dom';
import '../../style/css/CardTemplateForSeeker.min.css';
import '../../style/css/Infra.css';

let tp = false;


function open(url){
  window.open(url, "_blank");
}
/*It is required that image folder has the profile pic saved with same name as cUser, i.e., 'cUser.jpg'*/
function InfraProviderCard(props) {
        if (props.plan_id === "plan_FK1O3yI0IkPiIf" || props.plan_id === "plan_FK1PUBR5JunPde") tp = true;
        let link = props.cImg;
        let linkarray = link.split(',');
    var path='/ipd'+'/'+props.cObject.user.id+'/'+props.cObject.id
    var pics = (
      <Carousel cycle ride={true} interval="3000">
      {
        linkarray.map(img=>{
          return(<Carousel.Item>
          <Image src={img} className="mx-auto service-card-image" style={{maxWidth: "100%"}} />

        </Carousel.Item>);
        })
      }

      </Carousel>
    );

    var content=(
        <div className="service-card-content">
        <h5 style={{"fontWeight":"bold", "color":"blue"}}>Infra (Training center)</h5>
        <b>
        Total Area: {props.cArea} (sq. ft.)
        <br/>Facility: <pre>{props.cFacility==="All"?("All Facility are available"):props.cFacility}</pre>

        State: {props.cLocation}
        </b>
        <br/>
  </div>
);


    var getDetails=(
          <Row className="row" style={{"width":"100%","height":"100%"}}>

              <Col column="lg" className="service-card-image1" lg={6}>
                {pics}
              </Col>
              <Col className="text_right" column="lg" lg={6}>
                  {content}

                  <Button type="button" variant="outline-success" href="#" style={{fontSize:"1em"}}>
                  <Link onClick={()=>open(path)}>Details</Link>
                  </Button>
              </Col>
          </Row>
    )


	return(
		<div className="abcde expand-on-hover" style={{ backgroundColor:"#ccffdc"}}>
			{getDetails}
		</div>
	);
}

export default InfraProviderCard;
