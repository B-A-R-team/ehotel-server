import mongoose from 'mongoose';
import config from '../../config.json';

mongoose.connect(
  config.db,
  {
    poolSize: 20,
    useCreateIndex: true,
    useNewUrlParser: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    }
  }
);
