import mongoose from 'mongoose';
import config from '../../config.json';
import UserSchema from './user';

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

const User = mongoose.model('User', UserSchema);

export { User };
