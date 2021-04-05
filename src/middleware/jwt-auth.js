/* eslint-disable no-undef */
const AuthService = require("../auth/auth-service");

async function requireAuth(req, res, next) {
  const authToken = req.get("Authorization") || "";

  let bearerToken;

  if (!authToken.toLowerCase().startsWith("bearer ")) {
    return res.status(401).json({ error: `Missing bearer token` });
  } else {
    bearerToken = authToken.slice(7, authToken.length);
  }

  try {
    const payload = AuthService.verifyJWT(bearerToken);

    const user = await AuthService.getUserWithUserName(
      req.app.get("db"),
      payload.sub
    );

    if (!user) return res.status(401).json({ error: `Unauthorized Request` });

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: `Unauthorized Request` });
  }
}

module.exports = {
  requireAuth,
};
