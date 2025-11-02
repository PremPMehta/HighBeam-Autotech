import React, { useLayoutEffect, useState } from "react";
import { Form, Button, Container, Row, Col, InputGroup } from "react-bootstrap";
import "./Service.css";
import Header from "../../compomnents/Header/Header";
import service from "../../assets/image/service.png";
import OFFER from "../../assets/image/f1.png";
import TRUST from "../../assets/image/f2.png";
import TRANSPARENT from "../../assets/image/f3.png";
import EXPERT from "../../assets/image/f4.png";
import whiteup from "../../assets/image/white-up.png";
import Footer from "../../compomnents/Footer/Footer";

const Service = () => {
  const [date, setDate] = useState("");
  return (
    <>
      <div>
        <Header />

        <div className="make_easy_sec service_details">
          <Container>
            <Row className="service_datalist">
              <Col lg={6}>
                <div className="servaice_wrp">
                  <img src={service} alt="" />
                </div>
              </Col>

              <Col lg={6}>
                <div className="make_easy-title servcie_info_detail">
                  <p>
                    High Beam Auto Tech Private Limited is a testament to the
                    relentless pursuit of excellence in the automotive industry.
                    Established in 2010 under the name Radhe Automotive, our
                    journey began with a simple yet ambitious vision – to
                    provide top-notch car services that exceed customer
                    expectations.
                  </p>
                  <p>
                    Over the years, we have evolved, grown, and adapted to the
                    changing automotive landscape. Today, we proudly stand as a
                    multi-brand and premium car service provider that caters to
                    the diverse needs of car enthusiasts and discerning vehicle
                    owners.
                  </p>

                  <div className="button_start">
                    <Button variant="primary">
                      See Your Service Options <img src={whiteup} alt="" />
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="make_easy_sec">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="make_easy-title">
                  <h2>Customers Get Great benefits!</h2>
                </div>
              </Col>
            </Row>
            <Row className="make_easy_wrp">
              <Col lg={3} md={6} sm={12}>
                <div className="make_easy">
                  <div className="make_easy_img">
                    <img src={OFFER} alt="" />
                  </div>
                  <h4>We Make It Easy</h4>
                  <p>
                    From booking a car repair, regular maintenance services to buying a car or even joining a workshop, we simplify every step so you can focus on what matters the most: the ride.
                  </p>
                </div>
              </Col>
              <Col lg={3} md={6} sm={12}>
                <div className="make_easy">
                  <div className="make_easy_img">
                    <img src={TRUST} alt="" />
                  </div>
                  <h4>Flexible Financing, Built Around You</h4>
                  <p>
                    Whether you're purchasing a pre - owned car or paying for repairs, our transparent financing options are designed to fit your budget, no fuss, no chaos.
                  </p>
                </div>
              </Col>
              <Col lg={3} md={6} sm={12}>
                <div className="make_easy">
                  <div className="make_easy_img">
                    <img src={TRANSPARENT} alt="" />
                  </div>
                  <h4>More Than Repairs - Real Automotive Expertise</h4>
                  <p>
                    We don’t just believe in fixing issues, we restore performance. With a keen understanding of what every car needs, we ensure that every job is done right
                  </p>
                </div>
              </Col>
              <Col lg={3} md={6} sm={12}>
                <div className="make_easy">
                  <div className="make_easy_img">
                    <img src={EXPERT} alt="" />
                  </div>
                  <h4>No Hidden Costs. No Guesswork.</h4>
                  <p>
                    We have upfront pricing, precise estimates and an honest diagnosis. So you don't overpay and won’t under-deliver.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
    
        <div className="make_easy_sec schedule_service">
          <Container>
            <Row>
              <Col lg={8} md={8} sm={12} >
                <div className="schedule_datalist">
                  <div className="make_easy-title">
                    <h4>Schedule Service</h4>

                    <p>
                      Use our loan calculator to calculate payments over the
                      life of your loan. Enter your information to see how much
                      your monthly payments could be. You can adjust length of
                      loan, down payment and interest rate to see how those
                      changes raise or lower your payments.
                    </p>
                  </div>

                  <Row>
                    <Col lg={12}>
                      <Row className="form_datalist">
                        <Col lg={6}>
                          <div>
                            <Form.Label htmlFor="Name">Name</Form.Label>
                            <Form.Control
                              type="Name"
                              id="inputnames"
                              aria-describedby="passwordHelpBlock"
                            />
                          </div>
                        </Col>

                        <Col lg={6}>
                          <div>
                            <Form.Label htmlFor="Email">Email</Form.Label>
                            <Form.Control
                              type="Mail"
                              id="inputmail"
                              aria-describedby="passwordHelpBlock"
                            />
                          </div>
                        </Col>
                      </Row>

                      <Row className="form_datalist">
                        <Col lg={6}>
                          <div>
                            <Form.Label htmlFor="Phone">Phone</Form.Label>
                            <Form.Control
                              type="phone"
                              id="contactnumber"
                              aria-describedby="number"
                            />
                          </div>
                        </Col>

                        <Col lg={6}>
                          <div>
                            <Form.Label htmlFor="Makemodel">
                              Make Model
                            </Form.Label>
                            <Form.Control
                              type="Mail"
                              id="inputmail"
                              aria-describedby="passwordHelpBlock"
                            />
                          </div>
                        </Col>
                      </Row>

                      <Row className="form_datalist">
                        <Col lg={6}>
                          <div>
                            <Form.Label htmlFor="mileage">
                              Mileage (optional)
                            </Form.Label>
                            <Form.Control
                              type="phone"
                              id="contactnumber"
                              aria-describedby="number"
                            />
                          </div>
                        </Col>

                        <Col lg={6}>
                          <div>
                            <Form.Group controlId="dateInput">
                              <Form.Label>Select Date</Form.Label>
                              <Form.Control
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                              />
                            </Form.Group>
                          </div>
                        </Col>
                      </Row>

                      <Row className="form_datalist">
                        <Col lg={12}>
                        <div className="menu_select">
                        <Form.Select aria-label="Default select example">
                        <option>General Service,</option>
                        <option value="1">Oil And Filter Change</option>
                        <option value="2">Car Wash and Detailing.</option>                   
                      </Form.Select>
                    </div>
                        
                        </Col>

                       
                      </Row>

                     
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <div className="button_start request_btn">
                        <Button variant="primary">Sumbit</Button>
                      </div>
                    </Col>
                  </Row>

                  <div className="scheduling_appoiment">
                    <p>
                      By submitting this form you will be scheduling a service
                      booking at no obligation and will be contacted within
                      48 hours by a service advisor.
                    </p>
                  </div>
                </div>
              </Col>
              <Col lg={4} md={4} sm={12}>
              <div className="opening_hours">
                <h4>Opening hours</h4>
                <div className="tieme_days">
                  <p>Sunday</p>
                  <span>9:00-7:00</span>
                </div>
                <div className="tieme_days">
                  <p>Monday</p>
                  <span>9:00-7:00</span>
                </div>
                <div className="tieme_days">
                  <p>Tuesday</p>
                  <span>9:00-7:00</span>
                </div>
                <div className="tieme_days">
                  <p>Wednesday</p>
                  <span>9:00-7:00</span>
                </div>
                <div className="tieme_days">
                  <p>Thursday</p>
                  <span>9:00-7:00</span>
                </div>
                <div className="tieme_days">
                  <p>Friday</p>
                  <span>9:00-7:00</span>
                </div>
                <div className="tieme_days">
                  <p>Saturday</p>
                  <span>9:00-7:00</span>
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
};

export default Service;
