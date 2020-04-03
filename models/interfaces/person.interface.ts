import { Document } from "mongoose";
import { IMobilitySchedule } from "./mobilitySchedule.interface";
import { ITravelsSchedule } from "./travelsSchedule.interface";
import { ILocation } from "./location.interface";

export interface IPerson extends Document {
  name: string;
  canTravel: boolean;
  canAdopt: boolean;
  canTransit: boolean;
  alerts: boolean;
  experience: boolean;
  persons: number;
  mobility: boolean;
  travelsSchedule: ITravelsSchedule;
  mobilitySchedule: IMobilitySchedule;
  hasTransportBox: boolean;
  address: string;
  location: ILocation;
  pets: [string];
  createdAt: Date;
}
