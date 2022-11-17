const { Blog } = require("../../models/blogs");

const add = async (req, res) => {
  const body = req.body;
  const { _id: owner } = req.user;
  const result = await Blog.create({
    ...body,
    owner,
  });
  res.json({ data: result, message: "success" });
};

module.exports = add;
