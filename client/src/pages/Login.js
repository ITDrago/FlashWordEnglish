import axios from "axios";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { NavLink, useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const navigate = useNavigate();

  async function handelLogin(e) {
    e.preventDefault();
    getToken().then((token) => {
      if (token) {
        localStorage.setItem("email", userEmail);
        navigate("/crud");
      }
    });
  }

  async function getToken() {
    try {
      const response = await axios.post(
        "https://localhost:7281/api/Auth/login",
        {
          password: userPassword,
          email: userEmail,
        }
      );

      const token = response.data;
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      return token;
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Form
      style={{
        width: "700px",
        height: "500px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        padding: "15px",
        border: "2px solid #f3eded",
        marginTop: "170px",
        marginLeft: "610px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img style={{ width: "150px" }} src="../images/logo.png"></img>
        <h4>Login</h4>
      </div>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          type="email"
          placeholder="Enter email"
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
      </Form.Group>
      <NavLink
        variant="primary"
        type="submit"
        to="/crud"
        className="btn btn-primary"
        onClick={(e) => handelLogin(e)}
      >
        Login
      </NavLink>
    </Form>
  );
};

export default Login;
