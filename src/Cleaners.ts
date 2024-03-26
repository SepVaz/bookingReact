import axios from "axios";

export interface Booking {
  id: number;
  date: string;
  time: string;
}

export interface ICleaners {
  id: number;
  name: string;
  bookings: Booking[];
}

/* const initState: ICleaners[] = []; */

/* useEffect(() => { // dela upp lägga till och ta bort bokningar med set i olika async?
   const fetchData = async (): Promise<ICleaners[]> => {
    const data = await fetch("data.json")
    .then((res) => {
      return res.json()
    })
    .catch((err) => {
      if (err instanceof Error) console.log(err.message);
    });
    return data;
  }
}, []); */

export const fetchData: () => Promise<ICleaners[]> = async () => {
  
  try {
    const response = await axios.get<ICleaners[]>("data.json");
    return response.data;
  } catch (err) {
    console.log("fetch failed", err);
  }
};
