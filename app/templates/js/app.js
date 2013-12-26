/**
 * app.js
 **/

define([], function () {

    'use strict';

    var app = {

        version: 0,

        init: function() {
            alert('Application version: ' + this.version);
        }
    };

    return app;
});