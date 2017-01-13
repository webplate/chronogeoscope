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

// jump to lat lon of major city
function jump_position() {
    var target = document.getElementById("city").value;
    
    // search for city position
    var lat = DEF_LAT;
    var lon = DEF_LON;
    
    for (i in SELECTED_CITIES) {
        var sel = SELECTED_CITIES[i];
        if (sel["name"] == target) {
            lat = sel["latitude"];
            lon = sel["longitude"];
        }
    }
    set_position(lat, lon);
    load_position(lat, lon);
}

// set html form with active coordinates
function set_position(latitude, longitude) {
    document.getElementById("latitude").value = latitude;
    document.getElementById("longitude").value = longitude;
}

// two digit number display
function two_digits(s) {
    s = s.toString();
    if (s.length == 1) {
        s = '0'+s;
    }
    return s;
}

// set time display
function update_time_display(date) {
    var span = document.getElementById("time");
    span.innerText = two_digits(date.getUTCHours())+' : '+
    two_digits(date.getUTCMinutes())+' : '+
    two_digits(date.getUTCSeconds());
    var span = document.getElementById("local_time");
    span.innerText = two_digits(date.getHours())+' : '+
    two_digits(date.getMinutes())+' : '+
    two_digits(date.getSeconds());
    var span = document.getElementById("solar_time");
    // epoch at utc (added offset) + solar delay from position
    var utc_ms = date.getTime() + (date.getTimezoneOffset() * 60000) + SOLAR_DELAY;
    var solar_date = new Date();
    solar_date.setTime(utc_ms);
    span.innerText = two_digits(solar_date.getHours())+' : '+
    two_digits(solar_date.getMinutes())+' : '+
    two_digits(solar_date.getSeconds());
}


// Responsivness
function adapt_to_screen_size() {
    
    var win_width = $(window).width();
    var win_height = $(window).height();
    
    // elements to organize
    var fullclock = document.getElementById("fullclock");
    var controls = document.getElementById("controls");
    var overcanvas = document.getElementById("overcanvas");
    
    var controls_height = $("#controls").outerHeight();
    
    // resize clock from viewport size
    // works only for square clocks !!
    if (win_width < CANVAS_WIDTH || win_height < CANVAS_HEIGHT) {
        var actual_size = Math.min(win_width, win_height);
    } else {
        var actual_size = CANVAS_WIDTH;
    }
    renderer.view.style.width = String(actual_size) + 'px';
    renderer.view.style.height = String(actual_size) + 'px';
    
    overcanvas.style.width = String(actual_size) + 'px';
    overcanvas.style.height = String(actual_size) + 'px';
        
    // threshold to change layout
    var t = CANVAS_WIDTH + CONTROLS_WIDTH + 40;
    var limit = Math.round(win_width / 2 + (actual_size - CONTROLS_WIDTH) / 2);
    // adapt layout from viewport size
    if (win_width > t) {   
        fullclock.style.marginBottom = '0px';
        fullclock.style.marginLeft = String(limit - actual_size) + 'px';
        
        controls.style.marginLeft = String(limit) + 'px';
        controls.style.marginTop = String(Math.round((actual_size - controls_height) / 2)+20) + 'px';
        controls.style.marginBottom = String(Math.round((actual_size - controls_height) / 2) + 20) + 'px';

    } else if (win_width <= t) {
        fullclock.style.marginBottom = String(Math.min(win_width, actual_size) + 40) + 'px';
        fullclock.style.marginLeft = '';
        
        controls.style.marginLeft = '';
        controls.style.marginTop = '';
        controls.style.marginBottom = '';
    }
}
