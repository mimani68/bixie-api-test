process.env.NODE_ENV = 'test';
process.env.DB_CONNECTION_URL='postgres://user:test@localhost:5432/app'

chai = require('chai'),
chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
chai.config.includeStack = true;

var server = require('../dist/startup/app').app;

describe('API', function(){

  it('should return status 200 on "PING" GET', function(done){
    chai.request(server)
      .get('/ping')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      })
  })

  it('should list all stations include weather GET', function(done) {
    chai.request(server)
      .get('/api/v1/stations')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('weather');
        res.body.should.have.property('stations');
        // assert.typeOf(res.body.title, 'string', 'title is string');
        // res.body.title.should.equal('Hello Title');
        // res.body._id.should.equal(data.id);
        done();
      });
  });

  it('should return error due parse date GET', function(done) {
    const at = 'hello_Guys'
    chai.request(server)
      .get('/api/v1/stations?at=' + at)
      .end(function(err, res){
        res.should.have.status(400);
        done();
      });
  });

  it('should list all stations at specific time GET', function(done) {
    const at = new Date(2019, 10, 1).toISOString()
    chai.request(server)
      .get('/api/v1/stations?at=' + at)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('weather');
        // res.body.should.have.property('stations');
        res.body.at.should.equal(at);
        done();
      });
  });

})
