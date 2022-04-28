const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
const Student = require("./DB/Student");
const cors = require("cors");

const app = express();
const db = require("./DB/queries");

//make JSON usable in front
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(
    cors({
        origin: "http://localhost:3000",
    })
);

app.get("/students", async(req, res) => {
    console.log("Students called");
    const result = await db.getAllStudents();
    console.log("resultss", result);
    res.send(result);
});

app.get("/studentsBookCount", async(req, res) => {
    console.log("Students Book called");
    const result = await db.getStudentAndCount();
    console.log("resultss", result);
    res.send(result);
});

app.get("/studentsBooks", async(req, res) => {
    console.log("StudentBooks called");
    console.log("req", req.query);
    const result = await db.getStudentBook(req.query.student_id);
    console.log("resultss", result);
    res.send(result);
});

app.get("/books", async(req, res) => {
    console.log("books called");
    const result = await db.getAllBooks();
    console.log("books", result.rows);
    res.send(result.rows);
});

app.get("/availableBooks", async(req, res) => {
    console.log("available books called");
    const result = await db.getAvailableBooks();
    console.log("books", result.rows);
    res.send(result.rows);
});

app.post("/checkoutBook", async(req, res) => {
    console.log("checking out book");
    console.log(req.query);
    const result = await db.checkoutBook([
        req.query.student_id,
        req.query.book_id,
    ]);

    res.send(result);
});

app.post("/returnBook", async(req, res) => {
    console.log("returning book");
    console.log(req.query);
    const result = await db.returnBook([req.query.student_id, req.query.book_id]);

    res.send(result);
});
app.listen(PORT, () => {
    console.log(`Server is listenting on ${PORT}`);
});