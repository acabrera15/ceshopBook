const config = require("./DBConfig");
const Pool = require("pg").Pool;
const pool = new Pool(config);

const pg = require("pg");

const getAllStudents = async() => {
    try {
        let students = await pool.query("SELECT * FROM students");
        // console.log(students);
        return students.rows;
    } catch (err) {
        console.log(err);
    }
};

const getStudentAndCount = async() => {
    try {
        let students =
            await pool.query(`SELECT students.student_id, students.name, bks.total
        FROM
            students
            LEFT JOIN (SELECT checked_out_by, count(checked_out_by) as total FROM BOOKS GROUP BY checked_out_by) AS bks
            on students.student_id = bks.checked_out_by;`);
        // console.log(students);
        return students.rows;
    } catch (err) {
        console.log(err);
    }
};

const getAllBooks = async() => {
    try {
        let books = await pool.query("SELECT * FROM books");
        console.log(books);
        return books;
    } catch (err) {
        console.log(err);
    }
};

const getAvailableBooks = async() => {
    try {
        let books = await pool.query(
            "SELECT * FROM books WHERE checked_out = false"
        );
        console.log(books);
        return books;
    } catch (err) {
        console.log(err);
    }
};

const getStudentBook = (id, res) => {
    try {
        let studentBooks = pool.query(`SELECT * FROM Books 
        WHERE checked_out_by = '${id}'`);
        return studentBooks;
    } catch (err) {
        console.log(err);
    }
};

const checkoutBook = async(ids, res) => {
    console.log(ids);
    try {
        let checkedOut = await pool.query(`UPDATE Books 
        SET checked_out = 'true', checked_out_by = '${ids[0]}'
        WHERE id = '${ids[1]}'`);
        return checkedOut;
    } catch (err) {
        console.log(err);
    }
};

const returnBook = async(ids, res) => {
    console.log(ids);
    try {
        let returned = await pool.query(`UPDATE Books 
        SET checked_out = 'false', checked_out_by = NULL
        WHERE id = '${ids[1]}'`);
        return returned;
    } catch (err) {
        console.log(err);
    }
};
const setStudent = (Student, res) => {
    console.log(Student.name);
    try {
        let students = pool.query(
            `INSERT INTO STUDENTS (name) VALUES ('${Student.name}')`
        );
        return students;
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    getAllStudents,
    getStudentAndCount,
    getAllBooks,
    getAvailableBooks,
    getStudentBook,
    setStudent,
    checkoutBook,
    returnBook,
};