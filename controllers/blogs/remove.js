const { Blog } = require("../../models/blogs");
const { RequestError } = require("../../helpers");

const remove = async (req, res) => {
  const id = req.params.blogId;
  const result = await Blog.findByIdAndDelete(id);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json({ data: result, message: "Deleted successful" });
};

module.exports = remove;
