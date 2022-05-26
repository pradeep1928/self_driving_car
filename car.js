class Car {
    constructor(x, y, width, height) {
        this.x = x                              // x position of car
            this.y = y                          // y position of car
            this.width = width                 // width of car
            this.height = height                // height of car

        // creating speed, acceleration, friction for car
        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = 3;
        this.friction = 0.05

        // for turning the car left or right
        this.angle = 0;

        this.sensor = new Sensor(this)             // creating the sensor obj from Sensor class
        this.controls = new Controls();            // creating the controls obj from Controls class
    }

    // Speed control for car
    update(roadBorders) {
        this.#move();
        this.sensor.update(roadBorders);
    }

    #move() {
        if (this.controls.forward) {
            this.speed += this.acceleration;
        }
        if (this.controls.reverse) {
            this.speed -= this.acceleration;
        }
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed
        }
        if (this.speed < -this.maxSpeed / 2) {
            this.speed = -this.maxSpeed / 2;
        }
        if (this.speed > 0) {
            this.speed -= this.friction;
        }
        if (this.speed < 0) {
            this.speed += this.friction
        }
        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }

        if (this.speed != 0) {
            const flip = this.speed > 0 ? 1 : -1;
            if (this.controls.left) {
                this.angle += 0.01 * flip;
            }
            if (this.controls.right) {
                this.angle -= 0.01 * flip;
            }
        }

        this.x -= Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);
        ctx.beginPath();
        ctx.rect(
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );
        ctx.fill();

        ctx.restore();

        this.sensor.draw(ctx);               // drawing the sensors on car
    }
}