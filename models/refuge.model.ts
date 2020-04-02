import { model, Schema } from "mongoose";
import { IRefuge } from "./interfaces/refuge.interface";
const { geocoder } = require("../utils/geocoder");

const RefugeSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, "Please add a name"]
  },
  specialization: {
    type: [String]
  },
  schedule: {
    mon: {
      from: Number,
      to: Number
    },
    tue: {
      from: Number,
      to: Number
    },
    wed: {
      from: Number,
      to: Number
    },
    thu: {
      from: Number,
      to: Number
    },
    fri: {
      from: Number,
      to: Number
    },
    sat: {
      from: Number,
      to: Number
    },
    sun: {
      from: Number,
      to: Number
    }
  },
  address: {
    type: String,
    required: [true, "Please add an address"]
  },
  location: {
    type: {
      type: String,
      enum: ["Point"]
    },
    coordinates: {
      type: [Number],
      index: "2dsphere"
    },
    formattedAddress: String
  },
  pets: {
    type: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Geocode & create location
RefugeSchema.pre<IRefuge>("save", async function(next) {
  const [loc] = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc.longitude, loc.latitude],
    formattedAddress: loc.formattedAddress
  };

  // Do not save address
  this.address = undefined;
  next();
});

export default model<IRefuge>("Refuge", RefugeSchema);
