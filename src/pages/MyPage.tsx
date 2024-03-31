// components/MyPage.tsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Booking from './Booking';
import { IBooking } from '../Booking';

const MyPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const name = location.state?.name || 'Användare';

  const [booked, setBooked] = useState<IBooking[]>([]);
  const [finished, setFinished] = useState<IBooking[]>([]);
  const [cleaners, setCleaners] = useState<string[]>([]);

  const bookingStatus = (booking: IBooking) => {
    booking.status ? setFinished((prev) => [...prev, booking]) : setBooked((prev) => [...prev, booking]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/booking');
        const bookingsData: IBooking[] = response.data;
        
        setFinished(bookingsData.filter((data) => data.status));
        setBooked(bookingsData.filter((data) => !data.status));
        
        const cleanerNames: string[] = Array.from(new Set(bookingsData.map((booking) => booking.cleaner)));
        setCleaners(cleanerNames);
      } catch (err) {
        console.error('Failed to fetch data', err);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <>
      <div>
        <h3>Välkommen till {name}s sida</h3>
        <button onClick={handleLogout}>Gå tillbaka</button>
        <Booking bookingStatus={bookingStatus} cleaners={cleaners} />
      </div>

      <div>
        <h3>Kommande städningar:</h3>
        <ul>
          {booked.map((booking) => (
            <li key={booking.id}>{`${booking.cleaner} - ${booking.date} ${booking.time} - ${booking.customer} - ${booking.level}`}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Utförda städningar:</h3>
        <ul>
          {finished.map((booking) => (
            <li key={booking.id}>{`${booking.cleaner} - ${booking.date} ${booking.time} - ${booking.customer} - ${booking.level}`}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MyPage;
