const express = require("express");
const router = express.Router();


//getting the signup form
router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", (req, res) => {
  console.log(req.body)
});





module.exports = router;
