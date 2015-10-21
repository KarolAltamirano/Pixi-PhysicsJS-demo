'use strict';

var loader = require('./utilities/loader'),
    App = require('./app/App');

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
