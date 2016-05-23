var screen_width = 800;
var screen_height = 600;
var map_h = 530;
var map_w = 530;
var frame_h = 580;
var frame_w = 580;
var back_color = 0x909090;
var spot_color = 0xFF0B0B;

var def_lat = 0;
var def_long = -90;


function load_position(latitude, longitude) {
    alert("Hello");
}

if ("geolocation" in navigator) {
  /* geolocation is available */
  navigator.geolocation.getCurrentPosition(function(position) {
  load_position(position.coords.latitude, position.coords.longitude);
});
} else {
  /* geolocation IS NOT available */
}


var renderer = PIXI.autoDetectRenderer(screen_width, screen_height,{transparent: true});

// add pixi surface to centered div
var div = document.body.getElementsByClassName("center")[0];
div.appendChild(renderer.view);


var graphics = new PIXI.Graphics();

// create the root of the scene graph
var stage = new PIXI.Container();

var container = new PIXI.Container();

stage.addChild(container);


// draw map
var map = PIXI.Sprite.fromImage('/static/img/AzimuthalMapSouth.png');
map.x = 0;
map.y = 0;
container.addChild(map);

// draw a circle
graphics.lineStyle(0);
graphics.beginFill(spot_color, 0.9);
graphics.drawCircle(0, 0, 5);
graphics.endFill();
graphics.x = map_w/2 + 50;
graphics.y = map_h/2 + 100;
container.addChild(graphics);

//draw frame
var frame = PIXI.Sprite.fromImage('/static/img/frame.png');
frame.x = screen_width/2 - frame_w/2;
frame.y = screen_height/2 - frame_h/2;
stage.addChild(frame);

// move container to the center
container.position.x = screen_width/2;
container.position.y = screen_height/2;
// pivot around center
container.pivot.x = map_w/2;
container.pivot.y = map_h/2;

// start animating
animate();

function animate() {

    requestAnimationFrame(animate);
  
    //rotate the container!
    container.rotation += 0.0001;

    // render the root container
    renderer.render(stage);
}
