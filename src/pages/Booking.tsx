import React, { useState } from 'react'
import { IBooking } from '../Booking';



interface Props {
    bookingStatus: (booking : IBooking) => void;
}




function Booking(props: Props) {
    
    const [showBookings, setShowBookings] = useState<IBooking[]>([]);




 //informerar typescript vilken typ av elemt händelsen hanteras för, typescript kan då ge bättre stöd när man skriver koden. gör också att vi undviker misstag om vi endast använder de egenskaper som metoden faktiskt är till för
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const addBooking: IBooking = {
      id: Date.now(),
      date: new Date().toLocaleDateString("sv-SE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
    };
  }
 
    const createBooking = async () => {
    try {
      const response = await axios.post("db.json", addBooking);
      setShowBooking((prev) => [...prev, response.data.data.booking]);
    } catch (err) {
      console.log("Failed to create booking", err);
    }
    createBooking();
  };
 
  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    
  }

    
  return (
    <div>
          <form onSubmit={handleSubmit}>
            <select name="" id="">
              <option value=""  disabled selected hidden>
                Välj städare</option>
             


              {showBookings.map((cleaner) => (
                <option key={cleaner} value={cleaner}>
                  {cleaner}
                </option>
              ))}
            </select>
            <input 
            type="datetime-local"></input>
            <button type="submit">Boka</button>
          </form> 


    </div>
  )
}

export default Booking