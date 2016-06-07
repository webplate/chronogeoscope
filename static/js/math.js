//
// Trigonometry functions
//

//~ get cartesian coordinates from spherical coordinates
function get_cart(lat, lon) { 
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

// convert 2D azimutal map coord to spherical
function azi_to_spher(x, y) {
    var x = x - MAP_W/2;
    var y = y - MAP_W/2;
    var r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    var lon = Math.acos(y / r);
    var lat = r/(MAP_W/2) * Math.PI;
    return [lat, lon];
}