const express = require("express");
const router = express.Router();
const { runScheduler } = require("../controllers/schedulerController");

router.get("/schedule", runScheduler);

module.exports = router;