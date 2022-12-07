const { sendApiResponse } = require("../helpers/apiResponse");

exports.catchErrors = (fn) => {
  return function (req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

exports.notFound = (req, res, next) => {
  const err = "Not Found";
  errorDetails.status = false;
  errorDetails.statusCode = 404;
  errorDetails.msg = err;
  next(errorDetails);
};

exports.developmentErrors = async (err, req, res, next) => {
  err.stack = err.stack || "";
  await sendApiResponse(res, {
    status: false,
    statusCode: 400,
    msg: err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, "<mark>$&</mark>"),
    data: [],
  });
};

exports.productionErrors = async (err, req, res, next) => {
  await sendApiResponse(res, {
    status: false,
    statusCode: 500,
    msg: "Something Went Wrong",
    data: [],
  });
};
