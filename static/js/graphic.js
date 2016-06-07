//
// Graphic functions
//

// set clock according to position
function load_position(latitude, longitude) {
    // rotate ticker
    rad_lon = longitude * Math.PI/180;
    ticker.rotation = rad_lon;
    // place local position spot
    var r = (MAP_W/4)/90 * latitude + MAP_W/4;
    x = r * Math.cos(rad_lon - Math.PI/2);
    y = r * Math.sin(rad_lon - Math.PI/2);
    spot.x = MAP_W/2 + x;
    spot.y = MAP_H/2 + y;
    set_position(latitude, longitude);
}

// update tickers position
function update_tickers(date) {
    // calculate analogic UTC time
    var aHour = date.getUTCHours() + date.getUTCMinutes()/60.0 + date.getUTCSeconds()/3600.0;
    var angle = aHour / 24. * 2 * Math.PI;
    //rotate the container
    container.rotation = angle;
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
    //~ return 2*Math.PI*(23.5/360.) * Math.cos(date.getTime()/1000);
    //~ return 2*Math.PI*(5/360.) * Math.cos(date.getTime()/3000);
}

//~ draw the zone of earth self-shadowing
function update_shadow_grid(date) {
    // sun tilt according to season
    var tilt = get_sun_tilt(date);
    // sun direction vector
    var sd = Vector.create([Math.cos(tilt),0 , -Math.sin(tilt)]);
    // clear previous and draw shadow
    shadow.clear();
    shadow.beginFill(0x000000);
    for (xa = 0; xa <= MAP_W; xa = xa + GRID_RES) {
        for (ya = 0; ya <= MAP_H; ya = ya + GRID_RES) {
            coo = azi_to_spher(xa, ya);
            cart = get_cart(coo[0], coo[1]);
            var p = Vector.create([cart[0], cart[1], cart[2]]);
            var illu = sd.dot(p);
            if (coo[0] < Math.PI + Math.PI/64 && illu < 0) {
                shadow.drawCircle(xa + SCREEN_WIDTH/2 - MAP_W/2, ya + SCREEN_HEIGHT/2 - MAP_W/2, GRID_W);
            }
        }
    }    
    shadow.endFill();
}

function update_shadow_line(date) {
    // sun tilt according to season
    var tilt = get_sun_tilt(date);
    // tilted circle projection
    shadowLine.clear();
    shadowLine.beginFill(0x000000);
    // first run for init
    for (lon = -Math.PI; lon < Math.PI; lon = lon + SHADOW_RES) {
        // compute coordinates on tilted great circle
        var coo = get_tilt_cart(Math.PI / 2, lon, tilt + Math.PI/2);
        var coo_sph = get_spher(coo[0], coo[1], coo[2]);
        var coo_azi = get_azi_coord(coo_sph[0], coo_sph[1]);        
        // draw circle projection point
        var x = SCREEN_WIDTH/2 + coo_azi[0];
        var y = SCREEN_HEIGHT/2 + coo_azi[1];
        shadowLine.drawCircle(x, y, 3);
    }
    shadowLine.endFill();
}