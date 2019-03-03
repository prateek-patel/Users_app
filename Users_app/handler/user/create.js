'use strict';

const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(require('./schemas/request.json'));

module.exports = (dbconnection) => {
    return (req, res, next) => {
        // req body validator
        if (!validate(req.body)) {
            throw Error(validate.errors[0].message);
        }
        let newUser = Object.assign(req.body.CreateUserParams);
        return dbconnection.addUser(newUser)
            .then(_ => dbconnection.findUserById(newUser.id))
            .then(([user]) => {
                res.send({
                    "CreateUserResponse": user
                });
            })
            .catch(next)
    }
}