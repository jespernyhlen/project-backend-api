process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');

chai.should();

chai.use(chaiHttp);

describe('Users', () => {
    let token = '';

    describe('GET /users/', () => {
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
                .get('/users/shouldfail')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(401);

                    done();
                });
        });
        it('should have status 500 with unvalid token', done => {
            chai.request(server)
                .get('/users/jeppe_nyhlen@hotmail.com')
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
        it('should have status 200 with valid email and token', done => {
            let user = {
                email: 'jeppe_nyhlen@hotmail.com'
            };

            chai.request(server)
                .get('/users/jeppe_nyhlen@hotmail.com')
                .set('x-access-token', token)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.an('object');
                    res.body.data.balance.should.be.a('number');
                    res.body.data.stone.should.be.a('number');
                    res.body.data.silver.should.be.a('number');
                    res.body.data.gold.should.be.a('number');
                    res.body.data.bronze.should.be.a('number');

                    done();
                });
        });
    });
});
