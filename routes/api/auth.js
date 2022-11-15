const express = require("express");
const router = express.Router();
const {
  schemas: { userJoiRegistrationSchema },
} = require("../../models/users");
const { validateBody } = require("../../middleWares");
const ctrl = require("../../controllers/auth");
const { ctrlWrapper } = require("../../helpers");

router.post(
  "/register",
  validateBody(userJoiRegistrationSchema),
  ctrlWrapper(ctrl.register)
);

module.exports = router;
