const mongoose = require('mongoose');

function connect() {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const { connection } = mongoose;

  connection.once('open', () => {
    console.log('Connection established successfully');
  });

  connection.on('error', (error) => {
    console.log('Something went wrong', error);
  });

  return connection;
}

module.exports = { connect };
