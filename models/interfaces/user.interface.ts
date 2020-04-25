import { Document } from "mongoose";

export interface IUser extends Document {
  id: string;
  email: string; // "user1@foo.com";

  createdAt: Date;
  completedRegistration: boolean;

  // Common info (for all users)
  userType: "adoptant" | "volunteer" | "refuge" | "vet";
  name: string;
  lastName: string;
  dob: string;
  mobilePhone: number;
  landlinePhone: number;
  instagram: string;
  twitter: string;
  facebook: string;
  alerts: boolean;
  address: string;
  location: {
    type: string;
    formattedAddress: string;
    coordinates: [number, number];
  };

  // Refuge
  // isRefuge: boolean;
  refugeInfo: {
    displayName: string;
    specialization: [string];
    pets: [string];
    showInMap: boolean;
  };

  // Vet
  // isVet: boolean;
  vetInfo: {
    displayName: string;
    specialization: [string];
    showInMap: boolean;
  };

  // Person
  // isPerson: boolean;
  personInfo: {
    // Second step
    canTravel: boolean;
    canAdopt: boolean;
    canTransit: boolean;
    canHelp: boolean;

    // Third step
    houseType: string;
    hoursAway: string;
    houseProtection: boolean;
    hasAdults: boolean;
    adults: number;
    hasChildren: boolean;
    children: number;
    hasPets: boolean;
    otherPets: number;
    experience: boolean;
    hasTransportBox: boolean;
    availability: {
      mon: boolean;
      tue: boolean;
      wed: boolean;
      thu: boolean;
      fri: boolean;
      sat: boolean;
      sun: boolean;
    };
  };
}
