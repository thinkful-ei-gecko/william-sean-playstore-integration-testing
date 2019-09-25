const app = require('../index');
const supertest = require('supertest');
const { expect } = require('chai');

describe('Get /apps', () => {
  it('should return complete array of apps when no genre specified' () => {});

  it('should return genre of apps when given a valid genre', () => {});

  it('should throw an error if non-valid genre is given', () => {});

  //['Rating','App].forEach()
  it(`should return ${validSort}-sorted array when given ${validSort} as a sort option`, ()=> {});
  
  it('should throw an error if non-valid sort option is given', () => {});
});