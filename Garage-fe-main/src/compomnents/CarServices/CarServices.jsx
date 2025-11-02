import React from 'react'
import "./CarServices.css";
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';
import vector from "../../assets/image/Up-Vector.png";
import gif1 from "../../assets/image/gif1.gif";
import gif2 from "../../assets/image/gif2.gif";
import gif3 from "../../assets/image/gif3.gif";
import gif4 from "../../assets/image/gif4.gif";
import gif5 from "../../assets/image/gif5.gif";
import gif6 from "../../assets/image/gif6.gif";
import gif7 from "../../assets/image/gif7.gif";
import gif8 from "../../assets/image/gif8.gif";
import gif9 from "../../assets/image/gif9.gif";
import gif10 from "../../assets/image/gif10.gif";
import gif11 from "../../assets/image/gif11.gif";
import gif12 from "../../assets/image/gif12.gif";
import { Link } from 'react-router-dom';
import { getImageUrl } from '../../services/contentApi';

// Default services data
const defaultServices = [
    { id: 1, img: gif1, title: 'Periodic' },
    { id: 2, img: gif2, title: 'Car Spa & Cleaning' },
    { id: 3, img: gif3, title: 'AC Service & Repair' },
    { id: 4, img: gif4, title: 'Detailing Services' },
    { id: 5, img: gif5, title: 'Windshields & Lights' },
    { id: 6, img: gif6, title: 'Batteries' },
    { id: 7, img: gif7, title: 'Car Inspections' },
    { id: 8, img: gif8, title: 'Clutch & Body Parts' },
    { id: 9, img: gif9, title: 'Denting & Painting' },
    { id: 10, img: gif10, title: 'Insurance Claims' },
    { id: 11, img: gif11, title: 'Suspension & Fitments' },
    { id: 12, img: gif12, title: 'Tyres & Wheel Care' },
];

const CarServices = ({ content = null }) => {
    // Get services from content or use defaults
    const services = content?.services || defaultServices;
    const servicesHeader = content?.servicesHeader || { title: 'Cars Services Available In Surat' };

    return (
        <div className="make_easy_sec cars_service_sec">
            <Container>
                <Row>
                    <Col lg={12}>
                        <div className='make_easy-title browase_type-title'>
                            <h2>{servicesHeader.title || 'Cars Services Available In Surat'}</h2>
                            <Link to="/carrepair">View All  <img src={vector}
                                alt="" />
                            </Link>
                        </div>
                    </Col>
                </Row>
                <Row className='gy-4'>
                    {services.map((item, index) => (
                        <Col lg={3} md={6} sm={12} key={item.id || index}>
                            <Link to="/carrepair" className="text-decoration-none text-dark">
                                <div className="service_box">
                                    <div className="service_box_img_wrap">
                                        <img 
                                            src={getImageUrl(item.image, item.img)} 
                                            alt={item.title} 
                                        />
                                    </div>
                                    <div className="service_box_info">
                                        <div className="service_title">
                                            <h4>{item.title}</h4>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}

export default CarServices
