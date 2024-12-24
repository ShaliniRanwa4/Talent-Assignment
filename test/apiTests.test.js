
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const { expect } = chai;



const baseUrl = 'https://jsonplaceholder.typicode.com';

describe('API Test Cases for JSONPlaceholder', () => {

    
    it('should return 200 OK for valid request', (done) => {
        chai.request(baseUrl)
            .get('/posts')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });


    it('should include userId, id, title, and body fields in the response', (done) => {
        chai.request(baseUrl)
            .get('/posts')
            .end((err, res) => {
                expect(res.body).to.be.an('array');
                if (res.body.length > 0) {
                    expect(res.body[0]).to.have.all.keys('userId', 'id', 'title', 'body');
                }
                done();
            });
    });

    // Test Case 3: Validate Data Types
    it('should have correct data types for response fields', (done) => {
        chai.request(baseUrl)
            .get('/posts')
            .end((err, res) => {
                if (res.body.length > 0) {
                    const post = res.body[0];
                    expect(post.userId).to.be.a('number');
                    expect(post.id).to.be.a('number');
                    expect(post.title).to.be.a('string');
                    expect(post.body).to.be.a('string');
                }
                done();
            });
    });

    // Test Case 4: Handle Error Response (404 Not Found)
    it('should return 404 Not Found for an invalid endpoint', (done) => {
        chai.request(baseUrl)
            .get('/invalid-endpoint')
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.be.an('object');
                expect(res.body.error).to.equal('Not Found');
                done();
            });
    });

    
    it('should return appropriate headers', (done) => {
        chai.request(baseUrl)
            .get('/posts')
            .end((err, res) => {
                expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
                done();
            });
    });

    // Test Case 6: Validate Response Time
    it('should respond within 500ms', (done) => {
        const start = Date.now();
        chai.request(baseUrl)
            .get('/posts')
            .end((err, res) => {
                const duration = Date.now() - start;
                expect(duration).to.be.below(500);
                done();
            });
    });

});
