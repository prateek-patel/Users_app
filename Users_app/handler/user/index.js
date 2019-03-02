'use strict';

let routes = require('express').Router({ mergeParams: true });

module.exports = () => {
    routes.post('/create', require('./create')());
    routes.get('/get', require('./get')());
    return routes;
}