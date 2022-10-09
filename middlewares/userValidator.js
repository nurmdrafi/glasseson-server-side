const { celebrate, Joi, errors, Segments } = require("celebrate");

exports.userValidator = (req, res, next) =>
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().alphanum().trim().min(3).max(20).required(),
      first_name: Joi.string().trim().min(3).max(20).required(),
      last_name: Joi.string().trim().min(3).max(20).required(),
      email: Joi.string()
        .required()
        .regex(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/),
      password: Joi.string()
        .required()
        .regex(
          /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?\/_₹]).{8,}$/
        ),
      role: Joi.string().default("user"),
      refreshToken: Joi.string().default(""),
    }),
  });
