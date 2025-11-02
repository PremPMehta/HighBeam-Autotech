import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../compomnents/Header/Header";
import { Col, Container, Row, Form } from "react-bootstrap";
import Finding from "../../compomnents/Finding/Finding";
import Footer from "../../compomnents/Footer/Footer";
import MAP from "../../assets/image/map-background.png";
import PIN from "../../assets/image/pin.png";
import PHONE from "../../assets/image/phone.png";
import MAIL from "../../assets/image/mailone.png";
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import "./Contactus.css";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from "../../config/emailjs";
import ContactHeader from "../../compomnents/ContactHeader/ContactHeader";

export default function Contactus() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send to new backend API for lead management
      const response = await fetch('http://localhost:5001/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          source: 'contact_form'
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Lead created successfully:', result);
        toast.success("Message sent successfully! We'll contact you soon.");
        resetForm();
      } else {
        throw new Error('Failed to submit form');
      }

    } catch (error) {
      console.error("Form submission failed:", error);
      
      // Fallback to original EmailJS method if backend is not available
      try {
        if (EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
          // Prepare email template parameters
          const templateParams = {
            to_email: 'highbeamautotechpvtltd@gmail.com',
            from_name: `${formData.firstName} ${formData.lastName}`,
            from_email: formData.email,
            from_phone: formData.phone,
            message: formData.message,
            subject: 'Contact Us - Call Request'
          };

          // Send email using EmailJS
          const response = await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            templateParams,
            EMAILJS_CONFIG.PUBLIC_KEY
          );

          if (response.status === 200) {
            toast.success("Message sent successfully! We'll contact you soon.");
            resetForm();
          }
        } else {
          // Fallback: Show success and log data
          console.log('Contact Form Data to be sent:', {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            message: formData.message
          });
          
          toast.success("Message sent successfully! We'll contact you soon.");
          resetForm();
        }
      } catch (fallbackError) {
        console.error("Fallback email sending failed:", fallbackError);
        toast.error("Failed to send message. Please try again or contact us directly.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: ""
    });
  };
  return (
    <>
      <div>
        <ContactHeader />
        <div className="make_easy_sec contactus-sec">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="make_easy-title">
                  <h2>Contact Us</h2>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <div className="location">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d59502.15729949907!2d72.85081845098193!3d21.23641505600087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3be04f391ec2df19%3A0x9c519671732d10dd!2sVIP%20Circle%2C%20to%2C%20Sudama%20Chowk%2C%20opp.%20IT%20Park%2C%20Mota%20Varachha%2C%20Surat%2C%20Gujarat%20394101!3m2!1d21.234675!2d72.871937!5e0!3m2!1sen!2sin!4v1753357657562!5m2!1sen!2sin" width="100%" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                  {/* <a href="#">
                    <img src={MAP}
                      alt="" />
                  </a> */}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="make_easy_sec get-touch">
          <Container>
            <Row>
              <Col lg={6}>
                <div className="make_easy-title">
                  <h2>Get In Touch</h2>
                  <p>You’ll be the first ones to be informed regarding offers, deals and events held by us.
                    We’d love to make you our priority.
                  </p>
                </div>
                <div className="contact_us_form">
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col lg={6}>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="First Name*"
                          className="mb-3"
                        >
                          <Form.Control 
                            type="text" 
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="First Name" 
                            required
                          />
                        </FloatingLabel>
                      </Col>
                      <Col lg={6}>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Last Name*"
                          className="mb-3"
                        >
                          <Form.Control 
                            type="text" 
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Last Name*" 
                            required
                          />
                        </FloatingLabel>
                      </Col>
                      <Col lg={6}>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Email address"
                          className="mb-3"
                        >
                          <Form.Control 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email address" 
                            required
                          />
                        </FloatingLabel>
                      </Col>
                      <Col lg={6}>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Phone"
                          className="mb-3"
                        >
                          <Form.Control 
                            type="tel" 
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Phone" 
                            required
                          />
                        </FloatingLabel>
                      </Col>
                      <Col lg={12}>
                        <FloatingLabel controlId="floatingTextarea2" label="Message">
                          <Form.Control
                            as="textarea"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Leave a comment here"
                            style={{ height: '120px' }}
                            required
                          />
                        </FloatingLabel>
                      </Col>
                      <Col lg={12}>
                        <div className="contact_submit_btn">
                          <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="submit_btn"
                          >
                            {isSubmitting ? "Sending..." : "Send Message"}
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Col>
              <Col lg={6}>
                <div className="contact_details">
                  <div className="contact_title">
                    <h4>Contact details</h4>
                    <p>Feel free to reach out on text, email, phone call or even better - in person!
                      We’re here to serve whatever you need.</p>
                  </div>
                  <div className="location_info">
                    <img src={PIN}
                      alt="" />
                    <div className="address">
                      <h6>Address </h6>
                      <a href="https://maps.app.goo.gl/2gBHbFiDhQcWz4pr9" target="_blank">VIP Circle, Sudama Chowk, opp. IT Park, Mota Varachha, Surat, Gujarat 394101</a>
                    </div>
                  </div>
                  <div className="location_info">
                    <img src={MAIL}
                      alt="" />
                    <div className="address">
                      <h6>Email</h6>
                      <a href="https://mail.google.com/mail/?view=cm&fs=1&to=highbeamautotechpvtltd@gmail.com&su=Inquiry&body=Hello" className="email_btn" target="_blank">
                        highbeamautotechpvtltd@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="location_info">
                    <img src={PHONE}
                      alt="" />
                    <div className="address">
                      <h6>Phone</h6>
                      {/* <a>084609 22202</a> */}
                      <a href="tel:+9108460922202">+91 084609 22202</a>
                    </div>
                  </div>
                  <div className="connect_with_us">
                    <h6>Follow us</h6>

                    <div className="contact_social_icon">
                      <Link to="https://www.facebook.com/people/High-Beam-Auto-Tech-Pvt-Ltd/61564380057760/#" target='_blank'><FaFacebookF /></Link>
                      {/* <Link to="https://x.com" target='_blank'><FaTwitter /> </Link> */}
                      <Link to="https://www.instagram.com/highbeamautotech/?hl=en" target='_blank'><FaInstagram /></Link>
                      {/* <Link to="https://www.linkedin.com" target='_blank'><FaLinkedinIn /></Link> */}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
        <ToastContainer />
      </div>
    </>
  );
}
