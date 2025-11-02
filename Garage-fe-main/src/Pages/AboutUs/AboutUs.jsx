import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AboutUs.css";
import Header from "../../compomnents/Header/Header";
import Commitment from "../../compomnents/Commitment/Commitment";
import Ourvision from "../../compomnents/Ourvision/Ourvision";
import Service from "../../compomnents/Service/Service";
import Aboutstory from "../../compomnents/Aboutstory/Aboutstory";
import { Col, Container, Row } from "react-bootstrap";
import Car from "../../assets/image/about-car.png";
import G1 from "../../assets/image/g1.png";
import G2 from "../../assets/image/g2.png";
import G3 from "../../assets/image/g3.png";
import G4 from "../../assets/image/g4.png";
import G5 from "../../assets/image/g5.png";
import Ourteam from "../../compomnents/Ourteam/Ourteam";
import APPLE from "../../assets/image/apple-store.png";
import PLAY from "../../assets/image/playstore.png";
import APP from "../../assets/image/app-w.webp";
import Accordion from "react-bootstrap/Accordion";
import Finding from "../../compomnents/Finding/Finding";
import Footer from "../../compomnents/Footer/Footer";
import { 
  AstonMartinIcon, 
  AudiIcon, 
  BentleyIcon, 
  BMWIcon, 
  BYDIcon, 
  FerrariIcon, 
  HondaIcon, 
  HyundaiIcon, 
  JaguarIcon, 
  JeepIcon, 
  KiaIcon, 
  LamborghiniIcon, 
  LandroverIcon, 
  LexusIcon, 
  MaseratiIcon, 
  MclarenIcon, 
  MBIcon, 
  MiniIcon, 
  NissanIcon, 
  PorscheIcon, 
  RollsRoyceIcon, 
  TeslaIcon, 
  ToyotaIcon, 
  VolkswagenIcon, 
  VolvoIcon 
} from '@cardog-icons/react';
import AboutHeader from "../../compomnents/AboutHeader/AboutHeader";

export default function AboutUs() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);
  return (
    <>
      <div>
        <AboutHeader />
        <Aboutstory />
        <div className="make_easy_sec browse_type">
          <Container>
            <Row>
              <Col lg={6}>
                <Row>
                  <Col lg={4} md={6} sm={12} >
                    <div className="years">
                      <h5>45 years in business</h5>
                    </div>
                    <div className="demo_img_one">
                      <img src={G1} alt="" />
                    </div>
                  </Col>
                  <Col lg={8} md={6} sm={12}>
                    <div className="demo_img_two">
                      <img src={G2} alt="" />
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col lg={6}>
                <Row>
                  <Col lg={12}>
                    <div className="demo_img_three">
                      <img src={G3} alt="" />
                    </div>
                  </Col>
                  <Col lg={4} md={6}>
                    <div className="demo_img_four">
                      <img src={G4} alt="" />
                    </div>
                  </Col>
                  <Col lg={8} md={6}>
                    <div className="demo_img_five">
                      <img src={G5} alt="" />
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
        <Commitment />
        <Ourvision />
        {/* <Ourteam /> */}
        
        {/* Brands We Work With Section */}
        <div className="make_easy_sec brands-sec" id="brands-we-work-with">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="make_easy-title brands-title">
                  <h2>Brands We Work With</h2>
                  <p>We provide expert service and maintenance for all major automotive brands</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <div className="brands-grid">
                  <div className="brand-item">
                    <div className="brand-logo">
                      <AstonMartinIcon />
                    </div>
                    <h5>Aston Martin</h5>
                  </div>
                  <div className="brand-item">
                    <div className="brand-logo">
                      <AudiIcon />
                    </div>
                    <h5>Audi</h5>
                  </div>
                  <div className="brand-item">
                    <div className="brand-logo">
                      <BentleyIcon />
                    </div>
                    <h5>Bentley</h5>
                  </div>
                  <div className="brand-item">
                    <div className="brand-logo">
                      <BMWIcon />
                    </div>
                    <h5>BMW</h5>
                  </div>
                  <div className="brand-item">
                    <div className="brand-logo">
                      <BYDIcon />
                    </div>
                    <h5>BYD</h5>
                  </div>
                  <div className="brand-item">
                    <div className="brand-logo">
                      <FerrariIcon />
                    </div>
                    <h5>Ferrari</h5>
                  </div>
                  <div className="brand-item">
                    <div className="brand-logo">
                      <HondaIcon />
                    </div>
                    <h5>Honda</h5>
                  </div>
                  <div className="brand-item">
                    <div className="brand-logo">
                      <HyundaiIcon />
                    </div>
                    <h5>Hyundai</h5>
                  </div>
                  <div className="brand-item">
                    <div className="brand-logo">
                      <JaguarIcon />
                    </div>
                    <h5>Jaguar</h5>
                  </div>
                  <div className="brand-item">
                    <div className="brand-logo">
                      <JeepIcon />
                    </div>
                    <h5>Jeep</h5>
                  </div>
                  <div className="brand-item">
                    <div className="brand-logo">
                      <KiaIcon />
                    </div>
                    <h5>KIA</h5>
                  </div>
                  <div className="brand-item">
                    <div className="brand-logo">
                      <LamborghiniIcon />
                    </div>
                    <h5>Lamborghini</h5>
                  </div>
                  <div className="brand-item">
                    <div className="brand-logo">
                      <LandroverIcon />
                    </div>
                    <h5>Land Rover</h5>
                  </div>
                  <div className="brand-item">
                    <div className="brand-logo">
                      <LexusIcon />
                    </div>
                    <h5>Lexus</h5>
                  </div>
                  <div className="brand-item">
                    <div className="brand-logo">
                      <MaseratiIcon />
                    </div>
                    <h5>Maserati</h5>
                  </div>
                  <div className="brand-item">
                    <div className="brand-logo">
                      <MclarenIcon />
                    </div>
                    <h5>McLaren</h5>
                  </div>
                  <div className="brand-item">
                    <div className="brand-logo">
                      <MBIcon />
                    </div>
                    <h5>Mercedes-Benz</h5>
                  </div>
                  <div className="brand-item">
                    <div className="brand-logo">
                      <MiniIcon />
                    </div>
                    <h5>Mini</h5>
                  </div>
                  <div className="brand-item">
                    <div className="brand-logo">
                      <NissanIcon />
                    </div>
                    <h5>Nissan</h5>
                  </div>
                  <div className="brand-item">
                    <div className="brand-logo">
                      <PorscheIcon />
                    </div>
                    <h5>Porsche</h5>
                  </div>
                  <div className="brand-item">
                    <div className="brand-logo">
                      <RollsRoyceIcon />
                    </div>
                    <h5>Rolls-Royce</h5>
                  </div>
                  <div className="brand-item">
                    <div className="brand-logo">
                      <TeslaIcon />
                    </div>
                    <h5>Tesla</h5>
                  </div>
                  <div className="brand-item">
                    <div className="brand-logo">
                      <ToyotaIcon />
                    </div>
                    <h5>Toyota</h5>
                  </div>
                  <div className="brand-item">
                    <div className="brand-logo">
                      <VolkswagenIcon />
                    </div>
                    <h5>Volkswagen</h5>
                  </div>
                  <div className="brand-item">
                    <div className="brand-logo">
                      <VolvoIcon />
                    </div>
                    <h5>Volvo</h5>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        {/* <div className="make_easy_sec appstore-sec">
          <Container>
            <Row className="align-items-center">
              <Col lg={7} md={6} className="order-lg-1 order-2">
                <div className="appstore_details">
                  <h6>
                    Find the best second-hand car options near you.
                  </h6>
                  <p>
                    This way, you get the car you want without the new car price tag!
                  </p>
                  <div className="app_store_img">
                    <img src={APPLE} alt="" />
                    <img src={PLAY} alt="" />
                  </div>
                </div>
              </Col>
              <Col lg={5} md={6} className="order-lg-2 order-1">
                <div className="app_info">
                  <div className="app_img">
                    <img src={APP} alt="" />
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div> */}
        <div className="make_easy_sec faq-sec">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="make_easy-title faq-title">
                  <h2>Frequently Asked Questions</h2>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <div className="according_menu">
                  <Accordion defaultActiveKey={["0"]} alwaysOpen>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        How often should I get my car serviced?
                      </Accordion.Header>
                      <Accordion.Body>
                        Regular maintenance keeps your car safe and reliable. Most manufacturers recommend an oil change every 5,000–10,000 km or every 6–12 months, depending on usage and oil type.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>
                        What should I inspect before buying a used car?
                      </Accordion.Header>
                      <Accordion.Body>
                        Check tire tread, rust, electrical systems and request a comprehensive service history report . Always get the vehicle inspected by a professional - our experts can help identify hidden issues so you invest in trust not surprises.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                      <Accordion.Header>Why is my “Check Engine” light on?</Accordion.Header>
                      <Accordion.Body>
                        That warning light could signal anything from a loose gas cap to a serious emission or ignition issue. Don’t ignore it! We use advanced diagnostics to read the codes, explain what’s safe to ignore, and what needs immediate attention and fixing.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                      <Accordion.Header>
                        Can I learn to repair my own car?
                      </Accordion.Header>
                      <Accordion.Body>
                        Absolutely! With the right guidance, you can. That’s why we offer hands-on workshops covering basic upkeep, diagnostic and even deeper repairs. We guide small classes or one-on-one sessions so you’ll learn how and why things work—no mechanics jargon, just approachable practical teaching.
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        {/* <Finding /> */}
        <Footer />
      </div>
    </>
  );
}
