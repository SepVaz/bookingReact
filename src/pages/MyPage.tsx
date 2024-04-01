// components/MyPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Booking from "./Booking";
import { IBooking } from "../BookingType";

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState<string>("");

  const [booked, setBooked] = useState<IBooking[]>([]);
  const [finished, setFinished] = useState<IBooking[]>([]);
  const [cleaners, setCleaners] = useState<string[]>([]);
  const [checked, setChecked] = useState<IBooking[]>([]);

  const bookingStatus = (booking: IBooking) => {
    booking.status
      ? setFinished((prev) => [...prev, booking])
      : setBooked((prev) => [...prev, booking]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/booking");
        const bookingsData: IBooking[] = response.data;

        setCustomerName(
          bookingsData.filter((data) => data.customer)[0]?.customer
        );

        setFinished(bookingsData.filter((data) => data.status));
        setBooked(bookingsData.filter((data) => !data.status));

        const cleanerNames: string[] = Array.from(
          new Set(bookingsData.map((booking) => booking.cleaner))
        );
        setCleaners(cleanerNames);
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  function handleDeleteBooking(id: string) {
    const deletePost = async () => {
      try {
        await axios.delete(`http://localhost:3000/booking/${id}`);
        setBooked((prev) => prev.filter((booking) => booking.id !== id));
      } catch (err) {
        console.log("Failed to delete data", err);
      }
    };
    deletePost();
  };

  const handleCheckboxChange = (booking: IBooking) => {
    setChecked((prev) =>
      prev.find((b) => b.id === booking.id) ? prev.filter((b) => b.id !== booking.id) : [...prev, booking]
    );
  };


  function deleteChecked(id: string) {
    checked.forEach(async (booking) => {
      try {
        await axios.delete(`http://localhost:3000/booking/${booking.id}`);
        setFinished((prev) => prev.filter((b) => b.id !== booking.id));
      } catch (err) {
        console.error("Failed to delete booking with id " + booking.id, err);
      }
    });
    setChecked([]);
  };

  return (
    <>
      <div>
        <h3>Välkommen till {customerName}s sida</h3>
        <button onClick={handleLogout}>Gå tillbaka</button>
        <Booking
          bookingStatus={bookingStatus}
          cleaners={cleaners}
          booked={booked}
        />
      </div>

      <div>
        <h3>Kommande städningar:</h3>
        <ul>
          {booked.map((booking) => (
            <li key={booking.id}>
              {`${booking.cleaner} - ${booking.date} ${booking.time} - ${booking.level}`}
              <button
                onClick={() => {
                  handleDeleteBooking(booking.id);
                }}
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Utförda städningar:</h3>
        <ul>
        {finished.map((booking) => (
            <li key={booking.id}>
               <input
                type="checkbox"
                checked={checked.some((b) => b.id === booking.id)}
                onChange={() => handleCheckboxChange(booking)}
              />
               {`${booking.cleaner} - ${booking.date} ${booking.time} - ${booking.level}`}
             
              {/* Booking information display */}
            </li>
          ))}
        </ul>
        <button onClick={deleteChecked}>Radera markerade</button>

      </div>
    </>
  );
};

export default MyPage;
