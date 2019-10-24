/**
 * Test for auth
 */
'use strict';
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'NotSoSafe';

const { spy, stub } = require('sinon');
const chai = require('chai');

chai.should();

const auth = require('../../models/auth');

describe('Login/register different values', function() {
    describe('Login different values', function() {
        let status, json, res;

        beforeEach(() => {
            status = stub();
            json = spy();
            res = { json, status };
            status.returns(res);
        });

        describe('if called with a request that has missing email', () => {
            let body = {
                email: 'jeppe_nyhlen@hotmail.com'
            };

            beforeEach(() => auth.login(res, body));
            it('calls status with code 401', () =>
                status.calledWith(401).should.be.ok);
        });
        describe('if called with a request that has missing password', () => {
            let body = {
                password: 'hejhej'
            };

            beforeEach(() => auth.login(res, body));
            it('calls status with code 401', () =>
                status.calledWith(401).should.be.ok);
        });
        describe('if called with a request that has email and password', () => {
            let body = {
                email: 'jeppe_nyhlen@hotmail.com',
                password: 'hejhej'
            };

            beforeEach(() => auth.login(res, body));
            it('calls status with code 401 not true', () =>
                status.calledWith(401).should.not.be.ok);
        });
    });
    describe('Register different values', function() {
        let status, json, res;

        beforeEach(() => {
            status = stub();
            json = spy();
            res = { json, status };
            status.returns(res);
        });

        describe('if called with a request that has missing firstname', () => {
            let body = {
                lastname: 'nyhlen',
                email: 'jeppe_nyhlen@hotmail.com',
                date: '1993-07-05',
                password: 'hejhej'
            };

            beforeEach(() => auth.register(res, body));
            it('calls status with code 401', () =>
                status.calledWith(401).should.be.ok);
        });
        describe('if called with a request that has all values', () => {
            let body = {
                firstname: 'jesper',
                lastname: 'nyhlen',
                email: 'jeppe_nyhlen@hotmail.com',
                date: '1993-07-05',
                password: 'hejhej'
            };

            beforeEach(() => auth.register(res, body));
            it('calls status with code 401 not true', () =>
                status.calledWith(401).should.not.be.ok);
        });
    });
});
