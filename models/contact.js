const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSchemaErrors } = require("../helpers");

const emailRegexp = /^[\w.]+@[\w]+.[\w]+$/;
const phoneRegexp = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

const contactSchema = new Schema(
  {
    name: { type: String, required: [true, "Name is required field"] },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: [true, "Email is required field"],
    },
    phone: {
      type: String,
      match: phoneRegexp,
      required: [true, "Email is required field"],
    },
    favorite: { type: Boolean, default: false },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timeStamps: true }
);

contactSchema.post("save", handleSchemaErrors);

const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
  favorite: Joi.bool(),
});

const updateFaveSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const schemas = {
  addContactSchema,
  updateFaveSchema,
};

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };
