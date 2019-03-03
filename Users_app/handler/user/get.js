'use strict';

module.exports = (dbconnection) => {
    return (req, res, next) => {
        return dbconnection.findAllUsers()
            .then(users => {
                res.send({
                    "Users": users
                })
            })
            .catch(next)
    }
}