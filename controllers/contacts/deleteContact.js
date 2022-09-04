const { Contact } = require("../../models/contact");
const { RequestError } = require("../../helpers");

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  console.log(contactId);
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw RequestError(404, "Not Found");
  }
  res.json({
    message: "Contact deleted",
  });
};

module.exports = deleteContact;
