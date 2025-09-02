const express = require("express");
const router = express.Router();
const path = require("path");

//post route
router.get('/register-user', (req, res) => {
  res.sendFile(path.join(__dirname + "/../html/register-user.html"));
});

router.post("/register-user", (req, res)=> {
    console.log(req.body)
});

router.get('/register-stock', (req, res) => {
 res.sendFile(path.join(__dirname + "/../html/register-stock.html"));
});

router.post("/register-stock", (req, res)=> {
    console.log(req.body)
});


module.exports = router;