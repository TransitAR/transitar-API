import { IDaySchedule } from "./daySchedule.interface";

export interface ITravelsSchedule {
  mon: IDaySchedule;
  tue: IDaySchedule;
  we: IDaySchedule;
  thu: IDaySchedule;
  fri: IDaySchedule;
  sat: IDaySchedule;
  sun: IDaySchedule;
}
