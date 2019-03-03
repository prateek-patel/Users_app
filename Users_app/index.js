'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let figlet = require('figlet');
let app = express();
let routers = express.Router();
let routes = require('./handler');
let dbconnection = require('./models');
const port = 8080;


function connectDB() {
    return new Promise((resolve, reject) => {
        dbconnection.connection.connect(err => {
            if (err) {
                console.log('error connecting to database: ', err.message);
                reject('error connecting to database')
            }
            resolve('Connected to database');
            console.log('Connected to database');
        })
    })
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes(dbconnection));

app.listen(port, (req, res) => {
    return connectDB()
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

/* function listening() {
    return new Promise((resolve, reject) => {

    })
} */