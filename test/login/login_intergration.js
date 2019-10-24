process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');

chai.should();

chai.use(chaiHttp);

describe('Login', () => {
    describe('POST /login', () => {
        it('should have status 200 when right login', done => {
            let user = {
                email: 'jeppe_nyhlen@hotmail.com',
                password: 'hejhej'
            };

            chai.request(server)
                .post('/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);

                    done();
                });
        });

        it('should return object with success message', done => {
            let user = {
                email: 'jeppe_nyhlen@hotmail.com',
                password: 'hejhej'
            };

            chai.request(server)
                .post('/login')
                .send(user)
                .end((err, res) => {
                    res.body.data.type.should.be.a('string', 'success');
                    res.body.data.token.should.be.a('string');

                    done();
                });
        });

        it('should have status 401 when user doesnt exists', done => {
            let user = {
                email: 'shouldfail@hotmail.com',
                password: 'hejhej'
            };

            chai.request(server)
                .post('/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);

                    done();
                });
        });

        it('should have status 401 when no password is included', done => {
            let user = {
                email: 'jeppe_nyhlen@hotmail.com'
            };

            chai.request(server)
                .post('/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);

                    done();
                });
        });

        it('should include errors object when wrong password', done => {
            let user = {
                email: 'jeppe_nyhlen@hotmail.com',
                password: 'qweasd'
            };

            chai.request(server)
                .post('/login')
                .send(user)
                .end((err, res) => {
                    res.body.errors.should.be.an('object');

                    done();
                });
        });
    });
});
