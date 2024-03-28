import axios from "axios";

// Define an enum for the possible levels
export enum Level {
  BASIC = "Basic",
  TOP = "Top",
  DIAMOND = "Diamond",
  WINDOW = "Fönster",
}

export interface IBooking { //ta bort och lägg till endast bokning
  id: number;
  time: string;
  date: string;
  customer: string;
  level: Level;
  cleaner: string;
  status: boolean;
}

/* export const fetchData = async (setData: React.Dispatch<React.SetStateAction<IBooking[]>>) => {
  try {
    const response = await axios.get<IBooking[]>('/data.json');
    setData(response.data);
  } catch (err) {
    console.error("Fetch failed", err);
  }
}; */



