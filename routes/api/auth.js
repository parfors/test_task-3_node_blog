const express = require("express");
const router = express.Router();
const {
  schemas: { userJoiRegistrationSchema, userJoiLoginSchema },
} = require("../../models/users");
const { validateBody, authenticate } = require("../../middleWares");
const ctrl = require("../../controllers/auth");
const { ctrlWrapper } = require("../../helpers");

router.post(
  "/register",
  // validateBody(userJoiRegistrationSchema),
  ctrlWrapper(ctrl.register)
);

router.post(
  "/login",
  validateBody(userJoiLoginSchema),
  ctrlWrapper(ctrl.login)
);

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

module.exports = router;
