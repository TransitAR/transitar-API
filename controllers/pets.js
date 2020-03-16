const Host = require("../models/pet");

// @desc GET all the pets
// @route GET /api/v1/pets
// @access Public
exports.getPets = async (req, res, next) => {
    try {
        const pets = await Pet.find();

        return res.status(200).json({
            success: true,
            count: pets.length,
            data: pets
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "server error" });
    }
};

// @desc Create a pet
// @route POST /api/v1/pets
// @access Public
exports.addPet = async (req, res, next) => {
    try {
        const pet = await Pet.create(req.body);

        return res.status(200).json({
            success: true,
            data: pet
        });
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            return res.status(400).json({ error: "This pet already exists" });
        }
        res.status(500).json({ error: "server error" });
    }
};