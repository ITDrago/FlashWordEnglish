import "./App.css";
import CRUD from "./CRUD";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function App() {
  return (
    <div className="App">
      <Navbar  style={{backgroundColor:"black"}}expand="lg" className="bg-body-tertiary">
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
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-danger">Logout</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <CRUD />
    </div>
  );
}

export default App;
