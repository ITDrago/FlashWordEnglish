import "./App.css";
import CRUD from "./CRUD";
import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Register from "./pages/Register";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  function logOut() {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  }

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      setIsAuthenticated(true);
    }
    const timeout = setTimeout(() => {
      setIsPageVisible(true);
      setShouldAnimate(false)
    }, 300); // Задержка в миллисекундах, здесь 300 мс (0.3 секунды)
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="App">
      <Navbar
        style={{ backgroundColor: "black" }}
        expand="lg"
        className="bg-body-tertiary"
      >
        <Container fluid>
          <Navbar.Brand href="#">Flash Word English</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#action1">Home</Nav.Link>
              {isAuthenticated ? (
                <Nav.Link href="/crud">Word</Nav.Link>
              ) : (
                <Nav.Link href="/login">Word</Nav.Link>
              )}
              {isAuthenticated ? (
                <Nav.Link href="#acrion2">Training</Nav.Link>
              ) : (
                <Nav.Link href="/login">Training</Nav.Link>
              )}
              {isAuthenticated ? (
                ""
              ) : (
                <Nav.Link href="/register">Register</Nav.Link>
              )}
              {isAuthenticated ? "" : <Nav.Link href="/login">Login</Nav.Link>}
            </Nav>
            <Form className="d-flex">
              {isAuthenticated ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Form.Control
                    type="text"
                    value={localStorage.getItem("email")}
                    className="me-2"
                    aria-label="Search"
                    readOnly
                  />
                  <NavLink
                    to="/login"
                    className="btn btn-outline-danger"
                    onClick={() =>{
                      logOut()
                      setShouldAnimate(false);
                    }}
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
        <Route
          path="/crud"
          element={
            <div className={shouldAnimate  ? "slide-in" : ""}>
              <CRUD />
            </div>  
          }
        />
        <Route
          path="/login"
          element={
            <div className={isPageVisible ? "slide-in" : "slide-out"}>
              <Login setIsAuthenticated={setIsAuthenticated}/>
            </div>
          }
        />
        <Route
          path="/register"
          element={
            <div className={isPageVisible ? "slide-in" : "slide-out"}>
              <Register />
            </div>
          }
        />
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
