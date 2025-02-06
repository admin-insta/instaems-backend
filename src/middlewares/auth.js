const JWT = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  try {
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    //read the token from req cookies
    const { token } = req.cookies;
    if (!token) {
      throw new Error("token not found user");
    }
    //validate token
    const decodedObj = JWT.verify(token, JWT_SECRET_KEY);
    const { _id } = decodedObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user=user;
    next();
  } catch (err) {
    res.status(400).send("ERROR:" +err.message);
  }
};

module.exports = { userAuth };
