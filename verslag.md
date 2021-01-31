## Finding the two foci of an ellipse:

```js
// finding the focus of an ellipse
ctx.beginPath();

// circle:
// ctx.ellipse(this.w/2, this.h/2, 30, 30, 0, 0, Math.PI * 2); // Outer circle

// ellipse:
let x = this.w / 2 + Math.random() * 300 - 150;
let y = this.h / 2 - Math.random() * 300 + 150;
let a = 400;
let b = 300;

ctx.ellipse(x, y, a, b, 0, 0, Math.PI * 2); // Outer circle
ctx.stroke();

// center:
this.draw_circle(x, y, 20, 'black')

// let ellipticity = Math.sqrt(Math.pow(a, 2) / Math.pow(b, 2));

// a^2 + b^2 = c^2
// a + b = c
// a = c - b
// a^2 = c^2 - b^2

// foci:
this.draw_circle(x + Math.sqrt(Math.pow(a, 2) - Math.pow(b, 2)), y, 20, 'red')
this.draw_circle(x - Math.sqrt(Math.pow(a, 2) - Math.pow(b, 2)), y, 20, 'blue')
```

## Finding the two ellipses from a focus:

```js
// drawing elipses from focus
let focus_x = this.w / 2 + Math.random() * 300 - 150;
let focus_y = this.h / 2 - Math.random() * 300 + 150;

let semimajor = 400;
let semiminor = 300;

ctx.beginPath();
ctx.ellipse(focus_x - Math.sqrt(Math.pow(semimajor, 2) - Math.pow(semiminor, 2)), focus_y, semimajor, semiminor, 0, 0, Math.PI * 2); // Outer circle
ctx.stroke();

ctx.beginPath()
ctx.ellipse(focus_x + Math.sqrt(Math.pow(semimajor, 2) - Math.pow(semiminor, 2)), focus_y, semimajor, semiminor, 0, 0, Math.PI * 2); // Outer circle
ctx.stroke();
this.draw_circle(focus_x, focus_y, 20, 'red')
```