'use strict';

var  loader = require('../../utilities/loader');

function Plane(app) {
    this.app = app;

    // create element
    var planeImg  = loader.getLoader().getResult('plane'),
        planeBase = new PIXI.BaseTexture(planeImg),
        planeTexture = new PIXI.Texture(planeBase),
        scale = this.app.renderer.resolution > 1 ? 0.5 : 1;

    PIXI.Sprite.call(this, planeTexture);

    this.scale = new PIXI.Point(scale, scale);
    this.anchor = new PIXI.Point(0.5, 0.5);

    // create body
    this.createBody();

    // set initial position
    this.setPosition();
}

Plane.prototype = Object.create(PIXI.Sprite.prototype);
Plane.prototype.constructor = Plane;

Plane.prototype.createBody = function () {};

Plane.prototype.setPosition = function () {
    this.position.x = this.app.width / 2;
    this.position.y = this.app.height / 2;
};

Plane.prototype.animLoop = function () {
    /* set position */
    this.setPosition();
};

Plane.prototype.onResize = function () {};

module.exports = Plane;
