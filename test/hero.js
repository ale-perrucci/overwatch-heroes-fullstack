const request = require('supertest');
const chai = require('chai');
const chaiSubset = require('chai-subset');
const app = require('../server');
const expect = chai.expect;
let api = request('http://localhost:5000/api/');

chai.use(chaiSubset);

describe('Hero', () => {

  before(function () {
    app.open();
  });

  after(function () {
    app.close();
  });

  describe('GET /heroes/bastion', () => {
    it('should return hero Bastion', (done) => {
      api.get('heroes/bastion')
        .end(function(err, res) { 
          expect(res.statusCode).to.equal(200); 
          expect(res.body).to.not.be.empty; 
          expect(res.body).to.be.an('object').that.includes.keys("name", "abilities", "name_plain");
          expect(res.body).to.containSubset({'name': 'Bastion'});
          done(); 
        }); 
    });
  });

  describe('GET /heroes/x', () => {
    it('should return empty object', (done) => {
      api.get('heroes/x')
        .end(function(err, res) { 
          expect(res.statusCode).to.equal(200); 
          expect(res.body).to.be.an('object'); 
          expect(res.body).to.be.empty; 
          done(); 
        }); 
    });
  });
});
