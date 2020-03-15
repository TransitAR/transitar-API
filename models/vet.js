const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder");

/*
Zona
Nombre
Servicios
Recibe donaciones
*/

const VetSchema = new mongoose.Schema({
  vetId: {
    type: String,
    required: [true, "Please add a vet ID"],
    unique: true,
    trim: true,
    maxlength: [10, "Vet ID must be less than 10 characters"]
  },
  name: {
    type: String,
    require: [true, "Please add a name"]
  },
  services: [String],
  donationsPoint: {
    type: Boolean
  },
  address: {
    type: String,
    require: [true, "Please add an address"]
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
VetSchema.pre("save", async function (next) {
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

module.exports = mongoose.model("Vet", VetSchema);
