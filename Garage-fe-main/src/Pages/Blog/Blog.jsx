import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Blog.css";
import Header from "../../compomnents/Header/Header";
import { Col, Container, Form, Row } from "react-bootstrap";
import ADMINIMG from "../../assets/image/admin-img.png";
import BLOG from "../../assets/image/blog.png";
import TWITERTWO from "../../assets/image/twiter-two.png";
import DETAIL from "../../assets/image/detail-post.png";
import Footer from "../../compomnents/Footer/Footer";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

export default function AboutUs() {
  return (
    <>
      <div>
        <Header />
        <div className="make_easy_sec blog_info">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="make_easy-title blog_title">
                  <h2>BMW X6 M50i is designed to exceed your sportiest.</h2>
                </div>
                <div className="admin_bar">
                  <div className="admin-img">
                    <a href="#"> <img src={ADMINIMG} alt="" />Admin</a>
                  </div>
                  <div className="admin-img">
                    <a href="#">Exterior</a>
                  </div>
                  <div className="admin-img">
                    <a href="#">November 22, 2023</a>
                  </div>
                </div>
                <div className="blog_car_info">
                  <img src={BLOG} alt="" />
                </div>
                <div className="blog_details">
                  <p>Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan nec. Quisque bibendum orci ac nibh facilisis, at malesuada orci
                    congue. Nullam tempus sollicitudin cursus. Ut et adipiscing erat. Curabitur this is a text link libero tempus congue.</p>
                  <p>Duis mattis laoreet neque, et ornare neque sollicitudin at. Proin sagittis dolor sed mi elementum pretium. Donec et justo ante.
                    Vivamus egestas sodales est, eu rhoncus urna semper eu. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus. Integer tristique elit lobortis purus bibendum, quis dictum metus mattis. Phasellus posuere felis sed eros porttitor
                    mattis. Curabitur massa magna, tempor in blandit id, porta in ligula. Aliquam laoreet nisl massa, at interdum mauris sollicitudin et.</p>
                </div>
                <div className="picks_ford">
                  <p>Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan nec. Quisque bibendum orci ac nibh facilisis, at
                    malesuada orci congue.</p>
                  <p className="luis">Luis Pickford</p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="make_easy_sec blog_requirements">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="blog_car_info">
                  <img src={DETAIL} alt="" />
                </div>
              </Col>
              <Col lg={12}>
                <div className="share">
                  <a href="#">Share this post </a>
                  <div className="twiter_post">
                    <a href="#"><img src={TWITERTWO} alt="" /></a>
                    <a href="#"><img src={TWITERTWO} alt="" /></a>
                    <a href="#"><img src={TWITERTWO} alt="" /></a>
                  </div>
                  <div className="exterior">
                    <button type="button" class="btn btn-light">
                      Comments
                    </button>
                  </div>
                </div>
              </Col>
              <Col lg={12}>
                <div className="comment-bar">
                  <div className="comment_admin_img">
                  <div className="admin-img">
                    <a href="#"> <img src={ADMINIMG} alt="" /></a>
                  </div>
                  <div className="admin">
                    <h6>Admin</h6>
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
                      aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                      ipsam voluptatem quia voluptas sit.</p>
                  </div>
                  </div>
                  <div className="replay">
                    <a href="#">Replay</a>
                  </div>
                </div>
              </Col>
              <Col lg={12}>
                <div className="preview-next-btn">
                 <div className="preview-btn">
                  <a href="#"><FaChevronLeft /> Previous Post</a>
                  <p>BMW X5 Gold 2024 Sport Review: Light on Sport</p>
                 </div>
                 <div className="next-btn">
                  <a href="#"><FaChevronRight /> Next Post</a>
                  <p>BMW X5 Gold 2024 Sport Review: Light on Sport</p>
                 </div>
                </div>
              </Col>
              <Col lg={12}>
              <div className="three_comments">
              <h6>3 Comments</h6>
              </div>
              </Col>
              <Col lg={12}>
                <div className="comments">
                <div className="comments_user">
                <div className="comment_admin_img">
                  <div className="admin-img">
                    <a href="#"> <img src={ADMINIMG} alt="" /></a>
                  </div>
                  <div className="Comment_user">
                    <h6>admin</h6>
                    <p>November 22, 2023</p>
                  </div>
                  
                  </div>
                  <div className="replay">
                    <a href="#">Replay</a>
                  </div>
                  

                </div>
                <div className="Comments-info">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enimad minim veniam.</p>
                </div>
                </div>
              </Col>
              <Col lg={12}>
              <div className="comments">
                <div className="comments_user">
                <div className="comment_admin_img">
                  <div className="admin-img">
                    <a href="#"> <img src={ADMINIMG} alt="" /></a>
                  </div>
                  <div className="Comment_user">
                    <h6>admin</h6>
                    <p>November 22, 2023</p>
                  </div>
                  
                  </div>
                  <div className="replay">
                    <a href="#">Replay</a>
                  </div>
                  

                </div>
                <div className="Comments-info">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enimad minim veniam.</p>
                </div>
                </div>
              </Col>
              <Col lg={12}>
              <div className="comments">
                <div className="comments_user">
                <div className="comment_admin_img">
                  <div className="admin-img">
                    <a href="#"> <img src={ADMINIMG} alt="" /></a>
                  </div>
                  <div className="Comment_user">
                    <h6>admin</h6>
                    <p>November 22, 2023</p>
                  </div>
                  
                  </div>
                  <div className="replay">
                    <a href="#">Replay</a>
                  </div>
                  

                </div>
                <div className="Comments-info">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enimad minim veniam.</p>
                </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        {/* <div className="blog_contact_form">
          <Container>
        <Row>
                <Col lg={12}>
                <div className="vechicle_year">
                <p>CONTACT DETAILS</p>
              </div>
                </Col>
                <Col lg={6}>
                <div className="book_contacts">
                <Form.Control type="text" placeholder="YOUR NAME" />
                </div>
                </Col>
                <Col lg={6}>
                <div className="book_contacts">
                <Form.Control type="text" placeholder="YOUR NAME" />
                </div>
                </Col>
                <Col lg={12}>
                <div className="book_contacts">
                <Form.Control type="email" placeholder="YOUR EMAIL" />
                </div>
                </Col>
                <Col lg={12}>
                <div className="book_contacts">
                <Form.Control type="phone" placeholder="YOUR PHONE" />
                </div>
                </Col>
                <Col lg={12}>
                <div className="book_contacts">
                <Form.Control as="textarea" rows={3}  placeholder="QUESTIONS OR COMMENTS" />
                </div>
                </Col>
                <Col lg={3}>
                <div className="book_contacts_btn">              
                  <button type="button">Send Message</button>
                </div>
                </Col>


              </Row>
              </Container>
        </div> */}
        <Footer />
      </div>
    </>
  );
}
