const express = require("express");
const router = express.Router();

router.get("/registerStock", (req, res) => {
    res.render("register-stock");
});

router.post("/registerStock",(req , res) => {
    console.log(req.body);
});





module.exports = router;