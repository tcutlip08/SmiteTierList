const router = require("express").Router();
const gods = require("./gods");

router.use("/gods", gods);

module.exports = router;
