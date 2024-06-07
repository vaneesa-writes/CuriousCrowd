const { StatusCodes } = require("http-status-codes");
const BaseError = require("../error/base.error");

function errorHandler(err, req, res, next) {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: err.details,
      data: {},
    });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Something went wrong !",
    error: err,
    data: {}, // because this is an exception so no data is going tobe provided
  });
}

module.exports = errorHandler;
