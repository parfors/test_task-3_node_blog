const { Blog } = require("../../models/blogs");

const getAll = async (req, res) => {
  const { page = 1, limit = 100 } = req.query;
  const skip = page * limit - limit;
  const length = (await Blog.find({})).length;
  const result = await Blog.find({}, "-createdAt -updatedAt")
    .populate("owner", "name email")
    .skip(skip)
    .limit(limit);
  res.status(200).json({ data: result, total: length });
};

module.exports = getAll;
