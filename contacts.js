const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    console.log(data);
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
    console.log("contactMatch:", contactMatch);

    const filtredContacts = parseData.filter((contact) => {
      if (!contactMatch.id) return;
      contact.id !== contactMatch.id;
    });

    console.log("filtredContacts:", filtredContacts);

    const refreshedList = JSON.stringify(filtredContacts);

    await fs.writeFile(contactsPath, refreshedList);
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

    console.log("toStringData:", parseData);
    const refreshedList = JSON.stringify(parseData);

    await fs.writeFile(contactsPath, refreshedList);
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
