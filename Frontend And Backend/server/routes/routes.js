const express = require("express");
const router = express.Router();
const { recommendations } = require("../controller/appController");

router.post("/", recommendations);

module.exports = router;
