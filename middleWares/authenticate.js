const { User } = require("../models/users");
const jwt = require("jsonwebtoken");
const { RequestError } = require("../helpers");
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer" || !token) {
      throw RequestError(401, "Not authorized");
    }
    const verify = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(verify.id);
    if (!user || token !== user.token) {
      throw RequestError(401, "Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    if (!error.status) {
      error.status = 401;
      error.message = "Not authorized";
    }
    next(error);
  }
};

module.exports = authenticate;
