import React,{Component} from 'react';
import Select from 'react-select';
import {Form,Col,Button,Container,Alert} from 'react-bootstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Cookies from "universal-cookie";
import LoadingElement from '../Loader';
import "../../style/css/Advisory.css";
import Footer from '../footer';
const cookies = new Cookies();


const options = [
  { value: 'Andaman and Nicobar Islands', label: 'Andaman and Nicobar Islands' },
  { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
  { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
  {
    value:"Assam",label:"Assam"
  },
  {
    value:"Bihar",label:"Bihar"
  },
  {
    value:"Chandigarh",label:"Chandigarh"
  },
  {
    value:"Chhattisgarh",label:"Chhattisgarh"
  },
  {
    value:"Dadra and Nagar Haveli",label:"Dadra and Nagar Haveli"
  },
  {
    value:"Daman and Diu",label:"Daman and Diu"
  },
  {
    value:"Delhi",label:"Delhi"
  },
  {
    value:"Goa",label:"Goa"
  },
  {
    value:"Gujarat",label:"Gujarat"
  },
  {
    value:"Haryana",label:"Haryana"
  },
  {
    value:"Himachal Pradesh",label:"Himachal Pradesh"
  },
  {
    value:"Jammu and Kashmir",label:"Jammu and Kashmir"
  },
  {
    value:"Jharkhand",label:"Jharkhand"
  },
  {
    value:"Karnataka",label:"Karnataka"
  },
  {
    value:"Kerala",label:"Kerala"
  },
  {
    value:"Ladakh",label:"Ladakh"
  },
  {
    value:"Lakshadweep",label:"Lakshadweep"
  },
  {
    value:"Madhya Pradesh",label:"Madhya Pradesh"
  },
  {
    value:"Maharashtra",label:"Maharashtra"
  },
  {
    value:"Manipur",label:"Manipur"
  },
  {
    value:"Meghalaya",label:"Meghalaya"
  },
  {
    value:"Mizoram",label:"Mizoram"
  },
  {
    value:"Nagaland",label:"Nagaland"
  },
  {
    value:"Odisha",label:"Odisha"
  },
  {
    value:"Puducherry",label:"Puducherry"
  },
  {
    value:"Punjab",label:"Punjab"
  },
  {
    value:"Rajasthan",label:"Rajasthan"
  },
  {
    value:"Sikkim",label:"Sikkim"
  },
  {
    value:"Tamil Nadu",label:"Tamil Nadu"
  },
  {
    value:"Telangana",label:"Telangana"
  },
  {
    value:"Tripura",label:"Tripura"
  },
  {
    value:"Uttar Pradesh",label:"Uttar Pradesh"
  },
  {
    value:"Uttarakhand",label:"Uttarakhand"
  },
  {
    value:"West Bengal",label:"West Bengal"
  },

]
class AdvisoryProviderForm extends Component {
    constructor(props){
        super(props);
        this.state={
            org_name: "",
            legal_status:"",
            pan_card_no:"",
            gstno:"",
            name:"",
            phoneno:"",
            address:"",
            service:"",
            presence:[],
            photourl:"",
            file1:null,
            file2:null,
            files:[],
            userID: cookies.get("token"),
            validated:false,
            loader:false,
            alert:false,
            defaultInput:false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    fileChange1 = event => {
        console.log(event);
        if(event.target.files[0].size>4194304)
        {
            alert("File Size is too big!!");
            this.setState({
                file1: null
            });
        }
        else{
            this.setState({
                file1: event.target.files[0]
            });
        }
    }
    fileChange2 = event => {
        if (event.target.files[0].size > 4194304) {
            alert("File Size is too big!!");
            this.setState({
                file2: null
            });
        } else {
            this.setState({
                file2: event.target.files[0]
            });
        }
    }


        checkDuplicate(name){
          for(var i=0;i<this.state.files.length;i++)
          {
            console.log(this.state.files[i].name+" "+name);
            if(this.state.files[i].name===name)return true;
          }
          return false;
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





    handleLegalStatusChange = event =>{
        this.setState({
            legal_status:event.target.value
        });
    }
    handleOrgNameChange = event =>{
        this.setState({
            org_name:event.target.value
        })
    }
    handlePanCardNoChange = event =>{
        this.setState({
            pan_card_no:event.target.value
        });
    }
    handleGSTNoChange = event =>{
        this.setState({
            gstno:event.target.value
        });
    }
    handleNameChange = event =>{
        this.setState({
            name:event.target.value
        });
    }
    handlePhoneNoChange = event =>{
        this.setState({
            phoneno:event.target.value
        });
    }
    handleAddressChange = event =>{
        this.setState({
            address:event.target.value
        });
    }
    handleServiceChange = event =>{

        console.log(event.target.value);
        this.setState({
            service:event.target.value
        });
    }
    handlePresenceChange = event =>{
      if(event){
        const states = event.map((option)=>option.value)
        this.setState({
          presence:states
        });
    }
      else{
        const states = "";
        this.setState({
          presence:states
        });
    }
    }
    handlePhotoURLChange = event =>{
        this.setState({
            photourl:event.target.value
        });
    }
    setShow = event => {
        this.setState({
            alert: false
        })
    }

    async handleSubmit(event){
        console.log(event);
        const form = event.currentTarget;
        console.log(form.checkValidity());

        //const fd1 = new FormData();
        //const fd2 = new FormData();

        if(this.state.presence.length===0){
          event.preventDefault();
          event.stopPropagation();
          this.setState({
            alert_for: "Geo Presence"
          })
          alert("Please select at least one state under geo presence");
        }

        else if (this.state.files.length<4) {
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

              console.log(this.state.files);


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
                      //var awsurl2;
                      //var awskey2;
                      fd1.append('key', response1.data.fields.key);
                      fd1.append(
                          'file',
                          this.state.files[i],
                          this.state.files[i].name
                      );
                      fd1.append('AWSAccessKeyId', response1.data.fields.AWSAccessKeyId);
                      fd1.append('policy', response1.data.fields.policy);
                      fd1.append('signature', response1.data.fields.signature);
                      axios.post(response1.data.url, fd1, {
                          headers: {
                              'Content-Type': undefined
                          }
                      })
                    }

                    const geo_presence = this.state.presence.join()
                      const body = {
                          user: cookies.get("addedparam"),
                          industry: cookies.get("industry"),
                          job:this.state.service,
                          org_name:this.state.org_name,
                          legal_status:this.state.legal_status,
                          pan_card_no:this.state.pan_card_no,
                          gst_no:this.state.gstno?this.state.gstno:"NA",
                          contact_name:this.state.name,
                          contact_phone_no:"+91"+this.state.phoneno,
                          address:this.state.address,
                          geo_presence:geo_presence,
                          pic_urls: picsurl,
                      };

                         axios.post('https://www.resolabindia.com/api/core/create_provider_adalserv/', body, {
                              headers: {
                                  'Authorization': `Token ${cookies.get("token")}`
                              },
                          })
                          .then((responseJson)=>{
                              //console the response
                              console.log('response', responseJson);
                              })
                          .then((response) => {
                                        this.setState({
                                            user: true,
                                        })
                                        alert("Successful!!");
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
        if(this.state.user===true)
        {
            return(
                <h2>Go to <Link to="/">Home Page</Link></h2>
            );
        }
        else if(this.state.loader===true)
        {
            return(
                <LoadingElement/>
            );
        }
        else{
            return (
              <div>
                <Container fluid className="adf" style = {{backgroundColor:"aliceblue"}}>
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                <br />
                <h3>Resource Card</h3>
                <h4>Enter your details</h4>
                    <Form.Group>
                        <br />
                        <Form.Row>
                            <Form.Label column="lg" lg={4}>
                                Organisation Name:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                optional
                                type="text"
                                placeholder="Organisation Name"
                                value={this.state.org_name}
                                onChange={this.handleOrgNameChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Organisation Name
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label className="required" column="lg" lg={4}>
                                Legal Status:
                            </Form.Label>
                            <Col>
                            <Form.Control
                            required
                            as="Select"
                            placeholder="Legal Status"
                            value={this.state.legal_status}
                            onChange={this.handleLegalStatusChange}
                            >
                                <option selected value="">Select :</option>
                                <option>Propritorship</option>
                                <option>Partnership</option>
                                <option>LLP</option>
                                <option>Company</option>
                                <option>Others</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Please choose correct status
                            </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label className="required" column="lg" lg={4}>
                                PAN Details:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                required
                                type="text"
                                placeholder="PAN Card Number"
                                value={this.state.pan_card_no}
                                onChange={this.handlePanCardNoChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Pan Card Number
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label column="lg" lg={4}>
                                GST Details:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                optional
                                type="text"
                                placeholder="GST Number"
                                value={this.state.gstno}
                                onChange={this.handleGSTNoChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct GST Number
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label className="required" column="lg" lg={4}>
                                Contact Detail 1:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                required
                                type="text"
                                placeholder="Contact Person Name"
                                value={this.state.name}
                                onChange={this.handleNameChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Name
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label className="required" column="lg" lg={4}>
                                Contact Detail 2:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                required
                                type="text"
                                placeholder="Phone Number"
                                value={this.state.phoneno}
                                onChange={this.handlePhoneNoChange}
                                pattern="[0-9]{10}"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Phone Number
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label className="required" column="lg" lg={4}>
                                Contact Detail 3:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                required
                                type="text"
                                placeholder="Address"
                                value={this.state.address}
                                onChange={this.handleAddressChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Write Correct Address
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label className="required" column="lg" lg={4}>
                                Service Offered:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                    required
                                    as="Select"
                                    placeholder="Service"
                                    value={this.state.service}
                                    onChange={this.handleServiceChange}
                                    >
                                    <option selected value="">Select :</option>
                                    <option>Proposal Development</option>
                                    <option>Content provider</option>
                                    <option>Content Translator</option>
                                    <option value="Others in Advisory">Others</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Choose Correct Service
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        {
                          /*
                          this.state.service==="Others in Advisory"?
                          <>

                          <br/>
                          <Form.Row>
                              <Form.Label className="required" column="lg" lg={4}>
                                  Write other service name:
                              </Form.Label>
                              <Col>
                                  <Form.Control
                                  required
                                  type="text"
                                  placeholder="Service"
                                  value={this.state.other_in_service}
                                  onChange={this.handleOtherServiceChange}
                                  />
                              </Col>
                          </Form.Row>
                          </>
                          :null
                          */
                        }
                        <br />
                        <br />
                        <Form.Row>
                            <Form.Label className="required" column="lg" lg={4}>
                                Geopgraphical Presence:
                            </Form.Label>
                            <Col>
                            <Select
                            isMulti
                             options={options}
                             onChange = {this.handlePresenceChange} />
                            </Col>
                        </Form.Row>
                        <br/>
                        {this.state.alert?
                        <Alert variant="danger" onClose={() => this.setShow()} dismissible>
                            <Alert.Heading>Please add at least four pictures</Alert.Heading>
                        </Alert>
                        :null}
                        <br/>
                        <Form.Row>
                            <Form.Label className="required" column="lg" lg={4}>
                                Upload Photographs:
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
                        <br />
                    </Form.Group>
                        <Button className="adf_b1" variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>

                </Container>
                <div style={{"bottom": "0", "left":"0", "right": "0"}}>
                <Footer />
                </div>
                </div>

            );
        }
    }
}
export default AdvisoryProviderForm;
