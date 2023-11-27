// LogSymptoms.jsx

import React, { useState } from 'react';
import Navbar from '../components/Navbar';

import './LogSymptoms.css';
import { useNavigate } from 'react-router-dom';

// Import your icons for each sub-symptom
import menstrualFlowIcon from '../icons/menstrualFlowIcon.png';
import moodIcon from '../icons/moodIcon.png';
import sexIcon from '../icons/sexIcon.png';

import painIcon from '../icons/painIcon.png';

const LogSymptoms = () => {
  const [selectedSubSymptoms, setSelectedSubSymptoms] = useState([]);
  const navigate = useNavigate();

  const handleSubSymptomSelect = (subSymptom) => {
    setSelectedSubSymptoms(prevSelected => {
      const isSelected = prevSelected.includes(subSymptom);
      if (isSelected) {
        return prevSelected.filter(item => item !== subSymptom);
      } else {
        return [...prevSelected, subSymptom];
      }
    });
  };

  const handleSubmit = () => {
    // Logic to handle submitting selected symptoms
    console.log('Selected Symptoms:', selectedSubSymptoms);
    // Redirect to a different page after submission
    navigate('/success'); // Replace '/success' with your desired route
  };

  const categoryOptions = [
    {
      name: 'Menstrual Flow',
      icon: menstrualFlowIcon,
      subSymptoms: ['Light Flow', 'Heavy Flow', 'Gushing Flow', 'Moderate Flow', 'Spotty Flow', 'Clotting Flow', 'Irregular Flow',],
    },
    {
      name: 'Sex and sex drive',
      icon: sexIcon,
      subSymptoms: ['No Sex', 'Protected Sex', 'Unprotected Sex'],
    },
    {
      name: 'Mood',
      icon: moodIcon,
      subSymptoms: ['Euphoric', 'Frisky', 'Confuse', 'Depressed', 'Irritable', 'Anxious', 'Sad', 'Stressed'],
    },
    {
      name: 'Pain',
      icon: painIcon,
      subSymptoms: ['Dull Ache', 'Tender Breasts', 'Acne', 'Sharp Pain', 'Cramping', 'Throbbing', 'Fatigue', 'Insomnia', 'Localized Pain'],
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="home-pagee">

        <div className="log-symptoms-container">
          <h2>Select Symptoms</h2>
          <div className="category-grid">
            {categoryOptions.map((category, index) => (
              <div className="category-card" key={index}>
                <img src={category.icon} alt={category.name} />
                <p>{category.name}</p>
                <div className="sub-symptom-grid">
                  {category.subSymptoms.map((subSymptom, subIndex) => (
                    <div
                      key={subIndex}
                      className={`sub-symptom-card ${selectedSubSymptoms.includes(subSymptom) ? 'selected' : ''}`}
                      onClick={() => handleSubSymptomSelect(subSymptom)}
                    >
                      <p>{subSymptom}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button className="submit-button" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default LogSymptoms;
