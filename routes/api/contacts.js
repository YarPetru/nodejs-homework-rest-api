const express = require("express");

const controller = require("../../controllers/contacts");
const { controllerWrapper } = require("../../helpers");
const {
  isValidId,
  validationBody,
  authenticate,
} = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, controllerWrapper(controller.getAll));

router.get(
  "/:contactId",
  authenticate,
  isValidId,
  controllerWrapper(controller.getById)
);

router.post(
  "/",
  authenticate,
  validationBody(schemas.addContactSchema),
  controllerWrapper(controller.addContact)
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  controllerWrapper(controller.deleteContact)
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validationBody(schemas.addContactSchema),
  controllerWrapper(controller.updateContact)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validationBody(schemas.updateFaveSchema),
  controllerWrapper(controller.updateFaveStatus)
);

module.exports = router;
