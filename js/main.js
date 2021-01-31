import {setup_close_binary, setup_solar_system} from "./examples.js";

const settings = new URLSearchParams(window.location.search)
window.ZOOM = settings.get('zoom') || 2;

/*
Zoom levels:
0.5: inner solar system
1: + jupiter
2: + saturn
3: + uranus
4: + neptune
 */

class Canvas {
    constructor(id) {
        const canvas = $(id)[0];
        const $window = $(window);

        this.ctx = canvas.getContext('2d');
        this.w = canvas.width = $window.width();
        this.h = canvas.height = $window.height() * 0.99; // so no scroll-bar is visible
    }

    draw_circle(x, y, r = 300, color = null) {
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2); // Outer circle
        if (color) {
            ctx.fillStyle = color;
            ctx.fill()
        } else {
            ctx.stroke();
        }
    }

    draw_ellipse() {
        // finding the focus of an ellipse
        const ctx = this.ctx

        // drawing elipses from focus
        let focus_x = this.w / 2;
        let focus_y = this.h / 2;

        let semimajor = 400;
        let semiminor = 300;

        let distance = Math.sqrt(Math.pow(semimajor, 2) - Math.pow(semiminor, 2));

        ctx.beginPath();
        ctx.ellipse(focus_x - distance, focus_y, semimajor, semiminor, 0, 0, Math.PI * 2);
        ctx.stroke();

        semimajor = 400;
        semiminor = 300;

        distance = Math.sqrt(Math.pow(semimajor, 2) - Math.pow(semiminor, 2));

        ctx.beginPath()
        ctx.ellipse(focus_x + distance, focus_y, semimajor, semiminor, 0, 0, Math.PI * 2);
        ctx.stroke();
    }
}


let interval;

function main() {
    const c = new Canvas('#space')

    // https://nssdc.gsfc.nasa.gov/planetary/factsheet

    // const drawables = setup_solar_system(c)
    const drawables = setup_close_binary(c)

    interval = setInterval(_ => {
        c.ctx.clearRect(0, 0, c.w, c.h);
        for (let [name, item] of Object.entries(drawables)) {
            item.draw();
        }
    }, 10)

}

window.update_zoom = zoom => {
    window.ZOOM = zoom;
    clearInterval(interval)
    main();
}

$(_ => {
    $(document).on('keyup', e => {
        const z = e.key - 0.5
        if (z > 0) {
            window.update_zoom(z)
        }
    });
    main();
})