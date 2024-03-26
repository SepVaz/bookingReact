import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ICleaners } from "../Cleaners";

function MyPage() {
  const [data, setData] = useState<ICleaners[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { name } = location.state || { name: "Användare" };

  useEffect(() => {
    const fetchData = async () => {
      try {
      
        const response = await axios.get("/data.json");
        const cleanersData = response.data.data.cleaner
        setData(cleanersData); 
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
    <div>
      <h3>Välkommen till {name}s sida</h3>
      <button onClick={handleLogout}>Gå tillbaka</button>
      <div>
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
