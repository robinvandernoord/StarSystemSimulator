import {deg_to_rad, scale} from "./helpers.js";


export class BigObject {
    constructor(canvas, x, y, opt) {
        this.canvas = canvas
        this.x = x
        this.y = y
        this.options = opt
    }

    draw_orbit(distance, ellipticity = 0) {
        const ctx = this.canvas.ctx;
        const opt = this.options
        ctx.beginPath();
        ctx.strokeStyle = opt.color;
        ctx.setLineDash([11, 11]);
        ctx.ellipse(opt.orbits.x, opt.orbits.y, distance * (1 - ellipticity), distance, deg_to_rad(90), 0, Math.PI * 2); // Outer circle
        ctx.stroke();
    }
}

export class Barycenter extends BigObject {
    draw() {
        this.canvas.draw_circle(this.x, this.y, scale(1, 15), 'black')
    }
}

export class Star extends BigObject {
    draw() {
        this.canvas.draw_circle(this.x, this.y, this.options.diameter, this.options.color)
        this.draw_orbit(Math.abs(this.x - this.options.orbits.x), this.options.ellipticity || 0)

        // this.update_xy();
        this.angle = 0;
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


export class Planet extends BigObject {
    constructor(canvas, options) {
        super(canvas, options.orbits.x + options.distance, options.orbits.y, options);
        // draw planet:
        this.angle = 0;
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