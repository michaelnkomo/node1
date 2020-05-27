//import the required packages
const mysql = require('mysql');//Node.js driver for MySQL
const express = require('express');//It is a web framework.
const bodyparser = require('body-parser');//Helps in converting the POST data into the request body.
var app = express();

//Configuring express server
app.use(bodyparser.json());

//establish a connection with your MySQL database using the createConnection() function
//MySQL details
var mysqlConnection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'learner',
multipleStatements: true
});

//use the connect() function to connect establish the connection with the database using provided credentials
mysqlConnection.connect((err, res)=> {
if(!err)
console.log('Connection Established Successfully');
else
console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));

});

//Finally, you need to specify the port as well, since we will be sending our requests to the server over HTTP.
//Establish the server connection
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));

//Creating GET Router to fetch all the learner details from the MySQL Database
app.get('/learners' , (req, res) => {
mysqlConnection.query('SELECT * FROM learnerdetails', (err, rows, fields) => {
if (!err)
res.send(rows);
else
console.log(err);
res.end(JSON.stringify(err));
})
} );

//Router to GET specific learner detail from the MySQL database
app.get('/learners/:id' , (req, res) => {
mysqlConnection.query('SELECT * FROM learnerdetails WHERE learner_id = ?',[req.params.id], (err, rows, fields) => {
if (!err)
res.send(rows);
else
console.log(err);
res.end(JSON.stringify(err));
})
} );

//Router to INSERT/POST a learner's detail
app.post('/learners', (req, res) => {
let name = req.body.learner_name;
let email = req.body.learner_email;
let course_id = req.body.course_id;
var sql = `INSERT INTO learnerdetails (name, email, course_id) VALUES(?, ?, ?)`;

mysqlConnection.query(sql, [name , email, course_id],  function (err, result) {
    if (err) throw err;
    console.log("1 record inserted" + " " + result.insertId);
	res.end(JSON.stringify(result));
//console.log(err);
})
});

//rest api to update record into mysql database
app.put('/learners', function (req, res) {
	let id = req.body.id;
	let name = req.body.name;
	let email = req.body.email;
	let course_id = req.body.course_id;
	
   mysqlConnection.query('UPDATE `learners` SET `name`=?,`email`=?,`course_id`=? where `id`=?', 
   [name , email, course_id, id],
   function (err, results) {
	  if (err) throw err;
	  res.end(JSON.stringify(results));
	});
});

//Router to DELETE a learner's detail
app.delete('/learners/:id', (req, res) => {
mysqlConnection.query('DELETE FROM learnerdetails WHERE id = ?', [req.params.id], (err, rows, fields) => {
if (!err)
res.send('Learner Record deleted successfully.');
else
console.log(err);
res.end(JSON.stringify(err));
})
});