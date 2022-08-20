const express = require("express");
const router = express.Router();

const refreshToken_controller = require("../controllers/refreshTokenController");

router.get("/", refreshToken_controller.handleRefreshToken);

module.exports = router;
