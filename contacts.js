const path = require("path");
const contactsPath = path.join("db", "contacts.json");
const { getContacts, updateFile, createContact } = require("./helpers/index");

// TODO: задокументувати кожну функцію
async function listContacts() {
  try {
    return await getContacts(contactsPath);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await getContacts(contactsPath);
    const contact = contacts.filter(({ id }) => id === contactId);
    return contact;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await getContacts(contactsPath);
    const deleteIndex = contacts.findIndex(({ id }) => id === contactId);
    if (deleteIndex !== -1) {
      const removedContact = contacts.splice(deleteIndex, 1);
      await updateFile(contactsPath, contacts);
      return removedContact;
    } else {
      console.log("We have no contact with this ID");
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await getContacts(contactsPath);
    const newContact = createContact(name, email, phone);
    contacts.push(newContact);
    await updateFile(contactsPath, contacts);
    return newContact;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
