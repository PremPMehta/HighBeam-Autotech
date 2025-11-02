

import Container from 'react-bootstrap/Container';
import "./About.css";
import { Button, Col, Row } from 'react-bootstrap';
import Car from "../../assets/image/about-car.png";
import Check from "../../assets/image/check.png";
import whiteup from "../../assets/image/white-up.png";
import { Link } from 'react-router-dom';
import { getImageUrl } from '../../services/contentApi';

// Default about content
const defaultAbout = {
  image: Car,
  sectionTitle: 'Why Choose Us',
  features: [
    {
      title: 'Trusted Car Repair & Maintenance',
      description: 'From maintenance services to full engine overhauls, we provide end-to-end repair solutions with consistent quality and care.',
    },
    {
      title: 'Get in Touch with Experts',
      description: 'Need help with your car? Our experienced team is just a call away. We are ready to offer guidance, support and service you can trust and implement.',
    },
    {
      title: 'Backed by Years of Experience',
      description: 'With 15+ years of extensive industry knowledge and hands-on expertise, we bring efficient solutions that we have used for years to solve even the most complex automotive challenges.',
    },
  ],
  buttonText: 'Get Start',
};

function About({ content = null }) {
  // Get about content from props or use defaults
  const about = content?.about || defaultAbout;
  const features = about.features || defaultAbout.features;

  return (
    <>
      <div className="make_easy_sec about_sec">
        <Container>
          <Row className="align-items-xl-center align-items-lg-start">
            <Col lg={6}>
              <div className="about_info">
                <div className="about_img">
                  <img 
                    src={getImageUrl(about.image, Car)}
                    alt="" 
                  />
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="about_details">
                <h2>{about.sectionTitle || 'Why Choose Us'}</h2>
                {features.map((feature, index) => (
                  <div className="my-4" key={index}>
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                ))}
                <div className="button_start">
                  <Link to="/contact" className='btn'>
                    {about.buttonText || 'Get Start'}  
                    <img src={whiteup} alt="" />
                  </Link>
                </div>
              </div>

            </Col>

          </Row>
        </Container>
      </div>

    </>

  );
}
export default About;
