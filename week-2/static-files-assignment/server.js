//1. Dependencies
const express = require('express');
const path = require("path");


//import routes
const classRoutes = require("./routes/classRoutes");
const authRoutes = require("./routes/authRoutes");
//2. Instantiations
const app = express();
const port = 3000;

//3. Configurations
app.set('view engine', 'pug');
app.set('views',path.join(__dirname, "views"));


// 4. Middleware
// Middleware to parse form data and JSON
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({ extended: true })); // for HTML form submissions
app.use(express.json()); // for JSON POST requests


// 5. Routes
app.use("/", classRoutes);
app.use("/", authRoutes);



// Start server
// 6. Bootstrapping Server
//this always should be at the last of the code
app.listen(port, () => 
  console.log(`Server running on http://localhost:${port}`));