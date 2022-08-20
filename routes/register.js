const express = require("express");
const router = express.Router();

const register_controller = require("../controllers/registerController");

router.post("/", register_controller.handleRegister);

module.exports = router;
