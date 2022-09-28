const { validationResult } = require("express-validator");

const validateExists = (modelName, model, next) => {
  console.log("MODEL, ", model);
  if (!model) {
    console.log(`${modelName} does not exist`);
    return newErr(`${modelName} does not exist`, 400, next);
  }
};

const validateOwnership = (modelName, model, modelKey, user, userKey, next) => {
  if (model[modelKey] !== user[userKey]) {
    console.log(`${modelName} must be owned by current user`);
    return newErr(`${modelName} must be owned by current user`, 401, next);
  }
};

const newErr = (message, status, next) => {
  const err = Error(message);
  err.status = status;
  return next(err);
};

const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);
  console.log(validationErrors);
  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => `${error.msg}`);
    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.message = "Validation Error";
    next(err);
  }

  next();
};

const overwriteErrorMsg = (targetKeyword, newMessage, errors) => {
  for (let err of errors) {
    if (err.includes("targetKeyword")) {
      err = newMessage;
    }
  }

  return errors;
};

module.exports = {
  handleValidationErrors,
  overwriteErrorMsg,
  newErr,
  validateExists,
  validateOwnership,
};
