const contactsMethods = require("../models/contacts");
const { RequestError } = require("../helpers");

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsMethods.removeContact(contactId);
  if (!result) {
    throw RequestError(404, "Not Found");
  }
  res.json({
    message: "Contact deleted",
  });
};

module.exports = deleteContact;
