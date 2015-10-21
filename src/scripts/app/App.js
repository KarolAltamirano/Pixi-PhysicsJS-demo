'use strict';

var Canvas       = require('./utilities/Canvas'),
    Keyboard     = require('./utilities/Keyboard'),
    worldPhysics = require('./utilities/worldPhysics'),
    Plane        = require('./prefab/Plane'),
    Dude         = require('./prefab/Dude'),
    Ground       = require('./prefab/Ground');

function App() {
    Canvas.apply(this, arguments);

    window.addEventListener('resize', this.onResize.bind(this));

    this.keyboard = new Keyboard();

    worldPhysics.create(this);

    this.createElements();

    // run animation
    requestAnimationFrame(this.animLoop.bind(this));
}

App.prototype = Object.create(Canvas.prototype);
App.prototype.constructor = App;

App.prototype.createElements = function () {
    // create plane
    this.plane = new Plane(this);
    this.stage.addChild(this.plane);

    // create ground
    this.ground = new Ground(this);
    this.stage.addChild(this.ground);

    // create dude
    this.dude = new Dude(this);
    this.stage.addChild(this.dude);

    // physics collisions
    worldPhysics.collisions();
};

App.prototype.onResize = function () {
    Canvas.prototype.onResize.call(this);

    // elements
    this.plane.onResize();
    this.ground.onResize();
    this.dude.onResize();

    // physics
    worldPhysics.onResize();
};

App.prototype.animLoop = function () {
    // elements
    this.plane.animLoop();
    this.ground.animLoop();
    this.dude.animLoop();

    // physics step
    this.world.step(Date.now());

    // call parent method
    Canvas.prototype.animLoop.call(this);

    // request animation frame
    requestAnimationFrame(this.animLoop.bind(this));
};

module.exports = App;
