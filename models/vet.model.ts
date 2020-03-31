import { model, Schema } from "mongoose";
import { IVet } from "./interfaces/vet.interface";
import { geocoder } from "../utils/geocoder";

const VetSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, "Please add a name"]
  },
  specialization: {
    type: [String]
  },
  schedule: {
    mon: {
      open: {
        type: Number
      },
      close: {
        type: Number
      }
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
    // TODO: Averiguar como hacer para que esto sea ObjectId de Pet model
    type: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Geocode & create location
VetSchema.pre<IVet>("save", async function(next) {
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

export default model<IVet>("Vet", VetSchema);
