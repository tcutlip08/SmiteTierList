const router = require("express").Router();
const gods = require("./gods");
const user = require("./user");

router.use("/gods", gods);
router.use("/user", user);

module.exports = router;
