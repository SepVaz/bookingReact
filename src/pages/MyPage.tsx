import { useLocation, useNavigate } from "react-router-dom";
import { Cleaners } from "../Cleaners";
import { useState } from "react";
import Bookings from "./Bookings";


const bookedCleaners = [
  new Cleaners (1, "Sepideh", false),
  new Cleaners (2, "Murat", false),
  new Cleaners (3, "Jakob", false), 
  new Cleaners (4, "Michel", false), 
  new Cleaners (5, "Johan", false) 
]

const doneCleaning = [
  new Cleaners (1, "Sepideh", true),
  new Cleaners (2, "Murat", true),
  new Cleaners (3, "Jakob", true), 
  new Cleaners (4, "Michel", true), 
  new Cleaners (5, "Johan", true) 
]


export default function MyPage() {
  const [booked, setBooked] = useState<Cleaners[]>(bookedCleaners) 
  const [done, setDone] = useState<Cleaners[]>(doneCleaning)
  const location = useLocation();
  const navigate = useNavigate();
  const { name } = location.state;
  
  const cBooked = booked.map((c) => (
<Bookings
key={c.id}
name={c.name}
id={c.id}
></Bookings>
  )) 

  
  function handleLogout() {
    navigate("/");
  }

  function handleSubmit(e : React.FormEvent<HTMLFormElement>) { //informerar typescript vilken typ av elemt händelsen hanteras för, typescript kan då ge bättre stöd när man skriver koden. gör också att vi undviker misstag om vi endast använder de egenskaper som metoden faktiskt är till för
    e.preventDefault()
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
        <input type="radio" name="services" value="basic"/><label>Basic</label>
        <input type="radio" name="services" value="top"/><label>Topp</label>
        <input type="radio" name="services" value="diamond"/><label>Diamant</label>
        <input type="radio" name="services" value="window"/><label>Fönstertvätt</label>{/* vilket är bäst? value eller name? */}
        <button type="submit" className="boka-btn">Boka städning</button>
      </form>
{cBooked}
    </div>
  );
} 


