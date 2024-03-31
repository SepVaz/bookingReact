export enum Level {
  BASIC = "Basic",
  TOP = "Top",
  DIAMOND = "Diamond",
  WINDOW = "Window",
}

export interface IBooking { //ta bort och lägg till endast bokning
  id: string;
  time: string;
  date: string;
  customer: string;
  level: Level;
  cleaner: string;
  status: boolean;
}

