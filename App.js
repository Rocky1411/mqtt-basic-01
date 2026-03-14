// src/App.js
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
  const [sensorData, setSensorData] = useState({ temperature: 0, humidity: 0, pressure: 0 });

  useEffect(() => {
    // Listen for sensor data from backend
    socket.on('sensor-data', (data) => {
      setSensorData(data); // set the entire object
    });

    return () => {
      socket.off('sensor-data');
    };
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>IoT Sensor Dashboard</h1>
      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ border: '1px solid #ccc', padding: 10 }}>
          <h3>Temperature</h3>
          <p>{sensorData.temperature} °C</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: 10 }}>
          <h3>Humidity</h3>
          <p>{sensorData.humidity} %</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: 10 }}>
          <h3>Pressure</h3>
          <p>{sensorData.pressure} hPa</p>
        </div>
      </div>
    </div>
  );
}

export default App;