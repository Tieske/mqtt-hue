"use strict";

var config
try {
    config = require('./config.json');
} catch (ex) {
    config = {}
}

config.hue = config.hue||{}
if (process.env.MH_HUE_HOST) { config.hue.host = process.env.MH_HUE_HOST }
if (process.env.MH_HUE_PORT) { config.hue.port = Number(process.env.MH_HUE_PORT) }
if (process.env.MH_HUE_USERNAME) { config.hue.username = process.env.MH_HUE_USERNAME }
if (process.env.MH_HUE_TIMEOUT) { config.hue.timeout = Number(process.env.MH_HUE_TIMEOUT) }

config.mqtt = config.mqtt||{}
if (typeof(config.mqtt) === "string") {
    // backward compatibility
    config.mqtt = { url: config.mqtt }
}
if (process.env.MH_MQTT_URL) { config.mqtt.url = process.env.MH_MQTT_URL }
if (process.env.MH_MQTT_USERNAME) { config.mqtt.username = process.env.MH_MQTT_USERNAME }
if (process.env.MH_MQTT_PASSWORD) { config.mqtt.password = process.env.MH_MQTT_PASSWORD }

//console.log(JSON.stringify(config, null, 2));

let huejay = require('huejay');
let mqtt = require('mqtt');

let hueClient = new huejay.Client(config.hue);
let mqttClient = mqtt.connect(config.mqtt.url, config.mqtt);

let sensors = require('./sensors');
let lights = require('./lights');

sensors.init({hue: hueClient, mqtt: mqttClient});
lights.init({hue: hueClient, mqtt: mqttClient});
