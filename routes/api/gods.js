const router = require("express").Router();
const godsController = require("../../controllers/godsController");

router.route("/new/:class/:name").get(godsController.newGod);

router.route("/public").get(godsController.findPublic);

router.route("/private/:id").get(godsController.findPrivate);

router.route("/bigName/:email").get(godsController.findBigName);

router
  .route("/:id")
  .get(godsController.findById)
  .put(godsController.update)
  .delete(godsController.remove);

router
  .route("/")
  .get(godsController.findAll)
  .post(godsController.create)
  .put(godsController.update);

module.exports = router;
