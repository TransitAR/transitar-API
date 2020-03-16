const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder");

/*
Zona
Integrantes
Especialización
Cuenta para donaciones
Animales en adopción o tránsito

*/

const RefugeSchema = new mongoose.Schema({
  refugeId: {
    type: String,
    required: [true, "Please add a refuge ID"],
    unique: true,
    trim: true,
    maxlength: [10, "Refuge ID must be less than 10 characters"]
  },
  name: {
    type: String,
    require: [true, "Please add a name"]
  },
  specialization: {
    type: [String]
  },
  schedule: {
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
RefugeSchema.pre("save", async function (next) {
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

module.exports = mongoose.model("Refuge", RefugeSchema);
