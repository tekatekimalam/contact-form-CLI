const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Cek apakah folder tersedia
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// Cek apakah file tersedia
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

rl.question("Masukkan nama anda: ", nama => {
  rl.question("Masukkan no HP anda: ", noHp => {
    rl.question("Masukkan email anda: ", email => {
      const contact = { nama, noHp, email };
      const fileBuffer = fs.readFileSync(dataPath, "utf-8");
      const contacts = JSON.parse(fileBuffer);

      contacts.push(contact);

      fs.writeFileSync(dataPath, JSON.stringify(contacts));

      console.log("Terimakasih sudah mengisi data");
      rl.close();
    });
  });
});
