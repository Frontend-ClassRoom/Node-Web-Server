const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models/user');

const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const { email, nick, password } = req.body;

    try {
        const exUser = await User.findOne({ where: { email } });

        if (exUser) {
            // 이미 존재하는 유저일 경우 처리
        }

        const pwdHash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            nick,
            password: bcrypt.hash,
        });

        // return        
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => { // local strategy가 실행 되고 done함수 호출 되면 두 번째 매개변수인 함수가 실행 됨
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.redirect(`/?loginError=${info.message}`);
        }
        return req.login(user, (loginError) => {    // req.login 실행 시 passport.serializeUser 실행
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});