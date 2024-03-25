import { useEffect } from "react";


export interface Booking {
  id: number;
  date: string; 
  time: string;
}

export interface ICleaners {
  id: number;
  name: string;
  bookings: Booking[]
}

const initState: ICleaners[] = [];



useEffect(() => { // dela upp lägga till och ta bort bokningar med set i olika async?
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
}, []);
