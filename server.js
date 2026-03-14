// server.js
const express = require('express');
const http = require('http');
const mqtt = require('mqtt');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Enable CORS for React frontend
app.use(cors());

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const port = 5000;
const brokerUrl = 'mqtt://broker.hivemq.com';
const topic = 'rapidcircuitry/mqtt/test';

// ---------------- MQTT Setup ----------------
const client = mqtt.connect(brokerUrl);

client.on('connect', () => {
    console.log('Backend connected to MQTT broker');

    // Subscribe to MQTT topic
    client.subscribe(topic, (err) => {
        if (!err) console.log(`Backend subscribed to topic: ${topic}`);
        else console.log('Subscription error:', err);
    });
});

// Listen for MQTT messages (JSON sensor data) and forward to React
client.on('message', (topic, message) => {
    try {
        const data = JSON.parse(message.toString());
        console.log(`Backend receiveddd:`, data);

        // Forward structured data to React dashboard
        io.emit('sensor-data', data);
    } catch (err) {
        console.log('Invalid JSON received:', message.toString());
    }
});

// ---------------- Socket.io Setup ----------------
io.on('connection', (socket) => {
    console.log('Frontend connected via Socket.io');

    // Receive messages from frontend and publish to MQTT
    socket.on('frontend-message', (msg) => {
        console.log(`Received from frontend: ${msg}`);
        client.publish(topic, msg);
    });

    socket.on('disconnect', () => {
        console.log('Frontend disconnected');
    });
});

// ---------------- Express route ----------------
app.get('/', (req, res) => {
    res.send('Backend running with MQTT + Socket.io!');
});

// ---------------- Start Server ----------------
server.listen(port, () => {
    console.log(`Backend + Socket.io running on http://localhost:${port}`);
});