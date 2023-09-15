import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Row, Col, Form as BootstrapForm } from "react-bootstrap";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Register = () => {
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required").min(3, "Too short"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  const [showLogin, setShowLogin] = useState(false);

  async function handleRegister(values) {
    try {
      const url = "https://localhost:7281/api/Auth/register";
      const data = {
        email: values.email,
        password: values.password,
      };
      await axios.post(url, data).then((result) => {
        if (result.status === 200) {
          toast.success("Account has been created!");
          setTimeout(() => {
            setShowLogin(true);
          }, 500); // Задержка в миллисекундах
          navigate("/login");
        }
      });
    } catch (error) {
      console.log(error);
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
              onSubmit={handleRegister}
            >
              {({ errors, touched, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="text-center">
                    <img
                      style={{ width: "150px" }}
                      src="../images/logo.png"
                      alt="Logo"
                    />
                    <h4>Register</h4>
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
                      Create Account
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

export default Register;
