

import Container from 'react-bootstrap/Container';
import "./Ourteam.css";
import { Col, Row } from 'react-bootstrap';
import VECTOR from "../../assets/image/Up-Vector.png";
import TEAM1 from "../../assets/image/team1.png";
import TEAM2 from "../../assets/image/team2.png";
import TEAM3 from "../../assets/image/team3.png";
import TEAM4 from "../../assets/image/team4.png";



function Ourteam() {
  return (
    <>
      <div className="make_easy_sec service_sec">
        <Container>
          <Row>
            <Col lg={12}>
              <div className='make_easy-title browase_type-title'>
                <h2>Our Team</h2>
                <a href="#">View All  <img src={VECTOR}
                  alt="" />  </a>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={3} md={6} sm={12}>
              <div className="ourteam_box">
                <div className="ourteam_box_img_wrap">
                  <img src={TEAM1}
                    alt="" />
                </div>
                <div className="ourteam_box_info">
                  <div className="ourteam_title">
                    <h4>Courtney Henry</h4>
                    <p>Development Manager</p>
                  </div>
                </ div>
              </div>
            </Col>
            <Col lg={3} md={6} sm={12}>
              <div className="ourteam_box">
                <div className="ourteam_box_img_wrap">
                  <img src={TEAM2}
                    alt="" />
                </div>
                <div className="ourteam_box_info">
                  <div className="ourteam_title">
                    <h4>Courtney Henry</h4>
                    <p>Development Manager</p>
                  </div>
                </ div>
              </div>
            </Col>
            <Col lg={3} md={6} sm={12}>
              <div className="ourteam_box">
                <div className="ourteam_box_img_wrap">
                  <img src={TEAM3}
                    alt="" />
                </div>
                <div className="ourteam_box_info">
                  <div className="ourteam_title">
                    <h4>Courtney Henry</h4>
                    <p>Development Manager</p>
                  </div>
                </ div>
              </div>
            </Col>
            <Col lg={3} md={6} sm={12}>
              <div className="ourteam_box">
                <div className="ourteam_box_img_wrap">
                  <img src={TEAM4}
                    alt="" />
                </div>
                <div className="ourteam_box_info">
                  <div className="ourteam_title">
                    <h4>Courtney Henry</h4>
                    <p>Development Manager</p>
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
export default Ourteam;
