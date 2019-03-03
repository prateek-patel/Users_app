'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let figlet = require('figlet');
let app = express();
let routers = express.Router();
let routes = require('./handler');
let dbconnection = require('./models');
const port = 8080;

function tokenValidator(req, res, next) {
    if (!req.headers || !req.headers.token) {
        throw Error('invalid token');
    }
    next();
}

app.use(tokenValidator);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes(dbconnection));

app.listen(port, (req, res) => {
    return Promise.resolve(true)
        .then(_ => {
            console.log(figlet.textSync('Users App!', {
                horizontalLayout: 'default',
                verticalLayout: 'default'
            }));
            console.log(`server started at port: ${port}`);
        })
        .catch(err => {
            console.log("error while initializing: ", err);
        });
});