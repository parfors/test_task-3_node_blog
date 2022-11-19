const { isValidObjectId } = require("mongoose");
const { RequestError } = require("../helpers");

const isValidId = async (req, res, next) => {
  const id = req.params.blogId;
  const result = isValidObjectId(id);
  if (!result) {
    RequestError(400, "Invalid formai id");
  }
  next();
};

module.exports = isValidId;
