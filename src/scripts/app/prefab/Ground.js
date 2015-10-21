'use strict';

function Ground(app) {
    this.app = app;

    // create element
    PIXI.Graphics.call(this);
    this.beginFill(0x614126);
    this.drawRect(0, 0, this.app.width, 60);
    this.pivot = new PIXI.Point(this.width / 2, this.height / 2);

    // create body
    this.createBody();

    // set initial position
    this.setPosition();
}

Ground.prototype = Object.create(PIXI.Graphics.prototype);
Ground.prototype.constructor = Ground;

Ground.prototype.createBody = function () {
    this.body = Physics.body('rectangle', {
        x: this.app.width / 2,
        y: this.app.height - 5,
        width: this.app.width,
        height: 10,
        cof: 0.9,
        label: 'ground',
        treatment: 'static',
        restitution: 0.3
    });

    this.app.world.add(this.body);
};

Ground.prototype.setPosition = function () {
    this.position.x = this.body.state.pos.x;
    this.position.y = this.body.state.pos.y;
    this.rotation = this.body.state.angular.pos;
};

Ground.prototype.animLoop = function () {
    /* set position */
    this.setPosition();
};

Ground.prototype.onResize = function () {
    this.clear();
    this.beginFill(0x614126);
    this.drawRect(0, 0, this.app.width, 60);
    this.pivot = new PIXI.Point(this.width / 2, this.height / 2);

    this.body.geometry.width = this.app.width;
    this.body.geometry.height = 10;
    this.body.width = this.app.width;
    this.body.height = 10;
    this.body.state.pos = Physics.vector(this.app.width / 2, this.app.height - 5);
    this.body.recalc();
};

module.exports = Ground;
