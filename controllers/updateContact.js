const Joi = require("joi");

const contactsMethods = require("../models/contacts");
const { RequestError } = require("../helpers");

const contactScheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const updateContact = async (req, res) => {
  const { error } = contactScheme.validate(req.body);
  if (error) {
    throw RequestError(400, error.message);
  }
  const { contactId } = req.params;
  const result = await contactsMethods.updateContact(contactId, req.body);
  if (!result) {
    throw RequestError(404, "Not Found");
  }
  res.json(result);
};

module.exports = updateContact;
