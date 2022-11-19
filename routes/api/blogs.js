const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/blogs");
const { ctrlWrapper } = require("../../helpers");
const { validateBody, authenticate, isValidId } = require("../../middleWares");
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

router.delete("/:blogId", authenticate, isValidId, ctrlWrapper(ctrl.remove));

module.exports = router;
