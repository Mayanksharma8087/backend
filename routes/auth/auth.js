const express = require("express");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../../models/UserModel/UserModel");

const router = express.Router();

router.post("/register", (req, res) => {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      // Store hash in your password DB.
      const saveUser = new userModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
      });
      saveUser
        .save()
        .then(() => {
          res.status(201).json({
            message: "user is registered succesfully",
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: err.message,
          });
        });
    });
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const verifyUser = await userModel.findOne({ email: email });
  if (verifyUser) {
    const isMatch = await bcrypt.compare(password, verifyUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    } else {
      res.status(200).json({
        token: generateToken(verifyUser),
        user: verifyUser,
      });
    }
  } else {
    res.status(404).json({ message: "Email not found!" });
  }
});
router.put("/changepassword/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).send("Please provide an userID");
  } else {
    const verifyUser = await userModel.findOne({ _id: id });
    if (!verifyUser) {
      res.status(404).json({ message: "No User Found with this Email ID." });
    } else {
      if (!req.body.newPassword) {
        res.status(400).json({ message: "New password field can't be empty." });
      } else {
        const isMatch = await bcrypt.compare(
          req.body.oldPassword,
          verifyUser.password
        );
        if (!isMatch) {
         return res.status(400).json({ message: "Invalid Old Password" });
        } else {
          bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(req.body.newPassword, salt, async function (err, hash) {
              const updatedUser = await userModel.findByIdAndUpdate(
                { _id: id },
                { password: hash },
                { new: true }
              );
              res.status(200).json({
                message: "password is updated",
                updatedUser,
              });
            });
          });
        }
      }
    }
  }
});

function generateToken(user) {
  let token = jwt.sign(
    {
      _id: user._id,
      firstName: user.firstName,
      email: user.email,
    },
    "SECRET_KEY", //secret key here
    { expiresIn: "1h" } //token expire time
  );
  return token;
}

module.exports = router;
