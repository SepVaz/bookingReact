import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { IBooking } from "../Booking";
import Booking from "./Booking";

function MyPage() {
  //bookings för array, booking för objekt

  const location = useLocation();
  const navigate = useNavigate();
  const { name } = location.state || { name: "Användare" };

  const [booked, setBooked] = useState<IBooking[]>([]);
  const [finished, setFinished] = useState<IBooking[]>([]);

  const bookingStatus = (booking: IBooking) => {
    if (booking.status === false) {
      setBooked([...booked, booking]);
    } else setFinished([...finished, booking]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/db.json");
        const bookingsData = response.data.booking;
        const finishedBookings = bookingsData.filter(
          (booking: IBooking) => booking.status === true
        ); // Här sätter vi ett filter i vår GET Fetch för att separera true och false
        const bookedBookings = bookingsData.filter(
          (booking: IBooking) => booking.status === false
        );
        setFinished(finishedBookings);
        setBooked(bookedBookings);
      } catch (err) {
        console.error("fetch failed", err);
      }
    };

    fetchData();
  }, []);

  function handleLogout() {
    navigate("/");
  }


  return (
    <>
      <div>
        <h3>Välkommen till {name}s sida</h3>
        <button onClick={handleLogout}>Gå tillbaka</button>
        <Booking bookingStatus={bookingStatus}></Booking>
        <div>
                  
        </div>
      </div>
    
      <div>
        BOOKED
        {booked.map((booking) => (
          <li key={booking.id}>{booking.cleaner}</li>
        ))}
      </div>
      <div>
        FINISHED
        {finished.map((booking) => (
          <li key={booking.id}>{booking.cleaner}</li>
        ))}
      </div>
    </>
  );
}

export default MyPage;
