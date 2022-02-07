import React,{Component} from 'react';
import {Form,Col,Button,Container,Alert} from 'react-bootstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Cookies from "universal-cookie";
import LoadingElement from '../Loader';
import Footer from "../footer";
import "../../style/css/Infra.css";

const cookies = new Cookies();
class InfraProviderForm extends Component {
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
            infra_available:"",
            infra_detail:"",
            area:0,
            no_of_halls:0,
            total_open_area:0,
            electricity:false,
            power_backup:false,
            water:false,
            basic_facility:"",
            no_of_toilet:0,
            no_of_bathroom:0,
            state:"",
            district:"",
            files:[],
            userID: cookies.get("token"),
            validated:false,
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
    handleInfraAvailabilityChange = event =>{
        this.setState({
            infra_available: event.target.value
        })
    }
    handleInfraDetailChange = event =>{
        this.setState({
            infra_detail:event.target.value
        })
    }
    handleAreaChange = event =>{
        this.setState({
            area:event.target.value
        })
    }
    handleHallsChange = event =>{
        this.setState({
            no_of_halls:event.target.value
        })
    }
    handleBasicFacilityChange = event =>{
      const facility = "Electricity : "+(this.state.electricity?"Yes\n":"No\n")+"Power Backup : "+(this.state.power_backup?"Yes\n":"No\n")+"Water : "+(this.state.water?"Yes":"No");
      console.log(facility);

        this.setState({
          basic_facility:facility
        })
    }
    handleElectricityChange = event =>
    {
      console.log(event.target.checked);
      this.setState({
        electricity:event.target.checked
      })
    }
    handlePowerChange = event =>
    {
      console.log(event.target.checked);
      this.setState({
        power_backup:event.target.checked
      })
    }
    handleWaterChange = event =>
    {
      console.log(event.target.checked);
      this.setState({
        water:event.target.checked
      })
    }
    handleAllFacilityChange = event =>
    {
      console.log(event.target.checked);
      this.setState({
        electricity:event.target.checked,
        power_backup:event.target.checked,
        water:event.target.checked,
      })
  }
    handleToiletChange = event =>{
        this.setState({
            no_of_toilet:event.target.value
        })
    }
    handleBathroomChange = event =>{
        this.setState({
            no_of_bathroom:event.target.value
        })
    }
    handleStateChange = event =>{
        this.setState({
            state:event.target.value
        })
    }
    handleDistrictChange = event =>{
        this.setState({
            district:event.target.value
        })
    }
    handleOpenAreaChange = event =>{
        this.setState({
            total_open_area:event.target.value
        })
    }
    setShow = event => {
        this.setState({
            alert: false
        })
    }
  async handleSubmit(event){
        this.handleBasicFacilityChange();
        console.log("basic facility");
        console.log(this.state.basic_facility);
        const form = event.currentTarget;
        console.log(form.checkValidity());

        // const fd1 = new FormData();
        // const fd2 = new FormData();
        // const fd3 = new FormData();
        // const fd4 = new FormData();
        if (this.state.files.length<4) {
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
          console.log("successful222");
          fd1.append('AWSAccessKeyId', response1.data.fields.AWSAccessKeyId);
          fd1.append('policy', response1.data.fields.policy);
          fd1.append('signature', response1.data.fields.signature);
          axios.post(response1.data.url, fd1, {
              headers: {
                  'Content-Type': undefined
              }
          })
        }

    const body = {
        user: cookies.get("addedparam"),
        industry: cookies.get("industry"),
        job: this.state.infra_available,
        org_name: this.state.org_name,
        legal_status: this.state.legal_status,
        pan_card_no: this.state.pan_card_no,
        gst_no: this.state.gstno?this.state.gstno:"NA",
        contact_name: this.state.name,
        contact_phone_no: "+91"+this.state.phoneno,
        address: this.state.address,
        detail:this.state.infra_detail,
        total_area:this.state.area,
        no_halls:this.state.no_of_halls,
        total_open_area:this.state.total_open_area,
        electricity:false,
        power_backup:false,
        water:false,
        basic_facility:this.state.basic_facility,
        no_toilets:this.state.no_of_toilet,
        no_bathrooms:this.state.no_of_bathroom,
        location_state:this.state.state,
        location_district:this.state.district,
        pic_urls: "",
    };

            axios.post('https://www.resolabindia.com/api/core/create_provider_infraserv/', body, {
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
                <k1>
                <LoadingElement/>
                <p>This may take few minutes. Please Wait!!</p>
                </k1>
            );
        }
        else{
            return (
              <div>
                <Container fluid className="inf" style ={{backgroundColor:"aliceblue"}}>
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                <br />
                <h3>Resource Card</h3>
                <h4>Enter your details.</h4>
                    <Form.Group>
                    <br />
                        <Form.Row>
                            <Form.Label className="required" column="lg" lg={4}>
                                Organisation Name:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Organisation Name"
                                    value={this.state.org_name}
                                    onChange={this.handleOrgNameChange}
                                    />
                                <Form.Control.Feedback type="invalid">
                                    Write correct details
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
                                type="number"
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
                                Infrastruture Availability:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                    required
                                    as="Select"
                                    placeholder="Infrastructure Availability"
                                    value={this.state.infra_available}
                                    onChange={this.handleInfraAvailabilityChange}
                                    >
                                    <option selected value="">Select:</option>
                                    <option>Training Centre</option>
                                    <option>Hostel</option>
                                    <option value="Others in Infra">Others</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Choose Correct infrastructure
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label className="required" column="lg" lg={4}>
                                Infrastructure Detail:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Infrastructure Detail"
                                    value={this.state.infra_detail}
                                    onChange={this.handleInfraDetailChange}
                                    />
                                <Form.Control.Feedback type="invalid">
                                    Write correct details
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br/>
                        <Form.Row>
                            <Form.Label className="required" column="lg" lg={4}>
                                Total Area(Sq.Ft.):
                            </Form.Label>
                            <Col>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Total Area"
                                    value={this.state.area}
                                    onChange={this.handleAreaChange}
                                    />
                                <Form.Control.Feedback type="invalid">
                                    Write correct area
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br/>
                        <Form.Row>
                            <Form.Label className="required" column="lg" lg={4}>
                                Number of Halls:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Number of Halls"
                                    value={this.state.no_of_halls}
                                    onChange={this.handleHallsChange}
                                    />
                                <Form.Control.Feedback type="invalid">
                                    Write correct number of halls
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br/>
                        <Form.Row>
                            <Form.Label className="required" column="lg" lg={4}>
                                Total Open Area (Sq.Ft.):
                            </Form.Label>
                            <Col>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Total Open Area"
                                    value={this.state.total_open_area}
                                    onChange={this.handleOpenAreaChange}
                                    />
                                <Form.Control.Feedback type="invalid">
                                    Write correct open area
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br/>


                        <Form.Row>
                            <Form.Label className="required" column="lg" lg={4}>
                                Basic Facility Available:
                            </Form.Label>
                            <div class="form-check row">
                  <input class="form-check-input" type="checkbox" checked={this.state.electricity} onChange={this.handleElectricityChange} id="defaultCheck1"/>
                  <label class="form-check-label" for="defaultCheck1">
                    Electricity
                  </label>
                </div>
                <div class="form-check row">
                  <input class="form-check-input" type="checkbox" checked={this.state.power_backup} onChange={this.handlePowerChange} id="defaultCheck1"/>
                  <label class="form-check-label" for="defaultCheck1">
                    Power Backup
                  </label>
                </div>

                <div class="form-check row">
                  <input class="form-check-input" type="checkbox" checked={this.state.water} onChange={this.handleWaterChange} id="defaultCheck1"/>
                  <label class="form-check-label" for="defaultCheck1">
                    Water
                  </label>
                  </div>

                  <div class="form-check row">
                    <input class="form-check-input" type="checkbox" checked={this.state.power_backup&&this.state.electricity&&this.state.water} onChange={this.handleAllFacilityChange} id="defaultCheck1"/>
                    <label class="form-check-label" for="defaultCheck1">
                      All
                    </label>
                  </div>
                        </Form.Row>
                        <br/>
                        <Form.Row>
                            <Form.Label className="required" column="lg" lg={4}>
                                Number of Toilet:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Number of Toilet"
                                    value={this.state.no_of_toilet}
                                    onChange={this.handleToiletChange}
                                    />
                                <Form.Control.Feedback type="invalid">
                                    Write correct number of Toilets
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br/>
                        <Form.Row>
                            <Form.Label className="required" column="lg" lg={4}>
                                Number of Bathrooms:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Bathrooms"
                                    value={this.state.no_of_bathroom}
                                    onChange={this.handleBathroomChange}
                                    />
                                <Form.Control.Feedback type="invalid">
                                    Write correct number of Bathrooms
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br />
                        <Form.Row>
                            <Form.Label className="required" column="lg" lg={4}>
                                State:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                required
                                as="Select"
                                placeholder="State"
                                value={this.state.state}
                                onChange={this.handleStateChange}
                                >
                                <option selected value="">Select :</option>
                                <option>Andaman and Nicobar Islands</option>
                                <option>Andhra Pradesh</option>
                                <option>Arunachal Pradesh</option>
                                <option>Assam</option>
                                <option>Bihar</option>
                                <option>Chandigarh</option>
                                <option>Chhattisgarh</option>
                                <option>Dadra and Nagar Haveli</option>
                                <option>Daman and Diu</option>
                                <option>Delhi</option>
                                <option>Goa</option>
                                <option>Gujarat</option>
                                <option>Haryana</option>
                                <option>Himachal Pradesh</option>
                                <option>Jammu and Kashmir</option>
                                <option>Jharkhand</option>
                                <option>Karnataka</option>
                                <option>Kerala</option>
                                <option>Ladakh</option>
                                <option>Lakshadweep</option>
                                <option>Madhya Pradesh</option>
                                <option>Maharashtra</option>
                                <option>Manipur</option>
                                <option>Meghalaya</option>
                                <option>Mizoram</option>
                                <option>Nagaland</option>
                                <option>Odisha</option>
                                <option>Puducherry</option>
                                <option>Punjab</option>
                                <option>Rajasthan</option>
                                <option>Sikkim</option>
                                <option>Tamil Nadu</option>
                                <option>Telangana</option>
                                <option>Tripura</option>
                                <option>Uttar Pradesh</option>
                                <option>Uttarakhand</option>
                                <option>West Bengal</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Choose Correct State
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br/>
                        <Form.Row>
                            <Form.Label className="required" column="lg" lg={4}>
                                District:
                            </Form.Label>
                            <Col>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="District"
                                    value={this.state.district}
                                    onChange={this.handleDistrictChange}
                                    />
                                <Form.Control.Feedback type="invalid">
                                    Write correct District
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                        <br/>
                        {this.state.alert?
                        <Alert variant="danger" onClose={() => this.setShow()} dismissible>
                            <Alert.Heading>Please add pictures</Alert.Heading>
                        </Alert>
                        :null}
                        <br/>
                        <Form.Row>
                            <Form.Label className="required" column="lg" lg={4}>
                                Upload Photographs (at least 4):
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
                    <Button className="inf_b1" variant="primary" type="submit">
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
export default InfraProviderForm;
