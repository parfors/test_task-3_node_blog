const mongoose = require("mongoose");
const Joi = require("joi");
const { handelSaveErrors } = require("../helpers");

const categories = [
  "",
  "боевик",
  "приключения ",
  "детектив",
  "фентази",
  "ужасы",
];

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: categories,
      default: "",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

blogSchema.post("save", handelSaveErrors);

const blogJoiAddSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  text: Joi.string().required(),
  category: Joi.string().valid(...categories),
});

const Blog = mongoose.model("blog", blogSchema);

module.exports = {
  Blog,
  schemas: {
    blogJoiAddSchema,
  },
};
