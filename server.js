const mysql = require('mysql2');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        //your mysql username
        user: 'root',
        //your MySQL password
        password: 'Capital9!',
        database: 'election'
    },
    console.log('Connected to the election database.')
);

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    });
});

db.query(`SELECT * FROM candidates`, (err, rows) => {
    console.log(rows);
});

// must be placed after all get routes, otherwise it'll override other routes
// default response for any other request (Not Found)
// it's a catchall
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});