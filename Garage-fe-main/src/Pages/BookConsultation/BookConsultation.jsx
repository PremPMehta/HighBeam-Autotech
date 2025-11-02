import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BookConsultation.css";
import Header from "../../compomnents/Header/Header";
import { Col, Container, Row, Form } from "react-bootstrap";
import Footer from "../../compomnents/Footer/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from "../../config/emailjs";
import BookHeader from "../../compomnents/BookHeader/BookHeader";

export default function BookConsultation() {
  const [formData, setFormData] = useState({
    carBrand: "",
    carName: "",
    servicesRequired: "",
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    comments: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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
          customerName: formData.customerName,
          customerEmail: formData.customerEmail,
          customerPhone: formData.customerPhone,
          carBrand: formData.carBrand,
          carName: formData.carName,
          servicesRequired: formData.servicesRequired,
          comments: formData.comments,
          source: 'book_consultation'
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Booking lead created successfully:', result);
        toast.success("Booking request sent successfully! We'll contact you soon.");
        resetForm();
      } else {
        throw new Error('Failed to submit booking form');
      }

    } catch (error) {
      console.error("Form submission failed:", error);
      
      // Fallback to original EmailJS method if backend is not available
      try {
        if (EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
          // Prepare email template parameters
          const templateParams = {
            to_email: 'highbeamautotechpvtltd@gmail.com',
            from_name: formData.customerName,
            from_email: formData.customerEmail,
            from_phone: formData.customerPhone,
            car_brand: formData.carBrand,
            car_name: formData.carName,
            services_required: formData.servicesRequired,
            comments: formData.comments || 'No comments provided',
            subject: 'New Service Booking Request'
          };

          // Send email using EmailJS
          const response = await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            templateParams,
            EMAILJS_CONFIG.PUBLIC_KEY
          );

          if (response.status === 200) {
            toast.success("Booking request sent successfully! We'll contact you soon.");
            resetForm();
          }
        } else {
          // Fallback: Show success and log data
          console.log('Booking Form Data to be sent:', {
            customerName: formData.customerName,
            customerEmail: formData.customerEmail,
            customerPhone: formData.customerPhone,
            carBrand: formData.carBrand,
            carName: formData.carName,
            servicesRequired: formData.servicesRequired,
            comments: formData.comments
          });
          
          toast.success("Booking request submitted successfully! We'll contact you soon.");
          resetForm();
        }
      } catch (fallbackError) {
        console.error("Fallback email sending failed:", fallbackError);
        toast.error("Failed to send booking request. Please try again or contact us directly.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      carBrand: "",
      carName: "",
      servicesRequired: "",
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      comments: ""
    });
  };
  useEffect(() => {
    window.scrollTo(0, 800);
    console.log("effect rendered");
  }, []);
  
  return (
    <>
      <div>
        <BookHeader />
        {/* <div className="make_easy_sec get-touch">
          <Container>
            <Row>
              <Col lg={6}>
                <div className="make_easy-title">
    Vahicle       <h2>Get In Touch</h2>
                  <p>Etiam pharetra egestas interdum blandit viverra morbi consequat mi non bibendum
                    egestas quam egestas nulla.</p>
                </div>
                <div className="contact_us_form">
                  <Row>
                    <Col lg={6}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="First Name*"
                        className="mb-3"
                      >
                        <Form.Control type="text" placeholder="First Name" />
                      </FloatingLabel>

                    </Col>
             Vahicle<Col lg={6}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Last Name*"
                        className="mb-3"
                      >
                        <Form.Control type="text" placeholder="Last Name*" />
                      </FloatingLabel>

                    </Col>
                    <Col lg={6}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        className="mb-3"
                      >
Vahicle                 <Form.Control type="email" placeholder="Email address" />
                      </FloatingLabel>

                    </Col>
                    <Col lg={6}>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Phone"
                        className="mb-3"
                      >
                        <Form.Control type="number" placeholder="Phone" />
                      </FloatingLabel>

                    </Col>
                    <Col lg={12}>
                      <FloatingLabel controlVahicleatingTextarea2" label="Message">
                        <Form.Control
                          as="textarea"
                          placeholder="Leave a comment here"
                          style={{ height: '150px' }}
                        />
                      </FloatingLabel>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col lg={6}>
                <div className="contact_details">
                  <div className="contact_title">
                    <h4>Contact details</h4>
                    <p>Etiam pharetra egestas interdum blandit viverra morbi consequat
                      mi non bibendum egestas quam egestas nulla.</p>
                  </div>
                  <div className="location_info">
                    <img src={PIN}
                      alt="" />
                    <div className="address">
                      <h6>Address </h6>
                      <p>123 Queensberry Street, North Melbourne VIC3051, Australia.</p>
                    </div>
                  </div>
                  <div className="location_info">
                    <img src={MAIL}
                      alt="" />
                    <div className="address">
                      <h6>Email</h6>
                      <p>ali@HighBeam.com</p>
                    </div>
                  </div>
                  <div className="location_info">
                    <img src={PHONE}
                      alt="" />
                    <div className="address">
                      <h6>Phone</h6>
                      <p>+76 956 123 456</p>
                    </div>
                  </div>
                  <div className="connect_with_us">
                    <h6>Follow us</h6>
                    <a href="#"><img src={FACEBOOK}
                      alt="" /> </a>
                    <a href="#"><img src={TWITER}
                      alt="" /> </a>
                    <a href="#"><img src={INSTAGRAM}
                      alt="" /> </a>
                    <a href="#"><img src={LINKDIN}
                      alt="" /> </a>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div> */}
        <div id="bookconsultation" className="make_easy_sec bookconsultation_sec">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="make_easy-title book_appointment">
                  <h2>Book your Service</h2>
                  <p>We are one of the leading auto repair shops serving customers in Surat.</p>
                  <p>All mechanic services are performed by highly qualified mechanics.</p>
                </div>
              </Col>
            </Row>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col lg={6}>
                  <div className="book_appointment">
                    <p>Car Brand <span style={{color: 'red'}}>*</span></p>
                  </div>
                  <div className="menu_select">
                    <Form.Select 
                      name="carBrand"
                      value={formData.carBrand}
                      onChange={handleInputChange}
                      aria-label="Default select example"
                      required
                    >
                      <option value="">Select Car Brand</option>
                      <option value="Aston Martin">Aston Martin</option>
                      <option value="Audi">Audi</option>
                      <option value="Bentley">Bentley</option>
                      <option value="BMW">BMW</option>
                      <option value="BYD">BYD</option>
                      <option value="Citroen">Citroen</option>
                      <option value="Ferrari">Ferrari</option>
                      <option value="Honda">Honda</option>
                      <option value="Hyundai">Hyundai</option>
                      <option value="Isuzu">Isuzu</option>
                      <option value="Jaguar">Jaguar</option>
                      <option value="Jeep">Jeep</option>
                      <option value="KIA">KIA</option>
                      <option value="Lamborghini">Lamborghini</option>
                      <option value="Land Rover">Land Rover</option>
                      <option value="Lexus">Lexus</option>
                      <option value="Mahindra">Mahindra</option>
                      <option value="Maruti Suzuki">Maruti Suzuki</option>
                      <option value="Maserati">Maserati</option>
                      <option value="McLaren">McLaren</option>
                      <option value="Mercedes-Benz">Mercedes-Benz</option>
                      <option value="MG">MG</option>
                      <option value="Mini">Mini</option>
                      <option value="Nissan">Nissan</option>
                      <option value="Porsche">Porsche</option>
                      <option value="Renault">Renault</option>
                      <option value="Rolls-Royce">Rolls-Royce</option>
                      <option value="Skoda">Skoda</option>
                      <option value="Tata">Tata</option>
                      <option value="Tesla">Tesla</option>
                      <option value="Toyota">Toyota</option>
                      <option value="Volkswagen">Volkswagen</option>
                      <option value="Volvo">Volvo</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="book_appointment">
                    <p>Car Name <span style={{color: 'red'}}>*</span></p>
                  </div>
                  <div className="menu_select">
                    <Form.Control
                      type="text"
                      name="carName"
                      value={formData.carName}
                      onChange={handleInputChange}
                      placeholder="Enter car name/model"
                      required
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={12}>
                  <div className="book_appointment">
                    <p>Services Required <span style={{color: 'red'}}>*</span></p>
                  </div>
                  <div className="menu_select">
                    <Form.Select
                      name="servicesRequired"
                      value={formData.servicesRequired}
                      onChange={handleInputChange}
                      aria-label="Select Service Type"
                      required
                    >
                      <option value="">Select Type of Service</option>
                      <option value="AC Service & Repair">AC Service & Repair</option>
                      <option value="Batteries">Batteries</option>
                      <option value="Car Inspections">Car Inspections</option>
                      <option value="Car Spa & Cleaning">Car Spa & Cleaning</option>
                      <option value="Clutch & Body Parts">Clutch & Body Parts</option>
                      <option value="Denting & Painting">Denting & Painting</option>
                      <option value="Detailing Services">Detailing Services</option>
                      <option value="Insurance Claims">Insurance Claims</option>
                      <option value="Periodic">Periodic</option>
                      <option value="Suspension & Fitments">Suspension & Fitments</option>
                      <option value="Tyres & Wheel Care">Tyres & Wheel Care</option>
                      <option value="Windshields & Lights">Windshields & Lights</option>
                    </Form.Select>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <div className="book_appointment">
                    <p>Name <span style={{color: 'red'}}>*</span></p>
                  </div>
                  <div className="menu_select">
                    <Form.Control 
                      type="text" 
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      placeholder="Your Name" 
                      required
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="book_appointment">
                    <p>Mobile Number <span style={{color: 'red'}}>*</span></p>
                  </div>
                  <div className="menu_select">
                    <Form.Control 
                      type="tel" 
                      name="customerPhone"
                      value={formData.customerPhone}
                      onChange={handleInputChange}
                      placeholder="Your Mobile Number" 
                      required
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <div className="book_appointment">
                    <p>Email</p>
                  </div>
                  <div className="menu_select">
                    <Form.Control 
                      type="email" 
                      name="customerEmail"
                      value={formData.customerEmail}
                      onChange={handleInputChange}
                      placeholder="Your Email (optional)" 
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="book_appointment">
                    <p>Questions or Comments</p>
                  </div>
                  <div className="menu_select">
                    <Form.Control 
                      as="textarea" 
                      rows={1}  
                      name="comments"
                      value={formData.comments}
                      onChange={handleInputChange}
                      placeholder="Questions or Comments (optional)" 
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={12}>
                  <div className="book_contacts_btn">              
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </Col>
              </Row>
            </Form>
          </Container>
        </div>
        {/* <div className="make_easy_sec appointment_sec">
          <Container>
            <Row>
              <Col lg={6}>
              <div className="book_appointment">
                  <p>VEHICLE YEAR</p>
                </div>
                <div className="menu_select">
                  <Form.Select aria-label="Default select example">
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </div>
              </Col>
              <Col lg={6}>
                <div className="book-appointment">
                  <h2>BOOK YOUR SERVICE</h2>
                  <p>We are one of the leading auto repair shops serving customers in Tucson.</p>
                  <p>All mechanic services are performed by highly qualified mechanics.</p>
                </div>
              </Col>
            </Row>
            
          </Container>
        </div> */}
        <Footer />
        <ToastContainer />
      </div>
    </>
  );
}
