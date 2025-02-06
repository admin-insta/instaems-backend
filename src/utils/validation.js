
const validator = require('validator');

const validateSignupData = (req) => {
  const { name, email, password } = req.body;
  if (!name|| name.length<3)  {
    throw new Error("Enter your is not valid");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Passoword is not strong");
  }
};

module.exports = { validateSignupData };
