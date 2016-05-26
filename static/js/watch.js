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
var local_ticker_pivot_x = 9;
var local_ticker_pivot_y = 286;
var spot_color = 0xFF0B0B;

//~ var def_lat = 46;//france
//~ var def_long = 2;
//~ var def_lat = -90;//south pole
//~ var def_long = 0;
//~ var def_lat = 90;//north pole
//~ var def_long = 180;
//~ var def_lat = 8.8;//point india
//~ var def_long = 77.3;
//~ var def_lat = 71;//point norvege
//~ var def_long = 27;
var def_lat = 0;//origin
var def_long = 0;

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

// draw ticker
var ticker = PIXI.Sprite.fromImage('static/img/stick.png');
//~ ticker.alpha = 0.5;
ticker.pivot.x = ticker_pivot_x;
ticker.pivot.y = ticker_pivot_y;
ticker.x = map_w/2 ;
ticker.y = map_h/2 ;
container.addChild(ticker);

// draw a circle
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

// move container to the center
container.position.x = screen_width/2;
container.position.y = screen_height/2;
// pivot around center
container.pivot.x = map_w/2;
container.pivot.y = map_h/2;

// set clock according to position
function load_position(latitude, longitude) {
    rad_long = longitude * Math.PI/180;
    ticker.rotation = rad_long;
    var r = (map_w/4)/90 * latitude + map_w/4 ;
    x = r * Math.cos(rad_long - Math.PI/2);
    y = r * Math.sin(rad_long - Math.PI/2);
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
    var long = document.getElementById("longitude").value;
    if (lat > 90) {
        lat = 90;
    } else if (lat < -90) {
        lat = -90;
    }
    set_position(lat, long);
    load_position(lat, long);
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

// set default position
load_position(def_lat, def_long);


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
