/**
 * Test users
 */
'use strict';
process.env.NODE_ENV = 'test';

const { spy, stub } = require('sinon');
const chai = require('chai');

chai.should();

const users = require('../../models/users');

describe('User functions with different values', function() {
    describe('getBalance different values', function() {
        let status, json, res;

        beforeEach(() => {
            status = stub();
            json = spy();
            res = { json, status };
            status.returns(res);
        });

        describe('if called with a request that has missing email', () => {
            let req = {};

            beforeEach(() => users.getBalance(res, req));
            it('calls status with code 401', () =>
                status.calledWith(401).should.be.ok);
        });
        describe('if called with a request that has email', () => {
            let req = {
                email: 'jeppe_nyhlen@hotmail.com'
            };

            beforeEach(() => users.getBalance(res, req));
            it('calls status with code 401 not true', () =>
                status.calledWith(401).should.not.be.ok);
        });
    });
    describe('getUser different values', function() {
        let status, json, res;

        beforeEach(() => {
            status = stub();
            json = spy();
            res = { json, status };
            status.returns(res);
        });

        describe('if called with a request that has missing email', () => {
            let req = {};

            beforeEach(() => users.getUser(res, req));
            it('calls status with code 401', () =>
                status.calledWith(401).should.be.ok);
        });
        describe('if called with a request that has email', () => {
            let req = {
                email: 'jeppe_nyhlen@hotmail.com'
            };

            beforeEach(() => users.getUser(res, req));
            it('calls status with code 401 not true', () =>
                status.calledWith(401).should.not.be.ok);
        });
    });
});
