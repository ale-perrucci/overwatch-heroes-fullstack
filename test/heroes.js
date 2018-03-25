const request = require('supertest');
const chai = require('chai');
const chaiSubset = require('chai-subset');
const app = require('../server');
const expect = chai.expect;
let api = request('http://localhost:5000/api/');

chai.use(chaiSubset);

describe('Heroes', () => {

  before(function () {
    app.open();
  });

  after(function () {
    app.close();
  });

  describe('GET /heroes', () => {
    it('should return an array of 10 heroes', (done) => {
      api.get('heroes')
        .end(function(err, res) { 
          expect(res.statusCode).to.equal(200); 
          expect(res.body).to.be.an('object'); 
          expect(res.body.heroes).to.be.an('array'); 
          expect(res.body.heroes).to.have.length(10); 
          expect(res.body.heroes).to.not.be.empty; 
          done(); 
        }); 
    });
  });

  describe('GET /heroes?limit=3', () => {
    it('should return an array of 3 heroes', (done) => {
      api.get('heroes?limit=3')
        .end(function(err, res) { 
          expect(res.statusCode).to.equal(200); 
          expect(res.body).to.be.an('object'); 
          expect(res.body.heroes).to.be.an('array'); 
          expect(res.body.heroes).to.have.length(3); 
          expect(res.body.heroes).to.not.be.empty; 
          done(); 
        }); 
    });
  });

  describe('GET /heroes?lastname=Ana', () => {
    it('should return an array of heroes starting from Bastion', (done) => {
      api.get('heroes?lastname=Ana')
        .end(function(err, res) { 
          expect(res.statusCode).to.equal(200); 
          expect(res.body.heroes[0]).to.be.an('object').that.containSubset({'name': 'Bastion'}); 
          expect(res.body.heroes).to.not.be.empty; 
          done(); 
        }); 
    });
  });

  describe('GET /heroes?filter=bast', () => {
    it('should return an array with only hero Bastion', (done) => {
      api.get('heroes?filter=bast')
        .end(function(err, res) { 
          expect(res.statusCode).to.equal(200); 
          expect(res.body.heroes).to.have.length(1); 
          expect(res.body.heroes[0]).to.be.an('object').that.containSubset({'name': 'Bastion'}); 
          expect(res.body.heroes).to.not.be.empty; 
          done(); 
        }); 
    });
  });

});
