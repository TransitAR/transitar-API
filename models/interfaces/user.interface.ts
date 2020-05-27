import { Document } from "mongoose";

export interface IDonations {
  owner: string;
  email: string;
  hasBank: boolean;
  bank: {
    owner: string;
    bankName: string;
    accountId: string;
    accountCBU: string;
    accountAlias: string;
  };
  hasMercadopago: boolean;
  mercadopago: {
    links: [
      {
        amount: number;
        description: string;
        url: string;
      }
    ];
  };
  hasPaypal: boolean;
  paypal: {
    link: string;
  };
}

export interface IUser extends Document {
  id: string;
  email: string; // "user1@foo.com";

  createdAt: Date;
  completedRegistration: boolean;

  // Common info (for all users)
  userType: "adoptant" | "volunteer" | "refuge" | "vet";
  nickname: string;
  name: string;
  lastName: string;
  dob: string;
  mobilePhone: number;
  landlinePhone: number;
  alerts: boolean;
  address: string;
  location: {
    formattedAddress: string;
    coordinates: [number, number];
  };

  // Refuge
  // isRefuge: boolean;
  refugeInfo: {
    username: string;
    displayName: string;
    specialization: [string];
    pets: [string];
    showInMap: boolean;
    instagram: string;
    twitter: string;
    facebook: string;
    donations: IDonations;
  };

  // Vet
  // isVet: boolean;
  vetInfo: {
    username: string;
    displayName: string;
    specialization: [string];
    showInMap: boolean;
    instagram: string;
    twitter: string;
    facebook: string;
    donations: IDonations;
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
    instagram: string;
    twitter: string;
    facebook: string;
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
