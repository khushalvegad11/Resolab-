import React, { Component } from 'react'
import {Form,Container, Col ,Alert, Button} from 'react-bootstrap';
import axios from 'axios'
import Cookies from "universal-cookie";
import {Link} from 'react-router-dom';
import LoadingElement from './Loader';


const cookies = new Cookies();
class Client_Form extends Component {
    constructor(props){
        super(props);
        this.state={
            files:[],
            client_name:"",
            userID: cookies.get("token"),
            alert:false,
            loader:false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    checkDuplicate(name){
      for(var i=0;i<this.state.files.length;i++)
      {
        console.log(this.state.files[i].name+" "+name);
        if(this.state.files[i].name===name)return true;
      }
      return false;
    }

    handleClientName=e=>{
        this.setState({client_name: e.target.value})
    }

    addfiles = event =>{
      event.preventDefault()
      if(event.target.files.length===0)
      {
        console.log(event.target.files.length+" = 0");
        this.state.files.length=this.state.files.length-1;
        return;
      }
      if (event.target.files[0].size > 4194304) {
          alert("File Size is too big!!");

      }
      else{
        console.log(event.target.files.length);
        var tempfiles=[];
        tempfiles=[...event.target.files];

        tempfiles=tempfiles.filter((file)=>this.checkDuplicate(file.name)===false);
        console.log(tempfiles);
          this.setState({
              files: [...this.state.files,...tempfiles]
          },()=>{
            console.log(this.state.files);
            console.log("files size "+this.state.files.length);
          });


      }
    }

    Delete(name) {
   this.setState((prevState) => ({
     files: prevState.files.filter((file) => file.name !== name)
   }));
   console.log(this.state.files.name);
 }

    setShow = event => {
        this.setState({
            alert: false
        })
    }
  async handleSubmit(event){
        const form = event.currentTarget;
        console.log(form.checkValidity());

        if (this.state.files.length<1) {
            event.preventDefault();
            event.stopPropagation();
            this.setState({
                alert: true
            });
        }
        else if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            this.setState({
                validated: true
            })
        }
        else{
          event.preventDefault();
          this.setState({
              loader:true
          })
          var picsurl="";
          for(var i=0;i<this.state.files.length;i++)
          {
            const fd1 = new FormData();
            const response1 = await axios.get('https://www.resolabindia.com/api/core/get_presigned_url', {
                params: {
                    "file_name": cookies.get("token") + `al1${i}` + this.state.files[i].name
                }

            })

            console.log("successful");
          var awsurl1 = response1.data.url;
          var awskey1 = response1.data.fields.key;
          if(picsurl==="")
          {
            picsurl= awsurl1 + awskey1;
          }
          else{
            picsurl=picsurl+","+ awsurl1 + awskey1;
          }
        //   var awsurl2;
        //   var awskey2;
          fd1.append('key', response1.data.fields.key);
          fd1.append(
              'file',
              this.state.files[i],
              this.state.files[i].name
          );
          console.log(picsurl);
          fd1.append('AWSAccessKeyId', response1.data.fields.AWSAccessKeyId);
          fd1.append('policy', response1.data.fields.policy);
          fd1.append('signature', response1.data.fields.signature);
          axios.post(response1.data.url, fd1, {
              headers: {
                  'Content-Type': undefined
              }
          })
        }
    var body;
    if(this.props.no==="1")
    body = {
        user: cookies.get("addedparam"),
        docs_urls_1:picsurl,
        client_name_1:this.state.client_name,
        job:this.props.job
    };
    else if(this.props.no==="2")
    body = {
        user: cookies.get("addedparam"),
        docs_urls_2:picsurl,
        client_name_2:this.state.client_name,
        job:this.props.job
    };
    else if(this.props.no==="3")
    body = {
        user: cookies.get("addedparam"),
        docs_urls_3:picsurl,
        client_name_3:this.state.client_name,
        job:this.props.job
    };
    else if(this.props.no==="4")
    body = {
        user: cookies.get("addedparam"),
        docs_urls_4:picsurl,
        client_name_4:this.state.client_name,
        job:this.props.job
    };
    else
    body = {
        user: cookies.get("addedparam"),
        docs_urls_5:picsurl,
        client_name_5:this.state.client_name,
        job:this.props.job
    };
    console.log(body,this.props.job)
                var k= this.props.cardId
                console.log(this.props)
             axios.patch(`https://www.resolabindia.com/api/core/${this.props.link}/${k}/`, body, {
                     headers: {
                         'Authorization': `Token ${cookies.get("token")}`
                     },
                 })
                 .then((response)=>{
                     //console the response
                     console.log('response', response);
                     })
                 .then((response) => {
                               this.setState({
                                   loader: false,
                               })
                               alert("Successful!!");
                               window.location.reload()
                           }, (error) => {
                             console.log(error.response.data);
                               this.setState({
                                   loader: false
                               })
                               var errorMessage="";
                               for(var variable in error.response.data)
                               {
                                 errorMessage=errorMessage+"\n"+error.response.data[variable];
                               }
                               console.log(errorMessage);
                               alert(errorMessage);
                               console.log("Token " + cookies.get("token"));
                           })
                   .catch((error) => {
                       console.log(error);
                       this.setState({
                           loader: false
                       })
                        alert(error + " Please Retry");
                   });


}

}

    render(){
        if(this.state.loader===true)
        {
            return(
                <k1>
                <LoadingElement/>
                <p>This may take few minutes. Please Wait!!</p>
                </k1>
            );
        }
        else{
            return (
                <div class="row" style={{border:'1px solid grey'}}>
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                    <Form.Group>
                    <h5><br/>{this.props.no} &nbsp; Fill Details about Clients served</h5><br/>

                    <Form.Row>
                            <Form.Label className="Label required" column="lg" lg={5} style={{fontSize:"15px"}}>
                            Client Name:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                required
                                type="text"
                                placeholder="Client Name"
                                value={this.state.client_name}
                                onChange={this.handleClientName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Name
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>


                        {this.state.alert?
                        <Alert variant="danger" onClose={() => this.setShow()} dismissible>
                            <Alert.Heading>Please add pictures</Alert.Heading>
                        </Alert>
                        :null}

                        <Form.Row>
                        <Form.Label className="Label required" column="lg" lg={5} style={{fontSize:"15px"}}>
                            Supporting Documnent Images:<br/>
                                <small>(multiple)</small>

                            </Form.Label>
                            <Col>

                            {
                              this.state.files.map((file,i)=>
                              <tr key={i}>
                                - <th style={{ textAlign: 'left' }}>{file.name} : </th>
                                <th>
                                &nbsp;
                                  <button onClick={() => this.Delete(file.name)}>X</button>
                                </th>
                              </tr>
                              )
                            }
                            <Form.File>
                                <Form.File.Input
                                optional
                                multiple
                                value=""
                                onChange={this.addfiles}
                                />

                            </Form.File>
                            <Form.Control.Feedback type="invalid">
                                Upload photos
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Row>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button><br/><br/>
                </Form></div>

            );
        }
    }
}

export default Client_Form
