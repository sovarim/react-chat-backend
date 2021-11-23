import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';

const app = express();

mongoose.connect('mongodb://localhost:27017/react-chat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
} as ConnectOptions);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(cors());

app.get('/', (_, res) => {
  res.send('hello');
});

app.listen(8001, () => {
  console.log('Server start on PORT: 8001');
});
