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

//~ var GRID_RES = MAP_W / 48;
//~ var GRID_W = 8;
var GRID_RES = MAP_W / 128;
var GRID_W = 4;
//origin
var DEF_LAT = 0;
var DEF_LON = 0;
// animation delays in seconds
var PAGE_DELAY = 0.5;
var TICK_DELAY = 10;
var SHADOW_DELAY = 60*30;

var REAL_TIME = false;
var NOWEBGL = false;

// create the main pixi renderer
var renderer = PIXI.autoDetectRenderer(SCREEN_WIDTH, SCREEN_HEIGHT,{transparent: true}, noWebGl = NOWEBGL);

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
//~ shadow.alpha = 0.2;
//~ shadow.filters = [blurFilter];
stage.addChild(shadow);

// draw shadow line
var shadowLine = new PIXI.Graphics();
shadowLine.lineStyle(0);
shadowLine.pivot.x = 0;
shadowLine.pivot.y = 0;
stage.addChild(shadowLine);

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

// move container to the center
container.position.x = SCREEN_WIDTH/2;
container.position.y = SCREEN_HEIGHT/2;
// pivot around center
container.pivot.x = MAP_W/2;
container.pivot.y = MAP_H/2;

//
// HTML interaction
//

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
function update_time_display(date) {
    var span = document.getElementById("time");
    span.innerText = date.toUTCString();
    var span = document.getElementById("local_time");
    span.innerText = date.toString();
}

function animate() {    
    // create time representation
    var date = new Date();
    var curr_time = Math.round(date.getTime()/1000.0);
    
    // update display every second only
    if (REAL_TIME || curr_time > flip_page + PAGE_DELAY) {
        flip_page = curr_time;
        if (curr_time > flip_tick + TICK_DELAY) {
            flip_tick = curr_time;
            // rotate tickers
            update_tickers(date);
        }
        if (curr_time > flip_shadow + SHADOW_DELAY) {
            flip_shadow = curr_time;
            // compute earth self-shadowing
            update_shadow_grid(date);
        }
        // update time display
        update_time_display(date);
        
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

var flip_page = 0;
var flip_tick = 0;
var flip_shadow = 0;
// start animating
animate();
