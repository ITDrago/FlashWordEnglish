import React, { Fragment, useRef } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner";

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
  const dataArrayRef = useRef(data);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [word, setWord] = useState("");
  const [translate, setTranslate] = useState("");

  const [editWord, setEditWord] = useState("");
  const [editTranslate, setEditTranslate] = useState("");
  const [editId, setEditId] = useState("");

  useEffect(() => {
    getData();
    dataArrayRef.current = data;
  }, [dataArrayRef]);

  const handleEdit = (id) => {
    handleShow();
    axios
      .get(`https://localhost:7281/api/Word/${id}`)
      .then((result) => {
        setEditWord(result.data.text);
        setEditTranslate(result.data.translate);
        setEditId(result.data.id);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you shure delete this word")) {
      axios
        .delete(`https://localhost:7281/api/Word/${id}`)
        .then((result) => {
          if (result.status === 200) {
            getData();
            toast.success("Word has been deleted!");
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const handleAdd = () => {
    const url = "https://localhost:7281/api/Word";
    const data = {
      text: word,
      translate: translate,
    };
    axios
      .post(url, data)
      .then((result) => {
        getData();
        clear();
        toast.success("Word has been added!");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const getData = () => {
    axios
      .get("https://localhost:7281/api/Word")
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const clear = () => {
    setWord("");
    setTranslate("");
    setEditWord("");
    setEditTranslate("");
    setEditId("");
  };
  const handleUpdate = () => {
    const url = `https://localhost:7281/api/Word/${editId}`;
    const data = {
      id: editId,
      text: editWord,
      translate: editTranslate,
    };
    axios
      .put(url, data)

      .then((result) => {
        handleClose();
        getData();
        toast.success("Word has been changed!");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <Fragment>
      <ToastContainer />
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
            <Button variant="success" onClick={() => handleAdd()}>
              Submit
            </Button>
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
            : <Spinner style={{margin:10}} animation="border" variant="primary" />}
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
          <Button variant="primary" onClick={() => handleUpdate()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default CRUD;
