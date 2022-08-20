const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = async (req, res) => {
  try {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;

    const user = await User.findOne({ refreshToken });

    if (!user) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      console.log(err);
      if (err || user.email !== decoded.email) return res.sendStatus(401);

      const accessToken = jwt.sign(
        { email: decoded.email },
        process.env.JWT_SECRET,
        { expiresIn: "10m" }
      );
      res.json({ accessToken });
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { handleRefreshToken };
