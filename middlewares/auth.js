const { expressjwt: jwt } = require("express-jwt");

const getToken = (req) => {
  const { authorization } = req.headers;

  if (!authorization) return null;

  const [type, token] = authorization.split(" ");
  return type === "Bearer" || type === "Token" ? token : null;
};

const auth = jwt({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
  requestProperty: "user",
  getToken,
});

module.exports = auth;
