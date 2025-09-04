const express = require("express");
const router = express.Router();
const UserModel = require("../models/userModel");


//getting the signup form
router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", (req, res) => {
  const user = new UserModel(req.body); //pick all the form data
  console.log(req.body)
  user.save();
  res.redirect("/login"); //redirecting after signingup to login page
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  console.log(req.body)
  res.redirect("/registerStock")
});







module.exports = router;
