'use strict';

let express = require('express');
let figlet = require('figlet');
let app = express();
let routers = express.Router();
let routes = require('./handler');
const port = 8080;

app.use('/', routes());

app.listen(port, (req, res) => {
    console.log(figlet.textSync('Users App!', {
        horizontalLayout: 'default',
        verticalLayout: 'default'
    }));
    console.log(`server started at port: ${port}`);
});

/* function listening() {
    return new Promise((resolve, reject) => {

    })
} */