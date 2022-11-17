const { User } = require("../../models/users");

const logout = async (req, res) => {
  const user = req.user;
  const result = await User.findByIdAndUpdate(
    user.id,
    { token: "" },
    { returnDocument: "after" }
  );
  console.log(result);

  res.json({ message: "success", token: result.token });
};

module.exports = logout;
