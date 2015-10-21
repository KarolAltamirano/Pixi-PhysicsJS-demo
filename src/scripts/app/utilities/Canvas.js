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
