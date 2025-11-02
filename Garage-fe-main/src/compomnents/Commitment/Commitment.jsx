

import Container from 'react-bootstrap/Container';
import "./Commitment.css";
import { Button, Col, Row } from 'react-bootstrap';
import H21 from "../../assets/image/h21.png";
import Check from "../../assets/image/check.png";
import whiteup from "../../assets/image/white-up.png";




function Commitment() {
  return (
    <>
      <div className="make_easy_sec about_sec">
        <Container>
          <Row className="align-items-start">
          <Col lg={6} className="order-lg-1 order-2">
              <div className="about_details">
                <h2>Our Commitment</h2>
                <p>At High Beam Auto Tech, we are driven by a steadfast commitment to excellence, innovation, and customer satisfaction. Our team of highly skilled technicians and professionals shares a common passion for cars and a dedication to delivering the highest quality service.</p>
                <div className="about_point">
                  <p className="check-img"><img src={Check}
                    alt="" /></p>
                  <p className="check-text">
                    Trusted Car Repair and Maintenance Services
                  </p>

                </div>
                <div className="about_point">
                  <p className="check-img"><img src={Check}
                    alt="" /></p>
                  <p className="check-text">
                  Contact Us for Expert Assistance
                  </p>

                </div>
                <div className="about_point">
                  <p className="check-img"><img src={Check}
                    alt="" /></p>
                  <p className="check-text">
                  Extensive Experience in the Industry
                  </p>

                </div>
                {/* <div className="button_start get_touch">
                <Button variant="primary">Get In Touch<img src={whiteup}
                    alt="" /></Button>
                </div> */}
              </div>

            </Col>
            <Col lg={6} className="order-lg-2 order-1">
              <div className="about_info">
                <div className="about_img">
                  <img src={H21}
                    alt="" />
                </div>
              </div>
            </Col>
          

          </Row>
        </Container>
      </div>

    </>

  );
}
export default Commitment;
