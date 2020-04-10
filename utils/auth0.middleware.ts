import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";

enum AuthConfig {
  Domain = "refugiar.auth0.com",
  Audience = "https://refugiar-api.now.sh", // TODO: encontrar manera de cambiarlo
}

// Define middleware that validates incoming bearer tokens
// using JWKS from YOUR_DOMAIN
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${AuthConfig.Domain}/.well-known/jwks.json`,
  }),
  audience: AuthConfig.Audience,
  issuer: `https://${AuthConfig.Domain}/`,
  algorithm: ["RS256"],
});

export const authValidateMiddleware = async (req, res) => {
  // TODO: hacer esto mas prolijo
  try {
    await new Promise((resolve, reject) =>
      checkJwt(req, res, (err) => (err ? reject(err) : resolve()))
    );
  } catch (error) {
    res.status(error.status).send(`${error.name}: ${error.message}`);
  }
};
