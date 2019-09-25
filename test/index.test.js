const app = require('../index');
const supertest = require('supertest');
const { expect } = require('chai');

describe('Get /apps', () => {
  it('should return complete array of apps when no genre specified', () => {
    return supertest(app)
      .get('/apps')
      .query({})
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        const app = res.body[15];
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf(20);
        expect(app).to.be.an('object');
        expect(app).to.have.any.keys('App', 'Title', 'Genres', 'Current Ver');
      });
  });

  it('should return genre of apps when given a valid genre', () => {
    return supertest(app)
      .get('/apps')
      .query({ genres: 'Action' })
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        const app = res.body[0];
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf(6);
        expect(app).to.be.an('object');
        expect(app).to.have.any.keys('App', 'Title', 'Genres', 'Current Ver');
      });
  });
  it('should throw an error if non-valid genre is given', () => {
    return supertest(app)
      .get('/apps')
      .query({ genres: 'MISTAKE' })
      .expect(400, 'Please return a valid genre');
  });

  ['Rating','App'].forEach(validSort => {
    it.only(`should return ${validSort}-sorted array when given ${validSort} as a sort option`, ()=> {
      return supertest(app)
        .get('/apps')
        .query({ sort: validSort })
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          const app = res.body[0];
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf(20);
          expect(app).to.be.an('object');
          expect(app).to.have.any.keys('App', 'Title', 'Genres', 'Current Ver');

          let sorted;
          for(let i = 0; i < res.body.length - 1; i++) {
            if(res.body[i][validSort] < res.body[i + 1][validSort]) {
              sorted = true;
            }
          }
          expect(sorted).to.be.true;
        });
    });
  });
  it('should throw an error if non-valid sort option is given', () => {
    return supertest(app)
      .get('/apps')
      .query({ sort: 'MISTAKE' })
      .expect(400, 'Please enter a valid sort option');
  });
});