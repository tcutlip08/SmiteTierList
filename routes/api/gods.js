const router = require("express").Router();
const godsController = require("../../controllers/godsController");

router
  .route("/:id")
  .get(godsController.findById)
  .put(godsController.update)
  .delete(godsController.remove);

router
  .route("/")
  .get(godsController.findAll)
  .post(godsController.create);

module.exports = router;
