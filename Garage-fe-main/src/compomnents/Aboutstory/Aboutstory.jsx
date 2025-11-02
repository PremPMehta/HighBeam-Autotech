

import Container from 'react-bootstrap/Container';
import "./Aboutstory.css";
import { Button, Col, Row } from 'react-bootstrap';
import Car from "../../assets/image/about-car.png";
import Check from "../../assets/image/check.png";
import whiteup from "../../assets/image/white-up.png";




function Aboutstory() {
  return (
    <>
      <div className="make_easy_sec about_sec_our_story">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="about_info">
                <div className="about_img">
                  <img src={Car}
                    alt="" />
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="about_details">
                <h2>ABOUT US</h2>
                <h4>Our Story</h4>
                <p>High Beam Auto Tech Private Limited is a testament to the relentless pursuit of excellence in the automotive industry. Established in 2010 under the name Radhe Automotive, our journey began with a simple yet ambitious vision – to provide top-notch car services that exceed customer expectations.</p>
                 <div className="over_story">
                 <p>Over the years, we have evolved, grown, and adapted to the changing automotive landscape. Today, we proudly stand as a multi-brand and premium car service provider that caters to the diverse needs of car enthusiasts and discerning vehicle owners.</p>
                 </div>
                {/* <div className="button_start get_in_touch">
                <Button variant="primary">Get In Touch <img src={whiteup}
                    alt="" /></Button>
                </div> */}
              </div>

            </Col>

          </Row>
        </Container>
      </div>

    </>

  );
}
export default Aboutstory;
