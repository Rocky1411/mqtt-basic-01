// mqttSubscriber.js
const mqtt = require('mqtt');

// 1. Connect to a public MQTT broker
const client = mqtt.connect('mqtt://broker.hivemq.com');

// 2. Topic to subscribe
const topic = 'rapidcircuitry/mqtt/test';

// 3. When connected, subscribe to topic
client.on('connect', () => {
    console.log('Connected to MQTT broker');

    client.subscribe(topic, (err) => {
        if (!err) {
            console.log(`Subscribed to topic: ${topic}`);
            console.log('Waiting for messages...');
        } else {
            console.log('Subscription error:', err);
        }
    });
});

// 4. Listen for incoming messages
client.on('message', (topic, message) => {
    console.log(`Message received on ${topic}: ${message.toString()}`);
});