import mongoose from 'mongoose';
import config from '../../config.json';
import UserSchema from './user';
import HotelSchema from './hotel';

mongoose.connect(
  config.db,
  {
    poolSize: 20,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      console.log(err);
    }
  }
);

const User = mongoose.model('User', UserSchema);
const Hotel = mongoose.model('Hotel', HotelSchema);

export { User, Hotel };
