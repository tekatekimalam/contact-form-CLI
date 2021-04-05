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

// Function tulis pertanyaan dengan parameter pertanyaan yang mengembalikan promise promise
const tulisPertanyaan = pertanyaan => {
  return new Promise((resolve, reject) => {
    rl.question(pertanyaan, input => {
      resolve(input);
    });
  });
};

const main = async () => {
  const nama = await tulisPertanyaan("Masukkan nama anda: ");
  const noHp = await tulisPertanyaan("Masukkan noHp anda: ");
  const email = await tulisPertanyaan("Masukkan email anda: ");

  const contact = { nama, noHp, email };
  const fileBuffer = fs.readFileSync(dataPath, "utf-8");
  const contacts = JSON.parse(fileBuffer);

  contacts.push(contact);

  fs.writeFileSync(dataPath, JSON.stringify(contacts));
  console.log("Terimakasih telah mengisi");

  rl.close();
};

main();
