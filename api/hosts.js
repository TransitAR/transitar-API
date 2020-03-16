const { getHosts, addHost } = require("../controllers/hosts");

/* Objeto mapa para asociar al metodo de la request */
const handlers = {
  GET: getHosts,
  POST: addHost
  /* TODO: agregar DELETE y PUT handlers */
};

module.exports = (req, res) => {
  const handler = handlers[req.method]; /* req.method === GET/POST/DELETE etc */
  if (handler) handler(req, res);
  else res.status(400).send("Bad request");
};
