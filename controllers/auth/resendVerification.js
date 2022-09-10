const { User } = require("../../models/user");
const { RequestError, sendMail } = require("../../helpers");
require("dotenv").config();

const { HOST_NAME } = process.env;

const resendVerification = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(404, "User not found");
  }
  if (user.veryfy) {
    throw RequestError(400, "Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "Confirm Your Email",
    html: `<a href="${HOST_NAME}/api/user/verify/${user.verificationToken}" target="_blank>By clicking on the following link, you are confirming your email address </a> `,
  };
  await sendMail(mail);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerification;
