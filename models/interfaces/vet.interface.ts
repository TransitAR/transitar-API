import { Document } from 'mongoose';
import { IMobilitySchedule } from './mobilitySchedule.interface';
import { IDaySchedule } from './daySchedule.interface';
import { ILocation } from './location.interface';

export interface IVet extends Document {
    vetId: number,
    name: string,
    specialization: [String],
    schedule: IDaySchedule,
    mobility: boolean,
    mobilitySchedule: IMobilitySchedule,
    address: string,
    location: ILocation,
    createdAt: Date
}