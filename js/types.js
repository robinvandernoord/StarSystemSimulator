import {deg_to_rad} from "./helpers.js";


export class BigObject {
    constructor(canvas, x, y, opt) {
        this.canvas = canvas
        this.x = x
        this.y = y
        this.options = opt
        this.angle = 0;
    }

    draw_orbit(distance, ellipticity = 0) {
        const ctx = this.canvas.ctx;
        const opt = this.options
        ctx.beginPath();
        ctx.strokeStyle = opt.color;
        ctx.setLineDash([11, 11]);
        ctx.ellipse(this.focus_x || opt.orbits.x, opt.orbits.y, distance * (1 - ellipticity), distance, deg_to_rad(90), 0, Math.PI * 2); // Outer circle
        ctx.stroke();
    }
}

export class Barycenter extends BigObject {
    constructor(canvas, x, y, options) {

        if (!options.orbits) {
            super(canvas, x, y, options);
            return
        } // else:

        let distance = Math.sqrt(Math.pow(100 * (1 + options.ellipticity), 2) - Math.pow(100, 2));
        super(canvas, options.orbits.x, options.orbits.y, options);
        this.focus_x = options.distance > 0 ? options.orbits.x + distance : options.orbits.x - distance
    }

    draw() {
        // this.canvas.draw_circle(this.x, this.y, scale(1, 15), 'black')
        this.update_xy()
    }

    update_xy() {
        if (!this.options.distance) {
            // dont move
            return;
        }

        const newX = this.options.distance * 1 * Math.cos(this.angle * (Math.PI / 180));
        const newY = this.options.distance * (1 - (this.options.ellipticity || 0)) * Math.sin(this.angle * (Math.PI / 180));

        // to place the square correctly we must add the calculated
        // new x and y values to the circle center
        this.x = newX + this.options.orbits.x;
        this.y = newY + this.options.orbits.y;

        this.angle += 1 / this.options.orbital_period * 0.5
        if (this.angle > 360) {
            this.angle -= 360;
        }

    }

    /**
     *
     * @param {number} a - Semi major axis of the system
     * @param {number} m1
     * @param {number} m2
     */
    find_barycenter(a, m1, m2) {
        let r1 = a * m2 / (m1 + m2);
        return [r1, -(a - r1)]
    }
}

export class Star extends BigObject {
    constructor(canvas, options) {
        super(canvas, options.orbits.x, options.orbits.y, options);
    }

    calculate_focus_x() {
        let options = this.options
        let distance = Math.sqrt(Math.pow(100 * (1 + options.ellipticity), 2) - Math.pow(100, 2));
        this.focus_x = options.distance > 0 ? options.orbits.x + distance : options.orbits.x - distance
    }

    draw() {
        this.calculate_focus_x() // needed to follow moving barycenter

        this.canvas.draw_circle(this.x, this.y, this.options.diameter, this.options.color)
        this.draw_orbit(Math.abs(this.options.distance), this.options.ellipticity || 0)
        this.update_xy();
    }

    update_xy() {
        if (!this.options.distance) {
            // dont move
            return;
        }

        const newX = this.options.distance * 1 * Math.cos(this.angle * (Math.PI / 180));
        const newY = this.options.distance * (1 - (this.options.ellipticity || 0)) * Math.sin(this.angle * (Math.PI / 180));

        // to place the square correctly we must add the calculated
        // new x and y values to the circle center
        this.x = newX + this.focus_x;
        this.y = newY + this.options.orbits.y;

        this.angle += 1 / this.options.orbital_period * 0.5
        if (this.angle > 360) {
            this.angle -= 360;
        }

    }
}


export class Planet extends BigObject {
    constructor(canvas, options) {
        super(canvas, options.orbits.x + options.distance, options.orbits.y, options);
    }

    draw() {
        const options = this.options
        this.canvas.draw_circle(this.x, this.y, options.size / 2, options.color)
        // draw orbit:
        this.draw_orbit(options.distance, options.ellipticity || 0)

        this.update_xy();
    }

    update_xy() {
        const newX = this.options.distance * 1 * Math.cos(this.angle * (Math.PI / 180));
        const newY = this.options.distance * (1 - (this.options.ellipticity || 0)) * Math.sin(this.angle * (Math.PI / 180));

        // to place the square correctly we must add the calculated
        // new x and y values to the circle center
        this.x = newX + this.options.orbits.x;
        this.y = newY + this.options.orbits.y;

        this.angle += 1 / this.options.orbital_period * 0.5
        if (this.angle > 360) {
            this.angle -= 360;
        }

    }
}