const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = import("nanoid");

const { User } = require("../../models/user");
const { RequestError, sendMail } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashPsw = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const result = await User.create({ email, password: hashPsw, avatarURL });
  const mail = {
    to: email,
    subject: "Confirm Your Email",
    html: `<a href="http://localhost:3000/api/user/verify/${verificationToken}" target="_blank>By clicking on the following link, you are confirming your email address </a> `,
  };
  await sendMail(mail);

  res.status(201).json({
    email: result.email,
    subscription: "starter",
  });
};

module.exports = register;
