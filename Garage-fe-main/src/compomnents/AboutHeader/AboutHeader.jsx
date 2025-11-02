import Container from "react-bootstrap/Container";
import Logo from "../../assets/image/high.png";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import "./Header.css";
import { Col, Row } from "react-bootstrap";
import VECTOR from "../../assets/image/Up-Vector.png";
import Slider from "react-slick";
import { Link, NavLink } from "react-router-dom";

function AboutHeader() {
  var settings = {
    dots: true,
    infinite: true,
    // speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
  };

  return (
    <>
      <Navbar expand="lg" className="header_wrap">
        <Container>
          <div className="header_info">
            <Link to="/home" className="m-0">
              <div className="logo_wrap p-0 m-0">
                <img src={Logo} alt="" />
              </div>
            </Link>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center header_menu gap-3 gap-lg-0">
              <NavLink to="/home" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
              <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>AboutUs</NavLink>
              <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>Contactus</NavLink>
              <div className="book_btn ms-lg-3">
                <NavLink
                  to="/bookconsultation"
                  className={({ isActive }) => ` ${isActive ? "active" : ""}`}
                >
                  Book a Service
                </NavLink>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Slider {...settings} className="about_slider">
        <div className="hero_silder">
          <div className="background_img">
            <div className="hero_sec">
              <Container>
                <Row>
                  <Col lg={12}>
                    <div className="hero_title">
                      <h1>We Service Your Car Like It’s Ours</h1>
                      <p>
                        Car repairing costs rise significantly when they don’t get serviced at the right intervals and in the right way. We believe in  fixing problems before you notice them.
                      </p>
                      <Link to="/bookconsultation" type="button" class="btn consultation_btn">
                        Book a Service <img src={VECTOR} alt="" />{" "}
                      </Link>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </div>
        <div className="hero_silder">
          <div className="background_img background_img_two">
            <div className="hero_sec">
              <Container>
                <Row>
                  <Col lg={12}>
                    <div className="hero_title">
                      <h1>Top-rated car repair workshop in Surat. </h1>
                      <p>
                        Get expert multi-brand service, engine diagnostics, AC repair, and certified auto mechanics at High Beam Auto tech Pvt. Ltd.
                      </p>
                      <Link to="/bookconsultation" type="button" class="btn consultation_btn">
                        Book a Service <img src={VECTOR} alt="" />{" "}
                      </Link>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </div>

      </Slider>



    </>
  );
}
export default AboutHeader;
