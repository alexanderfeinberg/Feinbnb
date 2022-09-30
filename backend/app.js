const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const cors = require("cors");
const csurf = require("csurf");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const { ValidationError } = require("sequelize");

const { environment } = require("./config");
const isProduction = environment === "production";
const routes = require("./routes");

const app = express();
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

if (!isProduction) {
  app.use(cors());
}

app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin",
  })
);

app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);

app.use(routes);

app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found"];
  err.status = 404;
  next(err);
});

app.use((err, _req, _res, next) => {
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = "Validation error";
  }

  next(err);
});

app.use((err, _req, _res, next) => {
  //   console.error("ERROR: ", typeof err.name);
  if (err.name === "SequelizeUniqueConstraintError") {
    err.status = 403;
    const errorCol = err.errors[0].split(" ")[0];
    if (errorCol === "email" || errorCol === "username") {
      err.message = `User already exists`;
    } else {
      err.message = `${errorCol} already exists`;
    }
    delete err.title;
    err.errors[0] = `User with that ${errorCol} already exists.`;
  }

  next(err);
});

app.use((err, _req, res, _next) => {
  res.status(err.status || 500);

  const responseObj = {
    message: err.message,
    statusCode: err.status,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  };
  if (err.title) {
    responseObj["title"] = err.title;
  }

  res.json(responseObj);
});

module.exports = app;
