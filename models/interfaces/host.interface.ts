import { Document } from "mongoose";
import { IMobilitySchedule } from "./mobilitySchedule.interface";
import { ILocation } from "./location.interface";
import { IPet } from "./pet.interface";

export interface IHost extends Document {
  name: string;
  experience?: boolean;
  persons: number;
  type: string;
  mobility: boolean;
  mobilitySchedule: IMobilitySchedule;
  hasTransportBox: boolean;
  address: string;
  location: ILocation;
  pets: [IPet];
  createdAt: Date;
}
