export function scale(million, factor = 200) {
    return million * factor / window.ZOOM;
}

export function planet_size_scale(thousand_km) {
    return Math.log(thousand_km) * 5 / window.ZOOM;
}

export function distance_scale(AU) {
    // show a difference in size, but not relative
    return scale(AU, 100);
}

export function km_to_au(km) {
    return km / 149597870700;
}

export function deg_to_rad(deg) {
    return deg * Math.PI / 180
}