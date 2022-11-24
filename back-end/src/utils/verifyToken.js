const jwt = require("jsonwebtoken");

exports.verifyToken = function (req, res, next) {
  const token = req.header("Authorization");
  // const token = req.cookies.access_token;
  console.log("token verify: ", token);
  if (!token) {
    return res.status(401).json("You are not authentication");
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return res.status(403).json("Token is invalid!");
    req.user = user;
    next();
  });
};

exports.verifyUser = (req, res, next) => {
  this.verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403, "You are not authorized!");
    }
  });
};

exports.verifyAdmin = (req, res, next) => {
  this.verifyToken(req, res, () => {
    console.log("req.user:", req.user);
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("You are not authorized!");
    }
  });
};
