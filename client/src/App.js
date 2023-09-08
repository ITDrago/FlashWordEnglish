import "./App.css";
import CRUD from "./CRUD";
import { NavLink, Navigate, Outlet, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Register from "./pages/Register";

function App() {
  const [isAuticated, setIsAuticated] = useState(false);
  const [email, setEmail] = useState("");

  function logOut() {
    setIsAuticated(false);
    localStorage.removeItem("token");
    setEmail("");
  }

  let linkComponent;
  {
    isAuticated
      ? (linkComponent = <Navigate to="/crud" />)
      : (linkComponent = (
          <Login setIsAuticated={setIsAuticated} setEmail={setEmail} />
        ));
  }

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      setIsAuticated(true);
      // setDecodedToken(jwt.decode(localStorage.getItem("token")));
    }
  }, []);

  return (
    <div className="App">
      <Navbar
        style={{ backgroundColor: "black" }}
        expand="lg"
        className="bg-body-tertiary"
      >
        <Container fluid>
          <Navbar.Brand href="#">FlashWordEnglish</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Word</Nav.Link>
              <Nav.Link href="#">Training</Nav.Link>
              {isAuticated ? (
                ""
              ) : (
                <Nav.Link href="/register">Register</Nav.Link>
              )}
            </Nav>
            <Form className="d-flex">
              {isAuticated ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Form.Control
                    type="text"
                    value={email}
                    className="me-2"
                    aria-label="Search"
                    readOnly
                  />
                  <NavLink
                    to="/login"
                    className="btn btn-outline-danger"
                    onClick={logOut}
                  >
                    Logout
                  </NavLink>
                </div>
              ) : (
                ""
              )}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/crud" element={<CRUD />} />
        <Route path="/register" element={<AuthRoutes />} />
        <Route path="/*" element={<Navigate to="/Login" />} />
      </Routes>
      {linkComponent}
    </div>
  );
}
function AuthRoutes() {
  return (
    <div>
      <Register />
    </div>
  );
}

export default App;
