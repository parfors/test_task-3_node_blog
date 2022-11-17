const mongoose = require("mongoose");
const Joi = require("joi");
const { handelSaveErrors } = require("../helpers");

const emailRegexp = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "password is require"],
    },
    email: {
      type: String,
      required: [true, "email is require"],
      unique: true,
      match: emailRegexp,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.post("save", handelSaveErrors);

const userJoiRegistrationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().required().min(6),
});

const userJoiLoginSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().required().min(6),
});

const User = mongoose.model("users", userSchema);

module.exports = {
  User,
  schemas: { userJoiRegistrationSchema, userJoiLoginSchema },
};
