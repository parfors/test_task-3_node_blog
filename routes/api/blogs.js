const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/blogs");
const { ctrlWrapper } = require("../../helpers");
const {
  validateBody,
  authenticate,
  isValidId,
  upload,
} = require("../../middleWares");
const {
  schemas: { blogJoiAddSchema },
} = require("../../models/blogs");

router.get("/", ctrlWrapper(ctrl.getAll));
router.get("/my_articles", authenticate, ctrlWrapper(ctrl.getMyBlogs));
router.get("/:category", ctrlWrapper(ctrl.getCategoryBlogs));

router.post("/", authenticate, upload.single("cover"), ctrlWrapper(ctrl.add));

router.delete("/:blogId", authenticate, isValidId, ctrlWrapper(ctrl.remove));

module.exports = router;
