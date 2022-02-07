import React, { Component } from 'react'
import Cookies from 'universal-cookie';
import {Form ,Alert, Button} from 'react-bootstrap';
import axios from 'axios'
import LoadingElement from './Loader';

class Update_DP extends Component {
    constructor(props){
        super(props);
        this.state={
            alert:false,
            validated:false,
            pictures:null,
            loader:false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    setShow=event=>{
        this.setState({
            alert:false
        })
    }

    handlefileChange = event => {
        console.log(event);
        if (event.target.files[0].size > 4194304) {
            alert("File Size is too big!!");
            this.setState({
                pictures: null
            });
        } else {
            this.setState({
                pictures: event.target.files[0]
            });
        }
    }

    handleSubmit(event){
                //event.preventDefault();
                const form = event.currentTarget;
                const fd = new FormData();
                console.log(form, fd)
                console.log(fd);
                if (this.state.pictures===null)
                {
                   event.preventDefault();
                   event.stopPropagation();
                   this.setState({
                      alert:true
                   });
                }
                if (form.checkValidity() === false) {
                    console.log(this.state.pictures);
                    event.preventDefault();
                    event.stopPropagation();
                    this.setState({
                        validated:true
                    })
                }
                else{
                    event.preventDefault();
                    this.setState({
                        loader: true
                    })

                        axios.get('https://www.resolabindia.com/api/core/get_presigned_url',
                        {
                            params:{
                                "file_name":this.state.pictures.name
                            }
                        }).then((response)=>{
                            console.log("here",this.state.pictures.name )
                            const awsurl = response.data.url;
                            const awskey = response.data.fields.key;
                            console.log(awsurl, awskey)
                            fd.append('key', response.data.fields.key);
                            fd.append(
                                'file',
                                this.state.pictures,
                                this.state.pictures.name
                            );
                            fd.append('AWSAccessKeyId', response.data.fields.AWSAccessKeyId);
                            fd.append('policy', response.data.fields.policy);
                            fd.append('signature', response.data.fields.signature);
                            axios.post(response.data.url,fd,{
                                headers:{
                                    'Content-Type':undefined
                                }
                            })
                            .then(response=>{console.log(response)
                            {
                                const cookies= new Cookies();
                                const picurl=awsurl+awskey
                                console.log(cookies.get("name"))
                                var id= cookies.get("id")
                                axios.patch(`https://www.resolabindia.com/api/core/modify_user_profile/${cookies.get('id')}/`,
                                {
                                    user: cookies.get('user'),
                                    profile_pic_url: picurl
                                }
                                , {headers:{'Authorization': `Token ${cookies.get("token")}`},
                                })
                                .then(response=>{
                                    cookies.set("picture", response.data.profile_pic_url, {
                                        path: "/",
                                    });
                                    console.log("Sucess", response.data.profile_pic_url);
                                    //this.setState({loader:false})
                                    window.location.reload()
                                })
                                .catch((error)=>{
                                    console.log(error,picurl )
                                  })

                            }
                            })
                            .catch((error)=>{
                                this.setState({
                                    loader: false
                                });
                                alert(error);
                            })
                        })
                        .catch((error)=>{
                            this.setState({
                                loader: false
                            });
                            alert(error);
                        })
                }

                document.getElementById("form").reset();

            }


    render() {
        const cookies= new Cookies();
        if(this.state.loader===true)
        return <LoadingElement/>
        else
        return (
            <div>
            <Form style={{padding:"2%"}}  id="form" noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
            <Form.Row>
                                <Form.Label class="required" >
                                    Upload Your Profile Picture:
                                </Form.Label>

                                <Form.File>
                                <Form.File.Input
                                required
                                onChange={this.handlefileChange}
                                />
                                    </Form.File>

                            </Form.Row>
                        <br/>
                        {this.state.alert?
                        <Alert variant="danger" onClose={() => this.setShow()} dismissible>
                            <Alert.Heading>Please add your profile picture</Alert.Heading>
                        </Alert>
                        :null}
                        <Button className="details_b1" variant="primary" type="submit">
                        Submit
                    </Button>
        </Form>
            </div>
        )
    }
}

export default Update_DP
