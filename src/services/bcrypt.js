const bcrypt = require('bcrypt');

module.exports.genSalt = function (password) {
    return new Promise((resolve) => {
        bcrypt.hash(password, 10, function(err, hash) {
            if (err || !hash) return resolve(err);
            resolve(hash);
        });
    });
};

module.exports.compare = function (password, hashPassword) {
    return new Promise((resolve) => {
        bcrypt.compare(password, hashPassword, function (err, hash) {
            if (err || !hash) return resolve(err);
            resolve(true);
        });
    });
};