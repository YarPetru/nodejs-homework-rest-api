const { v4: uuidv4 } = require("uuid");
const fs = require("fs/promises");

const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const ENCODING_TYPE = "utf-8";

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, ENCODING_TYPE);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const [result] = contacts.filter(
    (contact) => contact.id === String(contactId)
  );
  return result || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(
    (contact) => contact.id === String(contactId)
  );
  if (index !== -1) {
    const [removedContact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removedContact;
  } else return null;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  const updatedContactList = [...contacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(updatedContactList, null, 2));
  return updatedContactList;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(
    (contact) => contact.id === String(contactId)
  );
  if (index === -1) {
    return null;
  }
  contacts[index] = { contactId, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
