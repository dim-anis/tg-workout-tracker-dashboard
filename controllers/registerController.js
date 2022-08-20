const User = require("../models/user.js");
const bcrypt = require("bcrypt");

const handleRegister = async (req, res) => {
  const salt = 13;
  const hashed_password = await bcrypt.hash(req.body.password, salt);

  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashed_password,
    });
    res.json({ status: "ok", user: user, message: "Registration Success" });
  } catch (err) {
    if (err.name === "MongoServerError" && err.code === 11000) {
      res.status(409).send({
        message: "A user with this email already exists",
      });
    }
  }
};

module.exports.handleRegister = handleRegister;
