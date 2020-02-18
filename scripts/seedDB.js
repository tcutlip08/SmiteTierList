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
  {
    class: "Warrior",
    gods: [
      { name: "Achilles", rank: [4] },
      { name: "Amaterasu", rank: [] },
      { name: "Bellona", rank: [] },
      { name: "Chaac", rank: [] },
      { name: "Cu Chulainn", rank: [] },
      { name: "Erlang Shen", rank: [] },
      { name: "Guan Yu", rank: [1] },
      { name: "Hercules", rank: [] },
      { name: "Horus", rank: [] },
      { name: "King Arthur", rank: [] },
      { name: "Mulan", rank: [] },
      { name: "Nike", rank: [6] },
      { name: "Odin", rank: [] },
      { name: "Osiris", rank: [] },
      { name: "Sun Wukong", rank: [] },
      { name: "Tyr", rank: [] },
      { name: "Vamana", rank: [] }
    ]
  },
  {
    class: "Guardian",
    gods: [
      { name: "Ares", rank: [2] },
      { name: "Artio", rank: [] },
      { name: "Athena", rank: [] },
      { name: "Bacchus", rank: [] },
      { name: "Cabrakan", rank: [] },
      { name: "Cerberus", rank: [] },
      { name: "Fafnir", rank: [] },
      { name: "Ganesha", rank: [] },
      { name: "Geb", rank: [] },
      { name: "Jormungandr", rank: [] },
      { name: "Khepri", rank: [] },
      { name: "Kumbakharna", rank: [] },
      { name: "Kuzenbo", rank: [] },
      { name: "Sobek", rank: [5] },
      { name: "Sylvanus", rank: [] },
      { name: "Terra", rank: [] },
      { name: "Xing Tian", rank: [] },
      { name: "Yemoja", rank: [] },
      { name: "Ymir", rank: [] }
    ]
  },
  {
    class: "Hunter",
    gods: [
      { name: "Ah Muzen Cab", rank: [] },
      { name: "Anhur", rank: [] },
      { name: "Apollo", rank: [] },
      { name: "Artemis", rank: [] },
      { name: "Cernunnos", rank: [] },
      { name: "Chernabog", rank: [] },
      { name: "Chiron", rank: [] },
      { name: "Cupid", rank: [3] },
      { name: "Hachiman", rank: [] },
      { name: "Heimdallr", rank: [] },
      { name: "Hou Yi", rank: [] },
      { name: "Izanami", rank: [9] },
      { name: "Jing Wei", rank: [6] },
      { name: "Medusa", rank: [] },
      { name: "Neith", rank: [] },
      { name: "Rama", rank: [] },
      { name: "Skadi", rank: [] },
      { name: "Ullr", rank: [] },
      { name: "Xbalanque", rank: [] }
    ]
  },
  {
    class: "Assassin",
    gods: [
      { name: "Arachne", rank: [] },
      { name: "Awilix", rank: [7] },
      { name: "Bakasura", rank: [] },
      { name: "Bastet", rank: [] },
      { name: "Camazotz", rank: [] },
      { name: "Da Ji", rank: [] },
      { name: "Fenrir", rank: [] },
      { name: "Hun Batz", rank: [] },
      { name: "Kali", rank: [] },
      { name: "Loki", rank: [] },
      { name: "Mercury", rank: [] },
      { name: "Ne Zha", rank: [8] },
      { name: "Nemesis", rank: [] },
      { name: "Pele", rank: [] },
      { name: "Ratatoskr", rank: [] },
      { name: "Ravana", rank: [] },
      { name: "Serqet", rank: [] },
      { name: "Set", rank: [] },
      { name: "Susano", rank: [] },
      { name: "Thanatos", rank: [] },
      { name: "Thor", rank: [] }
    ]
  },
  {
    class: "Mage",
    gods: [
      { name: "Agni", rank: [] },
      { name: "Ah Puch", rank: [2] },
      { name: "Anubis", rank: [] },
      { name: "Ao Kuang", rank: [] },
      { name: "Aphrodite", rank: [] },
      { name: "Baron Samedi", rank: [] },
      { name: "Change", rank: [] },
      { name: "Chronos", rank: [] },
      { name: "Discordia", rank: [4] },
      { name: "Freya", rank: [] },
      { name: "Hades", rank: [] },
      { name: "Hebo", rank: [] },
      { name: "Hel", rank: [] },
      { name: "Hera", rank: [] },
      { name: "Isis", rank: [] },
      { name: "Janus", rank: [] },
      { name: "Kukulkan", rank: [] },
      { name: "Merlin", rank: [] },
      { name: "Nox", rank: [] },
      { name: "Nu Wa", rank: [] },
      { name: "Olorun", rank: [] },
      { name: "Persephone", rank: [] },
      { name: "Poseidon", rank: [] },
      { name: "Ra", rank: [] },
      { name: "Raijin", rank: [] },
      { name: "Scylla", rank: [] },
      { name: "Sol", rank: [] },
      { name: "The Morrigan", rank: [] },
      { name: "Thoth", rank: [] },
      { name: "Vulcan", rank: [] },
      { name: "Zeus", rank: [] },
      { name: "Zhong Qui", rank: [] }
    ]
  }
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
