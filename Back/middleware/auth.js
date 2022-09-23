const jwt = require("jsonwebtoken");
const config = process.env;

const Auth = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("No token");
  }
  
  const decoded = jwt.verify(token, config.TOKEN_KEY);
  req.funcionario = decoded;

  return next();
};

module.exports = Auth;