import React, { useLayoutEffect, useState } from "react";
import { Form, Button, Container, Row, Col, InputGroup } from "react-bootstrap";
import "./Career.css";
import Header from "../../compomnents/Header/Header";
import one from "../../assets/image/one.png";
import two from "../../assets/image/two.png";
import mechanic from "../../assets/image/mechanic-reparing.png";
import three from "../../assets/image/three.png";
import four from "../../assets/image/four.png";
import Footer from "../../compomnents/Footer/Footer";
import Aboutstory from "../../compomnents/Aboutstory/Aboutstory";

const Career = () => {
  const [date, setDate] = useState("");
  return (
    <>
      <div>
        <Header />

        <div className="values_wrp">
          <Container>
            <div className="make_easy-title carrer_wrap">
              <h2>Career</h2>
              <p>Our Values</p>
            </div>
            <Row className="justify-content-center align-items-center"> 
              <Col lg={3} md={4} sm={6} Col ={12}>
                <div className="values_list">
                  <div className="service_wrp">
                    <img src={one} alt="" />
                  </div>

                  <div className="serve_list">
                    <h5>Serve</h5>

                    <p>We put our customers and people first</p>
                  </div>
                </div>
              </Col>

              <Col lg={3} md={4} sm={6} Col ={12}>
                <div className="values_list">
                  <div className="service_wrp">
                    <img src={two} alt="" />
                  </div>

                  <div className="serve_list">
                    <h5>Inclusion</h5>

                    <p>We open our doors to everyone</p>
                  </div>
                </div>
              </Col>

              <Col lg={3} md={4} sm={6} Col ={12}>
                <div className="values_list">
                  <div className="service_wrp">
                    <img src={three} alt="" />
                  </div>

                  <div className="serve_list">
                    <h5>Community</h5>

                    <p>We are good neighbors</p>
                  </div>
                </div>
              </Col>

              <Col lg={3} md={4} sm={6} Col ={12}>
                <div className="values_list">
                  <div className="service_wrp">
                    <img src={four} alt="" />
                  </div>

                  <div className="serve_list">
                    <h5>Family</h5>

                    <p>We get better together</p>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
      <Col lg={12}>
      <div className="values_wrp">
          <div className="join_wrp">
            <h4>Join us</h4>
            <p>Apply to us by sending CVs to</p>
            <span>
              <a>resume@del.in.mcd.com</a>
            </span>
          </div>
          <Container>
            <Row></Row>
          </Container>
        </div>
      </Col>
    </Row>
          </Container>
        </div>
        <Aboutstory />
         <div className="make_easy_sec special_offer ">
          <Container>
            <Row className="align-items-center">
              <Col lg={6} className="order-xl-1 order-lg-1 order-2">
              <div className="make_easy-title">
                <h2>Special Offers & News</h2>
                <p>Subscribe now for news, promotions and more delivered right to your inbox.</p>
                <div className="specail-offer_search_bar">
                  <Form>
                    <Form.Control type="email" placeholder="Enter email" />
                    <button>Subscribe</button>
                  </Form>
                  
                  
                </div>
              </div>
              </Col>
              <Col lg={6} className="order-xl-2 order-lg-2 order-1">
              <div className="mechanic_img">
              <img src={mechanic} alt="" />
              </div>
              </Col>
            </Row>
          </Container>
      
         </div>
          
        <Footer />
      </div>
    </>
  );
};

export default Career;
