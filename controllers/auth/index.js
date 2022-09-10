const signup = require("./signup");
const login = require("./login");
const logout = require("./logout");
const current = require("./current");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("./verifyEmail");
const resendVerification = require("./resendVerification");

module.exports = {
  signup,
  login,
  logout,
  current,
  updateAvatar,
  verifyEmail,
  resendVerification,
};
