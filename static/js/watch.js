var screen_width = 794;
var screen_height = screen_width;
var map_h = 530;
var map_w = map_h;
var frame_h = 794;
var frame_w = frame_h;
var ticker_w = 43;
var ticker_h = 297;
var ticker_pivot_x = ticker_w/2;
var ticker_pivot_y = ticker_h - ticker_pivot_x;
var local_ticker_pivot_x = 11;
var local_ticker_pivot_y = 285;
var spot_color = 0xFF0B0B;

//~ var def_lat = 46;//france
//~ var def_lon = 2;
//~ var def_lat = -90;//south pole
//~ var def_lon = 0;
//~ var def_lat = 90;//north pole
//~ var def_lon = 180;
//~ var def_lat = 8.8;//point india
//~ var def_lon = 77.3;
//~ var def_lat = 71;//point norvege
//~ var def_lon = 27;
var def_lat = 0;//origin
var def_lon = 0;

// create the main pixi renderer
var renderer = PIXI.autoDetectRenderer(screen_width, screen_height,{transparent: true});

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

// draw solar time ticker
var ticker = PIXI.Sprite.fromImage('static/img/stick.png');
//~ ticker.alpha = 0.5;
ticker.pivot.x = ticker_pivot_x;
ticker.pivot.y = ticker_pivot_y;
ticker.x = map_w/2 ;
ticker.y = map_h/2 ;
container.addChild(ticker);

// draw a circle to indicate location
var spot = new PIXI.Graphics();
spot.lineStyle(0);
spot.beginFill(spot_color, 0.8);
spot.drawCircle(0, 0, 6);
spot.endFill();
spot.pivot.x = 0;
spot.pivot.y = 0;
spot.x = map_w/2;
spot.y = map_h/2;
container.addChild(spot);

// draw local time ticker
var local_ticker = PIXI.Sprite.fromImage('static/img/localticker.png');
//~ ticker.alpha = 0.5;
local_ticker.pivot.x = local_ticker_pivot_x;
local_ticker.pivot.y = local_ticker_pivot_y;
local_ticker.x = screen_width/2 ;
local_ticker.y = screen_height/2 ;
stage.addChild(local_ticker);

//draw frame
var frame = PIXI.Sprite.fromImage('static/img/frame.png');
//~ frame.alpha = 0.5;
frame.x = screen_width/2 - frame_w/2;
frame.y = screen_height/2 - frame_h/2;
stage.addChild(frame);

// draw earth self shadow
var shadow = new PIXI.Graphics();
shadow.lineStyle(0);
shadow.pivot.x = 0;
shadow.pivot.y = 0;
stage.addChild(shadow);

var shadowP = new PIXI.Graphics();
shadowP.lineStyle(0);
shadowP.pivot.x = 0;
shadowP.pivot.y = 0;
stage.addChild(shadowP);

// move container to the center
container.position.x = screen_width/2;
container.position.y = screen_height/2;
// pivot around center
container.pivot.x = map_w/2;
container.pivot.y = map_h/2;

// set clock according to position
function load_position(latitude, longitude) {
    // rotate ticker
    rad_lon = longitude * Math.PI/180;
    ticker.rotation = rad_lon;
    // place local position spot
    var r = (map_w/4)/90 * latitude + map_w/4 ;
    x = r * Math.cos(rad_lon - Math.PI/2);
    y = r * Math.sin(rad_lon - Math.PI/2);
    spot.x = map_w/2 + x;
    spot.y = map_h/2 + y;
    set_position(latitude, longitude);
}

if ("geolocation" in navigator) {
  /* geolocation is available */
  navigator.geolocation.getCurrentPosition(function(position) {
  load_position(position.coords.latitude, position.coords.longitude);
});
} else {
  /* geolocation IS NOT available */
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

function tilt_cart(x, y, z, tilt) {
    //~ get rotated coordinates
    //~ along x axis of tilt radians
    var x2 = x;
    var y2 = y * Math.cos(tilt) + z * Math.sin(tilt);
    var z2 = -Math.sin(tilt) * y + z * Math.cos(tilt);
    return [x2, y2, z2];
}

function get_tilt_cart(lat, lon, tilt) {
    //~ get cartesian coordinates from spherical coordinates
    //~ after applying a rotation of the base around x axis of tilt radians
    var coo = get_cart(lat, lon);
    var coo2 = tilt_cart(coo[0], coo[1], coo[2], tilt);
    return [coo2[0], coo2[1], coo2[2]];
}

function get_spher(x, y, z) {
    //~ return sperical coordinates from cartesian
    var lon = Math.atan2(y, x);
    var lat = Math.acos(z);
    return [lat, lon];
}

function get_azi_coord(lat, lon) {
    //~ return coord on azimuthal map
    var r = (map_w/4)/(Math.PI/2) * lat;
    var x = r * Math.cos(lon);
    var y = r * Math.sin(lon);
    return [x, y];
}


function get_sun_tilt(date) {
    // give the sun angle with earth equatorial plane
    // approximate current day of year
    var day_of_year = date.getUTCDate() + date.getUTCMonth() * 30.44;
    // the tilt between earth and sun
    // (23.5° and summer solstice on the 172nd day)
    var observable_tilt = 23.5*Math.cos(((2*Math.PI)/365)*(day_of_year - 172));
    // in radians
    observable_tilt = 2*Math.PI*(observable_tilt/360.);
    //~ return observable_tilt;
    //~ return -observable_tilt;
    return 0 + 0.01;
}

function update_shadow(date) {
    //~ draw the limit of earth self-shadowing
    var tilt = get_sun_tilt(date) + Math.PI / 2;
    // draw shadow
    shadow.clear();
    shadow.beginFill(0x000000, 0.2);
    shadowP.clear();
    shadowP.beginFill(0x000000);
    shadow.moveTo(0, 0);
    for (lon = -Math.PI; lon < Math.PI; lon = lon + Math.PI/64) {
        //~ tilted circle
        coo = get_tilt_cart(Math.PI / 2, lon, tilt);
        coo_sph = get_spher(coo[0], coo[1], coo[2])
        coo_azi = get_azi_coord(coo_sph[0], coo_sph[1])
        // draw point
        var x = screen_width/2 + coo_azi[0];
        var y = screen_height/2 + coo_azi[1];
        shadow.lineTo(x, y);
        shadowP.drawCircle(x, y, 3);
    }
    shadow.endFill();
}

// set default position
load_position(def_lat, def_lon);


function animate() {    
    // create time representation
    var date = new Date();
    var seconds = Math.round(date.getTime()/1000.0);
    
    // update every second only
    if (app_time <  seconds) {
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


// set application time for loop control
var date = new Date();
var app_time = Math.round(date.getTime()/1000.0);

// start animating
animate();
