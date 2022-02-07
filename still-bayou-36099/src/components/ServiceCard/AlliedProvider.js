import React from 'react';
//import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
//import {Row, Col} from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import {Link} from 'react-router-dom';
import '../../style/css/CardTemplateForSeeker.min.css';
let tp=false;

function open(url){
  window.open(url, "_blank");
}

/*It is required that image folder has the profile pic saved with same name as cUser, i.e., 'cUser.jpg'*/
function AlliedProviderCard(props) {
        if (props.plan_id === "plan_FK1O3yI0IkPiIf" || props.plan_id === "plan_FK1PUBR5JunPde") tp = true;
        let link = props.cImg;
        let linkarray = link.split(',');
  var path ='/apd'+ '/'+ props.userId+'/'+props.cardId;
    var pics = (
      <Carousel cycle ride={true} interval="3000">
      {
        linkarray.map(img=>{
          return(<Carousel.Item>
          <Image src={img} className="service-card-image" style={{maxWidth:"100%"}}/>

        </Carousel.Item>);
        })
      }

      </Carousel>
    );

    var content=(
        <div className="service-card-content">
        <h6 style={{"fontWeight":"bold", "color":"blue"}}>{props.cCategory}</h6>
        <b>
        {props.cOrgName} </b><br/>
        {props.cJob}<br/>
        {props.cLocation}

       
        <br/>
  </div>
);


    var getDetails=(

          <div className="row">

              <div  className="col-lg-7 service-card-image">
                {pics}
              </div>
              <div className="text_right col-lg-5"><br/>
                  {content}
<br/>
                  <Button type="button" variant="outline-success" href="#" style={{fontSize:"1em"}}>
                  <Link  onClick={()=>open(path)} >Details</Link>
                  </Button>
              </div>
          </div>
    )


	return(
    <div className="abcde expand-on-hover" style={{ backgroundColor:"#ccffdc"}}>
			{getDetails}

		</div>
	);
}

export default AlliedProviderCard;
