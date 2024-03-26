import { useLocation, useNavigate } from "react-router-dom";
import { ICleaners, fetchData } from "../Cleaners";
import React, { useState, useEffect } from "react";

/* import Bookings from "./Bookings"; */

function MyPage() {
  const [data, setData] = useState<ICleaners[]>([]);

  useEffect(() => {
    fetchData();
    
  }, []);

  const [booked, setBooked] = useState<ICleaners[]>([]);
  const [done, setDone] = useState<ICleaners[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { name } = location.state;

  /*   const cBooked = booked.map((c) => (
    <Bookings key={c.id} name={c.name} id={c.id} bookings={[]}></Bookings>
  ));
 */
  function handleLogout() {
    navigate("/");
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    //informerar typescript vilken typ av elemt händelsen hanteras för, typescript kan då ge bättre stöd när man skriver koden. gör också att vi undviker misstag om vi endast använder de egenskaper som metoden faktiskt är till för
    e.preventDefault();
  }

  return (
    <div>
      <h3>Välkommen till {`${name}s sida `}</h3>
      <button onClick={handleLogout}>Gå tillbaka</button>
      <form onSubmit={handleSubmit}>
        <h4>Välj städning</h4>
        <select name="dropdown" id="dropdown">
          <option value="Sepideh">Sepideh</option>
          <option value="Murat">Murat</option>
          <option value="Michel">Michel</option>
          <option value="Johan">Johan</option>
          <option value="Jakob">Jakob</option>
        </select>
        <input type="radio" name="services" value="basic" />
        <label>Basic</label>
        <input type="radio" name="services" value="top" />
        <label>Topp</label>
        <input type="radio" name="services" value="diamond" />
        <label>Diamant</label>
        <input type="radio" name="services" value="window" />
        <label>Fönstertvätt</label>
        {/* vilket är bäst? value eller name? */}
        <button type="submit" className="boka-btn">
          Boka städning
        </button>
      </form>
      <div>
        <div>
          {data.map((d) => (
            <div key={d.id}>
              <h2>{d.name}</h2>
              <ul>
                {d.bookings.map((d) => (
                  <li
                    key={d.id}
                  >{`${d.date} at ${d.time}`}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );


}

export default MyPage