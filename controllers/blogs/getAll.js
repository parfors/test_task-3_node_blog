const { Blog } = require("../../models/blogs");

const getAll = async (req, res) => {
  const { page = 1, limit = 20, category = "" } = req.query;
  const skip = page * limit - limit;
  const normalizedCategory = category.toLowerCase();
  let result;
  if (normalizedCategory) {
    console.log(normalizedCategory);
    result = await Blog.find(
      { category: normalizedCategory },
      "-createdAt -updatedAt"
    )
      .populate("owner", "name email")
      .skip(skip)
      .limit(limit);
  } else {
    result = await Blog.find({}, "-createdAt -updatedAt")
      .populate("owner", "name email")
      .skip(skip)
      .limit(limit);
  }
  res.status(200).json({ data: result });
};

module.exports = getAll;
