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
    name: [
      "Achilles",
      "Amaterasu",
      "Bellona",
      "Chaac",
      "Cu Chulainn",
      "Erlang Shen",
      "Guan Yu",
      "Hercules",
      "Horus",
      "King Arthur",
      "Mulan",
      "Nike",
      "Odin",
      "Osiris",
      "Sun Wukong",
      "Tyr",
      "Vamana"
    ]
  },
  {
    class: "Guardian",
    name: [
      "Ares",
      "Artio",
      "Athena",
      "Bacchus",
      "Cabrakan",
      "Cerberus",
      "Fafnir",
      "Ganesha",
      "Geb",
      "Jormungandr",
      "Khepri",
      "Kumbhakarna",
      "Kuzenbo",
      "Sobek",
      "Sylvanus",
      "Terra",
      "Xing Tian",
      "Yemoja",
      "Ymir"
    ]
  },
  {
    class: "Hunter",
    name: [
      "Ah Muzen Cab",
      "Anhur",
      "Apollo",
      "Artemis",
      "Cernunnos",
      "Chernobog",
      "Chiron",
      "Cupid",
      "Hachiman",
      "Heimdallr",
      "Hou Yi",
      "Izanami",
      "Jing Wei",
      "Medusa",
      "Neith",
      "Rama",
      "Skadi",
      "Ullr",
      "Xbalanque"
    ]
  },
  {
    class: "Assassin",
    name: [
      "Arachne",
      "Awilix",
      "Bakasura",
      "Bastet",
      "Camazotz",
      "Da Ji",
      "Fenrir",
      "Hun Batz",
      "Kali",
      "Loki",
      "Mercury",
      "Ne Zha",
      "Nemesis",
      "Pele",
      "Ratatoskr",
      "Ravana",
      "Serqet",
      "Set",
      "Susano",
      "Thanatos",
      "Thor"
    ]
  },
  {
    class: "Mage",
    name: [
      "Agni",
      "Ah Puch",
      "Anubis",
      "Ao Kuang",
      "Aphrodite",
      "Baron Samedi",
      "Chang'e",
      "Chronos",
      "Discordia",
      "Freya",
      "Hades",
      "Hebo",
      "Hel",
      "Hera",
      "Isis",
      "Janus",
      "Kukulkan",
      "Merlin",
      "Nox",
      "Nu Wa",
      "Olorun",
      "Persephone",
      "Poseidon",
      "Ra",
      "Raijin",
      "Scylla",
      "Sol",
      "The Morrigan",
      "Thoth",
      "Vulcan",
      "Zeus",
      "Zhong Kui"
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
