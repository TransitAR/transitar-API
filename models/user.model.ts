import { model, Schema } from "mongoose";
import { IUser } from "./interfaces/user.interface";

const UserSchema: Schema = new Schema({
  id: {
    // this is the Auth0 ID which we'll use to relate both DBs
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completedRegistration: {
    type: Boolean,
    default: false,
  },

  // Common info (for all users)
  name: String,
  lastName: String,
  dob: String,
  mobilePhone: Number,
  landlinePhone: Number,
  instagram: String,
  twitter: String,
  facebook: String,
  alerts: Boolean,
  address: String,
  location: {
    formattedAddress: String,
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
  },

  // Refuge
  isRefuge: Boolean,
  refugeInfo: {
    displayName: String,
    specialization: [String],
    pets: [String],
    showInMap: {
      type: Boolean,
      default: true,
    },
  },

  // Vet
  isVet: Boolean,
  vetInfo: {
    displayName: String,
    specialization: [String],
    showInMap: {
      type: Boolean,
      default: true,
    },
  },

  // Person
  isPerson: Boolean,
  personInfo: {
    // Second step
    canTravel: Boolean,
    canAdopt: Boolean,
    canTransit: Boolean,
    canHelp: Boolean,

    // Third step
    houseType: String,
    hoursAway: String,
    houseProtection: Boolean,
    hasAdults: Boolean,
    adults: Number,
    hasChildren: Boolean,
    children: Number,
    hasPets: Boolean,
    otherPets: Number,
    experience: Boolean,
    hasTransportBox: Boolean,
    availability: {
      mon: Boolean,
      tue: Boolean,
      wed: Boolean,
      thu: Boolean,
      fri: Boolean,
      sat: Boolean,
      sun: Boolean,
    },
  },
});

export default model<IUser>("User", UserSchema);
