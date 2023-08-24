import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CRUD = () => {
  const words = [
    {
      id: 1,
      text: "Planet",
      translate: "Планета",
    },
    {
      id: 2,
      text: "Word",
      translate: "Слово",
    },
  ];

  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [word, setWord] = useState("");
  const [translate, setTranslate] = useState("");

  const [editWord, setEditWord] = useState("");
  const [editTranslate, setEditTranslate] = useState("");

  useEffect(() => {
    setData(words);
  }, []);

  const handleEdit = (id) => {
    handleShow();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you shure delete this word")) alert(id);
  };

  const handleUpdate = () => {};

  return (
    <Fragment>
      <Container style={{ margin: "30px" }}>
        <Row md={4}>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter the word"
              value={word}
              onChange={(e) => setWord(e.target.value)}
            ></input>
          </Col>
          <Col xs={6}>
            <input
              type="text"
              className="form-control"
              placeholder="Enter the translate"
              value={translate}
              onChange={(e) => setTranslate(e.target.value)}
            ></input>
          </Col>
          <Col>
            <Button variant="success">Submit</Button>
          </Col>
        </Row>
      </Container>
      <Table striped bordered hover style={{ margin: 40 }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Word</th>
            <th>Translate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0
            ? data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.text}</td>
                    <td>{item.translate}</td>
                    <td colSpan={2}>
                      <Button
                        variant="primary"
                        onClick={() => handleEdit(item.id)}
                      >
                        Edit
                      </Button>{" "}
                      &nbsp;
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </Button>{" "}
                      &nbsp;
                    </td>
                  </tr>
                );
              })
            : "Loading..."}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit word</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the word"
                value={editWord}
                onChange={(e) => setEditWord(e.target.value)}
              ></input>
            </Col>
            <Col xs={6}>
              <input
                type="text"
                className="form-control"
                placeholder="Enter the translate"
                value={editTranslate}
                onChange={(e) => setEditTranslate(e.target.value)}
              ></input>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default CRUD;
