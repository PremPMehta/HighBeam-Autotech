

import Container from 'react-bootstrap/Container';
import "./Ourvision.css";
import { Button, Col, Row } from 'react-bootstrap';
import Car from "../../assets/image/about-car.png";
import Check from "../../assets/image/check.png";
import whiteup from "../../assets/image/white-up.png";




function Ourvision() {
  return (
    <>
      <div className="make_easy_sec about_sec">
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
                <h2>Our Vision</h2>
                <p>We are striving  to become the most trusted name in the world of automotive care by consistently delivering expert repair services, offering quality second hand vehicles and empowering the next generation of mechanics through hands-on workshops. We aren’t just fixing cars but we are building a one stop for all your car’s needs. </p>
                 {/* <div className="our_vision">
                 <h4>Identity :<p>It provides a clear sense of purpose, guiding decisions</p></h4>
                 <h4>Long-Term Focus :<p>A vision statement is future-oriented</p></h4>
                 <h4>Identity :<p>It provides a clear sense of purpose, guiding decisions</p></h4>
                 <h4>Long-Term Focus :<p>A vision statement is future-oriented</p></h4>
                 </div> */}
                {/* <div className="button_start get_touch">
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
export default Ourvision;
