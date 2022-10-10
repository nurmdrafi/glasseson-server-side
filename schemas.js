const Joi = require("joi");

module.exports = {
  user: {
    register: Joi.object().keys({
      username: Joi.string().required().trim().min(3).max(30).messages({
        "any.required": "username is a required field",
        "string.trim": "must not have leading or trailing whitespace",
        "string.min": "minimum 3 character required",
        "string.max": "maximum 30 characters allowed",
      }),
      first_name: Joi.string().required().trim().min(3).max(30).messages({
        "any.required": "first_name is a required field",
        "string.trim": "must not have leading or trailing whitespace",
        "string.min": "minimum 3 character required",
        "string.max": "maximum 30 characters allowed",
      }),
      last_name: Joi.string().trim().min(3).max(30).required().messages({
        "any.required": "last_name is a required field",
        "string.trim": "must not have leading or trailing whitespace",
        "string.min": "minimum 3 character required",
        "string.max": "maximum 30 characters allowed",
      }),
      email: Joi.string()
        .required()
        .regex(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
        .messages({
          "any.required": "email is a required field",
          "string.pattern.base": "invalid email address",
        }),
      password: Joi.string()
        .required()
        .regex(
          /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?\/_₹]).{8,}$/
        )
        .messages({
          "any.required": "password is a required field",
          "string.pattern.base": "invalid password",
        }),
      role: Joi.string().default("user"),
      refreshToken: Joi.string().default(""),
    }),
    login: Joi.object().keys({
      email: Joi.string()
        .required()
        .regex(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
        .messages({
          "any.required": "email is a required field",
          "string.pattern.base": "invalid email address",
        }),
      password: Joi.string()
        .required()
        .regex(
          /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?\/_₹]).{8,}$/
        )
        .messages({
          "any.required": "password is a required field",
          "string.pattern.base": "invalid password",
        }),
    }),
  },
};
