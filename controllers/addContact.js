const Joi = require("joi");
const contactsMethods = require("../models/contacts");
const { RequestError } = require("../helpers");

const contactScheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .required(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .required(),
});

const addContact = async (req, res, next) => {
  const { error } = contactScheme.validate(req.body);
  if (error) {
    throw RequestError(400, error.message);
  }
  const result = await contactsMethods.addContact(req.body);
  res.status(201).json(result);
};

module.exports = addContact;
