const jwt = require("jsonwebtoken");

/// this is method is genrate [Jwt Token] token this is we have send to clint site.
exports.genrateJwtToken = (userData) => {
  return jwt.sign(userData, process.env.SECREAT_TOKEN, { expiresIn: "10m" });
};

/// this is method is check [authenticationToken] over send token is valid or Unauthorized..
/// basicaly this is middelware...........!!!!
exports.authenticationToken = (req, res, next) => {
  if (req.headers.cookie == undefined) {
    res.status(401).send({
      message: "Not authorized, token not available",
    });
  }
  const token = req.headers.cookie.split("=")[1];
  jwt.verify(token, process.env.SECREAT_TOKEN, (err, data) => {
    if (err) {
      res.status(401).send({
        message: "Unauthorized",
      });
    }
    req.data = data;
    next();
  });
};
