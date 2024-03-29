import React, { useState } from "react";
import axios from "axios";
import { IBooking, Level } from "../Booking";

interface Props {
  bookingStatus: (booking: IBooking) => void;
  cleaners: string[];
}

const Booking: React.FC<Props> = ({ bookingStatus, cleaners }) => {
  const [selectedCleaner, setSelectedCleaner] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<Level>(Level.BASIC);

  function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newBooking: IBooking = {
      id: Date.now(),
      date: selectedDate,
      time: selectedTime,
      customer: "Frodo Baggins", 
      level: selectedLevel,
      cleaner: selectedCleaner,
      status: false,
    };

    const createBooking = async () => {
    try {
      const response = await axios.post("http://localhost:3000/booking", newBooking);
      bookingStatus({ ...newBooking, id: response.data.id });
    } catch (err) {
      console.error("Failed to create booking", err);
    }
  }
  createBooking()
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Städare */}
        <select
          value={selectedCleaner}
          onChange={(e) => setSelectedCleaner(e.target.value)}
        >
          <option value="" disabled>
            Välj städare
          </option>
          {cleaners.map((cleaner, index) => (
            <option key={index} value={cleaner}>
              {cleaner}
            </option>
          ))}
        </select>

        {/* Datum */}
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        {/* Tid */}
        <input
          type="time"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        />

        {/* Städnivå */}
        <div>
          <label>
            <input
              type="radio"
              name="level"
              value={Level.BASIC}
              checked={selectedLevel === Level.BASIC}
              onChange={() => setSelectedLevel(Level.BASIC)}
            />
            Basic
          </label>
          <label>
            <input
              type="radio"
              name="level"
              value={Level.TOP}
              checked={selectedLevel === Level.TOP}
              onChange={() => setSelectedLevel(Level.TOP)}
            />
            Top
          </label>
          <label>
            <input
              type="radio"
              name="level"
              value={Level.DIAMOND}
              checked={selectedLevel === Level.DIAMOND}
              onChange={() => setSelectedLevel(Level.DIAMOND)}
            />
            Diamant
          </label>
          <label>
            <input
              type="radio"
              name="level"
              value={Level.WINDOW}
              checked={selectedLevel === Level.WINDOW}
              onChange={() => setSelectedLevel(Level.WINDOW)}
            />
            Fönster
          </label>
        </div>

        <button type="submit">Boka</button>
      </form>
    </div>
  );
};

export default Booking;
