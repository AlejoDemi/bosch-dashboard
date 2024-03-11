import "./Dashboard.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

export const Dashboard = () => {
  const [carData, setCarData] = useState({}); // Initialize state to hold car data

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("http://192.168.0.102:5000/car-data")
        .then((response) => {
          // Assuming the response data is the car data you want to display
          setCarData(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the car data:", error);
        });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const textualizeSpeed = (speed) => {
    if(speed == 5) return "MAX"
    if(speed == 3) return "HALF"
    if(speed == 0) return "STOPPED"
  }

  return (
    <div className="container">
      <link
        href="https://fonts.googleapis.com/css?family=Orbitron:700"
        rel="stylesheet"
      ></link>
      <div className="data">
        <h1>Dashboard</h1>
        <div className="value">
          <p>- Steer :</p>
          <p>{carData.steer}</p>
        </div>
        <div className="value">
          <p>- Speed :</p>
          <p>{textualizeSpeed(carData.speed)}</p>
        </div>
        <div className="value">
          <p>- Detected sign :</p>
          <p>{carData.sign?? "none"}</p>
        </div>
        <div className="value">
          <p>- Brake :</p>
          <p>{carData.brake?.toString()}</p>
        </div>
      </div>
    </div>
  );
};
