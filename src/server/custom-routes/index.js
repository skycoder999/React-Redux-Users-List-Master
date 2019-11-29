import {get as getUsers} from "./users";
/**
 * Default error handler for routes
 * @param e
 * @param req
 * @param res
 */
const errorHandler = (e, req, res, next) => {

  if (e) {
    return  res.send(500, e);
  } else {
    next();
  }
};


/**
 * Configure Custom Routes
 */
module.exports = (app) => {
  app.get("/api/users", getUsers);
  app.use("*", errorHandler);
};
