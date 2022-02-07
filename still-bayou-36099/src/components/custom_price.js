import axios from 'axios'
import React, { useEffect, useState } from 'react'

function PostForm() {

    const formapi = "https://www.resolabindia.com/api/verification/custom-price-form/"
    const [name , setName] = useState("")
    const [email , setEmail] = useState("")
    const [contact , setContact] = useState("")
    const [message , setMessage] = useState("")

    function HandleSubmit(){
        let data = {name , email , contact , message}
        fetch(formapi , {
            method:"POST",
            headers:{
                'Accept':'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        }).then((res)=>{
            console.warn(res)
        })
    }


    return (
        <div className="col-md-3 mx-auto m-2 shadow p-2 border solid">
            <h5 style={{ color: "#4121b3", alignContent: "left" }} className="border border-success p-2 m-2"><span style={{}}>LOOKING FOR CUSTOMIZE SERVICES?</span>
                <br />
                <br /> <span style={{ color: "#a544cd" }}>
                    <h6>Let us know your requirement. Our team will get back with a customised pricing quote at the earliest.</h6>
                </span></h5>
            <br />
            <h4>Request for custom price</h4>
            <hr />
            {

            }
            <form>
                <div className="form-group">
                    <input type="text" onChange={(e) => {setName(e.target.value)}} value={name} id="name" className="form-control" placeholder="Enter name" required />
                </div>
                <div className="form-group">
                    <input value={email} onChange={(e) => {setEmail(e.target.value)}} type="email" id="email" className="form-control" placeholder="Enter email" required />
                </div>
                <div className="form-group">
                    <input value={contact} onChange={(e) => {setContact(e.target.value)}} id="contact_number" type="number" min="0" className="form-control" placeholder="Contact Number" required />
                </div>
                <div className="form-group">
                    <textarea value={message} onChange={(e) => {setMessage(e.target.value)}} id="message" className="form-control" placeholder="Tell us more" required />
                </div>
                <hr />
                <div className="form-group">
                    <button type="submit" onClick={HandleSubmit} className="btn btn-success">Submit</button>
                </div>
            </form>
        </div>
    )
}


export default PostForm