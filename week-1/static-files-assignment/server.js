//1. Dependencies
const express = require('express');

//2. Instantiations
const app = express();
const port = 3000;

//3. Configurations


// 4. Middleware
// Middleware to parse form data and JSON
app.use(express.urlencoded({ extended: true })); // for HTML form submissions
app.use(express.json()); // for JSON POST requests


// 5. Routes
app.get('/register-user', (req, res) => {
  res.send("User Registration Page");
});

app.get('/register-stock', (req, res) => {
  res.send("Stock Registration Page");
});


// Start server
// 6. Bootstrapping Server
//this always should be at the last of the code
app.listen(port, () => 
  console.log(`Server running on http://localhost:${port}`));