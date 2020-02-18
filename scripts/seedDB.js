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
      { name: "Achilles", rank: [1] },
      { name: "Amaterasu", rank: [2] },
      { name: "Bellona", rank: [3] },
      { name: "Chaac", rank: [1,5,4] },
      { name: "Cu Chulainn", rank: [5] },
      { name: "Erlang Shen", rank: [6] },
      { name: "Guan Yu", rank: [7] },
      { name: "Hercules", rank: [8] },
      { name: "Horus", rank: [9] },
      { name: "King Arthur", rank: [] },
      { name: "Mulan", rank: [] },
      { name: "Nike", rank: [] },
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
      { name: "Ares", rank: [1] },
      { name: "Artio", rank: [2] },
      { name: "Athena", rank: [3] },
      { name: "Bacchus", rank: [4] },
      { name: "Cabrakan", rank: [5] },
      { name: "Cerberus", rank: [6] },
      { name: "Fafnir", rank: [7] },
      { name: "Ganesha", rank: [8] },
      { name: "Geb", rank: [9] },
      { name: "Jormungandr", rank: [] },
      { name: "Khepri", rank: [] },
      { name: "Kumbakharna", rank: [] },
      { name: "Kuzenbo", rank: [] },
      { name: "Sobek", rank: [] },
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
      { name: "Ah Muzen Cab", rank: [1] },
      { name: "Anhur", rank: [2] },
      { name: "Apollo", rank: [3] },
      { name: "Artemis", rank: [4] },
      { name: "Cernunnos", rank: [5] },
      { name: "Chernabog", rank: [6] },
      { name: "Chiron", rank: [7] },
      { name: "Cupid", rank: [8] },
      { name: "Hachiman", rank: [9] },
      { name: "Heimdallr", rank: [1] },
      { name: "Hou Yi", rank: [2] },
      { name: "Izanami", rank: [3] },
      { name: "Jing Wei", rank: [] },
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
      { name: "Arachne", rank: [1] },
      { name: "Awilix", rank: [2] },
      { name: "Bakasura", rank: [3] },
      { name: "Bastet", rank: [4] },
      { name: "Camazotz", rank: [5] },
      { name: "Da Ji", rank: [9] },
      { name: "Fenrir", rank: [6] },
      { name: "Hun Batz", rank: [7] },
      { name: "Kali", rank: [8] },
      { name: "Loki", rank: [] },
      { name: "Mercury", rank: [] },
      { name: "Ne Zha", rank: [] },
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
      { name: "Agni", rank: [1] },
      { name: "Ah Puch", rank: [2] },
      { name: "Anubis", rank: [2] },
      { name: "Ao Kuang", rank: [3] },
      { name: "Aphrodite", rank: [4] },
      { name: "Baron Samedi", rank: [5] },
      { name: "Change", rank: [6] },
      { name: "Chronos", rank: [7] },
      { name: "Discordia", rank: [8] },
      { name: "Freya", rank: [9] },
      { name: "Hades", rank: [] },
      { name: "Hebo", rank: [] },
      { name: "Hel", rank: [] },
      { name: "Hera", rank: [] },
      { name: "Isis", rank: [] },
      { name: "Janus", rank: [] },
      { name: "Kukulkan", rank: [] },
      { name: "Merlin", rank: [3] },
      { name: "Nox", rank: [4] },
      { name: "Nu Wa", rank: [5] },
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
