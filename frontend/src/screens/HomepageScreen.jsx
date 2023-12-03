
import React, { useState } from 'react';
//import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import './HomepageScreen.css';
import MainNavbar from '../components/Navbar';
import Footer from '../components/footer';
//import { useAuth } from '../context/auth';

const HomepageScreen = () => {
  //const [auth, setauth] = useAuth()
  const [value, onChange] = useState(new Date());
  const [periodDates, setPeriodDates] = useState([]);
  const navigate = useNavigate();

  const calculatePeriodDates = (currentDate) => {
    const currentMonth = currentDate.getMonth();
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(currentMonth + 1);

    // Calculate regular period days for current month
    const currentMonthPeriodDays = Array.from({ length: 4 }, (_, i) => new Date(currentDate.getFullYear(), currentMonth, 5 + i));
    // Calculate predicted period days for next month
    const nextMonthPeriodDays = Array.from({ length: 5 }, (_, i) => new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 5 + i));

    setPeriodDates([...currentMonthPeriodDays, ...nextMonthPeriodDays]);
  };

  const tileClassName = ({ date }) => {
    const dateString = date.toISOString().split('T')[0];

    if (periodDates.some(periodDate => periodDate.toISOString().split('T')[0] === dateString)) {
      // Check if the date is a period date
      return 'period-date';
    } else if (date.getDate() >= 5 && date.getDate() <= 9) {
      // Check if it's a predicted date for the following month
      return 'predicted-date';
    } else {
      return null;
    }
  };

  React.useEffect(() => {
    calculatePeriodDates(value);
  }, [value]);

  const handleLogSymptoms = () => {
    navigate('/log-symptoms'); // Use navigate directly here
  };
  return (
    <>
      <MainNavbar />
      <div className="home-page">
        <div className="calendar-container">
          <Calendar tileClassName={tileClassName} />
          <button className="log-button" onClick={handleLogSymptoms}>
            Log symptoms
          </button>

        </div>

      </div>
      <Footer />
    </>
  );
};

export default HomepageScreen;

