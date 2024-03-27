import axios from "axios";

export interface Booking {
  id: number;
  date: string;
  time: string;
}

export interface ICleaners { //ta bort och lägg till endast bokning
  id: number;
  name: string;
  bookings: Booking[];
  date: string;
}

export const fetchData = async (setData: React.Dispatch<React.SetStateAction<ICleaners[]>>) => {
  try {
    const response = await axios.get<ICleaners[]>('/data.json');
    setData(response.data);
  } catch (err) {
    console.error("Fetch failed", err);
  }
};

