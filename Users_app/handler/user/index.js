'use strict';

let routes = require('express').Router({ mergeParams: true });

module.exports = (dbconnection) => {
    routes.post('/create', require('./create')(dbconnection));
    routes.get('/get', require('./get')(dbconnection));
    return routes;
}