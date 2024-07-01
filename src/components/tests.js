import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from "./nav";
import '../App.css';

export const Test = () => {
  const [baseUrl, setBaseUrl] = useState(null); // State to hold the BASE_URL

  useEffect(() => {
    const fetchedUrl = process.env.REACT_APP_BASE_URL || process.env.BASE_URL; // Try both prefixes
    setBaseUrl(fetchedUrl);
  }, []); // Empty dependency array to run only once on component mount

  return (
    <div>
      <h1>BASE_URL: {baseUrl}</h1> {/* Display the retrieved BASE_URL */}
    </div>
  );
};