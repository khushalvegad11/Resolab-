import React from 'react';
import { Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//import Footer from './footer'

function ErrorPage(){
    return (
        <div class="main-title">
            <Container fluid className="bg-white" style={{ "width":"70%" }}><br/>
            <h2>Thank you for visit</h2>
            <p>We are working hard for you, please visit after some time.</p>
            <p>You can either return to the previous page, visit our homepage or contact our support team.</p>
            <p>
                <Link to="/"><Button variant="primary">Home Page</Button></Link> {' '}
                <Link to="/contact"><Button variant="primary">Contact Us</Button></Link>
            </p><br/>

        </Container>
        </div>
    );
}

export default ErrorPage;
