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
