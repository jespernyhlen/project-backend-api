const db = require('../db/database.js');

const users = {
    getBalance: function(res, req) {
        const email = req.email;

        if (!email) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: '/login',
                    title: 'Email missing',
                    detail: 'Email missing in request'
                }
            });
        }
        let sql = `SELECT balance FROM users WHERE email=?`;

        db.get(sql, email, (err, rows) => {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: '/balance',
                        title: 'Database error',
                        detail: err.message
                    }
                });
            }

            if (rows === undefined) {
                return res.status(401).json({
                    errors: {
                        status: 401,
                        source: '/balance',
                        title: 'User not found',
                        detail: 'User with provided email not found.'
                    }
                });
            }
            return res.status(200).json({
                data: rows
            });
        });
    },
    getUser: function(res, req) {
        const email = req.email;

        if (!email) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: '/login',
                    title: 'Email missing',
                    detail: 'Email missing in request'
                }
            });
        }
        let sql = `SELECT balance, stone, gold, silver, bronze FROM users WHERE email=?`;

        db.get(sql, email, (err, rows) => {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: '/users',
                        title: 'Database error',
                        detail: err.message
                    }
                });
            }

            if (rows === undefined) {
                return res.status(401).json({
                    errors: {
                        status: 401,
                        source: '/users',
                        title: 'User not found',
                        detail: 'User with provided email not found.'
                    }
                });
            }
            return res.status(200).json({
                data: rows
            });
        });
    },
    updateBalance: function(res, body) {
        const email = body.email;
        const newBalance = body.balance;

        if (!email || !newBalance) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: '/login',
                    title: 'Email or Balance missing',
                    detail: 'Email or Balance missing in request'
                }
            });
        }
        let sql = `UPDATE users SET balance = ? WHERE email=?`;

        db.run(sql, newBalance, email, err => {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: '/balance',
                        title: 'Database error',
                        detail: err.message
                    }
                });
            } else {
                return res.status(200).json({
                    data: {
                        status: 200,
                        detail: 'account updated successfully'
                    }
                });
            }
        });
    },

    buyStock: function(res, body) {
        console.log(body);
        const email = body.email;
        const userinfo = body.userinfo;

        if (!email || !userinfo) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: '/buystock',
                    title: 'Email or stocks missing',
                    detail: 'Email or stocks missing in request'
                }
            });
        }
        let sql = `UPDATE users SET balance = ?, stone = ?, 
        gold = ?, silver = ?, bronze = ? WHERE email=?`;

        db.run(
            sql,
            userinfo.balance,
            userinfo.stone,
            userinfo.gold,
            userinfo.silver,
            userinfo.bronze,
            email,
            err => {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            source: '/buystock',
                            title: 'Database error',
                            detail: err.message
                        }
                    });
                } else {
                    return res.status(200).json({
                        data: {
                            status: 200,
                            detail: 'stock updated successfully'
                        }
                    });
                }
            }
        );
    }
};

module.exports = users;
