const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient({
  // Same name as the service in the docker-compose.yml file
  host: 'redis-server'
});
client.set('visits', 0);

app.get('/', (req, res) => {
  client.get('visits', (err, visits) => {
    res.send('Number of visits ' + visits);
    client.set('visits', parseInt(visits) + 1);
  });
});

app.listen(8081, () => {
  console.log('listening on port 8081');
});
