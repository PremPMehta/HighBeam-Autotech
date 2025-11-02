import React, { useState } from "react";
import image from "../../assets/image/login.png";
import { Form, Button, Container, Row, Col, InputGroup } from "react-bootstrap";
import { FaLock, FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
const Login = () => {
  const [registeringUser, setRegisteringUser] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .required("Required"),
    }),
    onSubmit: (payload) => {
      try {
        setRegisteringUser(true);

        const finalPayload = {
          email: payload.email.toLowerCase(),
          password: payload.password,
        };
        dispatch(login(finalPayload))
          .then((response) => {
            console.log(response.payload.status == 200);
            if (response.payload.status == 200) {
              setRegisteringUser(false);
              toast.success("Registration successful");
              navigate("/");
            } else {
              setRegisteringUser(false);
              toast.error(response.payload);
            }
          })
          .catch((err) => {
            console.log(err);
            setRegisteringUser(false);
            toast.error(err);
          });
      } catch (error) {
        toast.error(error);
        console.log(error);
      }
    },
  });
  return (
    <Container fluid>
      <Row className="login_up_wrap">
        <Col md={6} className="order-xl-1 order-lg-1 order-md-1 order-2">
          <div className="login_up_form">
            <div>
              <h2 className="text-center mb-3">Login</h2>
              <p className="text-center text-muted mb-4">
                Login to access your travelwise account
              </p>

              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email <span style={{color: 'red'}}>*</span></Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    isInvalid={formik.touched.email && formik.errors.email}
                    placeholder="John.doe@gmail.com"
                  />
                  <Form.Control.Feedback type="invalid" className="text-danger">
                    {formik.errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password <span style={{color: 'red'}}>*</span></Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="password"
                      name="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      isInvalid={
                        formik.touched.password && formik.errors.password
                      }
                      placeholder="****************"
                    />
                    <InputGroup.Text>🔒</InputGroup.Text>
                    <Form.Control.Feedback
                      type="invalid"
                      className="text-danger"
                    >
                      {formik.errors.password}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Form.Check
                    type="checkbox"
                    id="remember"
                    label="Remember me"
                  />
                  <a href="#" className="text-danger">
                    Forgot Password?
                  </a>
                </div>

                <Button variant="primary" className="w-100" type="submit">
                  Login
                </Button>
              </Form>

              <p className="text-center mt-3">
                Don't have an account?{" "}
                <Link to="/signup" className="text-danger">
                  Sign up
                </Link>
              </p>

              {/* <div className="mt-4 text-center">
                <p className="text-muted mb-2">Or login with</p>
                <div className="d-flex justify-content-center gap-3">
                  <Button className="google-btn" variant="outline-secondary">
                    <FaGoogle
                      style={{
                        background:
                          "linear-gradient(45deg, #4285F4, #DB4437, #F4B400, #0F9D58)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    />
                  </Button>
                  <Button className="facebook-btn" variant="outline-secondary">
                    <FaFacebook />
                  </Button>
                  <Button className="apple-btn" variant="outline-secondary">
                    <FaApple />
                  </Button>
                </div>
              </div> */}
            </div>
          </div>
        </Col>
        <Col md={6} className="order-xl-2 order-lg-2 order-md-2 order-1 p-0">
          <div className="bg-image">
            <img src={image} alt="" />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
