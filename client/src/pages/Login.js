import axios from "axios";
import React from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import {
  Container,
  Row,
  Col,
  Button,
  Form as BootstrapForm,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ setIsAuthenticated }) => {
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  function clear(formik) {
    formik.resetForm();
  }

  async function handleLogin(values, formik) {
    try {
      const response = await axios.post(
        "https://localhost:7281/api/Auth/login",
        {
          password: values.password,
          email: values.email,
        }
      );

      const token = response.data;
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      localStorage.setItem("email", values.email);
      navigate("/crud");
    } catch (error) {
      toast.error("Login information is incorrect");
      clear(formik);
    }
  }

  return (
    <Container
      style={{
        width: "700px",
        height: "500px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        padding: "15px",
        border: "2px solid #f3eded",
        boxShadow: "rgb(215, 225, 225) 20px -19px 20px 0px",
        marginTop: "170px",
        marginLeft: "600px",
      }}
    >
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <div className="slide-in">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="text-center">
                    <img
                      style={{ width: "150px" }}
                      src="../images/logo.png"
                      alt="Logo"
                    />
                    <h4>Login</h4>
                  </div>

                  <BootstrapForm.Group
                    controlId="formBasicEmail"
                    style={{ margin: 15 }}
                  >
                    <BootstrapForm.Label>Email</BootstrapForm.Label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      as={BootstrapForm.Control}
                      className={
                        errors.email && touched.email ? "is-invalid" : ""
                      }
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="invalid-feedback"
                    />
                  </BootstrapForm.Group>

                  <BootstrapForm.Group
                    controlId="formBasicPassword"
                    style={{ margin: 15 }}
                  >
                    <BootstrapForm.Label>Password</BootstrapForm.Label>
                    <Field
                      type="password"
                      name="password"
                      placeholder="Password"
                      as={BootstrapForm.Control}
                      className={
                        errors.password && touched.password ? "is-invalid" : ""
                      }
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="invalid-feedback"
                    />
                  </BootstrapForm.Group>

                  <div className="text-center">
                    <Button
                      variant="primary"
                      type="submit"
                      style={{ width: 290 }}
                    >
                      Login
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
