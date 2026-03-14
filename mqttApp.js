// mqttApp.js
const mqtt = require('mqtt');

// 1. Connect to a public MQTT broker (we can use test.mosquitto.org)
const client = mqtt.connect('mqtt://broker.hivemq.com');

// 2. Topic to publish and subscribe
const topic = 'rapidcircuitry/mqtt/test';

// 3. When connected, subscribe to topic and send a test message
client.on('connect', () => {
    console.log('Connected to MQTT broker');

    // Subscribe to the topic
    client.subscribe(topic, (err) => {
        if (!err) {
            console.log(`Subscribed to topic: ${topic}`);

            // Publish a test message
            client.publish(topic, 'Hello from Node.js MQTT!');
        } else {
            console.log('Subscription error:', err);
        }
    });
});

// 4. Listen for messages
client.on('message', (topic, message) => {
    console.log(`Message received on ${topic}: ${message.toString()}`);
});