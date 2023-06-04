const contactsAPI = require("./contacts");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contactsAPI.listContacts().then(console.table);
      break;

    case "get":
      contactsAPI.getContactById(id).then(console.log);
      break;

    case "add":
      contactsAPI.addContact(name, email, phone).then(console.log);
      break;

    case "remove":
      contactsAPI.removeContact(id).then(console.log);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
