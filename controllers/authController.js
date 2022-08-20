const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleSignin = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    const match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      const accessToken = jwt.sign(
        {
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "10m" }
      );
      const refreshToken = jwt.sign(
        {
          email: user.email,
        },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "3d" }
      );

      user.refreshToken = refreshToken;
      await user.save();

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.json({ status: 200, accessToken });
    } else {
      return res.status(401).send({ message: "Invalid password" });
    }
  } catch {
    return res.status(404).send({ message: "Couldn't find your account" });
  }
};

module.exports = { handleSignin };
