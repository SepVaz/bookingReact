
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


  function deleteChecked() {
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
        <h3>{customerName} bokningssida</h3>
        
        <Booking
          bookingStatus={bookingStatus}
          cleaners={cleaners}
          booked={booked}
          customerName={customerName}
        />
      </div>

      <div>
  <h3>Kommande städningar:</h3>
  <ul className="booking">
    {booked.map((booking) => (
      <li key={booking.id} className="booking-item">
        <div className="booking-text">
          <span className="cleaner">{booking.cleaner}</span>
          <span className="date">{booking.date}</span>
          <span className="time">{booking.time}</span>
          <span className="level">{booking.level}</span>
        </div>
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
      <ul className="booking">
        {finished.map((booking) => (
          <li key={booking.id} className="booking-item">
            <div className="booking-text">
              <input
                className="booking-checkbox"
                type="checkbox"
                checked={checked.some((b) => b.id === booking.id)}
                onChange={() => handleCheckboxChange(booking)}
              />
              <span className="cleaner">{booking.cleaner}</span>
              <span className="date">{booking.date}</span>
              <span className="time">{booking.time}</span>
              <span className="level">{booking.level}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="mypage-btn-container">
      <button className="button-mypage" onClick={deleteChecked}>Radera markerade</button>
      <button className="button-mypage" onClick={handleLogout}>Gå tillbaka</button>
      </div>
    </div>
    </>
  );
};

export default MyPage;
