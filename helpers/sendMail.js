const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;
const { EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async (data) => {
  try {
    const email = { ...data, from: EMAIL };
    await sgMail.send(email);
    return true;
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendMail;
