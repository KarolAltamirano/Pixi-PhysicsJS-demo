'use strict';

var worldPhysics = (function () {
    var app,
        edgeBounce;

    var _create = function (a) {
        app = a;

        var world = new Physics(),
            gravity = Physics.behavior('constant-acceleration', { acc: { x: 0, y: 0.001 } }),
            bounds = Physics.aabb(0, 0, app.width, app.height);

        edgeBounce = Physics.behavior('edge-collision-detection', { aabb: bounds, restitution: 0.3 });
        world.add(edgeBounce);

        world.add(gravity);
        world.add(Physics.behavior('body-impulse-response'));
        world.add(Physics.behavior('body-collision-detection'));
        world.add(Physics.behavior('sweep-prune'));

        app.world = world;
    };

    var _onResize = function () {
        edgeBounce.setAABB(Physics.aabb(0, 0, app.width, app.height));
    };

    var _collisions = function () {
        var dudeGroundQuery;

        dudeGroundQuery = Physics.query({
            $or: [
                { bodyA: { label: 'ground' }, bodyB: { label: 'dude' } },
                { bodyB: { label: 'ground' }, bodyA: { label: 'dude' } }
            ]
        });

        app.world.on('collisions:detected', function (data) {
            var dudeGroundFound = Physics.util.find(data.collisions, dudeGroundQuery);

            if (dudeGroundFound && app.keyboard.isKeyUp()) {
                app.dude.body.sleep(false);
                app.dude.body.accelerate(Physics.vector(0, -0.12));
            }
        });
    };

    return {
        create: _create,
        onResize: _onResize,
        collisions: _collisions
    };

})();

module.exports = worldPhysics;
