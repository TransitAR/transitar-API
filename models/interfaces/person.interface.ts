import { Document } from "mongoose";
import { IMobilitySchedule } from "./mobilitySchedule.interface";
import { ITravelsSchedule } from "./travelsSchedule.interface";
import { ILocation } from "./location.interface";

export interface IPerson extends Document {
  name: string;
  birthDate: Date;
  canTravel: boolean;
  canAdopt: boolean;
  canTransit: boolean;
  canHelp: boolean;
  alerts: boolean;
  experience: boolean;
  adults: number;
  children: number;
  otherPets: number;
  houseType: string;
  houseProtection: boolean;
  hourAway: number;
  mobility: boolean;
  travelsSchedule: ITravelsSchedule;
  mobilitySchedule: IMobilitySchedule;
  hasTransportBox: boolean;
  address: string;
  location: ILocation;
  pets: [string];
  createdAt: Date;
}
