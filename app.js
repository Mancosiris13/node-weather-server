const express = require('express');
const cors = require('cors');
const weatherFetch = require('./src/utils/forecast');
//console.log(__dirname);
//console.log(path.join(__dirname, '../public'));

const app = express();
app.use(cors());

const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  return res.send('Hi from node weather server');
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Error, Provide a Location!',
    });
  }

  weatherFetch(req.query.address, (error, forecastData) => {
    if (error) {
      return console.log(error);
    }
    res.send({
      forecastData,
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }

  //console.log(req.query.search);
  //console.log(req.query.rating);

  res.send({ products: [] });
});

// app.com
// app.com/help
// app.com/about
// app.com/weather
// app.com/products

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
