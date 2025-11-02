import React, { useLayoutEffect, useState } from "react";
import image from "../../assets/image/signup.png";
import { Form, Button, Container, Row, Col, InputGroup } from "react-bootstrap";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../redux/slices/authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registeringUser, setRegisteringUser] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      contactNo: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is Required").min(3).max(50),
      contactNo: Yup.string().required("contactNo is Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .required("Required"),
    }),
    onSubmit: (payload) => {
      try {
        setRegisteringUser(true);

        const finalPayload = {
          name: payload.name,
          contactNo: payload.contactNo,
          email: payload.email.toLowerCase(),
          password: payload.password,
        };
        dispatch(signup(finalPayload))
          .then((response) => {
            console.log(response.payload.status == 200);
            if (response.payload.status == 200) {
              setRegisteringUser(false);
              toast.success("Registration successful");
              alert("Registration successful");
              navigate("/login");
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
  useLayoutEffect(() => {
    if (authState.token && authState.token !== null) {
      navigate("/");
    }
  }, [authState]);
  return (
    <Container fluid>
      <Row className="sign_up_wrap">
        <Col md={6} className="order-xl-1 order-lg-1 order-md-1 order-2">
          <div className="sign_up_form">
            <div>
              <h2 className="heding text-center mb-3">Sign up</h2>
              <p className="text-center text-muted mb-4">
                Sign up to access your travelwise account
              </p>

              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Name <span style={{color: 'red'}}>*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    isInvalid={formik.touched.name && formik.errors.name}
                    placeholder="John doe"
                  />
                  <Form.Control.Feedback type="invalid" className="text-danger">
                    {formik.errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Contact No <span style={{color: 'red'}}>*</span></Form.Label>
                  <Form.Control
                    type="number"
                    name="contactNo"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.contactNo}
                    isInvalid={
                      formik.touched.contactNo && formik.errors.contactNo
                    }
                    placeholder="+91 1234567892"
                  />
                  <Form.Control.Feedback type="invalid" className="text-danger">
                    {formik.errors.contactNo}
                  </Form.Control.Feedback>
                </Form.Group>
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
                      type={showPassword ? "text" : "password"}
                      name="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      isInvalid={
                        formik.touched.password && formik.errors.password
                      }
                      placeholder="****************"
                    />
                    <InputGroup.Text
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "👁️" : "🔒"}
                    </InputGroup.Text>
                    <Form.Control.Feedback
                      type="invalid"
                      className="text-danger"
                    >
                      {formik.errors.password}
                    </Form.Control.Feedback>
                  </InputGroup>
                  <Form.Text muted>maximum length of utf 8 character</Form.Text>
                </Form.Group>

                <Button variant="primary" className="w-100" type="submit">
                  Signup
                </Button>
              </Form>
              <p className="signing_text condition-text text-sm text-gray-700">
                By signing up, you agree to our{" "}
                <a
                  href="/"
                  className="text-danger font-semibold hover:underline"
                >
                  Terms
                </a>{" "}
                and{" "}
                <a
                  href="/"
                  className="text-danger font-semibold hover:underline"
                >
                  Conditions
                </a>{" "}
                and{" "}
                <a
                  href="/"
                  className="text-black font-semibold hover:underline"
                >
                  Privacy Policy
                </a>
                .
              </p>
              <p className="account text-center mt-3">
                Don't have an account?{" "}
                <Link to="/login" className="text-danger">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </Col>
        <Col md={6} className="order-xl-2 order-lg-2 order-md-1 order-1 p-0">
          <div className="bg-image ">
            <img src={image} alt="" />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
