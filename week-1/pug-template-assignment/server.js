//1. Dependencies
const express = require('express');

//2. Instantiations
const app = express();
const port = 3000;

//3. Configurations
// Set Pug as the view engine
app.set('view engine', 'pug');
app.set('views', './views'); // folder where pug files are stored

// 4. Middleware
// Middleware to parse form data and JSON
app.use(express.urlencoded({ extended: true })); // for HTML form submissions
app.use(express.json()); // for JSON POST requests

// Simple request time logger
// app.use((req, res, next) => {
//    console.log("A new request received at " + Date.now());

//    // This function call tells that more processing is
//    // required for the current request and is in the next middleware
//    //function/route handler.
//    next();  
// });

//Simple request time logger for a specific route
app.use('/home', (req, res, next) => {
  console.log('A new request received at ' + Date.now());
  next();
});

// 5. Routes
//Syntax of a route
//app.METHOD(PATH, HANDLER);

// Homepage route
app.get('/home', (req, res) => {
  res.send("Home page");
});

app.get('/about', (req, res) => {
  res.send("About page");
});

// Show the form
app.get('/form', (req, res) => {
  res.render('form');
});

// Handle form submission
app.post('/submit', (req, res) => {
  const { name, email } = req.body; // now req.body is parsed correctly
  res.render('success', { name, email });
});

// Start server
// 6. Bootstrapping Server
//this always should be at the last of the code
app.listen(port, () => 
  console.log(`Server running on http://localhost:${port}`));
