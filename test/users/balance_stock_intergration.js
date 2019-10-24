process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');

chai.should();

chai.use(chaiHttp);

describe('Users', () => {
    let token = '';

    describe('POST /buystock', () => {
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
        it('should have status 401 with missing email or userinfo', done => {
            chai.request(server)
                .post('/buystock')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(401);

                    done();
                });
        });
        it('should have status 500 with unvalid token', done => {
            chai.request(server)
                .post('/buystock')
                .set('x-access-token', 'token')
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.errors.should.be.an('object');
                    res.body.errors.title.should.be.a(
                        'string',
                        'Database error'
                    );

                    done();
                });
        });
        it('should have status 200 with valid email and userinfo', done => {
            let body = {
                email: 'jeppe_nyhlen@hotmail.com',
                userinfo: {
                    balance: 0,
                    stone: 0,
                    gold: 0,
                    silver: 0,
                    bronze: 0
                }
            };

            chai.request(server)
                .post('/buystock')
                .set('x-access-token', token)
                .send(body)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.an('object');
                    res.body.data.detail.should.be.a(
                        'string',
                        'stock updated successfully'
                    );

                    done();
                });
        });
    });
});
