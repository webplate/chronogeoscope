var SCREEN_WIDTH = 794;
var SCREEN_HEIGHT = SCREEN_WIDTH;
var MAP_H = 533;
var MAP_W = MAP_H;
var FRAME_H = SCREEN_HEIGHT;
var FRAME_W = FRAME_H;
var FRAME_ALPHA = 0.85;
var TICKER_W = 20;
var TICKER_H = 291;
var TICKER_PIVOT_X = TICKER_W/2;
var TICKER_PIVOT_Y = TICKER_H - TICKER_PIVOT_X;
var LOCAL_TICKER_w = 17;
var LOCAL_TICKER_H = 289;
var LOCAL_TICKER_PIVOT_X = LOCAL_TICKER_w/2;
var LOCAL_TICKER_PIVOT_Y = LOCAL_TICKER_H - LOCAL_TICKER_PIVOT_X;
var SPOT_COLOR = 0xFF0B0B;
var SHADOW_ALPHA = 0.05;
var BLUR_SIZE = 8;
var SOLAR_DELAY = 0;

//~ var GRID_RES = MAP_W / 48;
//~ var GRID_W = 8;
var GRID_RES = MAP_W / 256;
var GRID_W = 2;

var CITY_LIST = cap_and_largest;
var CITY_W = 2;
var CITY_COLOR = 0xa40000;
var CITY_ALPHA = 0.5;
var CITY_MIN_POP = 2000000;
//origin
var DEF_LAT = 0;
var DEF_LON = 0;
// animation delays in seconds
var PAGE_DELAY = 0.5;
var TICK_DELAY = 10;
var SHADOW_DELAY = 60*30;

var REAL_TIME = false;
var NOWEBGL = false;

// hack to enable scrolling on smatphones
PIXI.AUTO_PREVENT_DEFAULT = false;

// create the main pixi renderer
var renderer = PIXI.autoDetectRenderer(SCREEN_WIDTH, SCREEN_HEIGHT,{transparent: true}, noWebGl = NOWEBGL);

// add pixi surface to centered div
var div = document.body.getElementsByClassName("clock")[0];
div.appendChild(renderer.view);

//
// Display objects
//

// draw map
var map = PIXI.Sprite.fromImage('static/img/map.png');
map.x = 0;
map.y = 0;

// blur filter for shadow
var blurFilter = new PIXI.filters.BlurFilter();
blurFilter.blur = BLUR_SIZE;

// draw earth self shadow
var shadow = new PIXI.Graphics();
shadow.lineStyle(0);
shadow.pivot.x = 0;
shadow.pivot.y = 0;
shadow.alpha = SHADOW_ALPHA;
shadow.blendMode = PIXI.BLEND_MODES.LUMINOSITY
shadow.filters = [blurFilter];

// draw solar time ticker
var ticker = PIXI.Sprite.fromImage('static/img/stick.png');
ticker.pivot.x = TICKER_PIVOT_X;
ticker.pivot.y = TICKER_PIVOT_Y;
ticker.x = MAP_W/2 ;
ticker.y = MAP_H/2 ;

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

// draw local time ticker
var local_ticker = PIXI.Sprite.fromImage('static/img/localticker.png');
local_ticker.pivot.x = LOCAL_TICKER_PIVOT_X;
local_ticker.pivot.y = LOCAL_TICKER_PIVOT_Y;
local_ticker.x = SCREEN_WIDTH/2 ;
local_ticker.y = SCREEN_HEIGHT/2 ;

//draw frame
var frame = PIXI.Sprite.fromImage('static/img/frame.png');
frame.alpha = FRAME_ALPHA;
frame.x = SCREEN_WIDTH/2 - FRAME_W/2;
frame.y = SCREEN_HEIGHT/2 - FRAME_H/2;

// draw shadow line
var shadowLine = new PIXI.Graphics();
shadowLine.lineStyle(0);
shadowLine.pivot.x = 0;
shadowLine.pivot.y = 0;

// draw main cities
var main_cities = new PIXI.Graphics();
main_cities.alpha = CITY_ALPHA;
main_cities.lineStyle(0);
main_cities.pivot.x = 0;
main_cities.pivot.y = 0;
// draw city points from database
draw_cities(CITY_LIST);

//
// Scene Graph
//

// create the root of the scene graph
var stage = new PIXI.Container();

// background container
var back_cont = new PIXI.Container();
// move container to the center
back_cont.position.x = SCREEN_WIDTH/2;
back_cont.position.y = SCREEN_HEIGHT/2;
// pivot around center
back_cont.pivot.x = MAP_W/2;
back_cont.pivot.y = MAP_H/2;

// front contaner
var front_cont = new PIXI.Container();
front_cont.position.x = SCREEN_WIDTH/2;
front_cont.position.y = SCREEN_HEIGHT/2;
front_cont.pivot.x = MAP_W/2;
front_cont.pivot.y = MAP_H/2;

// setup drawing z-order
stage.addChild(frame);
back_cont.addChild(map);
back_cont.addChild(main_cities);
stage.addChild(back_cont);
stage.addChild(shadow);
front_cont.addChild(spot);
front_cont.addChild(ticker);
stage.addChild(front_cont);
stage.addChild(local_ticker);
//~ stage.addChild(shadowLine);


//
// Main Loop
//

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
