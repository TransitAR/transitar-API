import { model, Schema } from "mongoose";
import { IPerson } from "./interfaces/person.interface";
const { geocoder } = require("../utils/geocoder");

const PersonSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, "Please add a name"]
  },
  canTravel: Boolean,
  canAdopt: Boolean,
  canTransit: Boolean,
  alerts: Boolean,
  experience: Boolean,
  persons: Number,
  mobility: Boolean,
  mobilitySchedule: {
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
  hasTransportBox: Boolean,
  address: {
    type: String,
    required: [true, "Please add an address"]
  },
  location: {
    formattedAddress: String,
    type: {
      type: String,
      enum: ["Point"]
    },
    coordinates: {
      type: [Number],
      index: "2dsphere"
    }
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
PersonSchema.pre<IPerson>("save", async function(next) {
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

export default model<IPerson>("Person", PersonSchema);
