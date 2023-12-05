// SymptomsSummary.jsx

import React from 'react';
import './SymptomsSummary.css'; // Import the CSS file

const SymptomsSummary = ({ selectedSymptoms, selectedDate }) => {
  const dateToDisplay = selectedDate ? selectedDate.toDateString() : 'No date selected';

  const suggestions = getSymptomSuggestions(selectedSymptoms);

  return (
    <div className="symptoms-summary-container"> {/* Add the container class */}
      <h2>Symptoms Summary</h2>
      <p>Date: {dateToDisplay}</p>
      <h3>Selected Symptoms:</h3>
      {Array.isArray(selectedSymptoms) && selectedSymptoms.length > 0 ? (
        <ul>
          {selectedSymptoms.map((symptom, index) => (
            <li key={index}>{symptom}</li>
          ))}
        </ul>
      ) : (
        <p>No symptoms selected</p>
      )}
      <h3>Suggestions:</h3>
      <p>{suggestions}</p>
      {/* Add additional styling and content as needed */}
    </div>
  );
};

const getSymptomSuggestions = (selectedSymptoms) => {
  if (!Array.isArray(selectedSymptoms) || selectedSymptoms.length === 0) {
    return "No suggestions available.";
  }
  // Replace this with your actual suggestion logic
  return "Suggested actions or information based on selected symptoms.";
};

export default SymptomsSummary;
