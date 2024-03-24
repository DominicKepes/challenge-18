const { connect, connection } = require('mongoose');

const connectionString = 'mongodb://127.0.0.1:27017/studentsDB';

connect('mongodb://127.0.0.1:27017/studentsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false
});

module.exports = connection;
