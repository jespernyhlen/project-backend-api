process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');

chai.should();

chai.use(chaiHttp);

describe('Users', () => {
    let token = '';

    describe('GET /balance/', () => {
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
        it('should have status 401 with unvalid email', done => {
            chai.request(server)
                .get('/balance/shouldfail')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(401);

                    done();
                });
        });

        it('should have status 500 with unvalid token', done => {
            chai.request(server)
                .get('/balance/jeppe_nyhlen@hotmail.com')
                .set('x-access-token', 'token')
                .end((err, res) => {
                    res.should.have.status(500);

                    done();
                });
        });
        it('should have status 200 when valid email and token', done => {
            chai.request(server)
                .get('/balance/jeppe_nyhlen@hotmail.com')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.an('object');
                    res.body.data.balance.should.be.an('number');

                    done();
                });
        });
    });
});
