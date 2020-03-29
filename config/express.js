
var express = require('express');
var morgan = require('morgan');
var compress = require('compression');
var bodyparser = require('body-parser');
var methodOverride = require('method-override');

module.exports = function() {
    var app = express();

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    app.use(bodyparser.urlencoded({
        extended: true
    }));

    app.use(bodyparser.json());
    app.use(methodOverride());

    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    require('../app/routes/index.server.routes.js')(app);

    return app;
};