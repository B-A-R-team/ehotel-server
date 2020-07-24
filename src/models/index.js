import mongoose from 'mongoose';
import config from '../../config.json';
import UserSchema from './user';
import HotelSchema from './hotel';
import RoomSchema from './room';
import RecordSchema from './record';
import ActiveSchema from './active';
import IntergalLogSchema from './intergal_log';

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
const Room = mongoose.model('Room', RoomSchema);
const Record = mongoose.model('Record', RecordSchema);
const Active = mongoose.model('Active', ActiveSchema);
const IntergalLog = mongoose.model('IntergalLog', IntergalLogSchema);

export { User, Hotel, Room, Record, Active, IntergalLog };
