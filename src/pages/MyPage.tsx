import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { IBooking } from "../Booking";

function MyPage() {
  //bookings för array, booking för objekt

  const [showBookings, setShowBookings] = useState<IBooking[]>([]);

  const location = useLocation();
  const navigate = useNavigate();
  const { name } = location.state || { name: "Användare" };

  const [booked, setBooked] = useState<IBooking[]>([]);
  const [finished, setFinished] = useState<IBooking[]>([]);

  const bookingStatus = (booking: IBooking) => { // KOLLA PÅ COUNTRIES OM ATT PROPSA IN FRÅN addCountry TILL INPUT
    if (booking.status === true) {
      setBooked([...booked, booking ]);
    } else setFinished([...finished, booking]);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/db.json");
        const bookingsData = response.data.booking;
        const bookingsMap = bookingsData.map((booking: IBooking) => booking);
        setShowBookings(bookingsMap);
      } catch (err) {
        console.error("fetch failed", err);
      }
    };

    fetchData();
  }, []);

  function handleLogout() {
    navigate("/");
  }

  //informerar typescript vilken typ av elemt händelsen hanteras för, typescript kan då ge bättre stöd när man skriver koden. gör också att vi undviker misstag om vi endast använder de egenskaper som metoden faktiskt är till för
  /*  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const addBooking: ICleaners = {
      id: Date.now(),
      date: new Date().toLocaleDateString("sv-SE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
    };
  }
 */
  /*   const createBooking = async () => {
    try {
      const response = await axios.post("db.json", addBooking);
      setShowBooking((prev) => [...prev, response.data.data.booking]);
    } catch (err) {
      console.log("Failed to create booking", err);
    }
    createBooking();
  };
 */

  return (
    <>
      <div>
        <h3>Välkommen till {name}s sida</h3>
        <button onClick={handleLogout}>Gå tillbaka</button>
        <div>
          {/*           <form onSubmit={handleSubmit}>
            <select name="" id="">
              <option value="" disabled selected hidden>
                Välj städare
              </option>
              {showBookings.map((cleaner) => (
                <option key={cleaner} value={cleaner}>
                  {cleaner}
                </option>
              ))}
            </select>
            <button type="submit">Boka</button>
          </form> */}
        </div>
      </div>
      {/* <div>
        {showBookings.map((booking) => (
          <div key={booking.id}>
            {" "}
            <h4>Städare: {booking.cleaner}</h4>
            <li></li>
            <li>{booking.time}</li>
          </div>
        ))}
      </div> */}
      <div>
        {booked.map((booking) => (
          <li key={booking.id}>{booking.cleaner}</li>
        ))}
      </div>
    </>
  );
}

export default MyPage;

