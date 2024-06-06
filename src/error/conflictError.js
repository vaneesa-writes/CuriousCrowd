const BaseError = require("./base.error");
const { StatusCodes } = require("http-status-codes");

class ConflictError extends BaseError {
    constructor(resourceName, resourceValue) {
        super(
            "Conflict",
            StatusCodes.CONFLICT,
            `The requested resource: ${resourceName} has conflicting value ${resourceValue}`,
            {
                resourceName,
                resourceValue,
            }
        );
    }
}

module.exports = ConflictError;
