const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");

const User = require("../models/userModel");

//image upload configs
let storage = multer.diskStorage({
  destination: (req , file , cb) => {
    cb(null, "public/uploads")
  },
   filename: (req , file , cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({storage: storage})

//getting the signup form
router.get("/register-user", (req, res) => {
  res.render("signup");
});

router.post("/register-user", upload.single("profileImage")  , async (req, res) => {
  try {
    const user = new User(req.body); //pick all the form data
    user.profileImage = req.file ? `/public/uploads/${req.file.filename} ` : null;
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

router.get("/display-user", async(req, res) => {
  try {
    let users = await User.find().sort({$natural:-1});
    res.render("displayUser", {users});
  console.log(users)
  } catch (error) {
    res.status(400).send("unable to fetch user data from the database")
  }
  
});


module.exports = router;
