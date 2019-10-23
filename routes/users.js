const express = require('express');
const router = express.Router();

const users = require('../models/users.js');

router.get('/users', (req, res) => {
    users.getUsers(req, res);
});

router.get('/users/:email', (req, res) => {
    users.getUser(res, req.params);
});

router.get('/balance/:email', (req, res) => {
    users.getBalance(res, req.params);
});

router.post('/balance', (req, res) => {
    users.updateBalance(res, req.body);
});

router.post('/buystock', (req, res) => {
    users.buyStock(res, req.body);
});

module.exports = router;
