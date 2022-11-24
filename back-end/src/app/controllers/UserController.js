const { deleteOne } = require("../models/Token");
const Token = require("../models/Token");
const User = require("../models/User");

//get all users
//[GET]: /api/users/
const getUsers = async (req, res, next) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

//update user
//[PUT]: /api/user/:id
const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("Account has been updated.");
  } catch (err) {
    res.status(500).json(err);
  }
};

//delete a user
//[DELETE]: /api/user/:id
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("Your account has been deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
};

//delete all users
//[DELETE]: /api/user/
const deleteAllUsers = async (req, res, next) => {
  try {
    await User.remove();
    res.status(200).json("All account have been deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = {
  getUsers,
  updateUser,
  deleteUser,
  deleteAllUsers,
};
