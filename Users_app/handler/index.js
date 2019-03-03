'use strict';

let routes = require('express').Router({ mergeParams: true });

module.exports = (dbconnection) => {
    routes.use('/user', require('./user')(dbconnection));
    return routes;
}