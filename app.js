const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const jwt = require('jsonwebtoken');

// Modules for routes
const users = require('./routes/users.js');
const register = require('./routes/register.js');
const login = require('./routes/login.js');

const port = 1338;

app.use(cors());
app.options('*', cors());
app.disable('x-powered-by');
app.set('view engine', 'ejs');

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// This is middleware called for all routes.
// Middleware takes three parameters.
app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});

function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) {
            // send error response
            console.log('not a valid token');
            return res.status(500).json({
                errors: {
                    status: 401,
                    source: req.route.path,
                    title: 'access error',
                    detail: err.message
                }
            });
        }
        // Valid token send on the request
        console.log('Valid token, super!');
        next();
    });
}

// Routes
app.get('/users', users);
app.get(
    '/users/:email',
    (req, res, next) => checkToken(req, res, next),
    (req, res) => users(req, res)
);

app.post('/register', register);
app.post('/login', login);
app.get(
    '/balance/:email',
    (req, res, next) => checkToken(req, res, next),
    (req, res) => users(req, res)
);
// Update balance on user
app.post(
    '/balance',
    (req, res, next) => checkToken(req, res, next),
    (req, res) => users(req, res)
);
app.post(
    '/buystock',
    (req, res, next) => checkToken(req, res, next),
    (req, res) => users(req, res)
);

// Start up server
const server = app.listen(port, () =>
    console.log(`Example API listening on port ${port}!`)
);

module.exports = server;
