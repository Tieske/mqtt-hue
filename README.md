# MQTT - Hue Bridge

This is a MQTT to Philips Hue Bridge. It is written in Node.js and provides MQTT control over hue sensors and lights.

## Configuration

Can be done either by providing `config.json` (at the root of the repo), or by
specifying environment variables. The environment variables take precedence over
the config file.

Example `./config.json` and equivalent environment variables:
```
{
  "hue": {
    "host": "192.168.0.6",                # or env: MH_HUE_HOST
    "port": 80,                           # or env: MH_HUE_PORT
    "username": "coolusername",           # or env: MH_HUE_USERNAME
    "timeout": 15000                      # or env: MH_HUE_TIMEOUT
  },
  "mqtt": {
    "url": "mqtt://test.mosquitto.org",   # or env: MH_MQTT_URL
    "username": "it_is_me",               # or env: MH_MQTT_USERNAME
    "password": "sooper secret"           # or env: MH_MQTT_PASSWORD
  }
}
```

For additional `mqtt` options (only supported in `./config.json`) see
https://www.npmjs.com/package/mqtt#mqttconnecturl-options.

## Starting

locally:
```shell
npm install
node server.js
```

Docker:
```
docker build -t huemqtt .
docker run --name my_huemqtt \
   -e MH_HUE_HOST=192.168.0.6 \
   -e MH_HUE_USERNAME=coolusername \
   -e MH_MQTT_HOST=mqtt://test.mosquitto.org \
   huemqtt
```

## Endpoints

### Lights

```
lights/hue/{unique_id}/get/on
lights/hue/{unique_id}/get/hue
lights/hue/{unique_id}/get/brightness
lights/hue/{unique_id}/get/saturation
lights/hue/{unique_id}/get/name

lights/hue/{unique_id}/set/state
  {
    brightness: 0,
    hue: 0,
    transitionTime: 0,
    on: true,
    saturation: 0
  }
lights/hue/{unique_id}/set/on
lights/hue/{unique_id}/set/brightness
```

These are the light endpoints. All of the 'get' endpoints are retained.
The state requires JSON. An example is given.

### Sensors
#### Switches (ZLLSwitch)

```
sensors/hue/{unique_id}/get/battery
sensors/hue/{unique_id}/get/name
sensors/hue/{unique_id}/get/buttons/on
sensors/hue/{unique_id}/get/buttons/off
sensors/hue/{unique_id}/get/buttons/up
sensors/hue/{unique_id}/get/buttons/down
```
Each Button action can have 3 different events `hold, short` or `long`.

#### Temperature (ZHATemperature)
```
sensors/hue/{unique_id}/get/temperature
sensors/hue/{unique_id}/get/battery
sensors/hue/{unique_id}/get/name
```

#### Humidity (ZHAHumidift)
```
sensors/hue/{unique_id}/get/humidity
sensors/hue/{unique_id}/get/battery
sensors/hue/{unique_id}/get/name
```
