import React from 'react'
import '../style/css/ConnectForm.css';
import {Card, Button,Form} from 'react-bootstrap';
import Cookies from "universal-cookie";
import axios from 'axios'

function ConnectForm2(props) {
    var check=false;
    const cookies = new Cookies();
    const handleCheck=(event)=>{
      if(check===false)check=true;
      else check=false;
      if(check===true)
      document.getElementById("wa").disabled=true;
      else 
      document.getElementById("wa").disabled=false;

    }

    const handleSubmit=(event)=>{
      event.preventDefault();
      var name=props.name, email=props.email,
      messagesend=document.getElementById("inputAddress").value
      var message={
        service_id: "service_fpn7em3",
        template_id: "template_k8pvfg9",
        user_id: "user_MyObHSimpGBoC5C1m6J7J",
        template_params: 
        {
            sender_type:"Provider",
            to_name:name,
            email:email, 
            message:messagesend,
            sender_link:"http://www.resolabindia.com/providerdetails/"+cookies.get("id"),
            seeker_link:"http://www.resolabindia.com/seekerdetails/"+ props.userId+"/"+props.cardId
        }
    }
     console.log(message);
     document.getElementById("form").reset();
    axios.post('https://api.emailjs.com/api/v1.0/email/send', message)
    .then((result) => {
      document.getElementById("form").reset();
        console.log(result.data);
        alert("Your message has been sent to the Resource Provider !!")

    }, (error) => {
      alert('Oops... ' + JSON.stringify(error));
    });

    }
    return (
      
      <div  style={{zIndex:"3"}} class="card connect" >
      <Form id="form" validate onSubmit={handleSubmit}>
            <Card.Header><h5>CONNECT WITH THE RESOURCE</h5></Card.Header><br/>
  <Form.Row>
    <div class="form-group col-md-3">
      <Form.Label for="interest" class="required">Interested?</Form.Label>
      <br/><input required type="radio" name="interest" value="Yes"/>Yes <input type="radio" name="interest" value="No"/>No

              <Form.Control.Feedback type="invalid">
              Please choose correct status
              </Form.Control.Feedback>
    </div>
    <div class="form-group col-md-4">
      <Form.Label for="shortlist" class="required">Willing to appear for next process/interview?</Form.Label>
      <br/><input required type="radio" name="shortlist" value="Yes"/>Yes <input type="radio" name="shortlist" value="No"/>No

              <Form.Control.Feedback type="invalid">
              Please choose correct status
              </Form.Control.Feedback>
    </div>
  <div class="form-group col-md-5" >
      <label for="details" class="required">Willing to send your details to the resource seeker?</label>
      <br/><input required type="radio" name="details" value="Yes"/>Yes <input type="radio" name="details" value="No"/>No

      <Form.Control.Feedback type="invalid">
      Please choose correct status
      </Form.Control.Feedback>  
    </div>
    

    

  </Form.Row>
  <Form.Row>
  <div class="form-group col-md-6">
      <label for="inputState">Alternate Contact No.</label>
      <Form.Control type="text" pattern="[789][0-9]{9}" id="inputZip"/>
    </div>
    <div class="form-group col-md-6">
      <label for="inputZip">WhatsApp No</label>
      <input type="text" pattern="[789][0-9]{9}" class="form-control" id="wa"/>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="gridCheck" onChange={handleCheck}/>
        <label class="form-check-label" for="gridCheck">
           Same as alternate number
        </label>
    </div>
    </div>
    </Form.Row>
 
      <div class="form-group">
      <label for="inputAddress">Send your message to the Resource Seeker</label>
      <textarea rows='3' type="text" class="form-control" id="inputAddress" />
    </div>
    
  <Button className="alf_b1" variant="primary" type="submit">
                            Submit
                        </Button><br/><br/>
</Form></div>
       
    )
}

export default ConnectForm2
