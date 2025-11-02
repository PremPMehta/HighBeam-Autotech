// import { useState } from 'react'
// import './App.css'
// import Header from './compomnents/Header/Header'
// import About from './compomnents/About/About'
// import Service from './compomnents/Service/Service'
// import Ourteam from './compomnents/Ourteam/Ourteam'
// import Finding from './compomnents/Finding/Finding'

// import { Col, Container, Row ,Button } from 'react-bootstrap'
// import OFFER from "./assets/image/f1.png";
// import TRUST from "./assets/image/f2.png";
// import TRANSPARENT from "./assets/image/f3.png";
// import EXPERT from "./assets/image/f4.png";
// import VECTOR from "./assets/image/Up-Vector.png";
// import SUV from "./assets/image/suv.png";
// import H2 from "./assets/image/h72.png";
// import H3 from "./assets/image/h73.png";
// import H4 from "./assets/image/h74.png";
// import H5 from "./assets/image/h75.png";
// import CUSTOMERS from "./assets/image/customers.png";
// import STAR from "./assets/image/star-icon.png";
// import APPLE from "./assets/image/apple-store.png";
// import PLAY from "./assets/image/playstore.png";
// import APP from "./assets/image/app-w.Webp";
// import WHITEUP from "./assets/image/white-up.png";
// import LOGOBRAND from "./assets/image/logo-brand.png";
// import Footer from './compomnents/Footer/Footer'



// function App() {

//   return (
//     <>
//       <Header />

//       <div className="make_easy_sec browse_type">
//         <Container>
//           <Row>
//             <Col lg={12}>
//               <div className='make_easy-title browase_type-title'>
//                 <h2>Browse by Type</h2>
//                 <a href="#">View All  <img src={VECTOR}
//                   alt="" />  </a>
//               </div>
//             </Col>
//           </Row>
//           <Row>
//             <Col lg={2} md={6} sm={12}>
//               <div className="browse_box">
//                 <div className="browse_box_img_wrap">
//                   <img src={SUV}
//                     alt="" />
//                 </div>
//                 <div className="browse_box_text">
//                   <h4>3 Cars</h4>
//                   <p>SUV</p>
//                 </ div>
//               </div>
//             </Col>
//             <Col lg={2} md={6} sm={12}>
//               <div className="browse_box">
//                 <div className="browse_box_img_wrap">
//                   <img src={H2}
//                     alt="" />
//                 </div>
//                 <div className="browse_box_text">
//                   <h4>3 Cars</h4>
//                   <p>SUV</p>
//                 </ div>
//               </div>
//             </Col>
//             <Col lg={2} md={6} sm={12}>
//               <div className="browse_box">
//                 <div className="browse_box_img_wrap">
//                   <img src={H3}
//                     alt="" />
//                 </div>
//                 <div className="browse_box_text">
//                   <h4>3 Cars</h4>
//                   <p>SUV</p>
//                 </ div>
//               </div>
//             </Col>
//             <Col lg={2} md={6} sm={12}>
//               <div className="browse_box">
//                 <div className="browse_box_img_wrap">
//                   <img src={H4}
//                     alt="" />
//                 </div>
//                 <div className="browse_box_text">
//                   <h4>3 Cars</h4>
//                   <p>SUV</p>
//                 </ div>
//               </div>
//             </Col>
//             <Col lg={2} md={6} sm={12}>
//               <div className="browse_box">
//                 <div className="browse_box_img_wrap">
//                   <img src={H5}
//                     alt="" />
//                 </div>
//                 <div className="browse_box_text">
//                   <h4>3 Cars</h4>
//                   <p>SUV</p>
//                 </ div>
//               </div>
//             </Col>
//             <Col lg={2} md={6} sm={12}>
//               <div className="browse_box">
//                 <div className="browse_box_img_wrap">
//                   <img src={SUV}
//                     alt="" />
//                 </div>
//                 <div className="browse_box_text">
//                   <h4>3 Cars</h4>
//                   <p>SUV</p>
//                 </ div>
//               </div>
//             </Col>


//           </Row>
//         </Container>
//       </div>

//       <div className="make_easy_sec">
//         <Container>
//           <Row>
//             <Col lg={12}>
//               <div className='make_easy-title'>
//                 <h2>We Make It Easy</h2>
//               </div>
//             </Col>
//           </Row>
//           <Row>
//             <Col lg={3} md={6} sm={12}  >
//               <div className="make_easy">
//                 <div className="make_easy_img">
//                   <img src={OFFER}
//                     alt="" />
//                 </div>
//                 <h4>Special Financing Offers</h4>
//                 <p>Our stress-free finance department that can
//                   find financial solutions to save you money.</p>
//               </div>
//             </Col>
//             <Col lg={3} md={6} sm={12}>
//               <div className="make_easy">
//                 <div className="make_easy_img">
//                   <img src={TRUST}
//                     alt="" />
//                 </div>
//                 <h4>Trusted Car Dealership</h4>
//                 <p>Our stress-free finance department that can
//                   find financial solutions to save you money.</p>
//               </div>
//             </Col>
//             <Col lg={3} md={6} sm={12}>
//               <div className="make_easy">
//                 <div className="make_easy_img">
//                   <img src={TRANSPARENT}
//                     alt="" />
//                 </div>
//                 <h4>Transparent Pricing</h4>
//                 <p>Our stress-free finance department that can
//                   find financial solutions to save you money.</p>
//               </div>
//             </Col>
//             <Col lg={3} md={6} sm={12}>
//               <div className="make_easy">
//                 <div className="make_easy_img">
//                   <img src={EXPERT}
//                     alt="" />
//                 </div>
//                 <h4>Expert Car Service</h4>
//                 <p>Our stress-free finance department that can
//                   find financial solutions to save you money.</p>
//               </div>
//             </Col>

//           </Row>
//         </Container>
//       </div>
//       {/* <About /> */}
//       {/* <Service /> */}
//       <div className="make_easy_sec testimonial_sec">
//         <Container>
//           <Row>
//             <Col lg={12}>
//               <div className="make_easy-title testimonial_title">
//                 <h2>What our customers say</h2>
//                 <p>Rated 4.7 / 5 based on 28,370 reviews Showing our 4 & 5 star reviews</p>
//               </div>
//             </Col>
//           </Row>
//           <Row className="align-items-center">
//             <Col lg={6}>
//               <div className="_info">
//                 <div className="testimonial_img">
//                   <img src={CUSTOMERS}
//                     alt="" />
//                 </div>
//               </div>
//             </Col>
//             <Col lg={6}>
//               <div className="about_details testimonial_details">
//                 <div className="testimonial_star">
//                   <img src={STAR}
//                     alt="" />
//                   <p>5.0</p>
//                 </div>
//                 <div className="testimonial_user">
//                   <h4>Ali TUFAN</h4>
//                   <p>Designer</p>
//                   <h6>I'd suggest Macklin Motors Nissan Glasgow South to a friend
//                     because I had great service from my salesman Patrick and all of
//                     the team.</h6>
//                 </div>
//               </div>

//             </Col>

//           </Row>
//         </Container>
//       </div>
//       <Ourteam />
//       <div className="make_easy_sec appstore-sec">
//         <Container>
//           <Row className="align-items-center">
//             <Col lg={7}>
//               <div className="appstore_details">
//                 <h6>Shop used cars, whether you're
//                 on the lot or on the go</h6>
//                 <p>Download our app to save cars and create alerts, scan window stickers on our lot for more details,
//                 and even call dibs on a car by holding it for up to 7 days.</p>
//               <div className="app_store_img">
//               <img src={APPLE}
//                     alt="" />
//                      <img src={PLAY}
//                     alt="" />
//               </div>

//                 </div>
//             </Col>
//             <Col lg={5}>
//               <div className="app_info">
//                 <div className="app_img">
//                   <img src={APP}
//                     alt="" />
//                 </div>
//               </div>
//             </Col>

//           </Row>
//         </Container>
//       </div>
//       <div className="make_easy_sec brands-sec">
//         <Container>
//           <Row className="align-items-center">
//             <Col lg={6}>
//               <div className="brands_title">
//                 <h6>Explore Our Premium Brands</h6>
//                 <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
//                 deserunt mollit anim id es</p>
//                 <div className="button_start button_brand">
//                 <Button
//                  variant="primary">Show All BRANDS 
//                     <img src={WHITEUP}
//                     alt="" />
//                   </Button>
//                 </div>

//                 </div>
//             </Col>
//             <Col lg={6}>
//               <div className="brand_info">
//                 <div className="brand_img">
//                   <img src={LOGOBRAND}
//                     alt="" />
//                 </div>
//               </div>
//             </Col>

//           </Row>
//         </Container>
//       </div>
//       <Finding />
//       <Footer />
      





//     </>
//   )
// }

// export default App



import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { authProtectedRoutes } from "./Routers/allRouter";
import WhatsAppFloat from "./compomnents/WhatsAppFloat/WhatsAppFloat";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Map over protected routes */}
        {authProtectedRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}

        {/* Redirect invalid paths */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      <WhatsAppFloat />
    </Router>
  );
}

export default App;