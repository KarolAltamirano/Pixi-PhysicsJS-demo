'use strict';

var loaderData = require('./loaderData');

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
