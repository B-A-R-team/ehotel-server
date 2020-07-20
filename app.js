import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('HELLO WORLD!');
});

app.listen(1234, () => {
  console.log('server running http://localhost:1234');
});
