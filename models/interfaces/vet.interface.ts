import { Document } from "mongoose";
import { IMobilitySchedule } from "./mobilitySchedule.interface";
import { IDaySchedule } from "./daySchedule.interface";
import { ILocation } from "./location.interface";
import { IPet } from "./pet.interface";

export interface IVet extends Document {
  name: string;
  specialization: [String];
  schedule: IDaySchedule;
  mobility: boolean;
  mobilitySchedule: IMobilitySchedule;
  address: string;
  location: ILocation;
  pets: [IPet];
  createdAt: Date;
}
