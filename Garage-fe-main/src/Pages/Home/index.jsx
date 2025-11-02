import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../compomnents/Header/Header";
import About from "../../compomnents/About/About";
import Aboutpage from "../../compomnents/Aboutpage/Aboutpage";

import {
  Col,
  Container,
  DropdownButton,
  Dropdown,
  Form,
  Row,
  Button,
} from "react-bootstrap";

import Ourteam from "../../compomnents/Ourteam/Ourteam";
import Service from '../../compomnents/Service/Service'
import Finding from "../../compomnents/Finding/Finding";
import Footer from "../../compomnents/Footer/Footer";
import easy from "../../assets/image/easy.gif";
import financing from "../../assets/image/financing.gif";
import expertise from "../../assets/image/expertise.gif";
import cost from "../../assets/image/cost.gif";
import VECTOR from "../../assets/image/Up-Vector.png";
import SUV from "../../assets/image/suv.png";
import H2 from "../../assets/image/h72.png";
import H3 from "../../assets/image/h73.png";
import H4 from "../../assets/image/h74.png";
import H5 from "../../assets/image/h75.png";
import CUSTOMERS from "../../assets/image/customers.png";
import STAR from "../../assets/image/star-icon.png";
import APPLE from "../../assets/image/apple-store.png";
import PLAY from "../../assets/image/playstore.png";
import APP from "../../assets/image/app-w.webp";
import WHITEUP from "../../assets/image/white-up.png";
import LOGOBRAND from "../../assets/image/logo-brand.png";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import CarServices from "../../compomnents/CarServices/CarServices";
import Commitment from "../../compomnents/Commitment/Commitment";
import Ourvision from "../../compomnents/Ourvision/Ourvision";
import SecondCar from "../../compomnents/Secondcar/SecondCar";
import CarRepair from "../../compomnents/CarRepair/CarRepair";
import { getPageContent, convertSectionsToFlat, getImageUrl } from "../../services/contentApi";

// Default core values
const defaultCoreValues = [
  {
    id: 1,
    image: easy,
    title: 'We Make It Easy',
    description: 'From booking a car repair, regular maintenance services to buying a car or even joining a workshop, we simplify every step so you can focus on what matters the most: the ride.',
  },
  {
    id: 2,
    image: financing,
    title: 'Flexible Financing, Built Around You',
    description: 'Whether you\'re purchasing a pre - owned car or paying for repairs, our transparent financing options are designed to fit your budget, no fuss, no chaos.',
  },
  {
    id: 3,
    image: expertise,
    title: 'More Than Repairs - Real Automotive Expertise',
    description: 'We don\'t just believe in fixing issues, we restore performance. With a keen understanding of what every car needs, we ensure that every job is done right',
  },
  {
    id: 4,
    image: cost,
    title: 'No Hidden Costs. No Guesswork.',
    description: 'We have upfront pricing, precise estimates and an honest diagnosis. So you don\'t overpay and won\'t under-deliver.',
  },
];

export default function Home() {
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const content = await getPageContent('home');
        if (content) {
          // Convert sections array to flat object format
          const flatContent = convertSectionsToFlat(content);
          setPageContent(flatContent);
        }
      } catch (error) {
        console.warn('Failed to load dynamic content, using defaults:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  // Get core values from content or use defaults
  const coreValues = pageContent?.coreValues || defaultCoreValues;
  const coreValuesHeader = pageContent?.coreValuesHeader || { title: 'Our core values:' };

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <div>
        <Header />

        <CarServices content={pageContent} />
        {/* <div className="make_easy_sec browse_type">
          <Container>
            <Row>
              <Col lg={12}>
                <div className='make_easy-title browase_type-title'>
                  <h2>Browse by Type</h2>
                  <Link to="/car-details">View All  <img src={VECTOR}
                    alt="" />  </Link>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={2} md={6} sm={12}>
                <div className="browse_box">
                  <div className="browse_box_img_wrap">
                    <img src={SUV}
                      alt="" />
                  </div>
                  <div className="browse_box_text">
                    <h4>3 Cars</h4>
                    <p>SUV</p>
                  </ div>
                </div>
              </Col>
              <Col lg={2} md={6} sm={12}>
                <div className="browse_box">
                  <div className="browse_box_img_wrap">
                    <img src={H2}
                      alt="" />
                  </div>
                  <div className="browse_box_text">
                    <h4>3 Cars</h4>
                    <p>SUV</p>
                  </ div>
                </div>
              </Col>
              <Col lg={2} md={6} sm={12}>
                <div className="browse_box">
                  <div className="browse_box_img_wrap">
                    <img src={H3}
                      alt="" />
                  </div>
                  <div className="browse_box_text">
                    <h4>3 Cars</h4>
                    <p>SUV</p>
                  </ div>
                </div>
              </Col>
              <Col lg={2} md={6} sm={12}>
                <div className="browse_box">
                  <div className="browse_box_img_wrap">
                    <img src={H4}
                      alt="" />
                  </div>
                  <div className="browse_box_text">
                    <h4>3 Cars</h4>
                    <p>SUV</p>
                  </ div>
                </div>
              </Col>
              <Col lg={2} md={6} sm={12}>
                <div className="browse_box">
                  <div className="browse_box_img_wrap">
                    <img src={H5}
                      alt="" />
                  </div>
                  <div className="browse_box_text">
                    <h4>3 Cars</h4>
                    <p>SUV</p>
                  </ div>
                </div>
              </Col>
              <Col lg={2} md={6} sm={12}>
                <div className="browse_box browse_box_last">
                  <div className="browse_box_img_wrap">
                    <img src={SUV}
                      alt="" />
                  </div>
                  <div className="browse_box_text">
                    <h4>3 Cars</h4>
                    <p>SUV</p>
                  </ div>
                </div>
              </Col>


            </Row>
          </Container>
        </div> */}
        <SecondCar />
        <CarRepair content={pageContent} />


        <div className="make_easy_sec">
          <Container>
            <Row>
              <Col lg={12}>
                <div className='make_easy-title'>
                  <h2>{coreValuesHeader.title || 'Our core values:'}</h2>
                </div>
              </Col>
            </Row>
            <Row>
              {coreValues.map((value, index) => {
                // Get default image from defaultCoreValues array
                const defaultImg = defaultCoreValues[index]?.image || easy;
                return (
                  <Col lg={3} md={6} sm={12} key={value.id || index}>
                    <div className="make_easy">
                      <div className="make_easy_img">
                        <img 
                          src={getImageUrl(value.image, defaultImg)} 
                          alt={value.title} 
                        />
                      </div>
                      <h4>{value.title}</h4>
                      <p>{value.description}</p>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </div>
        <About content={pageContent} />
        {/* <Service /> */}
        {/* <div className="make_easy_sec testimonial_sec">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="make_easy-title testimonial_title">
                  <h2>What our customers say</h2>
                </div>
              </Col>
            </Row>
            <Slider {...settings}>
              <div>
                <Row className="align-items-center">
                  <Col lg={5} md={6} sm={12}>
                    <div className="_info">
                      <div className="testimonial_img">
                        <img src={CUSTOMERS}
                          alt="" />
                      </div>
                    </div>
                  </Col>
                  <Col lg={7} md={6} sm={12}>
                    <div className="about_details testimonial_details">
                      <div className="testimonial_star">
                        <img src={STAR}
                          alt="" />
                        <p>5.0</p>
                      </div>
                      <div className="testimonial_user">
                        <h4>Ali TUFAN</h4>
                        <p>Designer</p>
                        <h6>I'd suggest Macklin Motors Nissan Glasgow South to a friend
                          because I had great service from my salesman Patrick and all of
                          the team.</h6>
                      </div>
                    </div>

                  </Col>
                </Row>
              </div>
              <div>
                <Row className="align-items-center">
                  <Col lg={5} md={6}>
                    <div className="_info">
                      <div className="testimonial_img">
                        <img src={CUSTOMERS}
                          alt="" />
                      </div>
                    </div>
                  </Col>
                  <Col lg={7} md={6}>
                    <div className="about_details testimonial_details">
                      <div className="testimonial_star">
                        <img src={STAR}
                          alt="" />
                        <p>5.0</p>
                      </div>
                      <div className="testimonial_user">
                        <h4>Ali TUFAN</h4>
                        <p>Designer</p>
                        <h6>I'd suggest Macklin Motors Nissan Glasgow South to a friend
                          because I had great service from my salesman Patrick and all of
                          the team.</h6>
                      </div>
                    </div>

                  </Col>
                </Row>
              </div>
            </Slider>

          </Container>
        </div> */}
        {/* <Ourteam /> */}
        {/* <div className="make_easy_sec appstore-sec">
          <Container>
            <Row className="align-items-center">
              <Col lg={7} md={6} sm={12} className="order-lg-1 order-md-1 order-2">
                <div className="appstore_details">
                  <h6>Find the best second-hand car options near you.</h6>
                  <p>This way, you get the car you want without the new car price tag!</p>
                  <div className="app_store_img">
                    <img src={APPLE}
                      alt="" />
                    <img src={PLAY}
                      alt="" />
                  </div>

                </div>
              </Col>
              <Col lg={5} md={6} sm={12} className="order-lg-2 order-md-2 order-1>">
                <div className="app_info">
                  <div className="app_img">
                    <img src={APP}
                      alt="" />
                  </div>
                </div>
              </Col>

            </Row>
          </Container>
        </div> */}
        {/* <div className="make_easy_sec brands-sec">
          <Container>
            <Row className="align-items-center">
              <Col lg={6} md={6} sm={12} className="order-lg-1 order-md-1 order-2">
                <div className="brands_title">
                  <h6>Explore Our Premium Brands</h6>
                  <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id es</p>
                  <div className="button_start button_brand">
                    <Button
                      variant="primary">Show All BRANDS
                      <img src={WHITEUP}
                        alt="" />
                    </Button>
                  </div>

                </div>
              </Col>
              <Col lg={6} md={6} sm={12} className="order-lg-2 order-md-2 order-1">
                <div className="brand_info">
                  <div className="brand_img">
                    <img src={LOGOBRAND}
                      alt="" />
                  </div>
                </div>
              </Col>

            </Row>
          </Container>
        </div> */}
        {/* <Finding /> */}
        <Footer />



      </div>
    </>
  );
}
