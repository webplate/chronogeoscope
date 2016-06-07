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
