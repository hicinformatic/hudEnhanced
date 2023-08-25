const options_fi = {
    size: 200, // Sets the size in pixels of the indicator
    roll: 0, // Roll angle in degrees for an attitude indicator
    pitch: 0, // Pitch angle in degrees for an attitude indicator
    turn: 0, // Sets rotation of the TC
    heading: 0, // Heading angle in degrees for an heading indicator
    verticalSpeed: 0, // Vertical speed in km/min for the vertical speed indicator
    airspeed: 0, // Air speed in meters/hour for an air speed indicator
    altitude: 0, // Altitude in meters for an altimeter indicator
    pressure: 1000, // Pressure in hPa for an altimeter indicator
    hideBox: true, // Sets if the outer squared box is visible or not (true or false)
    imagesDirectory: '../img', // The directory where the images are saved to
};


var startflight = function(){
    var cfg_frames_standalone = {
        coordinator: FlightIndicators.TYPE_HEADING, 
        airspeed: FlightIndicators.TYPE_AIRSPEED,
        altimeter: FlightIndicators.TYPE_ALTIMETER,
        verticalspeed: FlightIndicators.TYPE_VERTICAL_SPEED,
        attitude: FlightIndicators.TYPE_ATTITUDE,
        turn: FlightIndicators.TYPE_TURN_COORDINATOR,
    }

    for (const [key, value] of Object.entries(cfg_frames_standalone)) {
        startFrame(key);
        window[key] = new FlightIndicators(document.querySelector("#"+key), value, options_fi);
      }
}

startflight();