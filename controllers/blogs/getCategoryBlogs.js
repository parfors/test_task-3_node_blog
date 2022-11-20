const { Blog } = require("../../models/blogs");
const { RequestError } = require("../../helpers");

const getCategoryBlogs = async (req, res) => {
  const { category } = req.params;
  const result = await Blog.find({ category });
  if (result.length === 0) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json({ data: result });
};

module.exports = getCategoryBlogs;
