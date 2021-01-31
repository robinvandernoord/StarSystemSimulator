import {Barycenter, Planet, Star} from './types.js';
import {distance_scale, planet_size_scale, scale} from "./helpers.js";

export function setup_solar_system(c) {
    const drawables = {};
    drawables['barycenter'] = new Barycenter(c, c.w / 2, c.h / 2, {});
    const sun = new Star(c, c.w / 2, c.h / 2, {
        color: 'yellow',
        diameter: scale(1.4, 15),
        orbits: drawables['barycenter'],
    });
    drawables['sun'] = sun;
    drawables['mercury'] = new Planet(c, {
        distance: distance_scale(0.4),
        size: planet_size_scale(4.8),
        color: '#DBCECA',
        orbital_period: 0.240846,
        orbits: sun,
    })
    drawables['venus'] = new Planet(c, {
        distance: distance_scale(0.7),
        size: planet_size_scale(12.1),
        color: '#8B7D82',
        orbital_period: 0.615,
        orbits: sun,
    })
    drawables['earth'] = new Planet(c, {
        distance: distance_scale(1),
        size: planet_size_scale(12.7),
        color: '#344277',
        ellipticity: 0.00335,
        orbital_period: 1,
        orbits: sun,
    })
    drawables['mars'] = new Planet(c, {
        distance: distance_scale(1.5),
        size: planet_size_scale(6.8),
        color: '#c1440e',
        ellipticity: 0.00589,
        orbital_period: 1.88,
        orbits: sun,
    })

    drawables['jupiter'] = new Planet(c, {
        distance: distance_scale(5.2),
        size: planet_size_scale(139.8),
        color: '#d8ca9d',
        ellipticity: .06487,
        orbital_period: 11.86,
        orbits: sun,
    })

    drawables['saturn'] = new Planet(c, {
        distance: distance_scale(9.5),
        size: planet_size_scale(116.4),
        color: '#e3e0c0',
        ellipticity: 0.09796,
        orbital_period: 29.46,
        orbits: sun,
    })

    drawables['uranus'] = new Planet(c, {
        distance: distance_scale(19.2),
        size: planet_size_scale(50.7),
        color: '#4FD0E7',
        ellipticity: 0.02293,
        orbital_period: 84.01,
        orbits: sun,
    })

    drawables['neptune'] = new Planet(c, {
        distance: distance_scale(30.1),
        size: planet_size_scale(49.2),
        color: '#4b70dd',
        ellipticity: 0.01708,
        orbital_period: 164.8,
        orbits: sun,
    });

    return drawables
}

export function setup_close_binary(c) {
    const drawables = {};
    let b;
    drawables['barycenter'] = b = new Barycenter(c, c.w / 2 + 10, c.h / 2, {});
    // drawables['primary'] = new Star(c, c.w / 2 + 50, c.h / 2, {
    //     color: 'orange',
    //     diameter: scale(1.6, 15),
    //     orbits: b,
    // });
    drawables['secondary'] = new Star(c, c.w / 2 - 50, c.h / 2., {
        color: 'yellow',
        diameter: scale(1.2, 15),
        orbits: b,
        ellipticity: 0.45
    });
    return drawables
}