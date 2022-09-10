const express = require("express");

const controller = require("../../controllers/auth");
const { controllerWrapper } = require("../../helpers");
const { validationBody, authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post(
  "/signup",
  validationBody(schemas.registerSchema),
  controllerWrapper(controller.signup)
);

router.get(
  "/verify/:verificationToken",
  controllerWrapper(controller.verifyEmail)
);

router.post(
  "/verify",
  validationBody(schemas.verifyEmailSchema),
  controllerWrapper(controller.resendVerification)
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

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  controllerWrapper(controller.updateAvatar)
);

router.get("/current", authenticate, controllerWrapper(controller.current));

module.exports = router;
