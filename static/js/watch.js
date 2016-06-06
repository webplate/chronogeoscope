var SCREEN_WIDTH = 794;
var SCREEN_HEIGHT = SCREEN_WIDTH;
var MAP_H = 530;
var MAP_W = MAP_H;
var FRAME_H = SCREEN_HEIGHT;
var FRAME_W = FRAME_H;
var TICKER_W = 41;
var TICKER_H = 302;
var TICKER_PIVOT_X = TICKER_W/2;
var TICKER_PIVOT_Y = TICKER_H - TICKER_PIVOT_X;
var LOCAL_TICKER_PIVOT_X = 9;
var LOCAL_TICKER_PIVOT_Y = 280;
var SPOT_COLOR = 0xFF0B0B;
var SHADOW_RES = Math.PI/64;
var SHADOW_CORREC_LIMIT = Math.PI/32;
var DEF_LAT = 0;//origin
var DEF_LON = 0;
var REAL_TIME = true;

// create the main pixi renderer
var renderer = PIXI.autoDetectRenderer(SCREEN_WIDTH, SCREEN_HEIGHT,{transparent: true});

// add pixi surface to centered div
var div = document.body.getElementsByClassName("center")[0];
div.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();
var container = new PIXI.Container();
stage.addChild(container);

// draw map
var map = PIXI.Sprite.fromImage('static/img/AzimuthalMapSouth.png');
map.x = 0;
map.y = 0;
container.addChild(map);

// blur filter for shadow
var blurFilter = new PIXI.filters.BlurFilter();
blurFilter.blur = 10;

// draw earth self shadow
var shadow = new PIXI.Graphics();
shadow.lineStyle(0);
shadow.pivot.x = 0;
shadow.pivot.y = 0;
shadow.filters = [blurFilter];
stage.addChild(shadow);

// draw external circle
var shadowExt = new PIXI.Graphics();
shadowExt.lineStyle(0);
shadowExt.pivot.x = 0;
shadowExt.pivot.y = 0;
stage.addChild(shadowExt);

// draw high latitude correction
var shadowHigh = new PIXI.Graphics();
shadowHigh.lineStyle(0);
shadowHigh.pivot.x = 0;
shadowHigh.pivot.y = 0;
shadowHigh.filters = [blurFilter];
stage.addChild(shadowHigh);

// draw solar time ticker
var ticker = PIXI.Sprite.fromImage('static/img/stick.png');
//~ ticker.alpha = 0.5;
ticker.pivot.x = TICKER_PIVOT_X;
ticker.pivot.y = TICKER_PIVOT_Y;
ticker.x = MAP_W/2 ;
ticker.y = MAP_H/2 ;
container.addChild(ticker);

// draw a circle to indicate location
var spot = new PIXI.Graphics();
spot.lineStyle(0);
spot.beginFill(SPOT_COLOR, 0.8);
spot.drawCircle(0, 0, 6);
spot.endFill();
spot.pivot.x = 0;
spot.pivot.y = 0;
spot.x = MAP_W/2;
spot.y = MAP_H/2;
container.addChild(spot);

// draw local time ticker
var local_ticker = PIXI.Sprite.fromImage('static/img/localticker.png');
//~ ticker.alpha = 0.5;
local_ticker.pivot.x = LOCAL_TICKER_PIVOT_X;
local_ticker.pivot.y = LOCAL_TICKER_PIVOT_Y;
local_ticker.x = SCREEN_WIDTH/2 ;
local_ticker.y = SCREEN_HEIGHT/2 ;
stage.addChild(local_ticker);

//draw frame
var frame = PIXI.Sprite.fromImage('static/img/frame.png');
//~ frame.alpha = 0.5;
frame.x = SCREEN_WIDTH/2 - FRAME_W/2;
frame.y = SCREEN_HEIGHT/2 - FRAME_H/2;
stage.addChild(frame);


// draw shadow points (debug)
var shadowP = new PIXI.Graphics();
shadowP.lineStyle(0);
shadowP.pivot.x = 0;
shadowP.pivot.y = 0;
stage.addChild(shadowP);

// move container to the center
container.position.x = SCREEN_WIDTH/2;
container.position.y = SCREEN_HEIGHT/2;
// pivot around center
container.pivot.x = MAP_W/2;
container.pivot.y = MAP_H/2;

// set clock according to position
function load_position(latitude, longitude) {
    // rotate ticker
    rad_lon = longitude * Math.PI/180;
    ticker.rotation = rad_lon;
    // place local position spot
    var r = (MAP_W/4)/90 * latitude + MAP_W/4 ;
    x = r * Math.cos(rad_lon - Math.PI/2);
    y = r * Math.sin(rad_lon - Math.PI/2);
    spot.x = MAP_W/2 + x;
    spot.y = MAP_H/2 + y;
    set_position(latitude, longitude);
}
// use position from form
function get_position() {
    var lat = document.getElementById("latitude").value;
    var lon = document.getElementById("longitude").value;
    if (lat > 90) {
        lat = 90;
    } else if (lat < -90) {
        lat = -90;
    }
    set_position(lat, lon);
    load_position(lat, lon);
}

// set html form with active coordinates
function set_position(latitude, longitude) {
    document.getElementById("latitude").value = latitude;
    document.getElementById("longitude").value = longitude;
}

// set time display
function set_time(date) {
    var span = document.getElementById("time");
    span.innerText = date.toUTCString();
    var span = document.getElementById("local_time");
    span.innerText = date.toString();
}

function get_cart(lat, lon) { 
    //~ get cartesian coordinates from spherical coordinates
    var x = Math.sin(lat) * Math.cos(lon);
    var y = Math.sin(lat) * Math.sin(lon);
    var z = Math.cos(lat);
    return [x, y, z];
}

//~ get rotated coordinates
function tilt_cart(x, y, z, tilt) {
    //~ along x axis of tilt radians
    var x2 = x;
    var y2 = y * Math.cos(tilt) + z * Math.sin(tilt);
    var z2 = -Math.sin(tilt) * y + z * Math.cos(tilt);
    return [x2, y2, z2];
}

//~ get cartesian coordinates from spherical coordinates
//~ after applying a rotation of the base around x axis of tilt radians
function get_tilt_cart(lat, lon, tilt) {
    var coo = get_cart(lat, lon);
    var coo2 = tilt_cart(coo[0], coo[1], coo[2], tilt);
    return [coo2[0], coo2[1], coo2[2]];
}

//~ return sperical coordinates from cartesian
function get_spher(x, y, z) {
    var lon = Math.atan2(y, x);
    var lat = Math.acos(z);
    return [lat, lon];
}

//~ return coord on azimuthal map
function get_azi_coord(lat, lon) {
    var r = (MAP_W/4)/(Math.PI/2) * lat;
    var x = r * Math.cos(lon);
    var y = r * Math.sin(lon);
    return [x, y];
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
    //~ return observable_tilt;
    //~ return SUNTILT;
    //~ return 2*Math.PI*(23.5/360.) * Math.cos(date.getTime()/1000);
    return 2*Math.PI*(5/360.) * Math.cos(date.getTime()/1000);
}

//~ draw the limit of earth self-shadowing
// composed of a projected tilted circle, an outer circle and
// an arc correcting high latitude distortions
function update_shadow(date) {
    // sun tilt according to season
    var tilt = get_sun_tilt(date) + Math.PI / 2;
    // clear previous and draw shadow
    shadow.clear();
    shadow.beginFill(0x000000, 1);
    shadowP.clear();
    shadowP.beginFill(0x000000);
    shadowExt.clear();
    shadowExt.beginFill(0x000000);
    shadowHigh.clear();
    shadowHigh.beginFill(0x000000);
    // correction latitude
    var arc_lat_max = 0;
    var arc_lat_min = 0;
    var arc_lon = 0;
    // first run for init
    var first_run = true;
    var first_run2 = true;
    var first_run3 = true;
    for (lon = -Math.PI; lon < Math.PI; lon = lon + SHADOW_RES) {
        // compute coordinates on tilted great circle
        var coo = get_tilt_cart(Math.PI / 2, lon, tilt);
        var coo_sph = get_spher(coo[0], coo[1], coo[2]);
        var coo_azi = get_azi_coord(coo_sph[0], coo_sph[1]);
        // select strategy of drawing (depend on winter summer)
        if (tilt < Math.PI/2) {
            // draw external shadow
            var r = MAP_W/2 ;
            var x = r * Math.cos(lon);
            var y = r * Math.sin(lon);
            x = SCREEN_WIDTH/2 + x;
            y = SCREEN_HEIGHT/2 + y;
            if (first_run) {
                first_run = false;
                shadowExt.moveTo(x, y);
            } else {
                shadowExt.lineTo(x, y);
            }
            //~ shadowExt.drawCircle(x, y, 3);
        }
        // and prepare correction of distortions on high latitude
        if (coo_sph[0] > arc_lat_max) { 
            arc_lat_max = coo_sph[0];
            var coo_arc = get_tilt_cart(Math.PI / 2, lon - 2 * SHADOW_RES, tilt);
            var coo_sph_arc = get_spher(coo_arc[0], coo_arc[1], coo_arc[2]);
            arc_lon = Math.abs(coo_sph_arc[1] - Math.PI/2);
            arc_lat_min =  coo_sph_arc[0];
        }        
        // draw circle projection point
        var x = SCREEN_WIDTH/2 + coo_azi[0];
        var y = SCREEN_HEIGHT/2 + coo_azi[1];
        if (first_run2) {
            first_run2 = false;
            shadow.moveTo(x, y);
        } else {
            shadow.lineTo(x, y);
        }
        //~ shadowP.drawCircle(x, y, 3);
    }
    // draw shadow correction
    
    if (arc_lat_max > 0) {
        if (tilt > Math.PI/2) {
            var lon_offset = -Math.PI/2;
            var start = arc_lon - Math.PI;
            var stop = -arc_lon + Math.PI;
        } else {
            var lon_offset = Math.PI/2;
            var start = -arc_lon;
            var stop = arc_lon;
        }
        var m = (stop - start) / 2;
        for (lon = start; lon < stop; lon = lon + SHADOW_RES) {
            // interpolate arc diameter
            if (lon < start + m) {
                var a = (arc_lat_max - arc_lat_min)/m;
                var b = arc_lat_min - a * start;
                var corr_lat = a * lon + b;
            } else {
                var a = (arc_lat_min - arc_lat_max)/m;
                var b = arc_lat_min - a * stop;
                var corr_lat = a * lon + b;
            }
            //~ console.log(corr_lat, arc_lat_max, arc_lat_min);
            coo_azi = get_azi_coord(corr_lat, lon + lon_offset);
            x = SCREEN_WIDTH/2 + coo_azi[0];
            y = SCREEN_HEIGHT/2 + coo_azi[1];
            if (first_run3) {
                first_run3 = false;
                shadow.moveTo(x, y);
            } else {
                shadow.lineTo(x, y);
            }
            //~ shadowHigh.drawCircle(x, y, 4);
        }
    }
    shadow.endFill();
    shadow.endFill();
    shadowExt.endFill();
    shadowHigh.endFill();
}

function animate() {    
    // create time representation
    var date = new Date();
    var seconds = Math.round(date.getTime()/1000.0);
    
    // update every second only
    if (REAL_TIME || app_time <  seconds) {
        app_time = seconds;
        // calculate analogic UTC time
        var aHour = date.getUTCHours() + date.getUTCMinutes()/60.0 + date.getUTCSeconds()/3600.0;
        var angle = aHour / 24. * 2 * Math.PI;
        //rotate the container!
        container.rotation = angle;
        // calculate analogic local time
        var aHour = date.getHours() + date.getMinutes()/60.0 + date.getSeconds()/3600.0;
        var angle = aHour / 24. * 2 * Math.PI;
        //rotate the container!
        local_ticker.rotation = angle;
        // update time display
        set_time(date);
        // compute earth self-shadowing
        update_shadow(date);
        // render the root container
        renderer.render(stage);
    }
    requestAnimationFrame(animate);
}

if ("geolocation" in navigator) {
    /* geolocation is available */
    navigator.geolocation.getCurrentPosition(function(position) {
        load_position(position.coords.latitude, position.coords.longitude);
    });
}
// set default position
load_position(DEF_LAT, DEF_LON);
// set application time for loop control
var date = new Date();
var app_time = Math.round(date.getTime()/1000.0);

// start animating
animate();
