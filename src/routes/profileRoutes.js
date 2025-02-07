const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
//GET Api for profile of logged in user
router.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

module.exports = router