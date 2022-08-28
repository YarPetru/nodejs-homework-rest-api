const Contact = require("../models/contact");
const { RequestError } = require("../helpers");

const getById = async (req, res) => {
  const id = req.params.contactId;
  const result = await Contact.findById(id);
  if (!result) {
    throw RequestError(404, "Not Found");
  }
  res.json(result);
};

module.exports = getById;
