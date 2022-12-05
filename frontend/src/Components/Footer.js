import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'

const Footer = () => {
  return (
    <>
     <div className="main-footer-div">
        <footer>
            <Container>
            <Row className="container">
                <div className="row justify-content-center">
                    <Col className="col item">
                        <ul>
                            <li><a href="#">Our story</a></li>
                            <li><a href="#">Contact Us</a></li>
                            <li><a href="#">Blog</a></li>
                        </ul>
                    </Col>
                    <Col className="col item">
                        <ul>
                            <li><a href="#">Refund policy</a></li>
                            <li><a href="#">Privacy policy</a></li>
                            <li><a href="#">Terms of service</a></li>
                        </ul>
                    </Col>
                    <Col className="col item">
                        <ul>
                            <li><a href="#">Birthday club</a></li>
                            <li><a href="#">Become an affiliate</a></li>
                            <li><a href="#">My account</a></li>
                        </ul>
                    </Col>
                    <Col className="col item social">
                        <p className="copyright">She Got It All © 2022</p>
                    </Col>
                </div>
            </Row>
            </Container>
        </footer>
    </div>
    </>
  )
}

export default Footer