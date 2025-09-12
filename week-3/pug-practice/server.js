//1. Dependencies
const express = require('express');
const path = require("path");
const mongoose = require('mongoose');
const passport = require("passport");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo");
const moment = require("moment");
const methodOverride = require("method-override");

require('dotenv').config();

const User = require("./models/userModel")

//import routes
//const classRoutes = require("./routes/classRoutes");
const authRoutes = require("./routes/authRoutes");
const stockRoutes = require("./routes/stockRoutes");
//2. Instantiations
const app = express();
const port = 3000;

//3. Configurations
app.locals.moment = moment;
//settingup mongodb connection 
mongoose.connect(process.env.DATABASE, { //referencing to the vaiable DATABASE from .env file
  // useNewUrlParser: true,
  // useUnifiedTopology: true
});

// testing the connection
mongoose.connection
  .on('open', () => {
    console.log('Mongoose connection open');
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });

// setting view engin to pug
app.set('view engine', 'pug');
app.set('views',path.join(__dirname, 'views'));


// 4. Middleware
// Middleware to parse form data and JSON
app.use(express.static(path.join(__dirname, 'public')));
app.use("/public/uploads",  express.static(__dirname + "/public/uploads" ))
app.use(express.urlencoded({ extended: true })); // for HTML form submissions
app.use(express.json()); // for JSON POST requests
app.use(methodOverride('_method'));

// EXPRESS-SESSIONS CONFIGS
app.use(expressSession({
  secret: process.env.SESSION_SECRET, 
  resave: false, //we don't want to save killed session it will automatically destroy killed sessions
  saveUninitialized: false, //we don't want to save unsucessful trail
  store: MongoStore.create({mongoUrl: process.env.DATABASE}),
  cookie: {maxAge:24*60*60*1000} //this expression is equal to one day or 24hours
}));

//PASSPORT CONFIGS
app.use(passport.initialize()); //intializes passport.js it adds the midlware
app.use(passport.session()); //connects passport to the session created by the session

//AUTHENTICATE WITH PASSPORT_LOCAL_STRATEGY
passport.use(User.createStrategy()); 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// 5. Routes
//using imported routes
//app.use("/", classRoutes);
//app.use("/class", classRoutes);
app.use("/", authRoutes);
app.use("/", stockRoutes);





// Start server
// 6. Bootstrapping Server
//this always should be at the last of the code
app.listen(port, () => 
  console.log(`Server running on http://localhost:${port}`));