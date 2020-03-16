const Vet = require("../models/host");

// @desc GET all the vets
// @route GET /api/v1/vets
// @access Public
exports.getVets = async (req, res, next) => {
  try {
    const vets = await Vet.find();

    return res.status(200).json({
      success: true,
      count: vets.length,
      data: vets
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
};

// @desc Create a vet
// @route POST /api/v1/vets
// @access Public
exports.addVet = async (req, res, next) => {
  try {
    const vet = await Vet.create(req.body);

    return res.status(200).json({
      success: true,
      data: vet
    });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({ error: "This vet already exists" });
    }
    res.status(500).json({ error: "server error" });
  }
};
