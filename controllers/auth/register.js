const { User } = require("../../models/users");
const { RequestError } = require("../../helpers");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { email, name, password } = req.body;
  const userEmail = await User.findOne({ email });
  const userName = await User.findOne({ name });
  if (userEmail) {
    throw RequestError(409, "This email is in use");
  }
  if (userName) {
    throw RequestError(409, "This user name is in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({ email, name, password: hashPassword });

  res.status(200).json({ name: result.name, email: result.email });
};

module.exports = register;
