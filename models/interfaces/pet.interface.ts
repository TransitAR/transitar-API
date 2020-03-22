import { Document } from 'mongoose';
import { IMobilitySchedule } from './mobilitySchedule.interface';
import { ILocation } from './location.interface';

export interface IPet extends Document {
    image: string,
    name: string,
    type: string,
    age: number,
    weight: number,
    size: string,
    traits: [string],
    conditions: [string],
    sterilized: boolean,
    vaccines: [string],
    food: [string],
    mobility: boolean,
    mobilitySchedule: IMobilitySchedule,
    address: string,
    location: ILocation,
    createdAt: Date
}