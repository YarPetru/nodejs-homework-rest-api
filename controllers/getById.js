const contactsMethods = require("../models/contacts");
const { RequestError } = require("../helpers");

const getById = async (req, res, next) => {
  const id = req.params.contactId;
  console.log(id);
  const result = await contactsMethods.getContactById(id);
  if (!result) {
    throw RequestError(404, "Not Found");
  }
  res.json(result);
};

module.exports = getById;
