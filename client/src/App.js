import React, { useEffect, useState } from "react";
import "./App.css";
import HeaderTitle from "./components/HeaderTitle/HeaderTitle.js";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function App() {
  const [returnedStudents, setReturnedStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(["Student"]);
  const [selectedStudentBooks, setSelectedStudentBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [showCheckout, setCheckoutShow] = useState(false);
  const [showReturn, setReturnShow] = useState(false);

  const [selectCheckoutBook, setSelectedCheckoutBook] = useState("Book");
  const [selectReturnBook, setSelectedReturnBook] = useState("Book");

  const handleCheckoutClose = () => setCheckoutShow(false);
  const handleCheckoutShow = () => {
    setCheckoutShow(true);
    getAvailaleBooks();
  };

  const handleReturnClose = () => setReturnShow(false);
  const handleReturnShow = () => {
    setReturnShow(true);
    getStudentBooks();
  };

  useEffect(() => {
    fetch("http://localhost:3001/studentsBookCount")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setReturnedStudents(data);
        console.log("te", returnedStudents);
      });
    console.log("test");
  }, []);

  const changeName = function (e) {
    console.log(e.target.innerText);
    console.log(e.target.id);
    setSelectedStudent([e.target.innerText, e.target.id]);
    console.log(selectedStudent);
  };

  const getStudentBooks = function () {
    fetch(
      `http://localhost:3001/studentsBooks?student_id=${selectedStudent[1]}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.rows);
        setSelectedStudentBooks(data.rows);
      });
  };

  const getAllBooks = function () {
    fetch("http://localhost:3001/books")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.rows);
        setBooks(data.rows);
      });
  };

  const getAvailaleBooks = function () {
    fetch("http://localhost:3001/availableBooks")
      .then((res) => res.json())
      .then((data) => {
        console.log("here", data);
        setBooks(data);
      });
  };

  const checkoutNewBook = function (student_id, book_id) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "React POST Request Example" }),
    };
    console.log("s ID", student_id);
    console.log("b ID", book_id);
    fetch(
      `http://localhost:3001/checkoutBook?student_id=${student_id}&book_id=${book_id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetch("http://localhost:3001/studentsBookCount")
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setReturnedStudents(data);
            console.log("te", returnedStudents);
            fetch(
              `http://localhost:3001/studentsBooks?student_id=${selectedStudent[1]}`
            )
              .then((res) => res.json())
              .then((data) => {
                console.log(data.rows);
                setSelectedStudentBooks(data.rows);
              });
          });
      });
  };

  const selectBookToCheckout = function (e) {
    console.log(e);
    setSelectedCheckoutBook(e.target.innerText);
    checkoutNewBook(selectedStudent[1], e.target.id);
  };

  const returnNewBook = function (student_id, book_id) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "React POST Request Example" }),
    };
    console.log("s ID", student_id);
    console.log("b ID", book_id);
    fetch(
      `http://localhost:3001/returnBook?student_id=${student_id}&book_id=${book_id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetch("http://localhost:3001/studentsBookCount")
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setReturnedStudents(data);
            console.log("te", returnedStudents);
          });
      });
  };
  const selectBookToReturn = function (e) {
    console.log(e);
    setSelectedReturnBook(e.target.innerText);
    returnNewBook(selectedStudent[1], e.target.id);
  };

  return (
    <div className="App">
      <HeaderTitle></HeaderTitle>
      <Table striped bordered hover size="sm" className="headerStyle">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Books Checked out</th>
          </tr>
        </thead>
        <tbody>
          {returnedStudents.map((data, id) => {
            return (
              <tr key={id}>
                <td>{data.student_id}</td>
                <td id={data.student_id} onClick={changeName}>
                  {data.name}
                </td>
                <td>{data.total}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button onClick={getStudentBooks} className="bottomButtons">
        See {[selectedStudent[0]]}'s books
      </Button>
      <Table striped bordered hover size="sm" className="headerStyle">
        <thead>
          <tr>
            <th>book id</th>
            <th>title</th>
            <th>author</th>
          </tr>
        </thead>
        <tbody>
          {selectedStudentBooks.map((data, id) => {
            return (
              <tr key={id}>
                <td>{data.id}</td>
                <td>{data.title}</td>
                <td>{data.author}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Button onClick={handleCheckoutShow} className="bottomButtons">
        Have {[selectedStudent[0]]} Check out a new book
      </Button>
      <Button onClick={handleReturnShow} className="bottomButtons">
        Have {[selectedStudent[0]]} return a book
      </Button>
      {/* checkout modal */}
      <Modal show={showCheckout} onHide={handleCheckoutClose}>
        <Modal.Header closeButton>
          <Modal.Title>Available Books</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover size="sm" className="headerStyle">
            <thead>
              <tr>
                <th>book id</th>
                <th>title</th>
                <th>author</th>
              </tr>
            </thead>
            <tbody>
              {books.map((data, id) => {
                return (
                  <tr key={id}>
                    <td>{data.id}</td>
                    <td id={data.id} onClick={selectBookToCheckout}>
                      {data.title}
                    </td>
                    <td>{data.author}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCheckoutClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCheckoutClose}>
            Check out {selectCheckoutBook}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* return modal */}
      <Modal show={showReturn} onHide={handleReturnClose}>
        <Modal.Header closeButton>
          <Modal.Title>Available To Return Books</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover size="sm" className="headerStyle">
            <thead>
              <tr>
                <th>book id</th>
                <th>title</th>
                <th>author</th>
              </tr>
            </thead>
            <tbody>
              {selectedStudentBooks.map((data, id) => {
                return (
                  <tr key={id}>
                    <td>{data.id}</td>
                    <td id={data.id} onClick={selectBookToReturn}>
                      {data.title}
                    </td>
                    <td>{data.author}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleReturnClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleReturnClose}>
            Return {selectReturnBook}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
