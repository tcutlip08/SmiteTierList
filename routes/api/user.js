const router = require("express").Router();
const userController = require("../../controllers/userController");

// router.route("/admin/seeds").get(userController.seeds);

router.route("/google/:sub").get(userController.findByGoogle);
router.route("/google").put(userController.create);

router
  .route("/:id")
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

router
  .route("/")
  .get(userController.findAll)
  .post(userController.create);

module.exports = router;
