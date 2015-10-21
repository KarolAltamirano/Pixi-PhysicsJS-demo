'use strict';

var dataCommon   = require('../data/loader-common.json'),
    dataNoRetina = require('../data/loader-no-retina.json'),
    dataRetina   = require('../data/loader-retina.json'),
    isRetina     = window.devicePixelRatio > 1,
    data;

if (isRetina) {
    data = dataCommon.concat(dataRetina);
} else {
    data = dataCommon.concat(dataNoRetina);
}

module.exports = data;
