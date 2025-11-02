

import Container from 'react-bootstrap/Container';
import "./Footer.css";
import { Button, Col, Row, } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { IoLogoYoutube } from 'react-icons/io';






function Footer() {
  return (
    <>
      <div className="make_easy_sec footer_sec">
        <Container>
          {/* <Row className="footer_top">
            <Col lg={6}>
              <div className="footer_info">
                <div className="footer_logo">
                  <h6>Connect with us !</h6>
                  <p>Stay updated with offers, new deals and a lot more.</p>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="footer_info">
                <div className="footer_search_bar">
                  <Form>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Link to="/signup" className='btn sign_up'>Sign Up</Link>
                  </Form>
                </div>
              </div>
            </Col>
          </Row> */}
          <Row className="footer_middle">
            <Col lg={3} sm={6} col={12}>
              <div className="footer_menu">
                <h4>About Us</h4>
                <div className="company_detail">
                  <p>High Beam Auto Tech Private Limited is a testament to the relentless pursuit of excellence in the automotive industry.</p>
                </div>
              </div>
            </Col>
            <Col lg={3} sm={6} col={12} >
              <div className="footer_menu">
                <h4>Quick Links</h4>
                <Link to="/">Home</Link>
                <Link to="/about">AboutUs</Link>
                <Link to="/contact">Contact Us</Link>
              </div>
            </Col>
            <Col lg={3} sm={6} col={12}>
              <div className="footer_menu">
                <h4>Our Brands</h4>
                <div className="brand_tags">
                  <span className="brand_tag">Audi</span>
                  <span className="brand_tag">BMW</span>
                  <span className="brand_tag">Honda</span>
                  <span className="brand_tag">Hyundai</span>
                  <span className="brand_tag">KIA</span>
                  <span className="brand_tag">Mahindra</span>
                  <span className="brand_tag">Maruti Suzuki</span>
                  <span className="brand_tag">Mercedes-Benz</span>
                  <span className="brand_tag">MG</span>
                  <span className="brand_tag">Nissan</span>
                  <span className="brand_tag">Skoda</span>
                  <span className="brand_tag">Tata</span>
                  <span className="brand_tag">Toyota</span>
                  <span className="brand_tag">Volkswagen</span>
                  <span className="brand_tag view_all" onClick={() => window.location.href = '/about#brands-we-work-with'}>+15 More</span>
                </div>
              </div>
            </Col>
            {/* <Col lg={2} sm={4} col={12}>
              <div className="footer_menu">
                <h4>Vehicles Type</h4>
                <a href="#">Sedan</a>
                <a href="#">Hatchback</a>
                <a href="#">SUV</a>
                <a href="#">Hybrid</a>
                <a href="#">Electric</a>
                <a href="#">Coupe</a>
                <a href="#">Truck</a>
                <a href="#">Convertible</a>
              </div>
            </Col> */}
            <Col lg={3} sm={6} col={12}>
              <div className="footer_menu">
                <h4>Sale Hours</h4>
                <div className="sale_hours">
                  <div className="hours_item">
                    <span className="day">Monday – Friday</span>
                    <span className="time">09:00 AM – 09:00 PM</span>
                  </div>
                  <div className="hours_item">
                    <span className="day">Saturday</span>
                    <span className="time">09:00 AM – 07:00 PM</span>
                  </div>
                  <div className="hours_item closed">
                    <span className="day">Sunday</span>
                    <span className="time">Closed</span>
                  </div>
                </div>
              </div>
              <div className="connect_with_us">
                <Link to="https://www.facebook.com/people/High-Beam-Auto-Tech-Pvt-Ltd/61564380057760/#" target='_blank'><FaFacebookF /></Link>
                <Link to="https://www.instagram.com/highbeamautotech/?hl=en" target='_blank'><FaInstagram /></Link>
                <Link to="https://www.youtube.com/@highbeamautotech" target='_blank'><IoLogoYoutube /></Link>
              </div>
            </Col>
          </Row>
        </Container>
        <div className="footer_bottom">
          <Container>
            <Row>
              <Col lg={6}>
                <div className="copy_right_title">
                  <p><a href="#">© 2025 𝗛𝗶𝗴𝗵 𝗕𝗲𝗮𝗺 𝗔𝘂𝘁𝗼 𝗧𝗲𝗰𝗵 𝗣𝘃𝘁.𝗹𝘁𝗱.</a></p>
                </div>
              </Col>
              <Col lg={6}>
                <div className="footer_team">
                  <a
                    className=""
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasBottom"
                    aria-controls="offcanvasBottom"
                  >
                    Terms & Conditions
                  </a>
                  <div
                    className="offcanvas offcanvas-bottom"
                    tabIndex="-1"
                    id="offcanvasBottom"
                    aria-labelledby="offcanvasBottomLabel"
                  >
                    <div className="offcanvas-header">
                      <h5 className="offcanvas-title" id="offcanvasBottomLabel">
                        Terms & Conditions
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="offcanvas-body small">
                      <p>For the purpose of these Terms and Conditions, the term “we”, “us”, “our” used anywhere on this page shall mean HIGH BEAM AUTO TECH PRIVATE LIMITED, whose registered office is located in VIP Circle, Sudama Chowk, opp. IT Park, Mota Varachha, Surat, Gujarat 394101. “You”, “your”, “user”, “visitor” shall mean any natural or legal person who is visiting our website and/or has agreed to purchase products or services from us.</p>
                      <h5 className='fw-semibold mb-3'>Your use of the website and/or purchase from us is governed by the following Terms and Conditions:</h5>
                      <ul>
                        <li>The content of the pages of this website is subject to change without notice.</li>
                        <li>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness, or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors, and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</li>
                        <li>Your use of any information or materials on our website and/or product or service pages is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services, or information available through our website meet your specific requirements.</li>
                        <li>Our website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance, and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</li>
                        <li>All trademarks reproduced on our website which are not the property of, or licensed to, the operator are acknowledged on the website.</li>
                        <li>Unauthorized use of information provided by us shall give rise to a claim for damages and/or be a criminal offense.</li>
                        <li>From time to time, our website may also include links to other websites. These links are provided for your convenience to provide further information.</li>
                        <li>You may not create a link to our website from another website or document without HIGH BEAM AUTO TECH PRIVATE LIMITED’s prior written consent.</li>
                        <li>Any dispute arising out of the use of our website and/or any transaction or engagement with us is subject to the laws of India.</li>
                        <li>We shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any transaction, on account of the cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time.</li>
                        <li>Users can book service and repair appointments online. Additionally, vehicle pickup/drop may be arranged depending on the service type and location.</li>
                        <li>Online payments are supported and may include Razorpay, RTGS, UPI and Bank Transfers.</li>
                        <li>We follow a 7-day replacement policy exclusively for parts sold, in cases where the part is found to be defective or not functioning as promised. Please note that this policy does not apply to any services rendered, including repairs or maintenance. We do not offer refunds or replacements for completed services.</li>
                      </ul>

                    </div>
                  </div>
                  <a
                    className=""
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasPrivacy"
                    aria-controls="offcanvasPrivacy"
                  >
                    Privacy Notice
                  </a>
                  <div
                    className="offcanvas offcanvas-bottom"
                    tabIndex="-1"
                    id="offcanvasPrivacy"
                    aria-labelledby="offcanvasPrivacyLabel"
                  >
                    <div className="offcanvas-header">
                      <h5 className="offcanvas-title" id="offcanvasPrivacyLabel">
                        Privacy Notice
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="offcanvas-body small">
                      <p>This privacy policy sets out how HIGH BEAM AUTO TECH PRIVATE LIMITED uses and protects any information that you give HIGH BEAM AUTO TECH PRIVATE LIMITED when you visit their website and/or agree to purchase products or services from them.</p>
                      <p>HIGH BEAM AUTO TECH PRIVATE LIMITED is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, and then you can be assured that it will only be used in accordance with this privacy statement.</p>
                      <p>HIGH BEAM AUTO TECH PRIVATE LIMITED may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you adhere to these changes.</p>

                      <h5 className='fw-semibold mb-3'>We may collect the following information:</h5>
                      <ul>
                        <li>Name</li>
                        <li>Contact information including email address</li>
                        <li>Demographic information such as postcode, preferences and interests, if required</li>
                        <li>Vehicle-related details, such as make, model, registration number and service history, where applicable</li>
                        <li>Other information relevant to customer surveys and/or offers</li>
                      </ul>
                      <p>What We Do With the Information We Gather</p>
                      <p>We collect this information to better understand your needs and deliver high-quality automotive services. Specifically, we use the information for the following purposes:</p>
                      <ul>
                        <li>Internal record keeping, including service history and vehicle details.</li>
                        <li>To improve our range of services, including car repairs, parts sales, vehicle reconditioning and resale processes.</li>
                        <li>To notify you about upcoming car repair workshops, new parts arrivals, special offers, or other automotive services that may interest you, using the contact details you provide.</li>
                        <li>From time to time, we may contact you for market research or feedback to help us enhance our offerings. We may reach out via email, phone, or postal mail.</li>
                        <li>To personalize your experience on our website based on your preferences and past interactions.</li>
                      </ul>
                      <p className='mt-3'>We are committed to protecting your information. To prevent unauthorized access or disclosure, we have implemented appropriate physical, electronic, and managerial safeguards.</p>
                      <p>How we use cookies</p>
                      <p>A cookie is a small file which asks permission to be placed on your computer’s hard drive. Once you agree, the file is added and the cookie helps analyze web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, likes and dislikes by gathering and remembering information about your preferences.</p>
                      <p>We use traffic log cookies to identify which pages are being used. This helps us analyze data about webpage traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system.</p>
                      <p>Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us.</p>
                      <p>You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website.</p>
                   
                      <p>Controlling your personal information</p>
                      <h5 className='fw-semibold mb-3'>You may choose to restrict the collection or use of your personal information in the following ways:</h5>
                      <ul>
                        <li>whenever you are asked to fill in a form on the website, look for the box that you can click to indicate that you do not want the information to be used by anybody for direct marketing purposes</li>
                        <li>if you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by writing to or emailing us at <a className='text-primary' href="mailto:highbeamautotechpvtltd@gmail.com">highbeamautotechpvtltd@gmail.com</a></li>
                        <p className='mt-3'>We will not sell, distribute or lease your personal information to third parties unless we have your permission or are required by law to do so. We may use your personal information to send you promotional information about third parties which we think you may find interesting if you tell us that you wish this to happen.</p>
                      </ul>
                    </div>
                  </div>
                  <a
                    className=""
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRefund"
                    aria-controls="offcanvasRefund"
                  >
                    Refund Policy
                  </a>
                  <div
                    className="offcanvas offcanvas-bottom"
                    tabIndex="-1"
                    id="offcanvasRefund"
                    aria-labelledby="offcanvasRefundLabel"
                  >
                    <div className="offcanvas-header">
                      <h5 className="offcanvas-title" id="offcanvasRefundLabel">
                        Refund Policy
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="offcanvas-body small">
                      <h5 className='fw-semibold mb-3'>Refund/Replacement policy:</h5>
                      <p>For the purposes of this Refund and Replacement Policy, the terms “we,” “us,” and “our” refer to High Beam Auto Tech Private Limited, having its registered office at VIP Circle, Sudama Chowk, Opp. IT Park, Mota Varachha, Surat, Gujarat – 394101. The terms “you,” “your,” “user,” or “customer” refer to any individual or entity who visits our website and/or purchases products or services from us.</p>
                      <p>We follow a 7-day replacement policy for parts and accessories purchased through our website, applicable only if the item is defective or not functioning as promised. This policy does not apply to services such as repairs or maintenance. Please note that we do not offer refunds or replacements for completed services.</p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

    </>

  );
}
export default Footer;
