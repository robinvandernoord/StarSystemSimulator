import {Barycenter, Planet, Star} from './types.js';
import {distance_scale, planet_size_scale, scale} from "./helpers.js";

export function setup_solar_system(c) {
    const drawables = {};
    drawables['barycenter'] = new Barycenter(c, c.w / 2, c.h / 2, {});
    const sun = new Star(c, {
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
    drawables['barycenter'] = b = new Barycenter(c, c.w / 2, c.h / 2, {});

    let weights = [25.2, 22.8];
    const bb = b.find_barycenter(distance_scale(5), ...weights);
    drawables['primary'] = new Star(c, {
        color: 'orange',
        diameter: weights[0],
        orbits: b,
        distance: bb[0],
        ellipticity: 0.3,
        orbital_period: 0.6
    });
    drawables['secondary'] = new Star(c, {
        color: 'yellow',
        diameter: weights[1],
        orbits: b,
        ellipticity: 0.2,
        distance: bb[1],
        orbital_period: 0.6
    });

    // circumbinary
    drawables['system AB b'] = new Planet(c, {
        distance: distance_scale(12),
        size: planet_size_scale(40),
        color: 'darkgreen',
        ellipticity: 0.25,
        orbital_period: 5,
        orbits: b,
    });

    return drawables
}

export function setup_wide_binary(c) {
    const drawables = {};
    let star_a, star_b, b;
    drawables['barycenter'] = b = new Barycenter(c, c.w / 2, c.h / 2, {});
    let weights = [30, 30]; // both same weight
    const bb = b.find_barycenter(distance_scale(10), ...weights);

    drawables['primary'] = star_a = new Star(c,  {
        color: 'orange',
        diameter: weights[0],
        orbits: b,
        distance: bb[0],
        ellipticity: 0,
        orbital_period: 50
    });
    drawables['secondary'] = star_b = new Star(c,  {
        color: 'yellow',
        diameter: weights[1],
        orbits: b,
        ellipticity: 0,
        distance: bb[1],
        orbital_period: 50
    });

    drawables['primary b'] = new Planet(c, {
        distance: distance_scale(0.9),
        size: planet_size_scale(34),
        color: 'red',
        ellipticity: 0,
        orbital_period: 0.7,
        orbits: star_a,
    })
    drawables['primary c'] = new Planet(c, {
        distance: distance_scale(1.5),
        size: planet_size_scale(90),
        color: 'blue',
        ellipticity: 0.02,
        orbital_period: 1.3,
        orbits: star_a,
    })
    drawables['secondary b'] = new Planet(c, {
        distance: distance_scale(1.1),
        size: planet_size_scale(30),
        color: 'gray',
        ellipticity: 0.0,
        orbital_period: 0.5,
        orbits: star_b,
    })

    return drawables

}

function some_tests(c) {
    const drawables = {};
    let b;
    drawables['barycenter'] = b = new Barycenter(c, c.w / 2, c.h / 2, {});


    // example 1: Two bodies with the same mass orbiting a common barycenter
    // drawables['primary'] = new Star(c, c.w / 2 + 90, c.h / 2, {
    //     color: 'orange',
    //     diameter: scale(3, 15),
    //     orbits: b,
    //     distance: 90,
    //     orbital_period: 0.4
    // });
    // drawables['secondary'] = new Star(c, c.w / 2 - 90, c.h / 2., {
    //     color: 'yellow',
    //     diameter: scale(3, 15),
    //     orbits: b,
    //     ellipticity: 0,
    //     distance: -90,
    //     orbital_period: 0.4
    // });

    // Example 2: Two bodies with a difference in mass orbiting a common barycenter external to both bodies:
    // drawables['primary'] = new Star(c, c.w / 2 + 70, c.h / 2, {
    //     color: 'orange',
    //     diameter: scale(3, 15),
    //     orbits: b,
    //     distance: 70,
    //     orbital_period: 0.4
    // });
    // drawables['secondary'] = new Star(c, c.w / 2 - 90, c.h / 2., {
    //     color: 'yellow',
    //     diameter: scale(1.5, 15),
    //     orbits: b,
    //     ellipticity: 0,
    //     distance: -90,
    //     orbital_period: 0.4
    // });

    // Example 3/4: Two bodies with an extreme difference in mass orbiting a common barycenter internal to one body
    // drawables['primary'] = new Star(c, c.w / 2 + 10, c.h / 2, {
    //     color: 'orange',
    //     diameter: scale(4, 15),
    //     orbits: b,
    //     distance: 10,
    //     orbital_period: 0.4
    // });
    // drawables['secondary'] = new Star(c, c.w / 2 - 90, c.h / 2., {
    //     color: 'yellow',
    //     diameter: scale(1, 15),
    //     orbits: b,
    //     ellipticity: 0,
    //     distance: -90,
    //     orbital_period: 0.4
    // });


    // Example 5: two ellipses

    let weights = [25.2, 22.8];
    const bb = b.find_barycenter(distance_scale(5), ...weights);
    drawables['primary'] = new Star(c, {
        color: 'orange',
        diameter: weights[0],
        orbits: b,
        distance: bb[0],
        ellipticity: 0.3,
        orbital_period: 0.6
    });
    drawables['secondary'] = new Star(c, {
        color: 'yellow',
        diameter: weights[1],
        orbits: b,
        ellipticity: 0.2,
        distance: bb[1],
        orbital_period: 0.6
    });

    drawables['system AB b'] = new Planet(c, {
        distance: distance_scale(7),
        size: planet_size_scale(40),
        color: '#8504bd',
        ellipticity: 0.5,
        orbital_period: 1,
        orbits: b,
    });

    let t;
    drawables['third'] = t = new Star(c, {
        color: 'brown',
        diameter: 10,
        orbits: b,
        ellipticity: 0.3,
        distance: 700,
        orbital_period: 25
    });

    drawables['third b'] = new Planet(c, {
        color: 'gray',
        distance: distance_scale(1),
        size: planet_size_scale(50),
        ellipticity: 0,
        orbital_period: 1,
        orbits: t,
    })

    return drawables
}