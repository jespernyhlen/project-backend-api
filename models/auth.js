const db = require('../db/database.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

const auth = {
    login: function(res, body) {
        const email = body.email;
        const password = body.password;
        if (!email || !password) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: '/login',
                    title: 'Email or password missing',
                    detail: 'Email or password missing in request'
                }
            });
        }
        let sql = 'SELECT * FROM users WHERE email=?';
        db.get(sql, email, (err, rows) => {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: '/login',
                        title: 'Database error',
                        detail: err.message
                    }
                });
            }

            if (rows === undefined) {
                return res.status(401).json({
                    errors: {
                        status: 401,
                        source: '/login',
                        title: 'User not found',
                        detail: 'User with provided email not found.'
                    }
                });
            }

            const user = rows;

            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            source: '/login',
                            title: 'bcrypt error',
                            detail: 'bcrypt error'
                        }
                    });
                }

                if (result) {
                    let payload = {
                        email: user.email
                    };
                    let jwtToken = jwt.sign(payload, jwtSecret, {
                        expiresIn: '1h'
                    });

                    return res.json({
                        data: {
                            type: 'success',
                            message: 'User logged in',
                            user: payload,
                            token: jwtToken
                        }
                    });
                }

                return res.status(401).json({
                    errors: {
                        status: 401,
                        source: '/login',
                        title: 'Wrong password',
                        detail: 'Password is incorrect.'
                    }
                });
            });
        });
    },

    register: function(res, body) {
        const firstname = body.firstname;
        const lastname = body.lastname;
        const email = body.email;
        const date = body.date;
        const password = body.password;

        if (!firstname || !lastname || !email || !date || !password) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: '/register',
                    title:
                        'Firstname, lastname, email, date or password missing',
                    detail:
                        'Firstname, lastname, email, date or password missing in request'
                }
            });
        }

        bcrypt.hash(password, 15, function(err, hash) {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: '/register',
                        title: 'bcrypt error',
                        detail: 'bcrypt error'
                    }
                });
            }

            db.run(
                'INSERT INTO users (firstname, lastname, email, date, password) VALUES (?, ?, ?, ?, ?)',
                firstname,
                lastname,
                email,
                date,
                hash,
                err => {
                    if (err) {
                        return res.status(500).json({
                            errors: {
                                status: 500,
                                source: '/register',
                                title: 'Database error',
                                detail: err.message
                            }
                        });
                    }

                    return res.status(201).json({
                        data: {
                            message: 'User successfully registered.'
                        }
                    });
                }
            );
        });
    }
};

module.exports = auth;
