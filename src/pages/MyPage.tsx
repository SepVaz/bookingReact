import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ICleaners } from "../Cleaners";

function MyPage() {
  const [cleaners, setCleaners] = useState<string[]>([]);
  const [selectedCleaners, setSelectedCleaners] = useState<string[]>([]);
  const [selectedCleaning, setSelectedCleaning] = useState<string>("Basic");
  const [showBooking, setShowBooking] = useState<ICleaners[]>([]);
  const [data, setData] = useState<ICleaners[]>([]); //använd till senare för att visa bokningarna
  const location = useLocation();
  const navigate = useNavigate();
  const { name } = location.state || { name: "Användare" };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data.json");
        const cleanersData = response.data.data.cleaner;
        const cleanersName = cleanersData.map((cleaner: any) => cleaner.name);
        setCleaners(cleanersName);
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
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const addBooking = {
      ...showBooking,
      id: Date.now(), date: new Date().toLocaleDateString('sv-SE', { year: 'numeric', month: '2-digit', day: '2-digit' })
    };

    const createBooking = async () => {
      try {
        const response = await axios.post('data.json', addBooking)
        setShowBooking((prev) => [...prev, response.data.data.booking] )
      } catch (err) {
        console.log("Failed to create booking", err);
      }
    }
    createBooking();
  };

  

  return (
    <div>
      <h3>Välkommen till {name}s sida</h3>
      <button onClick={handleLogout}>Gå tillbaka</button>
      <div>
        <form onSubmit={handleSubmit}>
          <select name="" id="">
            <option value="" disabled selected hidden>
              Välj städare
            </option>
            {cleaners.map((cleaner) => (
              <option key={cleaner} value={cleaner}>
                {cleaner}
              </option>
            ))}
          </select>
          <button type="submit">Boka</button>
        </form>
        <h1>Bookings</h1>
        {data.map((cleaner) => (
          <div key={cleaner.id}>
            <h2>{cleaner.name}</h2>
            {cleaner.bookings && cleaner.bookings.length > 0 ? (
              <ul>
                {cleaner.bookings.map((booking) => (
                  <li
                    key={booking.id}
                  >{`${booking.date} at ${booking.time}`}</li>
                ))}
              </ul>
            ) : (
              <p>Inga bokningar.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyPage;
