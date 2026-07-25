const express = require("express");
const router = express.Router();

const {
  createProgress,
  getProgress,
  editProgress,
  removeProgress,
} = require("../controller/progressController");

const { verifyToken } = require("../middleware/verifyToken");

router.post("/", verifyToken, createProgress);

router.get("/:goalId", verifyToken, getProgress);

router.put("/:id", verifyToken, editProgress);

router.delete("/:id", verifyToken, removeProgress);

module.exports = router;