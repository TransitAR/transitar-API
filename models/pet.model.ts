import { model, Schema } from "mongoose";
import { IPet } from "./interfaces/pet.interface";
const { geocoder } = require("../utils/geocoder");

const PetSchema: Schema = new Schema({
  image: {
    type: String,
  },
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  type: {
    type: String,
    required: [true, "Please add a type"],
  },
  age: {
    type: Number,
    required: [true, "Please add an aproximated age"],
  },
  weight: {
    type: Number,
    required: [true, "Please add an aproximated weight"],
  },
  size: {
    type: String,
    required: [true, "Please add a size"],
  },
  traits: [String],
  conditions: [String],
  sterilized: {
    type: Boolean,
  },
  vaccines: [String],
  food: [String],
  mobility: {
    type: Boolean,
  },
  mobilitySchedule: {
    mon: {
      open: {
        type: Number,
      },
      close: {
        type: Number,
      },
    },
    tue: {
      open: {
        type: Number,
      },
      close: {
        type: Number,
      },
    },
    wed: {
      open: {
        type: Number,
      },
      close: {
        type: Number,
      },
    },
    thu: {
      open: {
        type: Number,
      },
      close: {
        type: Number,
      },
    },
    fri: {
      open: {
        type: Number,
      },
      close: {
        type: Number,
      },
    },
    sat: {
      open: {
        type: Number,
      },
      close: {
        type: Number,
      },
    },
    sun: {
      open: {
        type: Number,
      },
      close: {
        type: Number,
      },
    },
  },
  address: {
    type: String,
    required: [true, "Please add an address"],
  },
  location: {
    formattedAddress: String,
    coordinates: {
      type: [Number, Number],
      index: "2dsphere",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Geocode & create location
PetSchema.pre<IPet>("save", async function (next) {
  const [loc] = await geocoder.geocode(this.address);
  this.location = {
    coordinates: [loc.longitude, loc.latitude],
    formattedAddress: loc.formattedAddress,
  };

  // Do not save address
  this.address = undefined;
  next();
});

export default model<IPet>("Pet", PetSchema);
