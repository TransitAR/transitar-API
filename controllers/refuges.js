const Host = require("../models/refuge");

// @desc GET all the refuges
// @route GET /api/v1/refuges
// @access Public
exports.getRefuges = async (req, res, next) => {
  try {
    const refuges = await Refuge.find();

    return res.status(200).json({
      success: true,
      count: refuges.length,
      data: refuges
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
};

// @desc Create a refuge
// @route POST /api/v1/refuges
// @access Public
exports.addRefuge = async (req, res, next) => {
  try {
    const refuge = await Refuge.create(req.body);

    return res.status(200).json({
      success: true,
      data: refuge
    });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({ error: "This refuge already exists" });
    }
    res.status(500).json({ error: "server error" });
  }
};
