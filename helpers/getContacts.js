const fs = require("fs/promises");
const getContacts = async (path) => {
  const contacts = await fs.readFile(path, "UTF-8");
  const arrOfContacts = JSON.parse(contacts);
  return arrOfContacts;
};
module.exports = getContacts;
