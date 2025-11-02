import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Franchise.css";
import Header from "../../compomnents/Header/Header";
import { Col, Container, Row, Form } from "react-bootstrap";
import Footer from "../../compomnents/Footer/Footer";
import PIN from "../../assets/image/pin.png";
import DETAILLING from "../../assets/image/Detailing-one.png";
import CAR25 from "../../assets/image/Car25.png";
import PHONE from "../../assets/image/phone.png";
import MAIL from "../../assets/image/mail.svg";
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import FACEBOOK from "../../assets/image/facbook.png";
import TWITER from "../../assets/image/twiter.png";
import INSTAGRAM from "../../assets/image/instagram.png";
import LINKDIN from "../../assets/image/linkedin.png";
import FRANCHISE from "../../assets/image/Franchise.png";



export default function Franchise() {
  return (
    <>
      <div>
        <Header />
        <div className="make_easy_sec awrad_winnig">
          <Container>
            <Row>
              <Col lg={5} md={6} sm={12} className="order-xl-1 order-lg-1 order-md-1 order-2">
                <div className="make_easy-title">
                  <h2>WHO WE ARE</h2>
                  <h6>AN AWARD WINNING COMPANY</h6>
                  <p>High Beam Auto Tech Private Limited is India’s leading multi-brand two-wheeler servicing network, providing high-quality, convenient, and affordable servicing for all makes and models. With over 135+ outlets nationwide, we have a strong presence in the market and are the preferred destination for four-wheeler owners.</p>
                  <div className="awrad_winnig_check">
                    <Form>
                      <Form.Group>
                        <Form.Check
                          required
                          label="Proven Business Model"
                          feedback="You must agree before submitting."
                          feedbackType="invalid"
                        />
                      </Form.Group>
                    </Form>
                    <Form>
                      <Form.Group>
                        <Form.Check
                          required
                          label="Comprehensive Training Programs"
                          feedback="You must agree before submitting."
                          feedbackType="invalid"
                        />
                      </Form.Group>
                    </Form>
                    <Form>
                      <Form.Group>
                        <Form.Check
                          required
                          label="Ongoing Support"
                          feedback="You must agree before submitting."
                          feedbackType="invalid"
                        />
                      </Form.Group>
                    </Form>
                    <Form>
                      <Form.Group>
                        <Form.Check
                          required
                          label="Low Investment Threshold"
                          feedback="You must agree before submitting."
                          feedbackType="invalid"
                        />
                      </Form.Group>
                    </Form>
                    <Form>
                      <Form.Group>
                        <Form.Check
                          required
                          label="Multiple Revenue Streams"
                          feedback="You must agree before submitting."
                          feedbackType="invalid"
                        />
                      </Form.Group>
                    </Form>
                    <Form>
                      <Form.Group>
                        <Form.Check
                          required
                          label="Daily Income"
                          feedback="You must agree before submitting."
                          feedbackType="invalid"
                        />
                      </Form.Group>
                    </Form>
                    <Form>
                      <Form.Group>
                        <Form.Check
                          required
                          label="Exclusive Territories"
                          feedback="You must agree before submitting."
                          feedbackType="invalid"
                        />
                      </Form.Group>
                    </Form>
                    <Form>
                      <Form.Group>
                        <Form.Check
                          required
                          label="Strong Brand Reputation"
                          feedback="You must agree before submitting."
                          feedbackType="invalid"
                        />
                      </Form.Group>
                    </Form>
                  </div>
                </div>
              </Col>
              <Col lg={7} md={6} sm={12} className="order-xl-2 order-lg-2 order-md-2 order-1">
                <div className="car_demo">
                  <img src={CAR25}
                    alt="" />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="make_easy_sec mission_possible">
          <Container>
            <Row className="align-items-center">
              <Col lg={7} md={6} sm={12} className="order-xl-1 order-lg-1 order-md-1 order-2">
                <div className="mission_img">
                  <img src={DETAILLING}
                    alt="" />
                  <div className="overlay"></div>
                  <div className="mission_text">
                    <h2>WHY CHOOSE US</h2>
                    <h6>Mission I'm Possible</h6>
                    <ul>
                      <li><a href="#">Signed up 135+ outlets PAN India.</a></li>
                      <li><a href="#">Total 2,00,000+ vehicle services done at Doctor Garages all outlets.</a></li>
                      <li><a href="#">Total 40,000+ AMC has been sold by Doctor Garage marketing team in field.</a></li>
                      <li><a href="#">Target to be open 50 franchises every year.</a></li>
                      <li><a href="#">Existing Outlets Successful Running Ratio is 90%.</a></li>
                    </ul>
                    <button type="button" class="">
                      LEARN MORE
                    </button>
                  </div>
                </div>
              </Col>
              <Col lg={5} md={6} sm={12} className="order-xl-2 order-lg-2 order-md-2 order-1">
                <div className="franchise_number">
                  <h3>135</h3>
                </div>
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col lg={5} md={6} sm={12}>
                <div className="franchise_customers">
                  <div className="vehicle_repair">
                    <h6>200,000</h6>
                    <p>vehicles repaired</p>
                  </div>
                  <div className="vehicle_repair">
                    <h6>150,000</h6>
                    <p>Happy Customers</p>
                  </div>
                </div>
              </Col>
              <Col lg={7} md={6} sm={12}>
                <div className="Franchise_img">
                  <img src={FRANCHISE}
                    alt="" />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="make_easy_sec become_partner">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="make_easy-title">
                  <h2>Become a Partner</h2>
                  <p>Etiam pharetra egestas interdum blandit viverra morbi consequat mi non bibendum
                    egestas quam egestas nulla.</p>
                </div>
              </Col>
            </Row>
            <Row className="franchise_form_sec_">
              <Col lg={6}>
                <FloatingLabel
                  controlId="floatingInput"
                  label="First Name*"
                  className="mb-3"
                >
                  <Form.Control type="text" placeholder="First Name" />
                </FloatingLabel>
              </Col>
              <Col lg={6}>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Last Name*"
                  className="mb-3"
                >
                  <Form.Control type="text" placeholder="Last Name*" />
                </FloatingLabel>

              </Col>
              <Col lg={6}>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control type="email" placeholder="Email address" />
                </FloatingLabel>
              </Col>
              <Col lg={6}>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Phone"
                  className="mb-3"      >
                  <Form.Control type="number" placeholder="Phone" />
                </FloatingLabel>
              </Col>
              <Col lg={12}>
                <FloatingLabel controlId="floatingTextarea2" label="Message">
                  <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: '150px' }}
                  />
                </FloatingLabel>
              </Col>
              <Col lg={12}>
                <div className="submit_btn">
                  <button type="button">Send Message</button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="make_easy_sec become_partner">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="make_easy-title investment_india">
                  <h2>Low Investment Franchise Business in India</h2>
                  <p>The franchise industry has garnered significant attention for valid reasons. In India, franchise businesses have experienced a growth rate of approximately 30-35% in the last four to five years, contributing between 4% to 5% to the country’s GDP. However, selecting a low investment franchise in India can be overwhelming due to the presence of over 1.7 lakh franchise owners. Despite the challenges, franchising offers an excellent opportunity for entrepreneurs seeking to start their own business, particularly given the current economic climate marked by unemployment and financial difficulties. Below are some tips on selecting the right franchise business in India:</p>
                  <div className="submit_btn">
                    <button type="button">Read More</button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </div>
    </>
  );
}
