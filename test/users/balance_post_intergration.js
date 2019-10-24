process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');

chai.should();

chai.use(chaiHttp);

describe('Users', () => {
    let token = '';

    describe('POST /balance/', () => {
        before(function(done) {
            let user = {
                email: 'jeppe_nyhlen@hotmail.com',
                password: 'hejhej'
            };

            chai.request(server)
                .post('/login')
                .send(user)
                .end((err, res) => {
                    token = res.body.data.token;

                    done();
                });
        });
        it('should have status 401 with unvalid email or balance', done => {
            chai.request(server)
                .post('/balance')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(401);

                    done();
                });
        });
        it('should have status 500 with unvalid token', done => {
            chai.request(server)
                .post('/balance')
                .set('x-access-token', 'token')
                .end((err, res) => {
                    res.should.have.status(500);

                    done();
                });
        });
        it('should have status 200 with valid token, email and balance', done => {
            let user = {
                email: 'jeppe_nyhlen@hotmail.com',
                balance: 10
            };

            chai.request(server)
                .post('/balance')
                .set('x-access-token', token)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);

                    done();
                });
        });
    });
});
