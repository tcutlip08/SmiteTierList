const router = require("express").Router();
const userController = require("../../controllers/userController");

router.route("/update-time").get(userController.fixTime);

router.route("/google/:sub").get(userController.findByGoogle);
router.route("/google").put(userController.create);

router.route("/ban/:id").put(userController.banById);

router.route("/mod/:id").put(userController.modById);

router
  .route("/:id")
  .get(userController.findById)
  .delete(userController.remove);

router
  .route("/")
  .get(userController.findAll)
  .post(userController.create);

module.exports = router;
