const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validator(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email Id is not valid", +value);
      }
    },
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  designation: {
    type: String,
  },
  dob: {
    type: Date,
  },
  address: {
    type: String,
  },
  skills: {
    type: [String],
  },
  joiningDate: {
    type: Date,
  },
  accessLevel: {
    type: String,
    enum: ["admin", "manage", "employee"],
  },
  superiorId: {
    type: String,
  },
  subordinateIds: {
    type: [String],
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
},
{timestamps:true}
);

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordValid;
};

userSchema.methods.getJWT = async function () {
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
  const user = this;
  const token = await jwt.sign({ _id: user._id }, JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
