const router = require("express").Router();
const godsController = require("../../controllers/godsController");

router
  .route("/:id")
  .get(godsController.findById)
  .delete(godsController.remove);

router
  .route("/")
  .get(godsController.findAll)
  .post(godsController.create)
  .put(godsController.update);

module.exports = router;
