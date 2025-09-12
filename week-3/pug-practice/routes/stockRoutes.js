const express = require("express");
const router = express.Router();
const StockModel = require("../models/stockModel");
const {ensureAuthenticated, ensureManager } = require("../middleware/auth");

router.get("/registerStock",  (req, res) => {
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

//GETTING STOCK FROM THE DATABASE
router.get("/view-stock", async(req, res) => {
  try {
    let items = await StockModel.find().sort({$natural:-1});
    res.render("displayStocks", {items});
  console.log(items)
  } catch (error) {
    res.status(400).send("unable to fetch data from the database")
  }
  
});




module.exports = router;
