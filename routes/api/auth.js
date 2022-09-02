const express = require("express");

const controller = require("../../controllers/auth");
const { controllerWrapper } = require("../../helpers");
const { validationBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/signup",
  validationBody(schemas.registerSchema),
  controllerWrapper(controller.signup)
);

router.post(
  "/login",
  validationBody(schemas.loginSchema),
  controllerWrapper(controller.login)
);

router.post(
  "/logout",
  authenticate,
  validationBody(schemas.loginSchema),
  controllerWrapper(controller.logout)
);

router.get("/current", authenticate, controllerWrapper(controller.current));

module.exports = router;
