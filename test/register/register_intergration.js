process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');

chai.should();

chai.use(chaiHttp);

describe('Register', () => {
    describe('POST /register', () => {
        it('should have status 401 with no user information', done => {
            let user = {};

            chai.request(server)
                .post('/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);

                    done();
                });
        });
        it('should have status 401 when information missing', done => {
            let user = {
                email: 'jeppe_nyhlen@hotmail.com',
                password: 'hejhej'
            };

            chai.request(server)
                .post('/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);

                    done();
                });
        });
        it('should have status 500 when email already registred', done => {
            let user = {
                firstname: 'kalle',
                lastname: 'petterson',
                date: '1992-05-16',
                email: 'jeppe_nyhlen@hotmail.com',
                password: 'hejhej'
            };

            chai.request(server)
                .post('/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(500);

                    done();
                });
        });
        it('should have status 201 when email successful registration', done => {
            let user = {
                firstname: 'kalle',
                lastname: 'petterson',
                date: '1992-05-16',
                email: 'new_email@hotmail.com',
                password: 'asdasd'
            };

            chai.request(server)
                .post('/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);

                    done();
                });
        });
    });
});
