const express = require("express");

const controller = require("../../controllers");
const { controllerWrapper } = require("../../helpers");
const { isValidId, validationBody } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", controllerWrapper(controller.getAll));

router.get("/:contactId", isValidId, controllerWrapper(controller.getById));

router.post(
  "/",
  validationBody(schemas.addContactSchema),
  controllerWrapper(controller.addContact)
);

router.delete(
  "/:contactId",
  isValidId,
  controllerWrapper(controller.deleteContact)
);

router.put(
  "/:contactId",
  isValidId,
  validationBody(schemas.addContactSchema),
  controllerWrapper(controller.updateContact)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validationBody(schemas.updateFaveSchema),
  controllerWrapper(controller.updateFaveStatus)
);

module.exports = router;
