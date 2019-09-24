const express = require('express');
const playstore = require('./playstore');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));

app.get('/apps', (req,res) => {
  const { genres, sort } = req.query;
  
  if(sort) {
    if(!['Rating', 'App'].includes(sort)) {
      return res.status(400).send('Please enter a valid sort option');
    }
  }
  
  let genreArray = ['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'];

  if(genres) {
    if(!genreArray.includes(genres.toLowerCase())) {
      res.status(400).send('Please return a valid genre');
    }
  }

  let filteredApps = playstore.filter(app => {
    if(genres) {
      return app.Genres.toLowerCase().includes(genres.toLowerCase());
    } else {
      return true;
    }
  });

  if(sort) {
    if(sort === 'App') {
      filteredApps.sort((a,b) => a[sort].toLowerCase() > b[sort].toLowerCase() ? 1 : -1);

    } else {
      filteredApps.sort((a,b) => a[sort] > b[sort] ? 1 : -1);
    }
  }

  res.json(filteredApps);
});

app.listen(8000, () => console.log('Server is listening on 8000'));