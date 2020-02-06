const express = require("express");
const { getHosts, addHost } = require("../controllers/hosts");
const router = express.Router();
/*
router.get("/", (req, res) => {
  res.send("Hi there!");
});
*/

router
  .route("/")
  .get(getHosts)
  .post(addHost);

module.exports = router;
