const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/blogs");
const { ctrlWrapper } = require("../../helpers");
const { validateBody, authenticate } = require("../../middleWares");
const {
  schemas: { blogJoiAddSchema },
} = require("../../models/blogs");

router.get("/", ctrlWrapper(ctrl.getAll));

router.post(
  "/",
  authenticate,
  validateBody(blogJoiAddSchema),
  ctrlWrapper(ctrl.add)
);

module.exports = router;
