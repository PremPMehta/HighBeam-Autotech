
import Container from 'react-bootstrap/Container';
import "./Service.css";
import { Col, Row } from 'react-bootstrap';
import VECTOR from "../../assets/image/Up-Vector.png";
import CARONE from "../../assets/image/car1.png";
import CARTWO from "../../assets/image/car2.png";
import CARTHREE from "../../assets/image/car3.png";
import CARFOUR from "../../assets/image/car4.png";
import ICON from "../../assets/image/Icon.png";
import PETROL from "../../assets/image/petrol-icon.png";
import AUTOMATIC from "../../assets/image/automatic.png";
import BLUE from "../../assets/image/blue-up.png";




function Service() {
  return (
    <>
      <div className="make_easy_sec service_sec">
        <Container>
          <Row>
            <Col lg={12}>
              <div className='make_easy-title browase_type-title'>
                <h2>Specials</h2>
                <a href="#">View All  <img src={VECTOR}
                  alt="" />  </a>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={3} md={6} sm={12}>
              <div className="service_box">
                <div className="service_box_img_wrap">
                  <img src={CARONE}
                    alt="" />
                </div>
                <div className="service_box_info">
                  <div className="service_title">
                    <h4>C-Class – 2023</h4>
                    <p>4.0 D5 PowerPulse Momentum 5dr</p>
                  </div>
                  <div className="service_detail">
                  <div className="service_miles">
                  <img src={ICON}
                    alt="" />
                    <p>50 Miles</p>
                  </div>
                  <div className="service_miles">
                  <img src={PETROL}
                    alt="" />
                    <p>50 Miles</p>

                  </div>
                  <div className="service_miles">
                  <img src={AUTOMATIC}
                    alt="" />
                    <p>50 Miles</p>

                  </div>
                  </div>
                  <div className="service_benefits">
                    <div className="service_pay">
                      <p>$150,000</p>
                    </div>
                    <div className="View_Details">
                      <a href="#">View Details <img src={BLUE}
                        alt="" />  </a>
                    </div>
                  </div>
                </ div>
              </div>
            </Col>
            <Col lg={3} md={6} sm={12}>
              <div className="service_box">
                <div className="service_box_img_wrap">
                  <img src={CARTWO}
                    alt="" />
                </div>
                <div className="service_box_info">
                  <div className="service_title">
                    <h4>C-Class – 2023</h4>
                    <p>4.0 D5 PowerPulse Momentum 5dr</p>
                  </div>
                  <div className="service_detail">
                  <div className="service_miles">
                  <img src={ICON}
                    alt="" />
                    <p>50 Miles</p>
                  </div>
                  <div className="service_miles">
                  <img src={PETROL}
                    alt="" />
                    <p>50 Miles</p>

                  </div>
                  <div className="service_miles">
                  <img src={AUTOMATIC}
                    alt="" />
                    <p>50 Miles</p>

                  </div>
                  </div>
                  <div className="service_benefits">
                    <div className="service_pay">
                      <p>$150,000</p>
                    </div>
                    <div className="View_Details">
                      <a href="#">View Details <img src={BLUE}
                        alt="" />  </a>
                    </div>
                  </div>
                </ div>
              </div>
            </Col>
            <Col lg={3} md={6} sm={12}>
              <div className="service_box">
                <div className="service_box_img_wrap">
                  <img src={CARTHREE}
                    alt="" />
                </div>
                <div className="service_box_info">
                  <div className="service_title">
                    <h4>C-Class – 2023</h4>
                    <p>4.0 D5 PowerPulse Momentum 5dr</p>
                  </div>
                  <div className="service_detail">
                  <div className="service_miles">
                  <img src={ICON}
                    alt="" />
                    <p>50 Miles</p>
                  </div>
                  <div className="service_miles">
                  <img src={PETROL}
                    alt="" />
                    <p>50 Miles</p>

                  </div>
                  <div className="service_miles">
                  <img src={AUTOMATIC}
                    alt="" />
                    <p>50 Miles</p>

                  </div>
                  </div>
                  <div className="service_benefits">
                    <div className="service_pay">
                      <p>$150,000</p>
                    </div>
                    <div className="View_Details">
                      <a href="#">View Details <img src={BLUE}
                        alt="" />  </a>
                    </div>
                  </div>
                </ div>
              </div>
            </Col>
            <Col lg={3} md={6} sm={12}>
              <div className="service_box">
                <div className="service_box_img_wrap">
                  <img src={CARFOUR}
                    alt="" />
                </div>
                <div className="service_box_info">
                  <div className="service_title">
                    <h4>C-Class – 2023</h4>
                    <p>4.0 D5 PowerPulse Momentum 5dr</p>
                  </div>
                  <div className="service_detail">
                  <div className="service_miles">
                  <img src={ICON}
                    alt="" />
                    <p>50 Miles</p>
                  </div>
                  <div className="service_miles">
                  <img src={PETROL}
                    alt="" />
                    <p>50 Miles</p>

                  </div>
                  <div className="service_miles">
                  <img src={AUTOMATIC}
                    alt="" />
                    <p>50 Miles</p>

                  </div>
                  </div>
                  <div className="service_benefits">
                    <div className="service_pay">
                      <p>$150,000</p>
                    </div>
                    <div className="View_Details">
                      <a href="#">View Details <img src={BLUE}
                        alt="" />  </a>
                    </div>
                  </div>
                </ div>
              </div>
            </Col>

          </Row>
        </Container>
      </div>

    </>

  );
}
export default Service;
