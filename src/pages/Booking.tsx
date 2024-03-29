import React, { useState } from "react";
import { IBooking } from "../Booking";
import axios from "axios";
import MyPage from "./MyPage";

interface Props {
  bookingStatus: (booking: IBooking) => void;
  text: string;
  
}

/* interface ICleaners {
  
} */

function Booking(props: Props) {
/*   const [cleaners, setCleaners] = useState<string[]>([]); */
  const [showBookings, setShowBookings] = useState<IBooking[]>([]);
  const [selectedCleaner, setSelectedCleaner] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  const { cleaners } = props;


  

  console.log(setSelectedTime)
  //informerar typescript vilken typ av elemt händelsen hanteras för, typescript kan då ge bättre stöd när man skriver koden. gör också att vi undviker misstag om vi endast använder de egenskaper som metoden faktiskt är till för
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const addBooking: IBooking = {
      id: Date.now(),
      date: selectedDate,
      time: selectedTime,
      customer: "Frodo Baggins", 
      level: selectedLevel,
      cleaner: selectedCleaner,
      status: false 
    };
     
    createBooking(addBooking);
  }

  const createBooking = async () => {
    try {
      const response = await axios.post("db.json", addBooking);
      setShowBookings((prev) => [...prev, response.data.booking]);
    } catch (err) {
      console.log("Failed to create booking", err);
    }
  };

  /* const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    setShowBookings(e.target.value)
  } */

  return (
    <div>
      <h1>{props.text}</h1>
      <form onSubmit={handleSubmit}>
      <select onChange={(e) => setSelectedCleaner(e.target.value)} name="cleaner" id="" value={selectedCleaner}>
            <option value="" disabled selected hidden>
              Välj städare
            </option>
            {cleaners.map((cleaner) => (
              <option key={cleaner} value={cleaner}>
                {cleaner}
              </option>
            ))}
          </select>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        ></input>
        <input
          type="time"
          min="08:00"
          max="18:00"
          value={selectedTime}
          required
          onChange={(e) => setSelectedTime(e.target.value)}
        ></input>
        <label>
          <input
            type="radio"
            name="level"
            value="Basic"
            checked={selectedLevel === "Basic"}
            onChange={() => setSelectedLevel("Basic")}
          />
          Basic
          <label>
            <input
              type="radio"
              name="level"
              value="Top"
              checked={selectedLevel === "Top"}
              onChange={() => setSelectedLevel("Top")}
            />
            Top
            <label>
              <input
                type="radio"
                name="level"
                value="Diamant"
                checked={selectedLevel === "Diamant"}
                onChange={() => setSelectedLevel("Diamant")}
              />
              Diamant
              <label>
                <input
                  type="radio"
                  name="level"
                  value="Fönster"
                  checked={selectedLevel === "Fönster"}
                  onChange={() => setSelectedLevel("Fönster")}
                />
                Fönster
              </label>
            </label>
          </label>
        </label>
        <button type="submit">Boka</button>
      </form>
    </div>
  );
}

export default Booking;
