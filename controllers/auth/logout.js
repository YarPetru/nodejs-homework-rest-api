const { User } = require("../../models/user");

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findOneAndUpdate(_id, { token: null });
  res.json({
    message: "Logout success",
  });
};

module.exports = logout;
