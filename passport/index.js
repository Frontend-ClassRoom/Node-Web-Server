const passport = require('passport');
const local = require('./localStrategy');
const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);    // session에 user.id 값 저장
    });

    passport.deserializeUser((id, done) => {
        User.findOne({
            where: { id }
        })
            .then(user => done(null, user)) // req.user, req.isAuthenticated() 활용 가능
            .catch(err => done(err));

    });

    // strategy 등록
    local();
}

