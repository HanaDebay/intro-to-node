const express = require("express");
const router = express.Router();
const StockModel = require("../models/stockModel");

router.get("/registerStock", (req, res) => {
  res.render("register-stock");
});

router.post("/registerStock", async (req, res) => {
  try {
    const stock = new StockModel(req.body); //keeping all the data that is coming form the form
    console.log(req.body); //printing to terminal
    await stock.save();
    res.redirect("/managerDashboard");

  } catch (error) {
    console.error(error);
    res.redirect("/registerStock")
  }
});

router.get("/manager-dashboard", (req, res) => {
  res.render("managerDashboard");
});



module.exports = router;
