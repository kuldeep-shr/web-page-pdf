const Joi = require("joi");

const urlValidateSchema = Joi.object({
  url: Joi.string().required().error(new Error("Please enter the url")),
});

exports.urlValidate = function (req, res, next) {
  let data = req.body;
  let err = urlValidateSchema.validate(data);
  if (err) {
    if (err.error) {
      let error_message = "";
      if (err.error.details) {
        error_message = err.error.details[0].message;
      } else {
        error_message = err.error.message;
      }
      return res.status(422).send({
        status: false,
        message: error_message,
        statusCode: 422,
        data: [],
      });

      return false;
    }
  }
  next();
};
