const express = require('express');
const app = express();

const port = 3000;


app.get('/', (req, res) => { // new
  res.send('Homepage! Hello world.');
});

app.post('/about', (req, res) => {
    res.send('Data received!');
});


app.post('/data', (req, res) => {
    res.send('Data received!');
});

app.put('/user', (req, res) => {
    res.send('Got a PUT request at /user');
});

app.delete('/user', (req, res) => {
    res.send('Got a DELETE request at /user');
});

/*
path parameters and query strings 
*/


//path parameters
const userName = "Hana Debay"
app.get('/pathPharams/:userName', (req, res) => {
   // res.send(`This is the userName ${userName}`);
   res.send(`This is the userName ${req.params.userName}`);
});


//Query Strings
//localhost:3000/students?name=Hana&cohort=cohort19&class=Node.js

app.get('/students', (req, res) => {
   res.send(`This is the  ${req.query.name} from ${req.query.cohort} class of ${req.query.class}`);
});





//non existing rout
app.use((req,res) => {
  res.status(404).send("Oops! Rout not found.");
});
//this should always be the last code
app.listen(port, () => console.log(`listening on port ${port}`));