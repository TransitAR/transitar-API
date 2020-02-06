const Host = require("../models/host");

// @desc GET all the hosts
// @route GET /api/v1/hosts
// @access Public
exports.getHosts = async (req, res, next) => {
  try {
    const hosts = await Host.find();

    return res.status(200).json({
      success: true,
      count: hosts.length,
      data: hosts
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
};

// @desc Create a host
// @route POST /api/v1/hosts
// @access Public
exports.addHost = async (req, res, next) => {
  try {
    const host = await Host.create(req.body);

    return res.status(200).json({
      success: true,
      data: host
    });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({ error: "This host already exists" });
    }
    res.status(500).json({ error: "server error" });
  }
};
