const Log = require("../logger/logger");

async function loggingMiddleware(req, res, next) {
  await Log("backend", "info", "middleware", `Request: ${req.method} ${req.url}`);
  next();
}

module.exports = loggingMiddleware;