//
// Graphic functions
//

// set clock according to position
function load_position(latitude, longitude) {
    // rotate ticker
    var rad_lon = longitude * Math.PI/180;
    ticker.rotation = rad_lon;
    // this angle is also the delay from GMT in milliseconds
    SOLAR_DELAY = (rad_lon / (2 * Math.PI)) * 24 * 60 * 60 *1000 ;
    // place local position spot
    var coo = get_azi(latitude, longitude);
    spot.x = coo[0];
    spot.y = coo[1];
    set_position(latitude, longitude);
}

// update tickers position
function update_tickers(date) {
    // calculate analogic UTC time
    var aHour = date.getUTCHours() + date.getUTCMinutes()/60.0 + date.getUTCSeconds()/3600.0;
    var angle = aHour / 24. * 2 * Math.PI;
    //rotate the container
    back_cont.rotation = angle;
    front_cont.rotation = angle;
    // calculate analogic local time
    var aHour = date.getHours() + date.getMinutes()/60.0 + date.getSeconds()/3600.0;
    var angle = aHour / 24. * 2 * Math.PI;
    //rotate the local time ticker
    local_ticker.rotation = angle;
}

// give the sun angle with earth equatorial plane
function get_sun_tilt(date) {
    // approximate current day of year
    var day_of_year = date.getUTCDate() + date.getUTCMonth() * 30.44;
    // the tilt between earth and sun
    // (23.5° and summer solstice on the 172nd day)
    var observable_tilt = 23.5*Math.cos(((2*Math.PI)/365)*(day_of_year - 172));
    // in radians
    observable_tilt = 2*Math.PI*(observable_tilt/360.);
    return observable_tilt;
    //~ return 0; 
    //~ return -2*Math.PI*(23.5/360.);
    //~ return 2*Math.PI*(23.5/360.) * Math.cos(date.getTime()/1000);
    //~ return 2*Math.PI*(5/360.) * Math.cos(date.getTime()/3000);
}
