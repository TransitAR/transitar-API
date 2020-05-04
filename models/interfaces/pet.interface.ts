import { Document } from "mongoose";

export interface IPet extends Document {
  image: string;
  name: string;
  type: string;
  age: number;
  weight: number;
  size: string;
  traits: [string];
  conditions: [string];
  sterilized: boolean;
  vaccines: [string];
  food: [string];
  mobility: boolean;
  address: string;
  location: {
    formattedAddress: string;
    coordinates: [number, number];
  };
  createdAt: Date;
}
