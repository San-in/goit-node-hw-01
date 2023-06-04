const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join("db", "contacts.json");
const { v4: uuidv4 } = require("uuid");

const createContact = (name, email, phone) => {
  return {
    id: uuidv4(),
    name,
    email,
    phone,
  };
};

const updateFile = (path, updatedList) => {
  fs.writeFile(path, JSON.stringify(updatedList, null, 2));
};

// TODO: задокументувати кожну функцію
async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "UTF-8");
    const arrOfContacts = JSON.parse(contacts);
    return arrOfContacts;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.filter(({ id }) => id === contactId);
  return contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const deleteIndex = contacts.findIndex(({ id }) => id === contactId);
  if (deleteIndex !== -1) {
    const removedContact = contacts.splice(deleteIndex, 1);
    updateFile(contactsPath, contacts);
    // const splicedStringifiedArray = JSON.stringify(contacts, null, 2);
    // await fs.writeFile(contactsPath, splicedStringifiedArray);
    return removedContact;
  } else {
    console.log("We have no contact with this ID");
  }
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = createContact(name, email, phone);
  contacts.push(newContact);
  updateFile(contactsPath, contacts);
  // const splicedStringifiedArray = JSON.stringify(contacts, null, 2);
  // await fs.writeFile(contactsPath, splicedStringifiedArray);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
