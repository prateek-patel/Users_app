'use strict';

module.exports = () => {
    return (req, res, next) => {
        return Promise.resolve(true)
            .then(_ => {
                res.send('get requests!!!')
            })
            .catch(next)
    }
}