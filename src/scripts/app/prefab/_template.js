'use strict';

var  loader = require('../../utilities/loader');

function Template(app) {
    this.app = app;

    // create element
    var scale = this.app.renderer.resolution > 1 ? 0.5 : 1,
        img  = loader.getLoader().getResult('template'),
        base = new PIXI.BaseTexture(img),
        texture = new PIXI.Texture(base);

    PIXI.Sprite.call(this, texture);

    this.scale = new PIXI.Point(scale, scale);
    this.anchor = new PIXI.Point(0.5, 0.5);

    // create body
    this.createBody();

    // set initial position
    this.setPosition();
}

Template.prototype = Object.create(PIXI.Sprite.prototype);
Template.prototype.constructor = Template;

Template.prototype.createBody = function () {
    this.body = Physics.body('rectangle', {
        x: 0,
        y: 0,
        width: this.width,
        height: this.height,
        cof: 0.9,
        label: 'template',
        mass: 2
    });

    this.app.world.add(this.body);
};

Template.prototype.setPosition = function () {
    this.position.x = this.body.state.pos.x;
    this.position.y = this.body.state.pos.y;
    this.rotation = this.body.state.angular.pos;
};

Template.prototype.animLoop = function () {};

Template.prototype.onResize = function () {};

module.exports = Template;
