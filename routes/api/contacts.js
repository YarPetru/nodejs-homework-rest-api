const express = require("express");

const controller = require("../../controllers");
const { controllerWrapper } = require("../../helpers");

const router = express.Router();

router.get("/", controllerWrapper(controller.getAll));

router.get("/:contactId", controllerWrapper(controller.getById));

router.post("/", controllerWrapper(controller.addContact));

router.delete("/:contactId", controllerWrapper(controller.deleteContact));

router.put("/:contactId", controllerWrapper(controller.updateContact));

module.exports = router;
