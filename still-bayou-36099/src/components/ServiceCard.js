import React,{Component} from 'react';
import {Card,Container, Row, Col, Jumbotron, Image, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Cookies from "universal-cookie";
import "../style/css/ServiceCard.css";

import nocompany from "../images/nocompany.jpg";

class ServiceCard extends Component{
    constructor(){
        super();
        this.state={

        }
    }
    render()
    {
        return(
            <>
            <br/>
            <Container fluid>
            <Card className="card-template-deck">
                <Row>
                <Col className="img-parent">
                    <Card.Img className="profile-pic" src={nocompany} />
                </Col>
                <Col>
                    <Card.Body>
                        <Card.Title className="ctext">Card Title</Card.Title>
                        <Card.Subtitle className="ctext"> The Only Card Subtitle </Card.Subtitle>
                        <Card.Subtitle className="ctext"> The Only Card Subtitle </Card.Subtitle>
                        <Card.Text className="ctext">Always specify both the height and width attributes
                        for images
                        </Card.Text>
                        <hr/>
                        <Button type="button" variant="outline-success" href="#"> Details </Button>
                    </Card.Body>
                </Col>
                </Row>
            </Card>
            </Container>
            </>
        );
    }
}

export default ServiceCard;