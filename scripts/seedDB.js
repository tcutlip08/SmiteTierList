const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/smite_tier_list",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  }
);

const godsSeed = [
  // Warriors
  { name: "Achilles", rank: [], class: "Warrior" },
  { name: "Amaterasu", rank: [], class: "Warrior" },
  { name: "Bellona", rank: [], class: "Warrior" },
  { name: "Chaac", rank: [], class: "Warrior" },
  { name: "Cu Chulainn", rank: [], class: "Warrior" },
  { name: "Erlang Shen", rank: [], class: "Warrior" },
  { name: "Guan Yu", rank: [], class: "Warrior" },
  { name: "Hercules", rank: [], class: "Warrior" },
  { name: "Horus", rank: [], class: "Warrior" },
  { name: "King Arthur", rank: [], class: "Warrior" },
  { name: "Mulan", rank: [], class: "Warrior" },
  { name: "Nike", rank: [], class: "Warrior" },
  { name: "Odin", rank: [], class: "Warrior" },
  { name: "Osiris", rank: [], class: "Warrior" },
  { name: "Sun Wukong", rank: [], class: "Warrior" },
  { name: "Tyr", rank: [], class: "Warrior" },
  { name: "Vamana", rank: [], class: "Warrior" },
  // Guardians
  { name: "Ares", rank: [], class: "Guardian" },
  { name: "Artio", rank: [], class: "Guardian" },
  { name: "Athena", rank: [], class: "Guardian" },
  { name: "Bacchus", rank: [], class: "Guardian" },
  { name: "Cabrakan", rank: [], class: "Guardian" },
  { name: "Cerberus", rank: [], class: "Guardian" },
  { name: "Fafnir", rank: [], class: "Guardian" },
  { name: "Ganesha", rank: [], class: "Guardian" },
  { name: "Geb", rank: [], class: "Guardian" },
  { name: "Jormungandr", rank: [], class: "Guardian" },
  { name: "Khepri", rank: [], class: "Guardian" },
  { name: "Kumbakharna", rank: [], class: "Guardian" },
  { name: "Kuzenbo", rank: [], class: "Guardian" },
  { name: "Sobek", rank: [], class: "Guardian" },
  { name: "Sylvanus", rank: [], class: "Guardian" },
  { name: "Terra", rank: [], class: "Guardian" },
  { name: "Xing Tian", rank: [], class: "Guardian" },
  { name: "Yemoja", rank: [], class: "Guardian" },
  { name: "Ymir", rank: [], class: "Guardian" },
  // Hunters
  { name: "Ah Muzen Cab", rank: [], class: "Hunter" },
  { name: "Anhur", rank: [], class: "Hunter" },
  { name: "Apollo", rank: [], class: "Hunter" },
  { name: "Artemis", rank: [], class: "Hunter" },
  { name: "Cernunnos", rank: [], class: "Hunter" },
  { name: "Chernabog", rank: [], class: "Hunter" },
  { name: "Chiron", rank: [], class: "Hunter" },
  { name: "Cupid", rank: [], class: "Hunter" },
  { name: "Hachiman", rank: [], class: "Hunter" },
  { name: "Heimdallr", rank: [], class: "Hunter" },
  { name: "Hou Yi", rank: [], class: "Hunter" },
  { name: "Izanami", rank: [], class: "Hunter" },
  { name: "Jing Wei", rank: [], class: "Hunter" },
  { name: "Medusa", rank: [], class: "Hunter" },
  { name: "Neith", rank: [], class: "Hunter" },
  { name: "Rama", rank: [], class: "Hunter" },
  { name: "Skadi", rank: [], class: "Hunter" },
  { name: "Ullr", rank: [], class: "Hunter" },
  { name: "Xbalanque", rank: [], class: "Hunter" },
  // Assassin
  { name: "Arachne", rank: [], class: "Assassin" },
  { name: "Awilix", rank: [], class: "Assassin" },
  { name: "Bakasura", rank: [], class: "Assassin" },
  { name: "Bastet", rank: [], class: "Assassin" },
  { name: "Camazotz", rank: [], class: "Assassin" },
  { name: "Da Ji", rank: [], class: "Assassin" },
  { name: "Fenrir", rank: [], class: "Assassin" },
  { name: "Hun Batz", rank: [], class: "Assassin" },
  { name: "Kali", rank: [], class: "Assassin" },
  { name: "Loki", rank: [], class: "Assassin" },
  { name: "Mercury", rank: [], class: "Assassin" },
  { name: "Ne Zha", rank: [], class: "Assassin" },
  { name: "Nemesis", rank: [], class: "Assassin" },
  { name: "Pele", rank: [], class: "Assassin" },
  { name: "Ratatoskr", rank: [], class: "Assassin" },
  { name: "Ravana", rank: [], class: "Assassin" },
  { name: "Serqet", rank: [], class: "Assassin" },
  { name: "Set", rank: [], class: "Assassin" },
  { name: "Susano", rank: [], class: "Assassin" },
  { name: "Thanatos", rank: [], class: "Assassin" },
  { name: "Thor", rank: [], class: "Assassin" },
  // Mage
  { name: "Agni", rank: [], class: "Mage" },
  { name: "Ah Puch", rank: [], class: "Mage" },
  { name: "Anubis", rank: [], class: "Mage" },
  { name: "Ao Kuang", rank: [], class: "Mage" },
  { name: "Aphrodite", rank: [], class: "Mage" },
  { name: "Baron Samedi", rank: [], class: "Mage" },
  { name: "Change", rank: [], class: "Mage" },
  { name: "Chronos", rank: [], class: "Mage" },
  { name: "Discordia", rank: [], class: "Mage" },
  { name: "Freya", rank: [], class: "Mage" },
  { name: "Hades", rank: [], class: "Mage" },
  { name: "Hebo", rank: [], class: "Mage" },
  { name: "Hel", rank: [], class: "Mage" },
  { name: "Hera", rank: [], class: "Mage" },
  { name: "Isis", rank: [], class: "Mage" },
  { name: "Janus", rank: [], class: "Mage" },
  { name: "Kukulkan", rank: [], class: "Mage" },
  { name: "Merlin", rank: [], class: "Mage" },
  { name: "Nox", rank: [], class: "Mage" },
  { name: "Nu Wa", rank: [], class: "Mage" },
  { name: "Olorun", rank: [], class: "Mage" },
  { name: "Persephone", rank: [], class: "Mage" },
  { name: "Poseidon", rank: [], class: "Mage" },
  { name: "Ra", rank: [], class: "Mage" },
  { name: "Raijin", rank: [], class: "Mage" },
  { name: "Scylla", rank: [], class: "Mage" },
  { name: "Sol", rank: [], class: "Mage" },
  { name: "The Morrigan", rank: [], class: "Mage" },
  { name: "Thoth", rank: [], class: "Mage" },
  { name: "Vulcan", rank: [], class: "Mage" },
  { name: "Zeus", rank: [], class: "Mage" },
  { name: "Zhong Qui", rank: [], class: "Mage" }
];

db.Gods.remove({})
  .then(() => db.Gods.collection.insertMany(godsSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

// db.User.remove({})
//   .then(() => process.exit(0))
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });
