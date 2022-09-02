const express = require("express");

const controller = require("../../controllers/auth");
const { controllerWrapper } = require("../../helpers");
const { validationBody } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/register",
  validationBody(schemas.registerSchema),
  controllerWrapper(controller.register)
);

module.exports = router;
