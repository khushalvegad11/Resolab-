import {Card, ListGroup,Container, Button, Carousel, Image} from 'react-bootstrap';
import React, { Component } from 'react'
import Cookies from "universal-cookie";
import Form from '../People_doc_form';

export class Documents extends Component {
    constructor(props){
        super(props);
        this.setState={}
    }
    render() {
        var object= this.props.object
        const cookies= new Cookies()
        return (
            <Card style={{ width: '100%' }}>
        <Card.Body>
            <Card.Header as="h5">Documents</Card.Header>
            {object.user.id.toString()===cookies.get("id")?
            object.docs_urls_10?<h5><br/>Your documents are being verified.
            Once verified they will be visible on your card</h5>:
            object.docs_urls_9?
            <Form link={"modify_provider_people"} no={10} job={object.job} cardId={object.id}/>:
            object.docs_urls_8?
            <Form link={"modify_provider_people"} no={9} job={object.job} cardId={object.id}/>:
            object.docs_urls_7?
            <Form link={"modify_provider_people"} no={8} job={object.job} cardId={object.id}/>:
            object.docs_urls_6?
            <Form link={"modify_provider_people"} no={7} job={object.job} cardId={object.id}/>:
            object.docs_urls_5?
            <Form link={"modify_provider_people"} no={6} job={object.job} cardId={object.id}/>:
            object.docs_urls_4?
            <Form link={"modify_provider_people"} no={5} job={object.job} cardId={object.id}/>:
            object.docs_urls_3?
            <Form link={"modify_provider_people"} no={4}  job={object.job} cardId={object.id}/>:
            object.docs_urls_2?
            <Form link={"modify_provider_people"} no={3}  job={object.job} cardId={object.id}/>:
            object.docs_urls_1?
            <Form link={"modify_provider_people"} no={2}  job={object.job} cardId={object.id}/>:
     <Form link={"modify_provider_people"} no={1}  job={object.job} cardId={object.id}/>:null}
     <br/>
     <div class="table-responsive">

     <table class="table table-bordered table-hover" ><tr>
      <th>S.No</th>
      <th>Doc. Name</th>
      <th>Document</th>
      <th>Status</th>
    </tr>
    <tbody>
        {object.doc_name_1?
          object.docs_urls_1.split(',').map((image)=>
          <tr>
          <td>1</td>
          <td>{object.doc_name_1}  </td>
          <td><a href={image} download="image.jpg">View</a></td>
          {object.verified_1? <td>Verified ✓</td>: <td>Submitted</td>}
          </tr>
              ):null}
        {object.doc_name_2?
          object.docs_urls_2.split(',').map((image)=>
          <tr>
          <td>2</td>
          <td>{object.doc_name_2}  </td>
          <td><a href={image} download="image.jpg">View</a></td>
          {object.verified_2? <td>Verified ✓</td>: <td>Submitted</td>}
          </tr>
              ):null}
        {object.doc_name_3?
          object.docs_urls_3.split(',').map((image)=>
          <tr>
          <td>3</td>
          <td>{object.doc_name_3}  </td>
          <td><a href={image} download="image.jpg">View</a></td>
          {object.verified_3? <td>Verified ✓</td>: <td>Submitted</td>}
          </tr>
              ):null}
        {object.doc_name_4?
          object.docs_urls_4.split(',').map((image)=>
          <tr>
          <td>4</td>
          <td>{object.doc_name_4}  </td>
          <td><a href={image} download="image.jpg">View</a></td>
          {object.verified_4? <td>Verified ✓</td>: <td>Submitted</td>}
          </tr>
              ):null}
        {object.doc_name_5?
          object.docs_urls_5.split(',').map((image)=>
          <tr>
          <td>5</td>
          <td>{object.doc_name_5}  </td>
          <td><a href={image} download="image.jpg">View</a></td>
          {object.verified_5? <td>Verified ✓</td>: <td>Submitted</td>}
          </tr>
              ):null}
              </tbody> </table>   </div>

            
        </Card.Body>
        </Card>
        )
    }
}

export default Documents
