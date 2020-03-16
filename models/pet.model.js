const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder");

/*
Zona
Foto
Nombre
Tipo
Años
Peso
Tamaño
Personalidad
Enfermedades
Esterilizado
Vacunas
Viaje disponible
Tipo de comida
*/

const PetSchema = new mongoose.Schema({
    petId: {
        type: String,
        required: [true, "Please add a pet ID"],
        unique: true,
        trim: true,
        maxlength: [10, "Pet ID must be less than 10 characters"]
    },
    image: {
        type: String
    },
    name: {
        type: String,
        require: [true, "Please add a name"]
    },
    type: {
        type: String,
        require: [true, "Please add a type"]
    },
    age: {
        type: Number,
        require: [true, "Please add an aproximated age"]
    },
    weight: {
        type: Number,
        require: [true, "Please add an aproximated weight"]
    },
    size: {
        type: String,
        require: [true, "Please add a size"]
    },
    traits: [String],
    conditions: [String],
    sterilized: {
        type: Boolean
    },
    vaccines: [String],
    food: [String],
    mobility: {
        type: Boolean
    },
    mobilitySchedule: {
        mon: {
            open: {
                type: number
            },
            close: {
                type: number
            }
        },
    },
    address: {
        type: String,
        require: [true, "Please add an address"]
    },
    location: {
        type: {
            type: String,
            emun: ["Point"]
        },
        coordinates: {
            type: [Number],
            index: "2dsphere"
        },
        formattedAddress: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Geocode & create location
PetSchema.pre("save", async function (next) {
    const loc = await geocoder.geocode(this.address);
    this.location = {
        type: "Point",
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress
    };

    // Do not save address
    this.address = undefined;
    next();
});

module.exports = mongoose.model("Pet", PetSchema);