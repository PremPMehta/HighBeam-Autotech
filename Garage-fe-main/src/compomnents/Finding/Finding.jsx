

import Container from 'react-bootstrap/Container';
import "./Finding.css";
import { Button, Col, Row } from 'react-bootstrap';
import Check from "../../assets/image/check.png";
import WHITEUP from "../../assets/image/white-up.png";




function Finding() {
  return (
    <>
      <div className="make_easy_sec finding_car_sec">
        <Container>
          <Row className="align-items-center">
            <Col lg={12}>
              <div className="finding_car_detail">
                <h2>We make finding the right car simple</h2>
                <div className="finding_more_btn">
                <Button variant="primary">Find Out More
                  <img src={WHITEUP}
                                    alt="" />
                </Button>
                </div>
              </div>

            </Col>

          </Row>
        </Container>
      </div>

    </>

  );
}
export default Finding;
