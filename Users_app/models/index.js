'use strict';

let mysql = require('mysql');

let connection;
let pool = (function connectionPool() {
    return mysql.createPool({
        connectionLimit: 100,
        host: 'localhost',
        user: 'root',
        password: 'Inspiron@15',
        database: 'users'
    });
}());

function connectDB() {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, _connection) => {
            if (err) {
                _connection.release();
                console.log('error connecting to database: ', err.message);
                reject('error connecting to database')
            }
            connection = _connection
            console.log('Connected to database');
            resolve(connection);
        })
    })
}


module.exports = {
    connect: connectDB,
    addUser: function (newuser) {
        return connectDB()
            .then(connection => {
                return new Promise((resolve, reject) => {
                    connection.query('INSERT INTO users.users SET ?', newuser, function (err, result) {
                        connection.release();
                        if (err) {
                            console.log(err);
                            reject(err);
                        }
                        console.log(result);
                        resolve(result);
                    });
                });
            });
    },
    findUserById: function (id) {
        return connectDB()
            .then(connection => {
                return new Promise((resolve, reject) => {
                    connection.query("SELECT * FROM users where id = ?", [id], function (err, result) {
                        connection.release();
                        if (err) {
                            console.log(err);
                            reject(err);
                        }
                        console.log(result);
                        resolve(result);
                    });
                });
            });
    },
    findAllUsers: function () {
        return connectDB()
            .then(connection => {
                return new Promise((resolve, reject) => {
                    connection.query("SELECT * FROM users", function (err, results, fields) {
                        connection.release();
                        if (err) {
                            console.log(err);
                            reject(err);
                        }
                        console.log(results);
                        resolve(results);
                    });
                });
            });
    },
    delUser: function (id) {
        return connectDB()
            .then(connection => {
                return new Promise((resolve, reject) => {
                    connection.query('DELETE FROM users WHERE id= ?', [id], function (err, result) {
                        connection.release();
                        if (err) {
                            console.log(err);
                            reject(err);
                        }
                        console.log(result);
                        resolve(result);
                    });
                });
            });
    }
}