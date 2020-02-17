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
      { name: "Cu Chulainn", rank: [5, 6, 5] },
      { name: "Sun Wukong", rank: [5, 7, 8] },
      { name: "Tyr", rank: [5, 6, 8] },
      { name: "Vamana", rank: [5, 6, 8] }
    ]
  },
  {
    class: "Guardian",
    gods: [
      { name: "Artio", rank: [5, 4, 5] },
      { name: "Cabrakan", rank: [5, 6, 4] },
      { name: "Ymir", rank: [4, 6, 4] }
    ]
  },
  {
    class: "Hunter",
    gods: [
      { name: "Ah Muzen Cab", rank: [3, 4, 3] },
      { name: "Anhur", rank: [5, 6, 6] },
      { name: "Apollo", rank: [5, 6, 7] }
    ]
  },
  {
    class: "Assassin",
    gods: [
      { name: "Arachne", rank: [2, 5, 4] },
      { name: "Awilix", rank: [5, 5, 6] },
      { name: "Thor", rank: [3, 6, 3] }
    ]
  },
  {
    class: "Mage",
    gods: [
      { name: "Agni", rank: [5, 6, 8] },
      { name: "Ah Puch", rank: [5, 5, 4] },
      { name: "Zeus", rank: [3, 4, 3] }
    ]
  }
];
// const godsSeed = [
//   {
//     class: "Warrior",
//     name: [
//       "Achilles",
//       "Amaterasu",
//       "Bellona",
//       "Chaac",
//       "Cu Chulainn",
//       "Erlang Shen",
//       "Guan Yu",
//       "Hercules",
//       "Horus",
//       "King Arthur",
//       "Mulan",
//       "Nike",
//       "Odin",
//       "Osiris",
//       "Sun Wukong",
//       "Tyr",
//       "Vamana"
//     ]
//   },
//   {
//     class: "Guardian",
//     name: [
//       "Ares",
//       "Artio",
//       "Athena",
//       "Bacchus",
//       "Cabrakan",
//       "Cerberus",
//       "Fafnir",
//       "Ganesha",
//       "Geb",
//       "Jormungandr",
//       "Khepri",
//       "Kumbakharna",
//       "Kuzenbo",
//       "Sobek",
//       "Sylvanus",
//       "Terra",
//       "Xing Tian",
//       "Yemoja",
//       "Ymir"
//     ]
//   },
//   {
//     class: "Hunter",
//     name: [
//       "Ah Muzen Cab",
//       "Anhur",
//       "Apollo",
//       "Artemis",
//       "Cernunnos",
//       "Chernabog",
//       "Chiron",
//       "Cupid",
//       "Hachiman",
//       "Heimdallr",
//       "Hou Yi",
//       "Izanami",
//       "Jing Wei",
//       "Medusa",
//       "Neith",
//       "Rama",
//       "Skadi",
//       "Ullr",
//       "Xbalanque"
//     ]
//   },
//   {
//     class: "Assassin",
//     name: [
//       "Arachne",
//       "Awilix",
//       "Bakasura",
//       "Bastet",
//       "Camazotz",
//       "Da Ji",
//       "Fenrir",
//       "Hun Batz",
//       "Kali",
//       "Loki",
//       "Mercury",
//       "Ne Zha",
//       "Nemesis",
//       "Pele",
//       "Ratatoskr",
//       "Ravana",
//       "Serqet",
//       "Set",
//       "Susano",
//       "Thanatos",
//       "Thor"
//     ]
//   },
//   {
//     class: "Mage",
//     name: [
//       "Agni",
//       "Ah Puch",
//       "Anubis",
//       "Ao Kuang",
//       "Aphrodite",
//       "Baron Samedi",
//       "Change",
//       "Chronos",
//       "Discordia",
//       "Freya",
//       "Hades",
//       "Hebo",
//       "Hel",
//       "Hera",
//       "Isis",
//       "Janus",
//       "Kukulkan",
//       "Merlin",
//       "Nox",
//       "Nu Wa",
//       "Olorun",
//       "Persephone",
//       "Poseidon",
//       "Ra",
//       "Raijin",
//       "Scylla",
//       "Sol",
//       "The Morrigan",
//       "Thoth",
//       "Vulcan",
//       "Zeus",
//       "Zhong Qui"
//     ]
//   }
// ];

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
