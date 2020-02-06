const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder");
const HostSchema = new mongoose.Schema({
  hostId: {
    type: String,
    required: [true, "Please add a host ID"],
    unique: true,
    trim: true,
    maxlength: [10, "Host ID must be less than 10 characters"]
  },
  address: {
    type: String,
    require: [true, "Please add ana address"]
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
HostSchema.pre("save", async function(next) {
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

module.exports = mongoose.model("Host", HostSchema);
