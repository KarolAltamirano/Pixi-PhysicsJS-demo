'use strict';

var  loader = require('../../utilities/loader');

function Dude(app) {
    this.app = app;

    // create element
    var dudeJson = loader.getLoader().getResult('dude-json'),
        dudePng  = loader.getLoader().getResult('dude-png'),
        dudeBase = new PIXI.BaseTexture(dudePng),
        dudeTextures = [],
        frame,
        i;

    for (i = 0; i < dudeJson.frames.length; i++) {
        frame = dudeJson.frames[i].frame;
        dudeTextures.push(new PIXI.Texture(dudeBase, new PIXI.Rectangle(frame.x, frame.y, frame.w, frame.h)));
    }

    PIXI.extras.MovieClip.call(this, dudeTextures);

    this.animationSpeed = 0.5;
    this.anchor = new PIXI.Point(0.5, 0.5);

    // create body
    this.createBody();

    // set initial position
    this.setPosition();
}

Dude.prototype = Object.create(PIXI.extras.MovieClip.prototype);
Dude.prototype.constructor = Dude;

Dude.prototype.createBody = function () {
    this.body = Physics.body('rectangle', {
        x: this.width,
        y: this.height,
        width: this.width,
        height: this.height,
        cof: 0.9,
        label: 'dude',
        mass: 2
    });

    this.app.world.add(this.body);
};

Dude.prototype.setPosition = function () {
    this.body.state.angular.vel = 0;
    this.body.state.angular.pos = 0;
    this.position.x = this.body.state.pos.x;
    this.position.y = this.body.state.pos.y;
    this.rotation = this.body.state.angular.pos;
};

Dude.prototype.animLoop = function () {
    /* controll */
    // right
    if (this.app.keyboard.isKeyRight()) {
        if (!this.playing) {
            this.play();
        }
        this.scale.x = 1;
        this.body.sleep(false);
        if (this.body.state.vel.x < 0.5) {
            this.body.accelerate(Physics.vector(0.01, 0));
        }
    // left
    } else if (this.app.keyboard.isKeyLeft()) {
        if (!this.playing) {
            this.play();
        }
        this.scale.x = -1;
        this.body.sleep(false);
        if (this.body.state.vel.x > -0.5) {
            this.body.accelerate(Physics.vector(-0.01, 0));
        }
    // not moving
    } else {
        if (this.playing) {
            this.stop();
            this.body.state.vel.x = 0;
        }
    }

    /* set position */
    this.setPosition();
};

Dude.prototype.onResize = function () {
    this.body.sleep(false);
};

module.exports = Dude;
