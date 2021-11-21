import express from 'express';

const app = express();

app.get('/', (_, res) => {
  res.send('hello');
});

app.listen(8001, () => {
  console.log('Server start on PORT: 8001');
});
