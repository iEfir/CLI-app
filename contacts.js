const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const parseData = JSON.parse(data);
    console.table(parseData);
  } catch (err) {
    console.log(err);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const parseData = JSON.parse(data);

    const contactMatch = parseData.find((contact) => contact.id === contactId);
    console.log(contactMatch);
  } catch (err) {
    console.log(err);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const parseData = JSON.parse(data);

    const contactMatch = parseData.find((contact) => contact.id === contactId);

    const filtredContacts = parseData.filter(
      (contact) => contact.id !== contactMatch.id
    );

    const refreshedList = JSON.stringify(filtredContacts);

    await fs.writeFile(contactsPath, refreshedList);

    console.log(`Contact ${contactMatch.name} has been deleted successfully`);
    listContacts();
  } catch (err) {
    console.log(err);
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = {
      name: name,
      email: email,
      phone: phone,
    };

    const data = await fs.readFile(contactsPath, "utf-8");
    const parseData = JSON.parse(data);

    parseData.push(newContact);

    const refreshedList = JSON.stringify(parseData);

    await fs.writeFile(contactsPath, refreshedList);

    listContacts();
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
