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
