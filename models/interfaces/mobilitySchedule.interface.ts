import { IDaySchedule } from "./daySchedule.interface";

export interface IMobilitySchedule {
  mon: IDaySchedule;
  tue: IDaySchedule;
  we: IDaySchedule;
  thu: IDaySchedule;
  fri: IDaySchedule;
  sat: IDaySchedule;
  sun: IDaySchedule;
}
