const createError = require("http-errors");

const validate = (schema, property) => {
  return (req, res, next) => {
    // Joi validation options
    const validationOptions = {
      abortEarly: false, // abort after the last validation error
    };

    const { error } = schema.validate(req[property], validationOptions);
    if (error) {
      console.log(error);
      const { details } = error;
      const message = details.map((i) => i.message).join(", ");
      res.status(422).json({ status: 422, message: message });
    } else {
      next();
    }
  };
};
module.exports = validate;
