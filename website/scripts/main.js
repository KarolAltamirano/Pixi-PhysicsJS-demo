/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var loader = __webpack_require__(1),
	    App = __webpack_require__(6);
	
	function progressCb(e) {
	    var p = Math.round(100 * e.progress);
	
	    // show progress in loader
	    $('.loader').text(p + '%');
	}
	
	function completeCb() {
	    // hide loader
	    $('.loader').hide();
	
	    // run app
	    $('.container').show();
	    new App('container__canvas');
	}
	
	/* bootstrap application */
	$(function () {
	    if (window.app.incompatible.isIncompatibleBrowser()) {
	        return;
	    }
	
	    // show loader
	    $('.loader').text('0%').show();
	
	    // start loader
	    loader.setProgressCb(progressCb);
	    loader.setCompleteCb(completeCb);
	    loader.createLoader();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var loaderData = __webpack_require__(2);
	
	var loader = (function () {
	    var _progressCb,
	        _completeCb,
	        _loader;
	
	    var setProgressCb = function (cb) {
	        _progressCb = cb;
	    };
	
	    var setCompleteCb = function (cb) {
	        _completeCb = cb;
	    };
	
	    var createLoader = function () {
	        _loader = new createjs.LoadQueue(true);
	
	        createjs.Sound.alternateExtensions = ['mp3'];
	        _loader.installPlugin(createjs.Sound);
	
	        _loader.addEventListener('progress', _progressCb);
	        _loader.addEventListener('complete', _completeCb);
	
	        _loader.loadManifest(loaderData);
	    };
	
	    var getLoader = function () {
	        return _loader;
	    };
	
	    return {
	        setProgressCb: setProgressCb,
	        setCompleteCb: setCompleteCb,
	        createLoader: createLoader,
	        getLoader: getLoader
	    };
	})();
	
	module.exports = loader;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var dataCommon   = __webpack_require__(3),
	    dataNoRetina = __webpack_require__(4),
	    dataRetina   = __webpack_require__(5),
	    isRetina     = window.devicePixelRatio > 1,
	    data;
	
	if (isRetina) {
	    data = dataCommon.concat(dataRetina);
	} else {
	    data = dataCommon.concat(dataNoRetina);
	}
	
	module.exports = data;


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = [
		{
			"id": "app-data",
			"src": "data/data.json"
		},
		{
			"id": "dude-json",
			"src": "assets/images/dude.json"
		},
		{
			"id": "dude-png",
			"src": "assets/images/dude.png"
		},
		{
			"id": "grass",
			"src": "assets/images/grass.jpg"
		}
	];

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = [
		{
			"id": "plane",
			"src": "assets/images/plane.png"
		}
	];

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = [
		{
			"id": "plane",
			"src": "assets/images/plane@2x.png"
		}
	];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Canvas       = __webpack_require__(7),
	    Keyboard     = __webpack_require__(8),
	    worldPhysics = __webpack_require__(9),
	    Plane        = __webpack_require__(10),
	    Dude         = __webpack_require__(11),
	    Ground       = __webpack_require__(12);
	
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


/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	function Canvas(canvas) {
	    var scale = window.devicePixelRatio || 1,
	        canvasElement = document.getElementById(canvas);
	
	    this.width = window.innerWidth;
	    this.height = window.innerHeight;
	
	    canvasElement.style.width = this.width + 'px';
	    canvasElement.style.height = this.height + 'px';
	
	    this.stage = new PIXI.Container();
	
	    this.renderer = PIXI.autoDetectRenderer(this.width, this.height, {
	        view: canvasElement,
	        resolution: scale
	    });
	
	    this.renderer.backgroundColor = 0xCCCCFF;
	}
	
	Canvas.prototype.animLoop = function () {
	    this.renderer.render(this.stage);
	};
	
	Canvas.prototype.onResize = function () {
	    this.width = window.innerWidth;
	    this.height = window.innerHeight;
	
	    this.renderer.view.style.width = this.width + 'px';
	    this.renderer.view.style.height = this.height + 'px';
	
	    this.renderer.resize(this.width, this.height);
	};
	
	module.exports = Canvas;


/***/ },
/* 8 */
/***/ function(module, exports) {

	/* eslint camelcase: 0 */
	
	'use strict';
	
	function Keyboard() {
	    this._listener = new window.keypress.Listener();
	    this._keyRight = false;
	    this._keyLeft  = false;
	    this._keyUp    = false;
	
	    this._register();
	}
	
	Keyboard.prototype._register = function () {
	    this._listener.register_many([
	        {
	            keys: 'right',
	            on_keydown: function () {
	                this._keyRight = true;
	            },
	            on_keyup: function () {
	                this._keyRight = false;
	            },
	            this: this
	        },
	        {
	            keys: 'left',
	            on_keydown: function () {
	                this._keyLeft = true;
	            },
	            on_keyup: function () {
	                this._keyLeft = false;
	            },
	            this: this
	        },
	        {
	            keys: 'up',
	            on_keydown: function () {
	                this._keyUp = true;
	            },
	            on_keyup: function () {
	                this._keyUp = false;
	            },
	            this: this
	
	        }
	    ]);
	};
	
	Keyboard.prototype.isKeyRight = function () {
	    return this._keyRight;
	};
	
	Keyboard.prototype.isKeyLeft = function () {
	    return this._keyLeft;
	};
	
	Keyboard.prototype.isKeyUp = function () {
	    return this._keyUp;
	};
	
	module.exports = Keyboard;


/***/ },
/* 9 */
/***/ function(module, exports) {

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


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var  loader = __webpack_require__(1);
	
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


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var  loader = __webpack_require__(1);
	
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


/***/ },
/* 12 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=maps/main.js.map