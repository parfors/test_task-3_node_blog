const { Blog } = require("../../models/blogs");
const { RequestError } = require("../../helpers");

const getMyBlogs = async (req, res) => {
  const { id } = req.user;
  const result = await Blog.find({ owner: id });
  if (result.length === 0) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json({ data: result });
};

module.exports = getMyBlogs;
