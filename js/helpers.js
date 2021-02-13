/**
 * Helper functions to calculate stuff:
 */

export function scale(million, factor = 200) {
    return million * factor / 2;
}

export function planet_size_scale(thousand_km) {
    return Math.log(thousand_km) * 2.5;
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

export function sum(array) {
    return array.reduce((a, b) => a + b, 0)
}