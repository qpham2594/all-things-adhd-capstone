const express = require("express");
const router = express.Router();
const { createAccount } = require("../controllers/user");

router.post("/createAccount", createAccount);

module.exports = router;