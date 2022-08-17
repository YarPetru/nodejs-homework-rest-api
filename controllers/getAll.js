const contactsMethods = require("../models/contacts");

const getAll = async (_, res, next) => {
  const result = await contactsMethods.listContacts();
  res.json(result);
};

module.exports = getAll;
