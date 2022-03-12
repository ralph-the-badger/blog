const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).max(100).required().messages({
      "string.min": "Please enter a name with at least 6 characters.",
      "string.max": "Please enter a name with less than 100 characters",
      "string.empty": "Please enter a name.",
    }),
    email: Joi.string()
      .min(6)
      .max(100)
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "de"] } })
      .messages({
        "string.min": "Please enter an email with at least 6 characters.",
        "string.max": "Please enter an email with less than 100 characters",
        "string.empty": "Please enter an email.",
      }),
    password: Joi.string().min(6).max(100).required().messages({
      "string.min": "Please enter a password with at least 6 characters.",
      "string.max": "Please enter a password with less than 100 characters",
      "string.empty": "Please enter a password.",
    }),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .max(100)
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "de"] } })
      .messages({
        "string.min": "Please enter an email with at least 6 characters.",
        "string.max": "Please enter an email with less than 100 characters",
        "string.empty": "Please enter an email.",
      }),
    password: Joi.string().min(6).max(100).required().messages({
      "string.min": "Please enter a password with at least 6 characters.",
      "string.max": "Please enter a password with less than 100 characters",
      "string.empty": "Please enter a password.",
    }),
  });
  return schema.validate(data);
};

module.exports.loginValidation = loginValidation;
