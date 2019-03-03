'use strict';

let mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Inspiron@15',
    database: 'users'
});

module.exports = {
    connection: connection,
    endConnection: function () {
        connection.end()
    },
    addUser: function (newuser) {
        return new Promise((resolve, reject) => {
            let que = connection.query('INSERT INTO users.users SET ?', newuser, function (err, result) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                console.log(result);
                resolve(result);
            });
        });
    },
    findUserById: function (id) {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM users where id = ?", [id], function (err, result) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                console.log(result);
                resolve(result);
            })
        })
    },
    findAllUsers: function () {
        return new Promise((resolve, reject) => {
            let q = connection.query("SELECT * FROM users",
                function (err, results, fields) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    console.log(results);
                    resolve(results);
                });
        });
    },
    delUser: function (id) {
        return new Promise((resolve, reject) => {
            let que = connection.query('DELETE FROM users WHERE id= ?', [id], function (err, result) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                console.log(result);
                resolve(result);
            });
        });
    }
}