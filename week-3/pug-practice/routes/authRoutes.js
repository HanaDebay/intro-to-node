const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../models/userModel");

//getting the signup form
router.get("/register-user", (req, res) => {
  res.render("signup");
});

router.post("/register-user", async (req, res) => {
  try {
    const user = new User(req.body); //pick all the form data
    console.log(req.body);
    let existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(400)
        .send(
          "This email address is already registered please try to use different email!"
        );
    } else {
      await User.register(user, req.body.password, (error) => {
        if (error) {
          throw error;
        }
        res.redirect("/login"); //redirecting after signingup to login page
      });
    }
  } catch (error) {
    res.status(400).send("Somthing went wrong please try agian!");
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    req.session.user = req.user;
    if (req.user.role === "Manager") {
      res.redirect("/managerDashboard");
    } else if (req.user.role == "Sales-Agent") {
      res.redirect("/salesAgentDashboard");
    } else {
      res.render("nonUser");
    }
  }
);

router.get("/managerDashboard", (req, res) => {
  res.render("managerDashboard");
});

router.get("/salesAgentDashboard", (req, res) => {
  res.render("salesAgentDashboard");
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((error) => {
      if (error) {
        return res.status(500).send("Error Logging out");
      }
      res.redirect("/");
    });
  }
  res.render("managerDashboard");
});

// router.post("/logout", (req, res) => {
//   req.logOut((error) => {
//     if (error) {
//       return res.status(500).send("Error Logging out");
//     }
//     res.redirect("/")
//   });
// });

module.exports = router;
