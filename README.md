# Nottingham Bus Timetable

<p align="center">
  <img width="600" height="350" src="https://github.com/jamesbellnet/live-bus-timetable/raw/master/screenshot.png">
</p>

This is a recreation of a bus timetable built as a PWA. The idea is that you install the app to an old, unused device (phone, iPad etc.) and leave it running somewhere useful where you need to be able to see the bus times for your local stop.

To get your bus stop code, make a request to:

```bash
https://nctx.arcticapi.com/network/operators/NCT/lines/{line}/waypoints?direction={inbound|outbound}
```

where `{line}` is the bus route number for any bus that stops at the stop you are searching for and {inbound|outound} is the direction of travel into/out of the city centre. Search the response for your bus stop and grab the `atcoCode` property from its JSON object.

Once you have the `atcoCode`, follow the steps below and add it to `VUE_APP_BUS_STOP_CODE` in your `.env`.

## Project setup
```bash
# clone the repository
git clone git@github.com:jamesbellnet/live-bus-timetable.git

# install dependencies
cd live-bus-timetable && npm i

# set environment variables
cp .env.example .env && vi .env

# compiles and hot-reloads for development
npm run serve

# compiles and minifies for production
npm run build
```
